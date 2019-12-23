// selectors-functions --> to get specific data from a generic state of Store.

export const getSelectedDate = (state) => {
    return state.dateReducer ? state.dateReducer.date : state.date;
};

export const getSelectedYear = (state) => {
    return state.dateReducer.selectedYear
};

export const getSelectedMonth = (state) => {
    return state.dateReducer.selectedMonth
};