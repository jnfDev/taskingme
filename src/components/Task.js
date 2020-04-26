import React from 'react';

// Icons 
import AddIcon from '@material-ui/icons/AddCircleOutline';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/DeleteOutline';
import SaveIcon from '@material-ui/icons/CheckCircleOutline';
import CancelIcon from '@material-ui/icons/CancelOutlined';

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
        this.props.handler('save', task);
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

    componentDidMount() {
        if (!this.state.editing && this.state.name === '') {
            this.setEditingState(true);
        }
    }

    setTaskValue(newValue){
        this.setState({value: newValue})
    }

    setEditingState(state) {
        this.setState({ editing: state });
    }

    cancelTask(task) {
        if (task.name !== '') {
            this.setEditingState(false);
            this.setTaskValue(task.name);
        } else {
            this.deleteTask(task);
        }
    }

    getControls(task) {
        return (
            <div className="task-controls">
                <button onClick={(e) => this.addTask(task)}><AddIcon /> Add</button>
                <button onClick={(e) => this.setEditingState(true)}><EditIcon /> Edit</button>
                <button onClick={(e) => this.deleteTask(task)}><DeleteIcon /> Delete</button>
            </div>
        );
    }

    getEditingControls(task) {
        return (
            <div className="task-controls">
                <button disabled={!task.value} onClick={(e) => this.saveTask(task)}><SaveIcon /> Save</button>
                <button onClick={(e) => this.cancelTask(task)}><CancelIcon /> Cancel</button>
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