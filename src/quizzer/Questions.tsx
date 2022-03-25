import React, { useState } from "react";
import { Question } from "../interfaces/question";
//import { Answer } from "../interfaces/answer";
import { Form } from "react-bootstrap";
import { QuestionEditMode } from "./QuestionEditMode";
import { QuestionAdd } from "./QuestionAdd";
import { QuestionCheckAnswer } from "./QuestionCheckAnswer";
import { QuestionRemove } from "./QuestionRemove";
import { Quiz } from "../interfaces/quiz";

// Simplify type definition of the Change Event
type ChangeEvent = React.ChangeEvent<
    HTMLTextAreaElement | HTMLInputElement | HTMLSelectElement
>;

interface QuestionInterface {
    // The type is "a function that consumes a boolean and returns nothing"
    quiz: Quiz;
    id: number;
    showUnpublished: boolean;
    setQuizQuestions: (newQuestions: Question[]) => void;
}

export function Questions({
    quiz,
    id,
    showUnpublished,
    setQuizQuestions
}: QuestionInterface): JSX.Element {
    //State
    const [questions, setQuestions] = useState<Question[]>(quiz.questions);

    const [input, setInput] = useState<string[]>(
        new Array(questions.length).fill("")
    );

    const [curChoice, setCurChoice] = useState<string[]>(
        new Array(questions.length).fill("")
    );
    const [totalPoints, setTotalPoints] = useState<number>(0);
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

    return (
        <div>
            {questions.map(
                (question: Question, idx: number): JSX.Element => (
                    <li key={question.id}>
                        <ul data-testid={`questions-${idx}`}>
                            {(showUnpublished ||
                                question.published === true) && (
                                <div>
                                    {question.name}
                                    <p>
                                        {question.body} (Points:
                                        {"  "}
                                        {question.points}):
                                        {"  "}
                                        {question.published ? (
                                            <span>Published </span>
                                        ) : (
                                            <span
                                                style={{
                                                    backgroundColor: "red"
                                                }}
                                            >
                                                Not Published
                                            </span>
                                        )}
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
                                            setQuizQuestions={setQuizQuestions}
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
                                                            (
                                                                option: string
                                                            ) => (
                                                                <option
                                                                    key={option}
                                                                    value={
                                                                        option
                                                                    }
                                                                >
                                                                    {option}
                                                                </option>
                                                            )
                                                        )}
                                                    </Form.Select>
                                                </div>
                                            )}
                                        </Form.Group>
                                    </p>
                                    <p>
                                        {" "}
                                        <QuestionRemove
                                            setQuestions={setQuestions}
                                            questions={questions}
                                            index={idx}
                                            setQuizQuestions={setQuizQuestions}
                                        ></QuestionRemove>
                                    </p>
                                    <div>
                                        <QuestionCheckAnswer
                                            setQuestions={setQuestions}
                                            questions={questions}
                                            index={idx}
                                            input={input}
                                            curChoice={curChoice}
                                            setTotalPoints={setTotalPoints}
                                            totalPoints={totalPoints}
                                        ></QuestionCheckAnswer>
                                    </div>
                                </div>
                            )}
                        </ul>
                    </li>
                )
            )}
            <div>
                {" "}
                <QuestionAdd
                    setQuestions={(newQuestions) => setQuestions(newQuestions)}
                    questions={questions}
                    setQuizQuestions={setQuizQuestions}
                ></QuestionAdd>
            </div>
            <div>Total Points: {totalPoints}</div>
        </div>
    );
}
