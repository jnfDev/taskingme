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
            <div id={task.id} className="task">
                {task.name}
                <input value={task.name} onChange={(e) => this.handleChange(task, e)}/>
                <div className="task-controls">
                    <button>Create</button>
                    <button>Edit</button>
                    <button onClick={(e) => this.handleDelete(task.id, e)}>Delete</button>
                </div>
            </div>
        );
    }
}

export default Task;