import React from 'react';

class Task extends React.Component {

    constructor(props) {
        super(props);
        this.updateTask = this.updateTask.bind(this);
        this.deleteTask = this.deleteTask.bind(this);
    }

    updateTask(task, e){
        task.name = e.target.value;
        this.props.handler('update', task);
    }

    deleteTask(task, e) {
        this.props.handler('delete', task);
    }

    render() {
        const task = this.props.task;
        return (
            <div id={task.id} className="task">
                {task.name}
                <input value={task.name} onChange={(e) => this.updateTask(task, e)}/>
                <div className="task-controls">
                    <button>Create</button>
                    <button>Edit</button>
                    <button onClick={(e) => this.deleteTask(task, e)}>Delete</button>
                </div>
            </div>
        );
    }
}

export default Task;