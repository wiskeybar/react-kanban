import React from 'react';

const TaskForm = (props) => {

    const selectedType = React.createRef()
    const newTask = React.createRef()

    return (
        <form
            autoComplete="off" onSubmit={(e) => props.handleSubmit(e, selectedType, newTask)} className="taskForm">

            <label >Task: <input
                ref={newTask}
                title="3 to 40 characters, only letters and digits will be added"
                type="text"
                name="task"
                placeholder="input your task here"
                className="taskInput"
                maxLength="40"
                minLength="3" />
            </label>
            <label>Type:
                <select title="Select type of task" className="selectInput" ref={selectedType} >
                    {props.type.map(box => {
                        return <option key={box.id} value={box.id}>{box.id.toUpperCase()}</option>
                    })}
                </select>
            </label>
            <input title="Submit new task" className="submitForm" type="submit" value="Submit" />
        </form >
    );
}

export default TaskForm;