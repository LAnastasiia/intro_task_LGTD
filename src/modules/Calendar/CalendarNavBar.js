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
        this.props.selectYear(parseInt(event.target.value));
    };

    getYearSpan(year=this.props.selectedYear, span=[-5,5]){
        span.sort();
        return new Array(Math.abs(span[1]-span[0]) + 1).fill(0).map( (_, index) => year + span[0] + index);
    }

    getClassName(index) {
        if (index === this.props.selectedMonth){
            return "month__selected"
        }
        if (index === new Date().getMonth()){
            return "month__this"
        }
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
                            className={this.getClassName(index)}
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
