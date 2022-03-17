import React from "react";
import starrynight from "./starrynight.png";
import sketch from "./275sketch1.png";
import "./App.css";
import { Quizzer } from "./quizzer/Quizzer";

function App(): JSX.Element {
    return (
        <div>
            <div className="App">
                <header className="App-header">
                    <h1>Christopher Bennett </h1>
                    <img src={starrynight} alt="Picture of my Unity Game." />
                    <a href="https://frontend-fun.github.io/react-hooks-typescript-tome/">
                        {" "}
                        UD CISC275
                    </a>{" "}
                    with React Hooks and TypeScript
                </header>
            </div>
            <div>
                <Quizzer></Quizzer>
                <div>
                    <div>Sketch:</div>
                    <div>
                        {" "}
                        <img
                            src={sketch}
                            alt="Picture of my Sketch for Task 11."
                        />
                    </div>
                    <div>
                        Completed Features:
                        <ol>
                            <li>
                                Users can see a list of quizzes, including the
                                quizzes title, description, and how many
                                questions it has
                            </li>
                            <li>
                                Users can select a specific quiz to see the
                                questions, including the questions name, body,
                                and points
                            </li>
                            <li>
                                Quiz questions can be of AT LEAST two types: a
                                short answer question or multiple choice
                                question
                            </li>
                            <li>
                                Users can enter or choose an answer for a quiz
                                question, and be told if they are correct
                            </li>
                            <li>
                                Users can add a new quiz and delete any existing
                                ones
                            </li>
                        </ol>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default App;
