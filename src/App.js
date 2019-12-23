import React from 'react';

import ToDoList from "./modules/ToDoList/ToDoList";
import './styles/app_styles.css'
import Calendar from "./modules/Calendar/Calendar";
import {connect} from "react-redux";
import {getSelectedDate} from "./modules/Calendar/_selectors";


class App extends React.Component {

  render() {
    return (
        <main>
          <Calendar/>
          {this.props.selectedDate ? <ToDoList selectedDate={this.props.selectedDate}/> : null}
        </main>
        )
  }
}

const mapStateToProps = (state) => {
    return {
        selectedDate: getSelectedDate(state),
    };
};

export default connect(mapStateToProps)(App);

// npm start
// json-server --watch src/db.json --port 3001