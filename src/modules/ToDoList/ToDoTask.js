import React from "react";
import '../../styles/ToDoListStyles/ToDoList.css'
import '../../styles/ToDoListStyles/ToDoTask.css'
import {completeTask, deleteTask, modifyTaskContent} from "./_actionsDefinitions";
import {connect} from "react-redux";
import {isTaskComplete, getTaskByID} from './_selectors'


class ToDoTask extends React.Component {
    constructor(props) {
        super(props);
        this.state = {modifying: false}
    }

    storeChangingInput = (event) => {
        this.props.updateTask(this.props.id, event.target.value);
    };

    modifyingTask = (on=true) => {
        this.setState({modifying: on});
    };

    updateTaskOnSubmit = (event) => {
        event.preventDefault();
        this.modifyingTask(false)
    };

    completeTaskOnDoneButton = () => {
        this.props.completeTask(this.props.id, this.props.content)
    };

    deleteTaskOnDelButton = () => {
        this.props.deleteTask(this.props.id);
    };

    render() {
        const todoStyle = this.props._isComplete ? "task inactive" : "task";

        if (this.state.modifying) {
            return (
                <li>
                    <form onSubmit={this.updateTaskOnSubmit}>
                        <input defaultValue={this.props.content} onChange={this.storeChangingInput}
                               onSubmit={this.updateTaskOnSubmit} autoFocus={true}
                        />
                        <button onClick={this.props.updateTaskOnSubmit} className="actionButton__light">OK</button>
                    </form>

                </li>
            )
        }

        return (
            <li className={todoStyle}>
                <p> {this.props.content} </p>
                <div className={"task_action_bar"}>
                    <button onClick={this.completeTaskOnDoneButton}>DONE</button>
                    <button onClick={this.modifyingTask}>EDIT</button>
                    <button onClick={this.deleteTaskOnDelButton}>DEL</button>
                </div>
            </li>
        );
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        deleteTask: (id) => dispatch(deleteTask(id)),
        updateTask: (id, content) => dispatch(modifyTaskContent(id, content)),
        completeTask: (id, content) => dispatch(completeTask(id, content))
    }
};

const mapStateToProps = (state, ownProps) => {
    return {
        _isComplete: isTaskComplete(state, ownProps.id),
        content: getTaskByID(state, ownProps.id).content,
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ToDoTask);