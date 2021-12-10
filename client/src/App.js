import React from 'react';
import io from 'socket.io-client';
const randomID = require('@perspicere-dev/randomid-generator');

class App extends React.Component {

  state = {
    tasks: [],
    taskName: ''
  }
 
  componentDidMount () {
    this.socket = io('http://localhost:8000');
    this.socket.on('removeTask', (id) => this.removeTask(id));
    this.socket.on('addTask', (task) => this.addTask(task));
    this.socket.on('updateTasks', (tasks) => this.updateTasks(tasks));
  }

  removeTask = (id, locally) => {
    const indexOfTask = this.state.tasks.indexOf(id);
    this.setState(this.state.tasks.splice(indexOfTask, 1));
    if(locally) {
      this.socket.emit('removeTask', id);
    }
  }

  addTask = (task) => {
   this.setState({
     tasks: [...this.state.tasks, task]
      });
    console.log('tasks', this.state.tasks)
  }

  submitForm = (event) => {
    event.preventDefault();
    console.log('submit');
    const { taskName } = this.state;
    const task = {name: taskName, id: randomID(9)}
    this.addTask(task);
    this.socket.emit('addTask', task);
  }

  setTaskName = (event) => {
    this.setState({taskName: event.currentTarget.value})
    console.log('seeting task name');
  }

  updateTasks = (tasks) => {
    this.setState({tasks: tasks})
  }

  render() {
    const { tasks, taskName } = this.state;
    return (
    
      <div className="App">
    
        <header>
          <h1>ToDoList.app</h1>
        </header>
    
        <section className="tasks-section" id="tasks-section">
          <h2>Tasks</h2>
    
          <ul className="tasks-section__list" id="tasks-list">
            {tasks.map((task) => 
              <li key ={task.id} className="task">{task.name}
                <button 
                  onClick={() => this.removeTask(task.id)} 
                  className="btn btn--red"> Remove
                </button>
              </li>
            )}
          </ul>
    
          <form onSubmit={this.submitForm} id="add-task-form">
            <input 
              className="text-input" 
              autoComplete="off" 
              type="text" 
              placeholder="Type your description" 
              id="task-name" 
              onChange={this.setTaskName}
              value={taskName}
              />
            <button className="btn" type="submit">Add</button>
          </form>
    
        </section>
      </div>
    );
  };

};

export default App;