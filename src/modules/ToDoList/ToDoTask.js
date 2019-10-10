import React from "react";
import '../../styles/ToDoListStyles/ToDoList.css'


class ToDoTask extends React.Component {

    onChangeEdit = (event) => { this.props.task.content = event.target.value; };

    render() {

        let actionButtonStyle = this.props.task.isDone ? "actionButton__inactive" : "actionButton";
        let taskStyle = this.props.task.isDone ? "task task__inactive" : "task";
        taskStyle = this.props.task.isChanging ? "task task__changing" : taskStyle;

        if (this.props.task.isChanging){
            return <li className={taskStyle}>
                <form>
                    <input defaultValue={this.props.task.content} onSubmit={this.props.editTask } onChange={this.onChangeEdit} autoFocus={true}/>
                    <button onClick={this.props.editTask } className="actionButton__light">OK</button>
                </form>
            </li>
        }

        return (
            <li className={taskStyle}>
                <p onClick={this.props.editTask}>{this.props.task.content}</p>
                <div className={"task_action_bar"}>
                    <button onClick={this.props.markComplete} className={actionButtonStyle}>DONE</button>
                    <button onClick={this.props.editTask} className={actionButtonStyle}>EDIT</button>
                    <button onClick={this.props.removeTask}>DEL</button>
                </div>
            </li>
        );
    }
}

export default ToDoTask;
