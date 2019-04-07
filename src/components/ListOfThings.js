/** @jsx jsx */

import {Children, cloneElement, useState} from "react";
import {jsx, css} from "@emotion/core";
import draggingContext from './draggingContext';

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

        clear();
        setThings(things.concat([element]));
    };

    const onDragStartHandler = (getElement) => {
        return () => {
            const element = getElement();
            console.log(element);
            const _things = things.filter(el => el.key !== element.key);
            console.log(things);
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


/*
const genKey = () => {
    return (Math.random() * 1000).toString();
};
*/


/*const onDragStart = (getElement) => {
    return () => {
        onThingDrag(getElement());
    };
};

const cloneAllChildren = () => {
    return Children.map(children, (element, index) => {
        return cloneElement(element, {
            onDragStart: onDragStart(() => things[index]),
        });
    }) || [];
};

const [things, setThings] = useState(cloneAllChildren());

const onThingDrag = (element) => {
    const clear = () => {
        console.log('calling clear', element);
        console.log(things.filter(el => el !== element));
        setThings(things.filter(el => el !== element));
    };

    setTimeout(() => {
        draggingContext.current = [element, clear, (otherThing) => otherThing === things];
    });
};

const onDrop = () => {
    if (!draggingContext.current) {
        return;
    }
    const [element, clear, same] = draggingContext.current;
    addThing(element, clear, same);
};

const addThing = (element, clear, same) => {
    if (!same(things)) {
        setThings(things.concat([element]));
        clear();
    }
};*/