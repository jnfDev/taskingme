import React from 'react';

class Task extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            id: props.task.id,
            name: props.task.name,
            value: props.task.name,
            description: props.task.description,
            date: props.task.date,
            state: props.task.state,
            editing: props.task.id > 0 ? false : true 
        }

        this.taskInput = React.createRef();

        this.saveTask = this.saveTask.bind(this);
        this.deleteTask = this.deleteTask.bind(this);
        this.getControls = this.getControls.bind(this);
    }

    saveTask(task){
        task.name = task.value;
        this.props.handler('update', task);
        this.setEditingState(false);
    }

    deleteTask(task) {
        this.props.handler('delete', task);
    }

    addTask(task) {
        this.props.handler('add', task);
    }

    componentDidUpdate() {
        if (this.state.editing) {
            this.taskInput.current.focus();
        }
    }

    setTaskValue(newValue){
        this.setState({value: newValue})
    }

    setEditingState(state) {
        this.setState({ editing: state });
    }

    cancelTask(task) {
        if (task.id > 0) {
            this.setEditingState(false);
            this.setTaskValue(task.name);
        } else {
            this.deleteTask(task);
        }
    }

    getControls(task) {
        return (
            <div className="task-controls">
                <button onClick={(e) => this.addTask(task)}>Add</button>
                <button onClick={(e) => this.setEditingState(true)}>Edit</button>
                <button onClick={(e) => this.deleteTask(task)}>Delete</button>
            </div>
        );
    }

    getEditingControls(task) {
        return (
            <div className="task-controls">
                <button disabled={!task.value} onClick={(e) => this.saveTask(task)}>Save</button>
                <button onClick={(e) => this.cancelTask(task)}>Cancel</button>
            </div>
        );
    }

    render() {
        const task = this.state;
        const controls = task.editing ? this.getEditingControls(task) : this.getControls(task);
        return (
            <div id={task.id} className="task">
                {task.editing 
                    ? <input ref={this.taskInput} value={task.value} onChange={(e) => this.setTaskValue(e.target.value)}/>
                    : task.name
                }
                {controls}
            </div>
        );
    }
}

export default Task;