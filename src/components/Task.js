import React from 'react';

class Task extends React.Component {

    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(task, e){
        task.name = e.target.value;
        this.props.handleChangeTask(task);
    }

    render() {
        const task = this.props.task;
        return (
            <li id={task.id}>
                {task.name}
                <input value={task.name} onChange={(e) => this.handleChange(task, e)}/>
                <div className="task-controls">
                    <button>Create</button>
                    <button>Edit</button>
                    <button>Delete</button>
                </div>
            </li>
        );
    }
}

export default Task;