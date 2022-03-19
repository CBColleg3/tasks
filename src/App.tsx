import React from "react";
import starrynight from "./starrynight.png";
import sketch from "./275sketch1.png";
import "./App.css";
import { Quizzer } from "./quizzer/Quizzer";
import { ChangeType } from "./components/ChangeType";
import { RevealAnswer } from "./components/RevealAnswer";
import { StartAttempt } from "./components/StartAttempt";
import { TwoDice } from "./components/TwoDice";
import { CycleHoliday } from "./components/CycleHoliday";
import { Counter } from "./components/Counter";
import { ColoredBox } from "./bad-components/ColoredBox";
import { ShoveBox } from "./bad-components/ShoveBox";
import { ChooseTeam } from "./bad-components/ChooseTeam";
import { CheckAnswer } from "./form-components/CheckAnswer";
import { GiveAttempts } from "./form-components/GiveAttempts";
import { EditMode } from "./form-components/EditMode";
import { MultipleChoiceQuestion } from "./form-components/MultipleChoiceQuestion";
import { ChangeColor } from "./form-components/ChangeColor";

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
            <div className="Quizzer-site">
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
                            <li>
                                Users can see how many total points they have
                                earned
                            </li>
                            <li>
                                Users can clear out their existing answers for a
                                quiz
                            </li>
                            <li>
                                Users can add a new quiz question and users can
                                delete an existing quiz question
                            </li>
                        </ol>
                    </div>
                </div>
            </div>
            <hr></hr>
            <CheckAnswer expectedAnswer="42"></CheckAnswer>
            <hr></hr>
            <GiveAttempts></GiveAttempts>
            <hr></hr>
            <EditMode></EditMode>
            <hr></hr>
            <ChangeColor></ChangeColor>
            <hr></hr>
            <MultipleChoiceQuestion
                options={["a", "b", "c"]}
                expectedAnswer="b"
            ></MultipleChoiceQuestion>
            <hr></hr>
            {/* <DoubleHalf></DoubleHalf> */}
            <hr></hr>
            <ChooseTeam></ChooseTeam>
            <hr></hr>
            <ColoredBox></ColoredBox>
            <hr></hr>
            <ShoveBox></ShoveBox>
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
        </div>
    );
}
export default App;
