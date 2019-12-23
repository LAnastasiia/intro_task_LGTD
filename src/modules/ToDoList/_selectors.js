
export const getStoreTasks = (state) => {
    return state.tasksReducer.tasks;
};


export const isTaskComplete = (state, id) => {
    return state.tasksReducer.tasks.find(t => t.id === id).isComplete;
};


export const getTaskByID = (state, id) => {
    return state.tasksReducer.tasks.find(t => t.id === id);
};


export const listHasUnsavedChanges = (state) => {
    return [state.tasksReducer.newTasksIndices, state.tasksReducer.modifiedTasksIndices, state.tasksReducer.deletedTasksIDs, state.tasksReducer.completedTasksIndices]
        .map(x => x && x.length)
        .reduce((acc, curr) => acc + curr) > 0;
};

export const getNewTasks = (state) => {
    return state.tasksReducer.newTasksIndices.map(index => state.tasksReducer.tasks[index-1]);
};

export const getModifiedTasks = (state) => {
    return state.tasksReducer.modifiedTasksIndices.map(index => state.tasksReducer.tasks[index]).concat(state.tasksReducer.completedTasksIndices.map(index => state.tasksReducer.tasks[index]));
};

export const getDeletedTasks = (state) => {
    return state.tasksReducer.deletedTasksIDs;
};

export const isFetching = (state) => {
    return state.tasksReducer.isFetching && !state.tasksReducer.tasks.length
};