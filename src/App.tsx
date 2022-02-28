import React from "react";
import starrynight from "./starrynight.png";
import "./App.css";
<<<<<<< HEAD
import { Button, Col, Container, Row } from "react-bootstrap";
=======
import { ChangeType } from "./components/ChangeType";
import { RevealAnswer } from "./components/RevealAnswer";
import { StartAttempt } from "./components/StartAttempt";
import { TwoDice } from "./components/TwoDice";
import { CycleHoliday } from "./components/CycleHoliday";
import { Counter } from "./components/Counter";
>>>>>>> upstream/task-state

function App(): JSX.Element {
    return (
        <div className="App">
            <header className="App-header">
                <h1>Christopher Bennett </h1>
                <img src={starrynight} alt="Picture of my Unity Game." />
                UD CISC275 with React Hooks and TypeScript
            </header>
<<<<<<< HEAD
            <Button onClick={() => console.log("Hello World!")}>
                Log Hello World
            </Button>
            <Container>
                <Row>
                    <Col>
                        <div className="red-rect">
                            <p>
                                Hello World! Edit <code>src/App.tsx</code> and
                                save. This page will automatically reload.
                            </p>
                        </div>
                    </Col>

                    <Col>
                        <div className="red-rect">
                            <ul>
                                <li> Programming</li>
                                <li> Gaming</li>
                                <li> Creative Thinking</li>
                            </ul>
                        </div>
                    </Col>
                </Row>
            </Container>
=======
            <hr></hr>
            <Counter></Counter>
            <hr />
            <RevealAnswer></RevealAnswer>
            <hr />
            <StartAttempt></StartAttempt>
            <hr />
            <TwoDice></TwoDice>
            <hr />
            <ChangeType></ChangeType>
            <hr />
            <CycleHoliday></CycleHoliday>
>>>>>>> upstream/task-state
        </div>
    );
}

export default App;
