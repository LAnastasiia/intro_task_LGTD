import React from 'react';
import './App.css';

//styles
import './styles/test_styles.css'

// components
import {getTasks} from "./modules/serverCommunication";
import Calendar from "./modules/Calendar/Calendar";
import ToDoList from "./modules/ToDoList/ToDoList";


class App extends React.Component {
  constructor(props) {
    super(props);
    this.todayDate = new Date();
    this.state = {
        date: this.todayDate,
        tasks: []
    };
    this.fetchData(this.todayDate).then(() => console.log(" ✓ tasks fetched"));
  }

  fetchData = async (selectedDate) => {
    await getTasks(selectedDate).then(
        (response) => this.setState({tasks: response.selectedTasks})
    );
  };

  selectMonth = (m_index) => {
      let newDate = new Date(this.state.date.getFullYear(), m_index, 1);
      this.setState({ date: newDate });
      this.fetchData(newDate).then( () => console.log( `✓ tasks updated for 1st of ${m_index}`) );
  };

  selectDate = (d_index) => {
      let newDate = new Date(this.state.date.getFullYear(), this.state.date.getMonth(), d_index);
      this.setState({ date: newDate });
      this.fetchData(newDate).then( () => console.log( `✓ tasks updated for new date - ${d_index}`) );
  };

  render() {
    return (
        <main>
          <Calendar selectedDate={this.state.date}
                    selectDate={this.selectDate}/>

          {this.state.tasks.length > 0
              ?
              <ToDoList date={this.state.date}
                        tasks={this.state.tasks}/>
              :
              null}
        </main>
    )
  }
}

export default App;