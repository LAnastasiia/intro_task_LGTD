import axios from "axios";

export const
    getQueryDate = (date) => {
        if (date instanceof Date) {
            return `${date.getDate()}.${date.getMonth() + 1}.${date.getFullYear()}`;
        } else {
            return null;
        }
    };

export const
    getTasks = async (selectedDate) => {
        if (selectedDate === null) {return null;}
        else {
            let url = `http://localhost:3001/tasks?date=${getQueryDate(selectedDate)}`;
            const responseObject = await fetch(url);
            if (responseObject.status === 200){
                const responseDaysObject = await responseObject.json();
                return {
                    selectedDate: selectedDate,
                    selectedTasks: responseDaysObject
                };

            } else {
                throw new Error(responseObject.status.toString());
            }
        }
    };

export const
    serverAddTask = async (newTask, date, index=0) => {
        let tasks = await getTasks(date);
        let lastID = tasks.selectedTasks[tasks.selectedTasks.length - 1].id;

        axios.post('http://localhost:3001/tasks', {
            "id": lastID+1+index,
            "date": getQueryDate(date),
            "content": newTask.content,
            "isDone": newTask.isDone
        }).then(resp => {
            console.log(resp.data);
        }).catch(error => {
            console.log(error);
        });
    };

export const
    serverUpdateTask = async (updatedTask, date) => {
        let url = `http://localhost:3001/tasks/${updatedTask.id}/`;
        axios.put(url, {
            "id": updatedTask.id,
            "date": getQueryDate(date),
            "content": updatedTask.content,
            "isDone": updatedTask.isDone
        }).then(resp => {
            console.log(resp.data);
        }).catch(error => {
            console.log(error);
        });
    };


export const
    serverDeleteTask = async (taskToDelete, date) => {
        let url = `http://localhost:3001/tasks/${taskToDelete.id}/`;
        axios.delete(url, {
            "id": getQueryDate(date) + taskToDelete.id,
            "date": getQueryDate(date),
            "content": taskToDelete.content,
            "isDone": taskToDelete.isDone
        }).then(resp => {
            console.log(resp.data);
        }).catch(error => {
            console.log(error);
        });
    };