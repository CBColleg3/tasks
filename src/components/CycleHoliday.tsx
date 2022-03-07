import React, { useState } from "react";
import { Button } from "react-bootstrap";

export type HolidayType =
    | "Christmas"
    | "Thanksgiving"
    | "Groundhog Day"
    | "MLK Day"
    | "Veteran's Day";

//maps old state to new state
const Next_Holiday_DATE: Record<HolidayType, HolidayType> = {
    "MLK Day": "Groundhog Day",
    "Groundhog Day": "Veteran's Day",
    "Veteran's Day": "Thanksgiving",
    Thanksgiving: "Christmas",
    Christmas: "MLK Day"
};

const Next_Holiday_ALPHA: Record<HolidayType, HolidayType> = {
    Christmas: "Groundhog Day",
    "Groundhog Day": "MLK Day",
    "MLK Day": "Thanksgiving",
    Thanksgiving: "Veteran's Day",
    "Veteran's Day": "Christmas"
};

export function CycleHoliday(): JSX.Element {
    const [holiday, setHoliday] = useState<HolidayType>("Christmas");

    function changeHolidayAlpha(): void {
        const newHoliday = Next_Holiday_ALPHA[holiday];
        setHoliday(newHoliday);
    }

    function changeHolidayDate(): void {
        const newHoliday = Next_Holiday_DATE[holiday];
        setHoliday(newHoliday);
    }

    function setHolidayEmoji(holidayType: HolidayType): string {
        let emojiString = "";
        if (holidayType === "Christmas") {
            emojiString = "🎅";
        } else if (holidayType === "Thanksgiving") {
            emojiString = "🦃";
        } else if (holidayType === "MLK Day") {
            emojiString = "🤚🏿";
        } else if (holidayType === "Groundhog Day") {
            emojiString = "🐗";
        } else {
            emojiString = "🪖";
        }
        return emojiString;
    }

    return (
        <div>
            <div>
                <span> Holiday: {setHolidayEmoji(holiday)} </span>
            </div>
            <Button onClick={() => changeHolidayAlpha()}>
                <div>Advance by Alphabet</div>
            </Button>
            <Button onClick={() => changeHolidayDate()}>Advance by Year</Button>
        </div>
    );
}
