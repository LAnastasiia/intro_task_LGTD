import React from "react";
import moment from "moment";

import '../../styles/CalendarStyles/Calendar.css'
import '../../styles/CalendarStyles/CalendarMonth.css'

import CalendarNavBar from "../Calendar/CalendarNavBar"
import CalendarMonth from "../Calendar/CalendarMonth"
import getToDoForDate from '../Calendar/mockDB/mockGetToDo'
import ToDoList from "../ToDoList/ToDoList";


class Calendar extends React.Component {
    constructor(props) {
        super(props);

        this.todayDate = new Date();

        this.state =  {
            selectedDate: this.todayDate,
            selectedMonth: this.todayDate.getMonth(),
            selectedYear: this.todayDate.getFullYear(),
            selectedToDo: getToDoForDate(this.todayDate.getDate())
    };
    }

    selectMonth = (index) => {
        this.setState({
            selectedMonth: index,
        });
    };

    selectDate = (indexDate, indexMonth) => {
        this.setState({
            selectedDate: new Date(this.state.selectedYear, indexMonth, indexDate),
            selectedMonth: indexMonth,
            selectedToDo: getToDoForDate(indexDate)
        });
    };

    render() {
        const firstDay = moment(this.state.selectedDate).startOf('month');

        return (

                <div className={"calendar"}>

                    <CalendarNavBar selectedMonth={this.state.selectedMonth}
                                    selectedYear={this.state.selectedYear}
                                    updateSelectedMonth={(index) => { this.selectMonth(index)}}/>

                    <CalendarMonth firstDay={firstDay}
                                   todayDate={ this.state.selectedMonth === this.todayDate.getMonth() ? this.todayDate.getDate() : null }
                                   selectedDate = { this.state.selectedMonth === this.state.selectedDate.getMonth() ? this.state.selectedDate : null }
                                   updateSelectedDate={ (dateIndex, monthIndex) => this.selectDate(dateIndex, monthIndex) }/>

                    <ToDoList tasks={this.state.selectedToDo}/>
                </div>


        );
    }
}

export default Calendar;
