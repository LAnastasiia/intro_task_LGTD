import React from "react";

import '../../styles/CalendarStyles/Calendar.css'
import '../../styles/CalendarStyles/CalendarMonth.css'

import CalendarNavBar from "./CalendarNavBar"
import CalendarMonth from "../Calendar/CalendarMonth"


class Calendar extends React.Component {

    render() {
        return (
                <div className="calendar">
                    <CalendarNavBar/>

                    <CalendarMonth/>
                </div>
        );
    }
}

export default Calendar;

