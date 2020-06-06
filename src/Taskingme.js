import React from 'react';

// Components
import TasksList from './components/TasksList';
import TaskViewer from './components/TaskViewer';

import './Taskingme.scss';

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
                    done: false,
                    subTaks: []
                }
            ],
            taskIndex: 1,
        };

        this.handler = this.handler.bind(this);
        this.handleSave = this.handleSave.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
        this.handleAdd = this.handleAdd.bind(this);
        this.handlerMap = {
            'add': this.handleAdd,
            'save': this.handleSave,
            'delete': this.handleDelete,
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

    handleSave(tasks, taskToUpdate) {
        return tasks.map(task => {
            if (task.id === taskToUpdate.id) {
                task = Object.assign(task, taskToUpdate);
            } else {
                task.subTaks = this.handleSave(task.subTaks, taskToUpdate);
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

    handleAdd(tasks, parentTask) {
        return tasks.map(task => {
            if (task.id === parentTask.id) {
                const taskId = this.state.taskIndex + 1;
                this.setState({taskIndex: taskId});
                task.subTaks.push({
                    id: taskId,
                    name: '',
                    description: '',
                    date: `${(new Date()).toJSON().slice(0,10)} ${(new Date()).toJSON().slice(11,19)}`,
                    subTaks: []
                });
            } else {
                task.subTaks = this.handleAdd(task.subTaks, parentTask);
            }

            return task;
        });
    }

    render() {
        return (
            <main id="taskingme" className="row">
                <section className="col-sm-4 tasks-list-content">
                    <TasksList tasks={this.state.tasks} handler={this.handler}/>
                </section>
                <section className="col-sm-8 task-viewer">
                    <TaskViewer />
                </section>
            </main>
        );
    }

}

export default Taskingme;