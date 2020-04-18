import React from 'react';

class Task extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            editing: false
        }

        this.taskInput = React.createRef();

        this.updateTask = this.updateTask.bind(this);
        this.deleteTask = this.deleteTask.bind(this);
        this.setEditingState = this.setEditingState.bind(this);
        this.getControls = this.getControls.bind(this);
    }

    updateTask(task, e){
        task.name = e.target.value;
        this.props.handler('update', task);
    }

    setEditingState(state) {
        this.setState({ editing: state });
    }

    deleteTask(task, e) {
        this.props.handler('delete', task);
    }

    componentDidUpdate() {
        if (this.state.editing) {
            this.taskInput.current.focus();
        }
    }

    getControls(task) {
        return (
            <div className="task-controls">
                <button>Add</button>
                <button onClick={(e) => this.setEditingState(true)}>Edit</button>
                <button onClick={(e) => this.deleteTask(task, e)}>Delete</button>
            </div>
        );
    }

    getEditingControls(task) {
        return (
            <div className="task-controls">
                <button onClick={(e) => this.setEditingState(false)}>Save</button>
                <button onClick={(e) => this.setEditingState(false)}>Cancel</button>
            </div>
        );
    }

    render() {
        const task = this.props.task;
        const controls = this.state.editing ? this.getEditingControls(task) : this.getControls(task);
        return (
            <div id={task.id} className="task">
                {this.state.editing 
                    ? <input ref={this.taskInput} value={task.name} onChange={(e) => this.updateTask(task, e)}/>
                    : task.name
                }
                {controls}
            </div>
        );
    }
}

export default Task;