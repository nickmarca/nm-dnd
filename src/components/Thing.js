/** @jsx jsx */

import {jsx, css} from "@emotion/core";

const containerCss = css`
    flex: 1;
    height: 120px;
    display: flex;
    align-items: center;
    justify-content: center;
    border: 1px solid #ccc;
`;

function Thing(props) {
    const {name, onDragStart} = props;

    return (
        <div css={containerCss} draggable={true} onDragStart={() => onDragStart()}>
            {name}
        </div>
    );
}

export default Thing;