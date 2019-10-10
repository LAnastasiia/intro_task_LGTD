import React from "react";
import '../../styles/ToDoListStyles/ToDoList.css'

import ToDoTask from "./ToDoTask";


class ToDoList extends React.Component {
    constructor(props) {
        super(props);

        console.log("props.tasks: ", this.props.tasks);

        this.state = {
            tasks: this.props.tasks,
            inputValue: '',
            editValue: ''
        };
    }
    static getDerivedStateFromProps(props, state){
        if(props.tasks!== state.tasks){
            return {tasks: props.tasks };
            // this.classMethod();
        }
    }

    componentWillReceiveProps(nextProps){
        if(nextProps.tasks!==this.props.tasks){
            this.setState({tasks: nextProps.tasks });
            // this.classMethod();
        }
    }

    removeTask = (index) => {
        let { tasks } = this.state;
        tasks.splice(index, 1);
        this.setState({ tasks });
    };

    completeTask = (index) => {
        this.setState(oldState => {
            const task = { ...oldState.tasks[index], isDone: !oldState.tasks[index].isDone};
            const tasks = [
                ...oldState.tasks.slice(0, index),
                task,
                ...oldState.tasks.slice(index + 1)
            ];
            return {tasks}
        })
    };

    editTask = (index) => {
        this.setState(oldState => {
            const task = { ...oldState.tasks[index], isChanging: !oldState.tasks[index].isChanging};
            const tasks = [
                ...oldState.tasks.slice(0, index),
                task,
                ...oldState.tasks.slice(index + 1)
            ];
            return {tasks}
        })
    };

    addTask = (event) => {
        event.preventDefault();
        if (this.state.inputValue){
            this.setState(oldState => {
                let tasks = [ ...oldState.tasks];
                tasks.push({content: this.state.inputValue, isDone: false});
                return {tasks: tasks, inputValue: ''}
        });
        }
    };

    onInputChange = (event) => {this.setState({ inputValue: event.target.value });};

    render() {

        return (
            <ul className={"list"}>
                {this.state.tasks.map((item, i) =>
                    <ToDoTask
                        task={item}
                        removeTask={() => this.removeTask(i)}
                        markComplete={() => this.completeTask(i)}
                        editTask={() => this.editTask(i)}
                        addTask={() => this.addTask(i)}
                        key = {i}
                    />)}

                    <form>
                        <input className={"task__new"} value={this.state.inputValue}
                               onChange={this.onInputChange} autoFocus={true}/>
                        <button className={"actionButton"} onClick={this.addTask}> ADD </button>
                    </form>
            </ul>
        );
    }
}

export default ToDoList;
