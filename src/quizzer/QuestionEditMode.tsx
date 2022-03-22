import React, { useState } from "react";
import { Question, QuestionType } from "../interfaces/question";
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
    setQuizQuestions: (newQuestions: Question[]) => void;
}

export function QuestionEditMode({
    setQuestions,
    questions,
    index,
    setQuizQuestions
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
    const [editPoints, setEditPoints] = useState<string[]>(
        new Array(questions.length).fill("")
    );
    const [published, setPublished] = useState<boolean[]>(
        new Array(questions.length).fill(false)
    );
    const [multipleChoice, setMultipleChoice] = useState<boolean[]>(
        new Array(questions.length).fill(false)
    );
    const [options, setOptions] = useState<string[]>(
        new Array(questions.length).fill("")
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

    function updatePointInput(event: ChangeEvent, index: number) {
        const pointClone = [...editPoints];
        pointClone[index] = event.target.value;
        setEditPoints(pointClone);
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
            published: published[index],
            points: parseInt(editPoints[index]),
            type: multipleChoice[index]
                ? "multiple_choice_question"
                : ("short_answer_question" as QuestionType),
            options: options[index].split(",")
        };
        const questArrayClone = questions.map(
            (question: Question): Question => {
                if (questions[index] === question) {
                    return questionClone;
                } else return question;
            }
        );
        setQuestions(questArrayClone);
        setQuizQuestions(questArrayClone);
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

    function updateQuestionType(
        event: React.ChangeEvent<HTMLInputElement>,
        index: number
    ) {
        const multClone = [...multipleChoice];
        multClone[index] = !multClone[index];
        setMultipleChoice(multClone);
    }

    function updateOptionsArray(event: ChangeEvent, index: number) {
        const optionClone = [...options];
        optionClone[index] = event.target.value;
        setOptions(optionClone);
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
                                            data-testid="edit-name-field"
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
                                            data-testid="edit-body-field"
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
                                            data-testid="edit-answer-field"
                                            value={answer[index]}
                                            onChange={(e) =>
                                                updateAnswerInput(e, index)
                                            }
                                            disabled={!editMode[index]}
                                        />
                                    </div>
                                </div>
                                <div>
                                    Question Points:
                                    <div>
                                        <Form.Control
                                            data-testid="edit-points-field"
                                            value={editPoints[index]}
                                            type="number"
                                            onChange={(e) =>
                                                updatePointInput(e, index)
                                            }
                                            disabled={!editMode[index]}
                                        />
                                    </div>
                                </div>
                                <div>
                                    <Form.Check
                                        data-testid="edit-published-field"
                                        type="switch"
                                        id="published-check"
                                        label="Published?"
                                        checked={published[index]}
                                        onChange={(
                                            e: React.ChangeEvent<HTMLInputElement>
                                        ) => updatePublished(e, index)}
                                    />
                                </div>
                                <div>
                                    <Form.Check
                                        data-testid="edit-question-type"
                                        type="switch"
                                        id="multiple-choice-check"
                                        label="Multiple Choice?"
                                        checked={multipleChoice[index]}
                                        onChange={(
                                            e: React.ChangeEvent<HTMLInputElement>
                                        ) => updateQuestionType(e, index)}
                                    />
                                </div>
                                <div>
                                    {multipleChoice[index] && (
                                        <div>
                                            {" "}
                                            Multiple Choice Options (Please
                                            enter in a comma seperated list):
                                            <div>
                                                <Form.Control
                                                    data-testid="edit-options-field"
                                                    value={options[index]}
                                                    onChange={(e) =>
                                                        updateOptionsArray(
                                                            e,
                                                            index
                                                        )
                                                    }
                                                    disabled={!editMode[index]}
                                                />
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                            <Button
                                data-testid="edit-question-button"
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
