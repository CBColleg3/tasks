import React from "react";
import { render, screen } from "@testing-library/react";
import { Quizzer } from "./Quizzer";
import userEvent from "@testing-library/user-event";
describe("Questions Tests", () => {
    beforeEach(() => {
        render(<Quizzer />);
        const newQuestions = screen.queryAllByTestId("view-quiz-button");
        newQuestions[0].click();
    });
    test("The Quizzer Questions renders", () => {
        // Up to you to decide what your tests are!
        // Add more tests, more components, more test files!
    });
    test("Question1 is displayed", () => {
        const title = screen.queryByText(/Question1/gi);
        expect(title).toBeInTheDocument();
    });
    test("Question2 is displayed", () => {
        const description = screen.queryAllByText(/Question2/i);
        expect(description[0]).toBeInTheDocument();
    });
    test("Question3 is displayed", () => {
        const title = screen.queryByText(/Question3/gi);
        expect(title).toBeInTheDocument();
    });
    test("Question4 is displayed", () => {
        const description = screen.queryAllByText(/Question4/i);
        expect(description[0]).toBeInTheDocument();
    });
    test("Total Questions is displayed", () => {
        const initialHoliday = screen.queryAllByText(/total Questions/gi);
        expect(initialHoliday[0]).toBeInTheDocument();
    });
    test("There is atleast one View Quiz button", () => {
        expect(
            screen.getAllByRole("button", {
                name: /View Quiz/i
            })
        );
    });
    test("There is atleast one Remove Quiz button", () => {
        expect(
            screen.getAllByRole("button", {
                name: /Remove Quiz/i
            })
        );
    });
    test("You can add to the question array.", () => {
        const addButton = screen.getByTestId("add-question-button");
        addButton.click();
        expect(screen.queryAllByText("New Question")[0]).toBeInTheDocument();
        const quizQuestions = screen.getByTestId("questions-1");
        /*console.log(
            "Children of Quiz Questions: ",
            [...quizQuestions.children].forEach((e) => console.log(e.nodeName))
        );*/
        expect(quizQuestions.children.length).toBe(5);
    });

    test("You can remove the question in array.", () => {
        const removeButton = screen.getAllByTestId("remove-question-button");
        removeButton[0].click();
        const quizQuestions = screen.getByTestId("questions-1");
        expect(quizQuestions.children.length).toBe(3);
    });

    test("Entering the right answer makes it correct.", () => {
        const inputBox = screen.queryAllByRole("textbox");
        //inputBox.forEach((e) => userEvent.type(e, "None"));
        userEvent.type(inputBox[0], "None");
        const checkAnswerButton = screen.getAllByTestId("check-answer-button");
        checkAnswerButton[0].click();
        //checkAnswerButton.forEach((e) => e.click());
        expect(screen.getByText(/✔️/i)).toBeInTheDocument();
    });

    test("Entering the wrong answer makes it incorrect.", () => {
        const inputBox = screen.queryAllByRole("textbox");
        userEvent.type(inputBox[0], "Nah");
        const checkAnswerButton = screen.getAllByTestId("check-answer-button");
        checkAnswerButton[0].click();
        expect(screen.queryByText(/✔️/i)).not.toBeInTheDocument();
    });

    test("There are edit mode checkboxes", () => {
        const switchButton = screen.getAllByRole("checkbox");
        expect(switchButton.length).toBe(4);
    });

    /*
    test("Can switch into Edit Mode", () => {
        const switchButton = screen.getAllByRole("checkbox");
        switchButton[0].click();
        const inputBox = screen.queryAllByRole("textbox");
        const inputAnswer = screen.getByTestId("edit-name-field");
        expect(inputBox.length).toHaveLength(7);
        //expect(screen.getAllByRole("checkbox").length).toHaveLength(5);
    });
*/
    test("Editing the name and student status changes the text", () => {
        const switchButton = screen.getAllByRole("checkbox");
        switchButton[0].click();
        const nameBox = screen.getByTestId("edit-name-field");
        const bodyBox = screen.getByTestId("edit-body-field");
        userEvent.type(nameBox, "Ada Lovelace");
        userEvent.type(bodyBox, "Ada My Love");
        const editButton = screen.getByTestId("edit-question-button");
        editButton.click();
        expect(screen.getByText(/Ada Lovelace/i)).toBeInTheDocument();
        expect(screen.getByText(/Ada My Love/i)).toBeInTheDocument();
    });
});
