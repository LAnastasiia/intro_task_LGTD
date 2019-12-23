export const getQueryDate = (date) => {
    if (date instanceof Date) {
        return `${date.getDate()}.${date.getMonth() + 1}.${date.getFullYear()}`;
    }
    return null;
};

export const getLatestID = () => {
    return () => fetch(`http://localhost:3001/tasks}`).then((response) => console.log("kk", response));
};

export const composeNextID = (date, numBefore) => {
    return getQueryDate(date).concat('.', (++numBefore).toString());
};