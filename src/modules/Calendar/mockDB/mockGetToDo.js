
function getToDoForDate(date) {
    if (date.toString() === "10") {
        return [
            {
                content: 'BEH',
                isDone: false,
                isChanging: false
            },
            {
                content: 'DOIT',
                isDone: false,
                isChanging: false
            }
            ]
    } else {
        if (date.toString() === "11"){
            return []
        } else {
            return [{
                content: 'GO',
                isDone: false,
                isChanging: false
            },
            {
                content: 'GG',
                isDone: false,
                isChanging: false
            }
            ]
        }
    }
}

export default getToDoForDate