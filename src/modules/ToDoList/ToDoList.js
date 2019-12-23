import React from "react";

import '../../styles/ToDoListStyles/ToDoList.css'
import ToDoTask from "./ToDoTask";

import {connect} from 'react-redux'
import {getDeletedTasks, getModifiedTasks, getNewTasks, getStoreTasks, listHasUnsavedChanges} from "./_selectors";
import {addTask, deleteTasksFromServer, postTasksToServer, putTasksToServer} from "./_actionsDefinitions";


class ToDoList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {inputValue: ''};
    }

    onInputChange = (event) => this.setState({ inputValue: event.target.value});

    addTaskOnAddButton = (event) => {
        event.preventDefault();
        this.props.addTask(this.state.inputValue);
        this.setState({inputValue: ""});
    };

    saveChanges = () => {
        this.props.postTasksToServer(this.props.newTasks);
        this.props.putTasksToServer(this.props.editedTasks);
        this.props.deleteTasksFromServer(this.props.deletedTasks);
    };

    render() {
        return (
            <ul className={"list"}>
                { this.props.tasks.map((todo, i) => <ToDoTask key={i} id={todo.id}/>) }

                <form>
                    <input className={"task__new"}
                           value={this.state.inputValue}
                           onChange={this.onInputChange}
                           autoFocus={true}/>
                    <button className={"actionButton"} onClick={this.addTaskOnAddButton}> ADD </button>
                </form>

                { this.props.hasUnsavedChanges ? <button className={"inactive"} onClick={this.saveChanges}> SAVE </button> : null}
            </ul>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        tasks: getStoreTasks(state),
        hasUnsavedChanges: listHasUnsavedChanges(state),
        newTasks: getNewTasks(state),
        editedTasks: getModifiedTasks(state),
        deletedTasks: getDeletedTasks(state)
    };
};

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        addTask: (content) => dispatch(addTask(content, ownProps.selectedDate)),
        postTasksToServer: (newTasks) => dispatch(postTasksToServer(newTasks)),
        putTasksToServer: (editedTasks) => dispatch(putTasksToServer(editedTasks)),
        deleteTasksFromServer: (deletedTasks) => dispatch(deleteTasksFromServer(deletedTasks))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(ToDoList);