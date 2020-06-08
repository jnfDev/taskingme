import React from 'react';

// Bootstrap components
import Button from 'react-bootstrap/Button';
import Dropdown from 'react-bootstrap/Dropdown';

// Icons 
import AddIcon from '@material-ui/icons/AddCircleOutline';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/DeleteOutline';
import SaveIcon from '@material-ui/icons/CheckCircleOutline';
import CancelIcon from '@material-ui/icons/CancelOutlined';
import MoreIcon from '@material-ui/icons/MoreVert';

class Task extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            value: props.task.name,
            editing: props.task.id > 0 ? false : true 
        }

        this.taskInput = React.createRef();

        this.saveTask = this.saveTask.bind(this);
        this.deleteTask = this.deleteTask.bind(this);
        this.getControls = this.getControls.bind(this);
    }

    setTaskValue(newValue){
        this.setState({value: newValue})
    }

    setEditingState(state) {
        this.setState({ editing: state });
    }

    saveTask(task){
        this.props.handler('save', Object.assign({id: this.props.task.id }, task));
        this.setEditingState(false);
    }

    deleteTask() {
        this.props.handler('delete', { id: this.props.task.id });
    }

    addTask() {
        this.props.handler('add', { id: this.props.task.id });
    }

    componentDidUpdate() {
        if (this.state.editing) {
            this.taskInput.current.focus();
        }
    }

    componentDidMount() {
        if (!this.state.editing && this.props.task.name === '') {
            this.setEditingState(true);
        }
    }

    cancelTask() {
        if (this.props.task.name !== '') {
            this.setEditingState(false);
            this.setTaskValue(this.props.task.name);
        } else {
            this.deleteTask();
        }
    }

    getControls() {
        return (
            <div className="task-controls">
                <Dropdown>
                    <Dropdown.Toggle variant="light" bsPrefix><MoreIcon /></Dropdown.Toggle>
                    <Dropdown.Menu>
                        <Dropdown.Item variant="light" onClick={(e) => this.addTask()}><AddIcon /> Add</Dropdown.Item>
                        <Dropdown.Item variant="light" onClick={(e) => this.setEditingState(true)}><EditIcon /> Edit</Dropdown.Item>
                        <Dropdown.Item variant="light" onClick={(e) => this.deleteTask()}><DeleteIcon /> Delete</Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>
            </div>
        );
    }

    getEditingControls() {
        return (
            <div className="task-controls editing">
                <Button variant="light" disabled={!this.state.value} onClick={(e) => this.saveTask({ name: this.state.value })}>
                    <SaveIcon />
                </Button>
                <Button variant="light" onClick={(e) => this.cancelTask()}>
                    <CancelIcon />
                </Button>
            </div>
        );
    }

    render() {
        const controls = this.state.editing ? this.getEditingControls() : this.getControls();
        return (
            <div id={this.props.task.id} className="task">
                <div className="row">
                    <div className="col-sm-8">
                        {this.state.editing
                            ? <input className="form-control" ref={this.taskInput} value={this.state.value} onChange={(e) => this.setTaskValue(e.target.value)}/>
                            : <div className="form-group form-check">
                                <input type="checkbox" className="form-check-input" id="taskState" defaultChecked={this.props.task.done} onChange={(e) => this.saveTask({ done: e.target.checked })}/> 
                                <label className="form-check-label" htmlFor="taskState">{this.props.task.name}</label>
                            </div>
                        }

                    </div>
                    <div className="col-sm-3 offset-sm-1">
                        {controls}
                    </div>
                </div>
            </div>
        );
    }
}

export default Task;