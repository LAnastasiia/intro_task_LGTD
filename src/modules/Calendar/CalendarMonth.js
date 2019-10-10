import React from "react";

import '../../styles/CalendarStyles/CalendarMonth.css'

import moment, {weekdaysShort} from "moment";
import CalendarDay from "./CalendarDay";


class calendarMonth extends React.Component {
    generate(firstDay){
        let month = [];

        let firstWeek = Array(7).fill('').map((v,i)=>{
            return i < firstDay.get("weekday") ? 0 : Math.floor(i-firstDay.get("weekday") + 1).toString();
        });
        month.push(firstWeek);

        let nextDay = 7 - firstDay.get("weekday") + 1;
        let numOfWeeks = Math.ceil((moment(firstDay).daysInMonth() - nextDay) / 7);

        for (let w=0; w < numOfWeeks; w++){
            month.push(Array(7).fill().map((v, i) => {
                let day = (w * 7) + nextDay + i;
                return day < moment(firstDay).daysInMonth() ? day.toString() : "0";
            }))
        }
        return month;
    }

    selectDateInCalendar = (dataIndex) => {
        this.props.updateSelectedDate(dataIndex, this.props.firstDay.get("month"));
    };

    renderWeek(arr) {
        return (
            <div className={"calendar__month__week"} key={arr[0]}>

                { arr.map( (value, index) => <CalendarDay date={value}
                                                          key={index}
                                                          isToday={this.props.todayDate && this.props.todayDate.toString() === value}
                                                          isSelected={this.props.selectedDate && this.props.selectedDate.getDate().toString() === value}
                                                          updateSelectedDateInCalendar={ (dateIndex) => this.selectDateInCalendar(dateIndex) } /> )}
            </div>
        );
    }

    render() {
        const month = this.generate(this.props.firstDay);

        return (
            <section className={"calendar__month"}>
                <div className={"calendar__month__week week__info"}>
                    { weekdaysShort().map( (dayName, index) =>
                        <div key={index} className={"calendar__month__week__day day__info"}>
                            {dayName}
                        </div>
                    )}
                </div>

                <div>
                    { month.map( (week) => this.renderWeek(week) )}
                </div>
            </section>
        );
    }
}

export default calendarMonth;
