import React, { useState } from "react";
import { Question } from "../interfaces/question";
//import { Answer } from "../interfaces/answer";
import { Form, Button } from "react-bootstrap";
import { QuestionEditMode } from "./QuestionEditMode";

// Simplify type definition of the Change Event
type ChangeEvent = React.ChangeEvent<
    HTMLTextAreaElement | HTMLInputElement | HTMLSelectElement
>;

interface QuestionInterface {
    // The type is "a function that consumes a boolean and returns nothing"
    setQuestions: (newQuestion: Question[]) => void;
    questions: Question[];
}

export function Questions({
    setQuestions,
    questions
}: QuestionInterface): JSX.Element {
    //State
    const [input, setInput] = useState<string[]>(
        new Array(questions.length).fill("")
    );

    const [curChoice, setCurChoice] = useState<string[]>(
        new Array(questions.length).fill("")
    );
    //const [totalPoints, setTotalPoints] = useState<number>(0);

    //Control
    function updateInput(event: ChangeEvent, index: number) {
        const inputClone = [...input];
        inputClone[index] = event.target.value;
        setInput(inputClone);
    }

    function updateChoice(
        event: React.ChangeEvent<HTMLSelectElement>,
        index: number
    ) {
        const choiceClone = [...curChoice];
        choiceClone[index] = event.target.value;
        setCurChoice(choiceClone);
        //setTotalPoints(questions.points + totalPoints);
    }

    /*
    function appendQuestion() {
        // Making a new array of quizzes, with an additional extra one
        const modifiedQuestions: Question[] = [
            ...questions,
            {
                id: 4,
                name: "New Question",
                body: "What should I add to this Question?",
                type: "short_answer_question",
                options: [],
                expected: "20",
                points: 50,
                published: false
            }
        ];
        // Update the question array to be the new version
        setQuestions(modifiedQuestions);
    }
    */

    return (
        <div>
            <ol>
                {questions.map(
                    (question: Question, idx: number): JSX.Element => (
                        <li key={question.name}>
                            {question.name}
                            <p>
                                {question.body} (Total Points:
                                {"  "}
                                {question.points}): (Published?:
                                {"  "}
                                {question.published}):
                            </p>
                            <p>
                                <Form.Group controlId="formInputAnswer">
                                    {question.type ===
                                        "short_answer_question" && (
                                        <div>
                                            <Form.Label>
                                                Short Answer:
                                            </Form.Label>
                                            <Form.Control
                                                value={input[idx]}
                                                onChange={(e) =>
                                                    updateInput(e, idx)
                                                }
                                            />
                                        </div>
                                    )}
                                </Form.Group>
                                <QuestionEditMode
                                    setQuestions={setQuestions}
                                    questions={questions}
                                    index={idx}
                                ></QuestionEditMode>
                                <Form.Group controlId="chooseOptions">
                                    {question.type ===
                                        "multiple_choice_question" && (
                                        <div>
                                            <Form.Label>
                                                Multiple Choice:
                                            </Form.Label>
                                            <Form.Select
                                                value={curChoice[idx]}
                                                onChange={(e) =>
                                                    updateChoice(e, idx)
                                                }
                                            >
                                                {question.options.map(
                                                    (option: string) => (
                                                        <option
                                                            key={option}
                                                            value={option}
                                                        >
                                                            {option}
                                                        </option>
                                                    )
                                                )}
                                            </Form.Select>
                                        </div>
                                    )}
                                </Form.Group>
                                <div>
                                    {/* The input is {}. The expected answer is {} */}
                                    {input[idx] === question.expected ? (
                                        <div>✔️</div>
                                    ) : (
                                        <div>❌</div>
                                    )}
                                </div>
                                <div>
                                    {/* The input is {}. The expected answer is {} */}
                                    {curChoice[idx] === question.expected ? (
                                        <div>✔️</div>
                                    ) : (
                                        <div>❌</div>
                                    )}
                                </div>
                            </p>
                            <p>
                                <div>
                                    {" "}
                                    <Button>Add Question</Button>
                                    <Button>Remove Question</Button>
                                </div>
                            </p>
                        </li>
                    )
                )}
            </ol>
        </div>
    );
}
