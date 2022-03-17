import React, { useState } from "react";
import { Question } from "../interfaces/question";
//import { Answer } from "../interfaces/answer";
import { Form, Button } from "react-bootstrap";

// Simplify type definition of the Change Event
type ChangeEvent = React.ChangeEvent<
    HTMLTextAreaElement | HTMLInputElement | HTMLSelectElement
>;

interface QuestionInterface {
    // The type is "a function that consumes a boolean and returns nothing"
    setQuestion: (newQuestion: Question) => void;
    question: Question;
}

export function QuestionEditMode({
    setQuestion,
    question
}: QuestionInterface): JSX.Element {
    const [name, setName] = useState<string>("");
    const [answer, setAnswer] = useState<string>("");
    const [editMode, setEditMode] = useState<boolean>(false);

    function updateNameInput(event: ChangeEvent, index: number) {
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
        console.log("Question Name Before: ", question.name);
        const questionClone = {
            ...question,
            body: name[index],
            expected: answer[index]
        };
        const questArrayClone = questions.map(
            (question: Question): Question => {
                if (questions[index] === question) {
                    return questionClone;
                } else return question;
            }
        );

        setQuestions(questArrayClone);
        console.log("Question Name After: ", questArrayClone[index].name);
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
            <>
                <li key={question.expected}></li>
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
                        <>
                            <div>
                                <div>
                                    Question Name:
                                    <div>
                                        <Form.Control
                                            value={name[idx]}
                                            onChange={(e) =>
                                                updateNameInput(e, idx)
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
                                                updateAnswerInput(e, idx)
                                            }
                                            disabled={!editMode}
                                        />
                                    </div>
                                </div>
                            </div>
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
                        </>
                    )}
                </div>
            </>
        </div>
    );
}
