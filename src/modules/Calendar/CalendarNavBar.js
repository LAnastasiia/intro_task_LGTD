import React from "react";
import {connect} from "react-redux";
import {monthsShort} from "moment";

import '../../styles/CalendarStyles/CalendarNavBar.css'
import {getSelectedMonth, getSelectedYear} from './_selectors'
import {selectMonth, selectYear} from './_actionsDefinitions';


class CalendarNavBar extends React.Component {

    selectMonthOnClick(index) {
        this.props.selectMonth(index);
    }

    selectYearOnClick = (event) => {
        this.props.selectYear(event.target.value);
    };

    getYearSpan(year=this.props.selectedYear, span=[-5,5]){
        span.sort();
        return new Array(span[1]-span[0]+1).fill(null).map( (_, index) => year + span[0] + index);
    }

    render() {
        return (
            <section className={"calendar__nav_bar"}>
                <select className={"calendar__nav_bar__year"} defaultValue={this.props.selectedYear} onChange={this.selectYearOnClick}>
                    {this.getYearSpan().map( (year, index) =>
                        <option value={year} key={index}> {year} </option>
                    )}
                </select>

                { monthsShort().map( (monthName, index) =>
                    <button key={index}
                            className={index === this.props.selectedMonth ? "month__selected" : ""}
                            onClick={() => this.selectMonthOnClick(index)}> {monthName} </button>
                )}
            </section>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        selectedYear: getSelectedYear(state),
        selectedMonth: getSelectedMonth(state)};
};

const mapDispatchToProps = (dispatch) => {
    return {
        selectMonth: (monthIndex) => dispatch(selectMonth(monthIndex)),
        selectYear: (year) => dispatch(selectYear(year))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(CalendarNavBar);
