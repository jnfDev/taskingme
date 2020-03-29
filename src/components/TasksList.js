import React from 'react';

// Components
import Task from './Task';

class TaskList extends React.Component {

    render() {
        return (
            <ul>
                {this.props.tasks.map(aTask => (
                    <Task task={aTask} handleChangeTask={this.props.handleChangeTask}/>
                ))}
            </ul>
        );
    }
}

export default TaskList;