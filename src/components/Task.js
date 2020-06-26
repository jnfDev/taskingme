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

        // Set a proxy to this.props.handler
        this.handler = new Proxy(this.props.handler, {
            apply: (target, thisArg, args) => {
                const [process, task = {}] = args;
                if (process === 'save') {
                    this.setState({ editing: false });
                }
                target.call(thisArg, process, { ...task, id: this.props.task.id });
            }
        });
    }

    cancelTask() {
        if (this.props.task.name !== '') {
            this.setState({ editing: false });
            this.setState({ value: this.props.task.name });
        } else {
            this.handler('delete');
        }
    }

    componentDidUpdate() {
        if (this.state.editing) {
            this.taskInput.current.focus();
        }
    }

    componentDidMount() {
        if (!this.state.editing && this.props.task.name === '') {
            this.setState({ editing: true });
        }
    }

    getControls() {
        return (
            <div className="task-controls">
                <Dropdown>
                    <Dropdown.Toggle variant="light" bsPrefix><MoreIcon /></Dropdown.Toggle>
                    <Dropdown.Menu>
                        <Dropdown.Item variant="light" onClick={(e) => this.handler('add')}><AddIcon /> Add</Dropdown.Item>
                        <Dropdown.Item variant="light" onClick={(e) => this.setState({ editing: true })}><EditIcon /> Edit</Dropdown.Item>
                        <Dropdown.Item variant="light" onClick={(e) => this.handler('delete')}><DeleteIcon /> Delete</Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>
            </div>
        );
    }

    getEditingControls() {
        return (
            <div className="task-controls editing">
                <Button variant="light" disabled={!this.state.value} onClick={(e) => this.handler('save', { name: this.state.value })}>
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
                            ? <input className="form-control" ref={this.taskInput} value={this.state.value} onChange={(e) => this.setState({ value: e.target.value })}/>
                            : <div className="form-group form-check">
                                <input type="checkbox" className="form-check-input" id="taskState" defaultChecked={this.props.task.done} onChange={(e) => this.handler('save', { done: e.target.checked }) }/> 
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