/** @jsx jsx */

import {jsx, css} from "@emotion/core";

import ListOfThings from "./components/ListOfThings";
import Thing from "./components/Thing";

const containerCss = css`
    display: flex; 
    height: 100vh;
`;

function App() {
    const things1 = [
        <Thing name={"Javascript"} key={"1"}/>,
        <Thing name={"Macbook"} key={"2"}/>,
        <Thing name={"Starcraft"} key={"3"}/>,
        <Thing name={"Android"} key={"4"}/>,
        <Thing name={"Korea"} key={"5"}/>,
    ];

    return (
        <div css={containerCss}>
            <ListOfThings>
                {things1}
            </ListOfThings>
            <ListOfThings />
        </div>
    );
}

export default App;