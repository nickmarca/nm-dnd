/** @jsx jsx */

import {Children, cloneElement, useState} from "react";
import {jsx, css} from "@emotion/core";
import draggingContext from "./draggingContext";

const containerCss = css`
    display: flex;
    flex-direction: column;
    width: 300px;
    height: 600px;
    border: 1px solid red;
`;

function ListOfThings({children}) {

    const [things, setThings] = useState(children || []);

    const onDropHandler = () => {
        if(!draggingContext.current) {
            return;
        }

        const [element, clear] = draggingContext.current;

        if(things.find(e => e.key === element.key)) {
           return;
        }

        clear();
        setThings(things.concat([element]));
    };

    const onDragStartHandler = (getElement) => {
        return () => {
            const element = getElement();
            const _things = things.filter(el => el.key !== element.key);
            draggingContext.current = [element, () => setThings(_things)]
        }
    };

    const mapWithOnDrag = () => {
        return Children.map(things, element => {
           const clonedElement = cloneElement(element, {
              onDragStart: onDragStartHandler(() => clonedElement)
           });
           return clonedElement;
        });
    };


    return (
        <div css={containerCss}
             onDrop={onDropHandler}
             onDragOver={event => event.preventDefault()}>
            {
                mapWithOnDrag()
            }
        </div>
    );
}

export default ListOfThings;