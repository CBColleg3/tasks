import React, { useState } from "react";
import { Question, QuestionType } from "../interfaces/question";
import { Answer } from "../interfaces/answer";
import { Form, Button } from "react-bootstrap";

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
    const [totalPoints, setTotalPoints] = useState<number>(0);

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

    return (
        <>
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

                                {/*                            {input === question.expected &&
                setTotalPoints(question.points + totalPoints)}
            TotalPoints{totalPoints} */}
                            </p>
                            <p>
                                <Button>Add Question</Button>
                                <Button>Edit Question</Button>
                                <Button>Remove Question</Button>
                            </p>
                        </li>
                    )
                )}
            </ol>
            <div> TotalPoints: {totalPoints}</div>
        </>
    );
}
