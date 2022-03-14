import React, { useState } from "react";
import { Questions } from "./Questions";
import { Question, QuestionType } from "../interfaces/question";
import { Answer } from "../interfaces/answer";
import { Form, Button } from "react-bootstrap";

interface Quiz {
    questions: Question[];
    title: string;
    description: string;
    //totalQuestions: number;
}

const INITIAL_QUIZZES: Quiz[] = [
    {
        title: "Math Quiz",
        description: "Short quiz on Calculus",
        questions: []
    },
    {
        title: "Science Quiz",
        description: "Short quiz on Physics",
        questions: []
    },
    {
        title: "CISC275 Quiz",
        description: "Short quiz on State",
        questions: []
    },
    { title: "Gaming Quiz", description: "Short quiz on Gaming", questions: [] }
];

const INITIAL_QUESTIONS: Question[] = [
    {
        id: 0,
        name: "Question1",
        body: "How much wood could a wood chuck chuck if a wood chuck could chuck wood?",
        type: "short_answer_question",
        options: [],
        expected: "None",
        points: 50,
        published: true
    },
    {
        id: 1,
        name: "Question2",
        body: "How much wood could a wood chuck chuck if a wood chuck could chuck wood?",
        type: "multiple_choice_question",
        options: ["a", "b", "c", "d", "None of these"],
        expected: "None of these",
        points: 25,
        published: true
    },
    {
        id: 2,
        name: "Question3",
        body: "How much wood could a wood chuck chuck if a wood chuck could chuck 20 pieces of wood?",
        type: "short_answer_question",
        options: [],
        expected: "20",
        points: 50,
        published: false
    },
    {
        id: 3,
        name: "Question4",
        body: "Is this a brand new question?",
        type: "multiple_choice_question",
        options: ["Yes", "No"],
        expected: "No",
        points: 25,
        published: true
    }
];

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
    const [questions, setQuestions] = useState<Question[]>(INITIAL_QUESTIONS);
    const [visible, setVisible] = useState<boolean[]>(
        new Array(quizzes.length).fill(false)
    );

    //Components
    function appendQuiz(title: string, description: string) {
        // Making a new array of quizzes, with an additional extra one
        const modifiedQuizzes = [
            ...quizzes,
            {
                title: title,
                description: description,
                questions: []
            }
        ];
        // Update the quiz array to be the new version
        setQuizzes(modifiedQuizzes);
    }

    function removeQuizByTitle(quizTitle: string) {
        // Need to map a new version of the array
        const modifiedQuizzes = quizzes.filter(
            (quiz: Quiz): boolean =>
                // If this movie is the target movie
                quiz.title !== quizTitle
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
    //View
    return (
        <div>
            <h3>Quizzer</h3>
            <ol>
                {quizzes.map(
                    (quiz: Quiz, idx: number): JSX.Element => (
                        <li key={quiz.title}>
                            {quiz.title} ({quiz.description}) (Total Questions:
                            {"  "}
                            {quiz.questions.length}):
                            <Button onClick={() => showQuizQuestions(idx)}>
                                View Quiz
                            </Button>
                            {visible[idx] && (
                                <div>
                                    <Questions
                                        setQuestions={setQuestions}
                                        questions={questions}
                                    ></Questions>
                                </div>
                            )}
                            <Button
                                onClick={() => removeQuizByTitle(quiz.title)}
                            >
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
