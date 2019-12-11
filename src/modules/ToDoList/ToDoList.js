import React from "react";
import '../../styles/ToDoListStyles/ToDoList.css'

import ToDoTask from "./ToDoTask";
import {serverAddTask, serverUpdateTask, serverDeleteTask} from "../serverCommunication"


class ToDoList extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            tasks: props.tasks,
            newTasks: [],
            editedTasks: [],
            tasksToDelete: [],
            inputValue: '',
            editBool: false,
            hasChanges: false
        };
    }

    componentDidUpdate(prevProps) {
        if (this.props.tasks !== prevProps.tasks) {
            this.setState({
                tasks: this.props.tasks
            });
        }
    }


    editedStateON = () => {
        this.setState({"hasChanges": true})
    };


    editedStateOFF = () => {
        this.setState({"hasChanges": false})
    };


    removeTask = (index) => () => {

        this.setState(oldState => {
            let indexInNewTasks = this.state.newTasks.find( (element) => {return element.content === this.state.tasks[index].content});
            let indexInEditedTasks = this.state.editedTasks.find( (element) => {return element.content === this.state.tasks[index].content});

            return {
                tasks: [...oldState.tasks.slice(0, index), ...oldState.tasks.slice(index + 1)],
                newTasks: (indexInNewTasks) ? [...oldState.newTasks.slice(0, indexInNewTasks), ...oldState.newTasks.slice(indexInNewTasks+1)] : oldState.newTasks,
                editedTasks: (indexInEditedTasks) ? [...oldState.editedTasks.slice(0, indexInEditedTasks), ...oldState.editedTasks.slice(indexInEditedTasks+1)] : oldState.editedTasks,
                tasksToDelete: (! indexInNewTasks && ! indexInEditedTasks ) ? [...oldState.tasksToDelete].concat({...oldState.tasks[index]}) : oldState.tasksToDelete
            };
        });
        this.editedStateON();
    };

    completeTask = (index) => () => {
        this.setState(oldState => {
            const task = { ...oldState.tasks[index], isDone: !oldState.tasks[index].isDone};
            const tasks = [
                ...oldState.tasks.slice(0, index),
                task,
                ...oldState.tasks.slice(index + 1)
            ];
            return {tasks}
        });
        this.editedStateON();
    };

    updateTask = (index) => (event) => {
        event.preventDefault();
        this.state.editedTasks.push(this.state.tasks[index]);

        this.setState(oldState => {
            const task = { ...oldState.tasks[index], isChanging: !oldState.tasks[index].isChanging};
            const tasks = [
                ...oldState.tasks.slice(0, index),
                task,
                ...oldState.tasks.slice(index + 1)
            ];
            return {tasks}
        });
        // serverUpdateTask(this.state.tasks[index], this.props.date, id);
        this.editedStateON();
    };

    editTask = (index) => () => {
        this.setState(oldState => {
            const task = { ...oldState.tasks[index], isChanging: !oldState.tasks[index].isChanging};
            const tasks = [
                ...oldState.tasks.slice(0, index),
                task,
                ...oldState.tasks.slice(index + 1)
            ];
            return {tasks}
        });
    };

    addTask = (event) => {
        event.preventDefault();
        if (this.state.inputValue){
            this.setState(oldState => {
                return {
                    tasks: this.state.tasks.concat([{content: this.state.inputValue, isDone: false}]),
                    newTasks: this.state.newTasks.concat([{content: this.state.inputValue, isDone: false}]),
                    inputValue: ''
                }
            });
            this.editedStateON();
        }
    };

    onSave = () => {
        this.state.newTasks.forEach((t, index) => serverAddTask(t, this.props.date, index));
        this.state.editedTasks.forEach((t) => serverUpdateTask(t, this.props.date));
        this.state.tasksToDelete.forEach((t) => serverDeleteTask(t, this.props.date));

        this.editedStateOFF();
    };

    onInputChange = (event) => {this.setState({ inputValue: event.target.value });};

    render() {
        return (
            <ul className={"list"}>
                {this.state.tasks && this.state.tasks.length ?
                    this.state.tasks.map((item, i) =>
                        <ToDoTask
                            task={item}
                            removeTask={this.removeTask(i)}
                            markComplete={this.completeTask(i)}
                            editTask={this.editTask(i)}
                            updateTask={this.updateTask(i)}
                            key = {this.state.tasks[i]+i}
                            id={item.id}
                        />)
                    :
                    null
                }
                <form>
                    <input className={"task__new"} value={this.state.inputValue}
                           onChange={this.onInputChange} autoFocus={true}/>
                    <button className={"actionButton"} onClick={this.addTask}> ADD </button>
                </form>

                { this.state.hasChanges ?
                    <button className={"inactive"} onClick={this.onSave}>
                        SAVE
                    </button>
                    :
                    null
                }
            </ul>
        );
    }
}

export default ToDoList;
