import React, { useState } from "react";
import { Questions } from "./Questions";
import { Question, QuestionType } from "../interfaces/question";
import { Quiz } from "../interfaces/quiz";
//import { Answer } from "../interfaces/answer";
import { Form, Button } from "react-bootstrap";
import quizList from "../quizzer/QuizList.json";

const INITIAL_QUIZZES: Quiz[] = quizList.map(
    (quiz): Quiz => ({
        ...quiz,
        questions: quiz.questions.map(
            (question): Question => ({
                ...question,
                type: question.type as QuestionType
            })
        )
    })
);

// Simplify type definition of the Change Event
type ChangeEvent = React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>;

// Simplify the Component's parameter's type
interface AddQuizParams {
    // Consumes a function that consumes the name and released date
    //  and returns nothing (because it's passed to a React State Setter).
    // This is passed in much later
    appendQuiz: (t: string, d: string) => void;
}

export function AddQuizButton({ appendQuiz }: AddQuizParams): JSX.Element {
    // These will be the values for the new Movie
    const [title, setTitle] = useState<string>("New Quiz");
    const [description, setDescription] = useState<string>("a brand new Quiz!");

    // Provide forms for editing the new movie
    // And also a button to append the movie
    return (
        <div>
            <Form>
                <Form.Group controlId="formQuizName">
                    <Form.Label>Name:</Form.Label>
                    <Form.Control
                        type="text"
                        value={title}
                        onChange={(event: ChangeEvent) =>
                            setTitle(event.target.value)
                        }
                    />
                </Form.Group>
            </Form>
            <Form>
                <Form.Group controlId="formQuizDescription">
                    <Form.Label>Description:</Form.Label>
                    <Form.Control
                        type="text"
                        value={description}
                        onChange={(event: ChangeEvent) =>
                            setDescription(event.target.value)
                        }
                    />
                </Form.Group>
            </Form>
            <Button onClick={() => appendQuiz(title, description)}>
                Append
            </Button>
        </div>
    );
}

export function Quizzer(): JSX.Element {
    //State
    const [quizzes, setQuizzes] = useState<Quiz[]>(INITIAL_QUIZZES);
    const [visible, setVisible] = useState<boolean[]>(
        new Array(quizzes.length).fill(false)
    );
    const [showUnpublished, setShowUnpublished] = useState<boolean>(true);

    //Components
    function appendQuiz(title: string, description: string) {
        // Making a new array of quizzes, with an additional extra one
        const modifiedQuizzes = [
            ...quizzes,
            {
                id: Date.now(),
                title: title,
                description: description,
                questions: []
            }
        ];
        // Update the quiz array to be the new version
        setQuizzes(modifiedQuizzes);
    }

    function removeQuizByID(quizID: number) {
        // Need to map a new version of the array
        const modifiedQuizzes = [...quizzes].filter(
            (quiz: Quiz): boolean =>
                // If this movie is the target movie
                quiz.id !== quizID
        );
        // Update the movies array to be the new version
        setQuizzes(modifiedQuizzes);
    }

    function showQuizQuestions(index: number): void {
        // Set visible to be the logical opposite of its previous value
        //setVisible(!visible);

        const boolClone = [...visible];
        boolClone[index] = !boolClone[index];
        setVisible(boolClone);
    }
    console.log(visible);

    function filterQuizQuestions(index: number): void {
        setShowUnpublished(!showUnpublished);
    }
    //View
    return (
        <div>
            <h3>GroundHog Dayyyyy! Quizer:</h3>
            <ol>
                {quizzes.map(
                    (quiz: Quiz, idx: number): JSX.Element => (
                        <li key={quiz.id}>
                            {quiz.title} ({quiz.description}) (Total Questions:
                            {"  "}
                            {quiz.questions.length}):
                            <Button
                                data-testid="view-quiz-button"
                                onClick={() => showQuizQuestions(idx)}
                            >
                                View Quiz
                            </Button>
                            {visible[idx] && (
                                <div>
                                    <Questions
                                        quiz={quizzes[idx]}
                                        setQuizQuestions={(
                                            newQuestions: Question[]
                                        ) =>
                                            setQuizzes((oldQuizzes) =>
                                                oldQuizzes.map(
                                                    (eachQuiz, quiz_ind) => {
                                                        if (quiz_ind === idx) {
                                                            return {
                                                                ...eachQuiz,
                                                                questions:
                                                                    newQuestions
                                                            };
                                                        } else {
                                                            return {
                                                                ...eachQuiz
                                                            };
                                                        }
                                                    }
                                                )
                                            )
                                        }
                                        id={quiz.id}
                                        showUnpublished={showUnpublished}
                                    ></Questions>
                                </div>
                            )}
                            <Button
                                data-testid="filter-quiz-button"
                                onClick={() => filterQuizQuestions(idx)}
                            >
                                Filter Quiz
                            </Button>
                            <Button onClick={() => removeQuizByID(quiz.id)}>
                                Remove Quiz
                            </Button>
                        </li>
                    )
                )}
            </ol>
            <AddQuizButton appendQuiz={appendQuiz}></AddQuizButton>
        </div>
    );
}
