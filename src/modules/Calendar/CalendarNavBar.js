import React from "react";
import {monthsShort} from "moment";

import '../../styles/CalendarStyles/CalendarNavBar.css'


class CalendarNavBar extends React.Component {
    constructor(props) {
        super(props);

        this.state =  {
            selectedMonthIndex: this.props.selectedMonth,
        };
    }

    ChangeMonthOnClick(index) {
        this.setState({'selectedMonthIndex': index});
        this.props.updateSelectedMonth(index);  // update selection state in Calendar parent
    }

    render() {
        return (
            <section className={"calendar__nav_bar"}>
                <select className={"calendar__nav_bar__year"}>
                    <option value={this.props.selectedYear}> {this.props.selectedYear} </option>
                </select>

                { monthsShort().map( (monthName, index) =>

                    <button key={index}
                            className={index === this.state.selectedMonthIndex ? "month__selected" : ""}
                            onClick={() => this.ChangeMonthOnClick(index)}>
                        {monthName}
                    </button>
                )}

            </section>
        );
    }
}

export default CalendarNavBar;
