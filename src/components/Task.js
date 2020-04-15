import React from 'react';

class Task extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            editing: false
        }

        this.updateTask = this.updateTask.bind(this);
        this.deleteTask = this.deleteTask.bind(this);
        this.editTask = this.setEditingState.bind(this);
    }

    updateTask(task, e){
        task.name = e.target.value;
        this.props.handler('update', task);
    }

    setEditingState(state) {
        console.log('onBlur');
        this.setState({ editing: state });
    }

    deleteTask(task, e) {
        this.props.handler('delete', task);
    }

    render() {
        const task = this.props.task;
        return (
            <div id={task.id} className="task">
                {console.log(this.state.editing)}
                {this.state.editing 
                    ? <input value={task.name} onChange={(e) => this.updateTask(task, e)}/>
                    : task.name
                }
                <div className="task-controls">
                    {this.state.editing
                        ? <button onClick={(e) => this.setEditingState(false)}>Save</button>
                        : <button>Add</button>
                    }
                    <button onClick={(e) => this.setEditingState(true)}>Edit</button>
                    <button onClick={(e) => this.deleteTask(task, e)}>Delete</button>
                </div>
            </div>
        );
    }
}

export default Task;