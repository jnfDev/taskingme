import React from 'react';

// Components
import Task from './Task';

class TaskList extends React.Component {

    renderTasksRecursively(tasks) {
        return tasks.map(aTask => (
            <li>
                <Task key={aTask.id} task={aTask} handleChangeTask={this.props.handleChangeTask} />
                <ul className="tasks-list">
                    {this.renderTasksRecursively(aTask.subTaks)}
                </ul>
            </li>
        ));
    }

    render() {
        return (
            <ul className="tasks-list">
                {this.renderTasksRecursively(this.props.tasks)}
            </ul>
        );
    }
}

export default TaskList;