import React from 'react';
import io from 'socket.io-client';

class App extends React.Component {

  state = {
    tasks: ['Shopping', 'Popping', 'pissingohuh'],
  }

  componentDidMount () {
    this.socket = io('localhost:8000')
    console.log('dupa');
  }

  removeTask = (id) => {
    const { tasks } = this.state;
    const indexOfTask = tasks.indexOf(id);
    tasks.splice(indexOfTask, 1)
    console.log(tasks)
    this.socket.emit('removeTask', id);
  }

  render() {
    return (
      <div className="App">
    
        <header>
          <h1>ToDoList.app</h1>
        </header>
    
        <section className="tasks-section" id="tasks-section">
          <h2>Tasks</h2>
    
          <ul className="tasks-section__list" id="tasks-list">
            {this.state.tasks.map((task) => 
              <li key ={task} class="task">{task}<button onClick={() => this.removeTask(task)}class="btn btn--red">Remove</button></li>
            )}
            {/* <li class="task">Shopping <button class="btn btn--red">Remove</button></li>
            <li class="task">Go out with a dog <button class="btn btn--red">Remove</button></li> */}
          </ul>
    
          <form id="add-task-form">
            <input className="text-input" autocomplete="off" type="text" placeholder="Type your description" id="task-name" />
            <button className="btn" type="submit">Add</button>
          </form>
    
        </section>
      </div>
    );
  };

};

export default App;