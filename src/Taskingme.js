import React from 'react';

// Components
import TasksList from './components/TasksList';
import TaskViewer from './components/TaskViewer';

class Taskingme extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            tasks: [
                { 
                    id: 1, 
                    name: 'John DOE today tasks', 
                    description: '', 
                    date: '2020-02-28 08:00:00',
                    state: false,
                    subTaks: [
                        {
                            id: 2,
                            name: 'Breakfast',
                            description: '',
                            date: '2020-02-28 09:00:00',
                            subTaks: [{
                                id: 3,
                                name: 'Make a juice', 
                                description: '', 
                                date: '2020-02-28 09:30:00',
                                state: false,
                                subTaks: []
                            }]
                        },
                        {
                            id: 4,
                            name: 'Go to work',
                            description: '',
                            date: '2020-02-28 10:00:00',
                            subTaks: []
                        }
                    ]
                }
            ]
        };

        this.handler = this.handler.bind(this);
        this.handleUpdate = this.handleUpdate.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
        this.handlerMap = {
            'update': this.handleUpdate,
            'delete': this.handleDelete
        }
    }

    handler(process, task) {

        if (typeof this.handlerMap[process] !== 'function') {
            // Handle error
            return;
        }

        const updatedTasks = this.handlerMap[process](this.state.tasks, task);
        this.setState({ tasks: updatedTasks });
    }

    handleUpdate(tasks, taskToUpdate) {
        return tasks.map(task => {
            if (task.id === taskToUpdate.id) {
                task = Object.assign(task, taskToUpdate);
            } else {
                task.subTaks = this.handleUpdate(task.subTaks, taskToUpdate);
            }

            return task;
        });
    }

    handleDelete(tasks, taskToDelete) {
        return tasks.reduce((updateTasks, task) => {
            if (task.id !== taskToDelete.id) {
                task.subTaks = this.handleDelete(task.subTaks, taskToDelete)
                updateTasks.push(task);
            }

            return updateTasks;
        }, []);
    }

    render() {
        return (
            <main id="taskingme">
                <section className="tasks-list-content">
                    <TasksList tasks={this.state.tasks} handler={this.handler}/>
                </section>
                <section className="task-viewer">
                    <TaskViewer />
                </section>
            </main>
        );
    }

}

export default Taskingme;