import * as types from './_actionsTypes'


export const selectMonth = (monthIndex) => ({
    type: types.SELECT_MONTH,
    monthNumber: monthIndex
});


export const selectYear = (newYearNumber) => ({
    type: types.SELECT_YEAR,
    year: newYearNumber
});


export const selectDate = (newDate) => ({
    type: types.SELECT_DATE,
    newDate
});

export const selectDay = (dayNumber) => ({
    type: types.SELECT_DAY,
    dayNumber
});