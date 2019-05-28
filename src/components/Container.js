import React, { Component } from 'react';
import '../styles/container.css'
import ContainerBox from './ContainerBox'
import TaskForm from './TaskForm'


class Container extends Component {
    state = {
        newTask: false,
        tasks: [
            { id: "1", taskName: "Task1", type: "backlog" },
            { id: "2", taskName: "Task2", type: "backlog" },
            { id: "3", taskName: "Task3", type: "todo" },
            { id: "4", taskName: "Task4", type: "processing" },
            { id: "5", taskName: "Task5", type: "checking" }
        ]
    }
    boxes = [
        { id: "backlog", class: "containerBox backlog", color: "gray" },
        { id: "todo", class: "containerBox todo", color: "gray" },
        { id: "processing", class: "containerBox processing", color: "gray" },
        { id: "checking", class: "containerBox checking", color: "gray" }]

    removeTask = (taskID) => {
        const currentState = this.state;
        currentState.tasks.filter((task) => {
            if (task.id === taskID) {
                currentState.tasks.splice(currentState.tasks.indexOf(task), 1)
            }
            return task
        })
        this.setState({
            ...currentState
        });

    }

    addTask = () => {
        const modal = this.state.newTask;
        this.setState({
            newTask: !modal
        })
    }

    handleSubmit = (e, selectedType, newTask) => {
        e.preventDefault()

        if (newTask.current.value !== "") {
            const currentState = this.state;
            const cleanInput = newTask.current.value.replace(/[^a-zA-Z0-9]/g, '*');
            const task = { id: `${currentState.tasks.length + 1}`, taskName: `${cleanInput}`, type: `${selectedType.current.value}` }
            currentState.tasks.push(task);
            this.setState({
                currentState
            })
            newTask.current.value = ""
        }
    }



    dropZone = ""

    onDragStart = (e, id) => {
        e.dataTransfer.setData("ID", id)
    }


    onDragEnd = (e) => {
        const draggedTask = e.dataTransfer.getData("ID")
        const currentState = this.state;
        currentState.tasks.filter((task) => {
            if (task.id === draggedTask) {
                task.type = this.dropZone
            }
            return task
        })
        this.setState({
            ...currentState
        });
    }



    render() {

        const tasks = {
            backlog: [],
            todo: [],
            processing: [],
            checking: []
        }
        this.state.tasks.forEach((task) => {

            tasks[task.type].push(
                <div key={task.id}
                    className="box dragMe"
                    draggable
                    onDragStart={(e) => this.onDragStart(e, task.id)}
                    onDragOver={() => this.dragEnd}
                >
                    {task.taskName}
                    <button onClick={() => this.removeTask(task.id)} className="removeTask"></button>

                </div>

            )
        });

        return (
            <>
                <h1 className="header">DraggyDroppy</h1>

                <button onClick={this.addTask} className="addTask"></button>
                {
                    this.state.newTask ?
                        <TaskForm type={this.boxes} handleSubmit={this.handleSubmit} />
                        : null
                }
                <div className="container"
                    onDragOver={(e) => { e.preventDefault(); e.stopPropagation() }}>
                    {this.boxes.map(box => (
                        <ContainerBox
                            dragOver={(e) => { e.preventDefault(); e.stopPropagation() }}
                            dragEnter={(e) => { e.preventDefault(); this.dropZone = box.id; }}
                            dragEnd={this.onDragEnd}
                            key={box.id}
                            id={box.id}
                            className={box.class}
                            color={box.color}
                            tasks={tasks[box.id]} />
                    ))}
                </div>
            </>);
    }
}

export default Container;

