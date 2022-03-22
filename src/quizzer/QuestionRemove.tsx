import React from "react";
import { Question } from "../interfaces/question";
//import { Answer } from "../interfaces/answer";
import { Button } from "react-bootstrap";

interface QuestionInterface {
    // The type is "a function that consumes a boolean and returns nothing"
    setQuestions: (newQuestion: Question[]) => void;
    questions: Question[];
    index: number;
    setQuizQuestions: (newQuestions: Question[]) => void;
}

export function QuestionRemove({
    setQuestions,
    questions,
    index,
    setQuizQuestions
}: QuestionInterface): JSX.Element {
    //Control

    function removeQuestionById(questionID: number) {
        // Need to map a new version of the array
        const modifiedQuizzes = [...questions].filter(
            (question: Question): boolean =>
                // If this movie is the target movie
                question.id !== questionID
        );
        // Update the movies array to be the new version
        setQuestions(modifiedQuizzes);
        setQuizQuestions(modifiedQuizzes);
    }

    function moveQuestionUpByIndex(questionIndex: number) {
        const modifiedQuizzes = [...questions];

        if (questionIndex > 0) {
            const tmpQuestion = modifiedQuizzes[questionIndex];
            modifiedQuizzes[questionIndex] = modifiedQuizzes[questionIndex - 1];
            modifiedQuizzes[questionIndex - 1] = tmpQuestion;
        }
        //questionIndex = questionIndex - 1;
        setQuestions(modifiedQuizzes);
        setQuizQuestions(modifiedQuizzes);
    }

    function moveQuestionDownByIndex(questionIndex: number) {
        const modifiedQuizzes = [...questions];

        if (questionIndex < modifiedQuizzes.length - 1) {
            const tmpQuestion = modifiedQuizzes[questionIndex];
            modifiedQuizzes[questionIndex] = modifiedQuizzes[questionIndex + 1];
            modifiedQuizzes[questionIndex + 1] = tmpQuestion;
        }
        //questionIndex = questionIndex + 1;
        setQuestions(modifiedQuizzes);
        setQuizQuestions(modifiedQuizzes);
    }

    //View
    return (
        <div>
            <Button
                data-testid="question-moveup-button"
                onClick={() => moveQuestionUpByIndex(index)}
            >
                Move Up
            </Button>
            <Button
                data-testid="question-movedown-button"
                onClick={() => moveQuestionDownByIndex(index)}
            >
                Move Down
            </Button>
            <Button
                data-testid="remove-question-button"
                onClick={() => removeQuestionById(questions[index].id)}
            >
                Remove Question
            </Button>
        </div>
    );
}
