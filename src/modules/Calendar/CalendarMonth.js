import React from "react";

import '../../styles/CalendarStyles/CalendarMonth.css'

import moment, {weekdaysShort} from "moment";
import CalendarDay from "./CalendarDay";


class calendarMonth extends React.Component {

    generateWeeksArray(selectedDate){
        let firstDay = new Date(selectedDate.getFullYear(), selectedDate.getMonth(), 1);
        let month = [];
        let firstWeek = Array(7).fill('').map((v,i)=>{
            return i < firstDay.getDay() ? 0 : Math.floor(i-firstDay.getDay() + 1).toString();
        });
        month.push(firstWeek);
        let nextDay = 7 - firstDay.getDay() + 1;
        let numOfWeeks = Math.ceil((moment(firstDay).daysInMonth() - nextDay) / 7);

        for (let w=0; w < numOfWeeks; w++){
            month.push(Array(7).fill().map((v, i) => {
                let day = (w * 7) + nextDay + i;
                return day < moment(firstDay).daysInMonth() ? day.toString() : "0";
            }))
        }
        return month;
    }

    isDateToday(dateString) {
        return new Date().getDate().toString() === dateString;
    }

    isDateSelected(dateString) {
        return this.props.selectedDate.getDate().toString() === dateString;
    }

    renderWeek(arr, weekIndex) {
        return (
            <div key={arr[1]}>
                <div className={"calendar__month__week"} key={weekIndex}>

                    { arr.map( (value, index) => <CalendarDay date={value}
                                                              key={index}
                                                              isToday={this.isDateToday(value)}
                                                              isSelected={this.isDateSelected(value)}
                                                              updateSelectedDateInCalendar={(d_index) => this.props.updateSelectedDate(d_index)} />)}
                </div>
            </div>
        );
    }


    render() {

        const month = this.generateWeeksArray(this.props.selectedDate);
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
                    {month.map( (week, weekIndex) => { return this.renderWeek(week, weekIndex); } )}
                </div>
            </section>
        );
    }
}

export default calendarMonth;
