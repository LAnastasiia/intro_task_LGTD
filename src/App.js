import React from 'react';
import './App.css';

// Elements
// import ToDoList from "./modules/ToDoList/todo_list";
import Calendar from "./modules/Calendar/Calendar";


class App extends React.Component {
  render() {
    return (
        <div>
          <Calendar> </Calendar>
          {/*<ToDoList> </ToDoList>*/}
        </div>

    )
  }
}

export default App;
