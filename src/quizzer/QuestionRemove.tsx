import React from "react";
import { Question } from "../interfaces/question";
//import { Answer } from "../interfaces/answer";
import { Button } from "react-bootstrap";

interface QuestionInterface {
    // The type is "a function that consumes a boolean and returns nothing"
    setQuestions: (newQuestion: Question[]) => void;
    questions: Question[];
    index: number;
}

export function QuestionRemove({
    setQuestions,
    questions,
    index
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
    }

    //View
    return (
        <div>
            <Button
                data-testid="remove-question-button"
                onClick={() => removeQuestionById(questions[index].id)}
            >
                Remove Question
            </Button>
        </div>
    );
}
