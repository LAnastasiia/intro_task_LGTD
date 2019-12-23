import * as types from './_actionsTypes'
import {composeNextID, getQueryDate} from "../helperFunctions/functionsForJsonServer";


const initialState = {
    tasks: [],
    newTasksIndices: [],
    modifiedTasksIndices: [],
    deletedTasksIDs: [],
    completedTasksIndices: [],
    isFetching: false,
    status: ''
};


export const tasksReducer = (state=initialState, action) => {
    const taskIndex = action.taskID && state.tasks.findIndex(t => t.id === action.taskID);

    switch (action.type) {
        case types.ADD_TASK:
            const newTask = {
                ...action.newTask,
                date: getQueryDate(action.newTask.date),
                id: composeNextID(action.newTask.date, state.tasks.length)};
            return {
                ...state,
                tasks: [...state.tasks, newTask],
                newTasksIndices:[...state.newTasksIndices, state.tasks.length+1]};

        case types.DELETE_TASK:
            return {
                ...state,
                tasks: [...state.tasks.slice(0, taskIndex), ...state.tasks.slice(taskIndex+1)],
                deletedTasksIDs: [...state.deletedTasksIDs, action.taskID]};

        case types.MODIFY_TASK__CONTENT:
            return {
                ...state,
                tasks: state.tasks.map(todo => todo.id === action.taskID ? { ...todo, content: action.newContent } : todo),
                modifiedTasksIndices: state.modifiedTasksIndices.includes(taskIndex) ? [...state.modifiedTasksIndices] : [...state.modifiedTasksIndices, taskIndex]};

        case types.MODIFY_TASK__COMPLETE:
            const existingIndex = state.completedTasksIndices.findIndex(i => i ===taskIndex);
            return {
                ...state,
                tasks: state.tasks.map(todo => todo.id === action.taskID ? { ...todo, isComplete: !todo.isComplete } : todo),
                completedTasksIndices: (existingIndex === -1) ?
                    [...state.completedTasksIndices, taskIndex]
                    :
                    [...state.completedTasksIndices.slice(0, existingIndex), ...state.completedTasksIndices.slice(existingIndex+1)]};

        case types.FETCH_NEW_TASKS:
            return {...state, date: action.newDate, tasks: [], isFetching: true};

        case types.RECEIVE_NEW_TASKS:
            return {...state, date: action.newDate, tasks: action.tasks || [], isFetching: false};

        case types.COMMIT_LIST_CHANGES:
            return {...state, isFetching: true};

        case types.COMMITTED_SUCCESSFULLY:
            if (action.status) {
                // Clear unsaved changes.
                return {...state, isFetching: false, status: action.status,
                    newTasksIndices: [],
                    modifiedTasksIndices: [],
                    deletedTasksIDs: [],
                    completedTasksIndices: [],
                };
            } else return {...state, isFetching: false, status: action.status};


        default:
            return state
    }
};