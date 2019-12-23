import React from "react";

import '../../styles/CalendarStyles/CalendarDay.css'
import {selectDay} from "./_actionsDefinitions";
import {getTasks} from "../ToDoList/_actionsDefinitions"
import {connect} from "react-redux";


class CalendarDay extends React.Component {

    get className() {
        let className = "calendar__month__week__day";
        if (parseInt(this.props.date) === 0) {
            return className.concat(" day__empty");
        }
        if (this.props.isSelected){
            return className.concat(" selected")
        }
        if (this.props.isToday){
            return className.concat(" today");
        }
        return className.concat(" day__active");
    }

    selectDayOnClick = () => {
        this.props.selectDay(this.props.date);
    };

    render() {
        return (
            <div className={this.className} onClick={this.selectDayOnClick}>
                <p>{this.props.date}</p>
            </div>
        )
    }
}


const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        selectDay: (dayNumber) => {
            dispatch(selectDay(dayNumber));
            dispatch(getTasks(ownProps.selectedDate, dayNumber));
        }

    }
};

export default connect(null, mapDispatchToProps)(CalendarDay);
