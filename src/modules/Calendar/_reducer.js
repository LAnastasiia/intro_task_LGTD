import * as types from './_actionsTypes'

const initialState = {
    date: null,
    selectedMonth: new Date().getMonth(),
    selectedYear: new Date().getFullYear()
};


export const dateReducer = (state=initialState, action) => {
    switch (action.type) {
        case types.SELECT_MONTH:
            // const date = new Date(getSelectedYear(state), action.monthNumber, 1);
            return {...state, selectedMonth: action.monthNumber, date: null};
        case types.SELECT_YEAR:
            return {...state, selectedYear: action.year, date: null};
        case types.SELECT_DAY:
            return {...state, date: new Date(state.selectedYear, state.selectedMonth, action.dayNumber)};

        default:
            return state
    }
};
