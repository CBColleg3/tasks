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

const QUESTIONS =  {

}

export function Questions({
    setQuestions,
    questions
}: QuestionInterface): JSX.Element {
    //State
    const [input, setInput] = useState<string[]>(
        new Array(questions.length).fill("")
    );
    const [name, setName] = useState<string[]>(
        new Array(questions.length).fill("")
    );
    const [answer, setAnswer] = useState<string[]>(
        new Array(questions.length).fill("")
    );
    const [curChoice, setCurChoice] = useState<string[]>(
        new Array(questions.length).fill("")
    );
    const [totalPoints, setTotalPoints] = useState<number>(0);
    const [editMode, setEditMode] = useState<boolean[]>(
        new Array(questions.length).fill(false)
    );

    //Control
    function updateInput(event: ChangeEvent, index: number) {
        const inputClone = [...input];
        inputClone[index] = event.target.value;
        setInput(inputClone);
    }
    function updateNameInput(
        event: ChangeEvent,
        index: number,
        question: Question
    ) {
        const nameClone = [...name];
        nameClone[index] = event.target.value;
        setName(nameClone);
        //question.name = nameClone[index];
    }
    function updateAnswerInput(event: ChangeEvent, index: number) {
        const answerClone = [...answer];
        answerClone[index] = event.target.value;
        setAnswer(answerClone);
        //question.name = nameClone[index];
    }

    function updateEditInput(
        event:
            | React.ChangeEvent<HTMLSelectElement>
            | React.MouseEvent<HTMLButtonElement, MouseEvent>,
        index: number,
        question: Question
    ) {
        const nameClone = [...name];
        const answerClone = [...answer];

        question.name = nameClone[index];
        question.expected = answerClone[index];
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
    function updateEditMode(
        event: React.ChangeEvent<HTMLInputElement>,
        index: number
    ) {
        const editClone = [...editMode];
        editClone[index] = !editClone[index];
        setEditMode(editClone);
    }

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
                                    <Form.Group controlId="editInputAnswer">
                                        <div>
                                            <Form.Check
                                                type="switch"
                                                id="edit-mode-check"
                                                label="Edit Mode"
                                                checked={editMode[idx]}
                                                onChange={(
                                                    e: React.ChangeEvent<HTMLInputElement>
                                                ) => updateEditMode(e, idx)}
                                            />
                                        </div>
                                    </Form.Group>
                                    {editMode[idx] && (
                                        <div>
                                            <div>
                                                Question Name:
                                                <div>
                                                    <Form.Control
                                                        value={name[idx]}
                                                        onChange={(e) =>
                                                            updateNameInput(
                                                                e,
                                                                idx,
                                                                question
                                                            )
                                                        }
                                                        disabled={!editMode}
                                                    />
                                                </div>
                                            </div>
                                            <div>
                                                Question Answer:
                                                <div>
                                                    <Form.Control
                                                        value={answer[idx]}
                                                        onChange={(e) =>
                                                            updateAnswerInput(
                                                                e,
                                                                idx
                                                            )
                                                        }
                                                        disabled={!editMode}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </div>

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
                                    <Button
                                        onClick={(
                                            e: React.MouseEvent<
                                                HTMLButtonElement,
                                                MouseEvent
                                            >
                                        ) => updateEditInput(e, idx, question)}
                                    >
                                        Edit Question
                                    </Button>
                                    <Button>Remove Question</Button>
                                </div>
                            </p>
                        </li>
                    )
                )}
            </ol>
            <div> TotalPoints: {totalPoints}</div>
        </div>
    );
}
