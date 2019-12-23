import * as types from './_actionsTypes'
import {getSelectedMonth, getSelectedYear} from "./_selectors";

const initialState = {date: null};


export const dateReducer = (state=initialState, action) => {
    switch (action.type) {
        case types.SELECT_MONTH:
            const date = new Date(state.date.getFullYear(), action.monthNumber, 1);
            return {...state, date};
        case types.SELECT_YEAR:
            return {...state, date: new Date(action.year, state.date.getMonth(), 1)};
        case types.SELECT_DAY:
            return {...state, date: new Date(getSelectedYear(state), getSelectedMonth(state), action.dayNumber)};

        default:
            return state
    }
};
