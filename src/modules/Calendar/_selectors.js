// selectors-functions --> to get specific data from a generic state of Store.

export const getSelectedDate = (state) => {
    return state.dateReducer ? state.dateReducer.date : state.date;
};

export const getSelectedYear = (state) => {
    return (getSelectedDate(state) && getSelectedDate(state).getFullYear()) || new Date().getFullYear()
};

export const getSelectedMonth = (state) => {
    return (getSelectedDate(state) && getSelectedDate(state).getMonth()) || new Date().getMonth()
};