import React from "react";
import starrynight from "./starrynight.png";
import "./App.css";
import { Button, Col, Container, Row } from "react-bootstrap";

function App(): JSX.Element {
    return (
        <div className="App">
            <header className="App-header">
                <h1>Christopher Bennett </h1>
                <img src={starrynight} alt="Picture of my Unity Game." />
                UD CISC275 with React Hooks and TypeScript
            </header>
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
        </div>
    );
}

export default App;
