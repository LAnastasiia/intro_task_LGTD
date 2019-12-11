import React from "react";

import '../../styles/CalendarStyles/Calendar.css'
import '../../styles/CalendarStyles/CalendarMonth.css'

import CalendarNavBar from "../Calendar/CalendarNavBar"
import CalendarMonth from "../Calendar/CalendarMonth"


class Calendar extends React.Component {

    render() {
        return (
                <div className="calendar">
                    <CalendarNavBar selectedMonth={this.props.selectedDate.getMonth()}
                                    selectedYear={this.props.selectedDate.getFullYear()}
                                    updateSelectedMonth={(m_index) => this.props.selectMonth(m_index)}/>

                    <CalendarMonth selectedDate = { this.props.selectedDate }
                                   updateSelectedDate={(d_index) => this.props.selectDate(d_index)}/>
                </div>
        );
    }
}

export default Calendar;

