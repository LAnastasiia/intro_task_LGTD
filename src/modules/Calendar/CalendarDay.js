import React from "react";

import '../../styles/CalendarStyles/CalendarDay.css'



class CalendarDay extends React.Component {

    get style() {
        let dayClassName = "calendar__month__week__day";

        // Render days from other months as grey blocks.
        if (this.props.date > 0) {
            dayClassName += " day__active";
        } else {
            dayClassName  += " day__empty";
        }

        if (this.props.isSelected) {
            dayClassName += " selected"
        }

        if (this.props.isToday){
            dayClassName += " today";
        }

        return dayClassName
    }

    OpenToDoOnClick = () => {
        this.props.updateSelectedDateInCalendar(this.props.date);
    };

    render() {

        return (
            <div className={ this.style }
                 onClick={this.OpenToDoOnClick}>
                <p>{this.props.date}</p>
            </div>
        )
    }
}

export default CalendarDay;
