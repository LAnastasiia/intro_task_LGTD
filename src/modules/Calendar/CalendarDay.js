import React from "react";

import '../../styles/CalendarStyles/CalendarDay.css'


class CalendarDay extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            deSelected: false
        }
    }

    get style() {
        let dayClassName = "calendar__month__week__day";

        if (this.props.date > 0) {
            dayClassName += " day__active";
        } else {
            dayClassName  += " day__empty";
        }

        if (this.props.isSelected && ! this.state.deSelected) {
            dayClassName += " selected"
        }

        if (this.props.isToday){
            dayClassName += " today";
        }

        return dayClassName
    }

    OpenToDoOnClick = () => {

        if (this.props.isSelected){
            this.setState({deSelected: ! this.state.deSelected});
        } else {
            this.props.updateSelectedDateInCalendar(this.props.date);
            this.setState({deSelected: false});
        }
    };

    render() {
        return (
            <div className={this.style}
                 onClick={this.OpenToDoOnClick}>
                <p>{this.props.date}</p>
            </div>
        )
    }
}

export default CalendarDay;
