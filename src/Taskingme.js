import React from 'react';

// Components
import TasksList from './components/TasksList';
import TaskViewer from './components/TaskViewer';

class Taskingme extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            tasks: [{ 
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
            }]
        };

        this.handleChangeTask = this.handleChangeTask.bind(this);
        // this.handleAddTask = this.handleAddTask.bind(this);
        // this.handleDeleteTask = this.handleDeleteTask.bind(this);
    }

    handleChangeTask(updatedTask) {
        console.log(updatedTask);

        // const updatedTasks = this.state.tasks.map(task => (task.id === updatedTask.id ? updatedTask : task));
        const updatedTasks = this.updateTasksRecursively(this.state.tasks, updatedTask);
        
        this.setState({ tasks: updatedTasks });
    }

    updateTasksRecursively(tasks, updateTask) {
        return tasks.map(task => {
            if (task.id === updateTask.id) {
                task = Object.assign(task, updateTask);
            } else {
                task.subTaks = this.updateTasksRecursively(task.subTaks, updateTask);
            }

            return task;
        });
    }

    // handleAddTask(e) {
        
    //     if (!this.state.task.length) {
    //         return;
    //     }

    //     this.setState(state => ({
    //         tasks: state.tasks.concat({
    //             id: state.tasks.length + 1,
    //             name: state.task
    //         }),
    //         task: ''
    //     }));
    // }

    // handleDeleteTask(taskId) {
    //     const updateTask = this.state.tasks.filter(task => task.id !== taskId);
    //     this.setState({ tasks: updateTask });
    // }

    render() {
        return (
            <main id="taskingme">
                <section className="tasks-list-content">
                    <TasksList tasks={this.state.tasks} handleChangeTask={this.handleChangeTask}/>
                </section>
                <section className="task-viewer">
                    <TaskViewer />
                </section>
            </main>
        );
    }

}

export default Taskingme;