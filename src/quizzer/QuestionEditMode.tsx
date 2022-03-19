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
    setQuestions: (newQuestion: Question[]) => void;
    questions: Question[];
    index: number;
}

export function QuestionEditMode({
    setQuestions,
    questions,
    index
}: QuestionInterface): JSX.Element {
    const [name, setName] = useState<string[]>(
        new Array(questions.length).fill("")
    );
    const [body, setBody] = useState<string[]>(
        new Array(questions.length).fill("")
    );
    const [answer, setAnswer] = useState<string[]>(
        new Array(questions.length).fill("")
    );
    const [editMode, setEditMode] = useState<boolean[]>(
        new Array(questions.length).fill(false)
    );

    const [published, setPublished] = useState<boolean[]>(
        new Array(questions.length).fill(false)
    );

    function updateNameInput(event: ChangeEvent, index: number) {
        const nameClone = [...name];
        nameClone[index] = event.target.value;
        setName(nameClone);
        //question.name = nameClone[index];
    }
    function updateBodyInput(event: ChangeEvent, index: number) {
        const bodyClone = [...body];
        bodyClone[index] = event.target.value;
        setBody(bodyClone);
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
            name: name[index],
            body: body[index],
            expected: answer[index],
            published: published[index]
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

    function updatePublished(
        event: React.ChangeEvent<HTMLInputElement>,
        index: number
    ) {
        const publishedClone = [...published];
        publishedClone[index] = !publishedClone[index];
        setPublished(publishedClone);
    }

    return (
        <div>
            <>
                <div key={questions[index].name}></div>
                <div>
                    <Form.Group controlId="editInputAnswer">
                        <div>
                            <Form.Check
                                type="switch"
                                id="edit-mode-check"
                                label="Edit Mode"
                                checked={editMode[index]}
                                onChange={(
                                    e: React.ChangeEvent<HTMLInputElement>
                                ) => updateEditMode(e, index)}
                            />
                        </div>
                    </Form.Group>
                    {editMode[index] && (
                        <>
                            <div>
                                <div>
                                    Question Name:
                                    <div>
                                        <Form.Control
                                            value={name[index]}
                                            onChange={(e) =>
                                                updateNameInput(e, index)
                                            }
                                            disabled={!editMode[index]}
                                        />
                                    </div>
                                </div>
                                <div>
                                    Question Body:
                                    <div>
                                        <Form.Control
                                            value={body[index]}
                                            onChange={(e) =>
                                                updateBodyInput(e, index)
                                            }
                                            disabled={!editMode[index]}
                                        />
                                    </div>
                                </div>
                                <div>
                                    Question Answer:
                                    <div>
                                        <Form.Control
                                            value={answer[index]}
                                            onChange={(e) =>
                                                updateAnswerInput(e, index)
                                            }
                                            disabled={!editMode[index]}
                                        />
                                    </div>
                                </div>
                                <div>
                                    <Form.Check
                                        type="switch"
                                        id="published-check"
                                        label="Published?"
                                        checked={published[index]}
                                        onChange={(
                                            e: React.ChangeEvent<HTMLInputElement>
                                        ) => updatePublished(e, index)}
                                    />
                                </div>
                            </div>
                            <Button
                                onClick={(
                                    e: React.MouseEvent<
                                        HTMLButtonElement,
                                        MouseEvent
                                    >
                                ) =>
                                    updateEditInput(e, index, questions[index])
                                }
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
