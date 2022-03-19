import React from "react";
import { prettyDOM, render, screen } from "@testing-library/react";
import { Quizzer } from "./Quizzer";

describe("Quizzer Tests", () => {
    beforeEach(() => {
        render(<Quizzer />);
    });
    test("The Quizzer renders", () => {
        // Up to you to decide what your tests are!
        // Add more tests, more components, more test files!
    });
    test("Math Quiz is displayed", () => {
        const title = screen.queryByText(/MaTh qUiZ/gi);
        expect(title).toBeInTheDocument();
    });
    test("Quizzer description is displayed", () => {
        const description = screen.queryAllByText(/Short Quiz on/i);
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
});
