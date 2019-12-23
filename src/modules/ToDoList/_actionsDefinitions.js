import * as types from './_actionsTypes'
import {getQueryDate} from "../helperFunctions/functionsForJsonServer";
import axios from "axios";

// ~~~~ UI-initiated actions ~~~~

export const addTask = (content, date) => ({
    type: types.ADD_TASK,
    newTask: {content: content, isComplete: false, date: date},
});

export const deleteTask = (taskID) => ({
    type: types.DELETE_TASK,
    taskID: taskID,
});

export const modifyTaskContent = (taskID, content) => ({
    type: types.MODIFY_TASK__CONTENT,
    taskID: taskID,
    newContent: content
});

export const completeTask = (taskID) => ({
    type: types.MODIFY_TASK__COMPLETE,
    taskID: taskID,
});

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~


function requestNewTasks(newDate) {
    return {
        type: types.FETCH_NEW_TASKS,
        date: newDate
    }
}

function receiveNewTasks(responseList) {
    return {
        type: types.RECEIVE_NEW_TASKS,
        tasks: responseList || [],
        receivedAt: Date.now()
    }
}


export const getTasks = (prevDate, newDateNumber) => {
    const newDate = new Date(prevDate.getFullYear(), prevDate.getMonth(), newDateNumber);
    const newDateQuery = getQueryDate(newDate);

    return function(dispatch) {
        dispatch(requestNewTasks(newDate));
        return fetch(`http://localhost:3001/tasks?date=${(newDateQuery)}`)
            .then(response => response.json(), error => console.log('An error occurred.', error))
            .then(json => dispatch(receiveNewTasks(json)))

    }
};


function sendNewTasks() {
    return {
        type: types.COMMIT_LIST_CHANGES,
    }
}

function savedNewTasks(responseStatus) {
    return {
        type: types.COMMITTED_SUCCESSFULLY,
        status: responseStatus
    }
}


export const postTasksToServer = (tasks) => {
    return function(dispatch) {
        dispatch(sendNewTasks());
        return tasks.forEach(newTask => {
            axios.post('http://localhost:3001/tasks',
                {
                    'content': newTask.content,
                    'id': newTask.id,
                    'isComplete': newTask.isComplete,
                    'date': newTask.date
                })
                .then(response => response.status, error => console.log(error))
                .then(status => dispatch(savedNewTasks(status)));
        });
    }
};


export const putTasksToServer = (tasks) => {
    return function(dispatch) {
        dispatch(sendNewTasks());
        return tasks.forEach(updatedTask => {
            axios.put(`http://localhost:3001/tasks/${updatedTask.id}/`,
                {
                    'content': updatedTask.content,
                    'id': updatedTask.id,
                    'isComplete': updatedTask.isComplete,
                    'date': updatedTask.date
                })
                .then(response => response.status, error => console.log(error))
                .then(status => dispatch(savedNewTasks(status)));
        });
    }
};

export const deleteTasksFromServer = (tasks) => {
    return function (dispatch) {
        dispatch(sendNewTasks());
        return tasks.forEach(taskToDelete => {
            axios.delete(`http://localhost:3001/tasks/${taskToDelete}/`)
                .then(response => response.status, error => console.log(error))
                .then(status => dispatch(savedNewTasks(status)));
        })

    }
};