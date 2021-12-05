import React, { useState } from 'react';
import

function AddTask({ onCancel, onAddTask }) {
    const [task, setTask] = useState("");
    return (
        <div className="add-task-dialog">
            <input 
                value={task} 
                onChange={({ target: { value } }) => setTask(value)} 
            />
            <div className="add-task-actions-container">
                <div className="btns-container">
                    <button 
                        className="add-btn"
                        onClick={() => {
                            onAddTask(task);
                            onCancel();
                            setTask("");
                        }}
                    >
                        Add Task
                    </button>
                    <button 
                        className="cancel-btn" 
                        onClick={() => {
                            onCancel();
                            setTask("");
                        }}
                    >
                        Cancel
                    </button>
                </div>
                <div className="icon-container"></div>
            </div>
        </div>
    )
};



function Tasks() {
    const [showAddTask, setShowAddTask] = useState(false);
    const [tasks, setTasks] = useState([]);

    function addNewTask(task) {
        setTasks(prevState => [...prevState, task]);
    }

    return (
        <div className="tasks">
            <h1>Inbox</h1>
            <div 
                className="add-task-btn" 
                onClick={() => setShowAddTask((prevState) => !prevState)}
            >
                <span className="plus">+</span>
                <span className="add-task-text">Add Task</span>
            </div>
            {showAddTask && (
                <AddTask 
                    onAddTask={addNewTask} 
                    onCancel={() => setShowAddTask(false)} />
                )
            }
            {tasks.length > 0 ? 
            tasks.map(task => (
                <p>{task}</p>
            )) : <p>No tasks yet</p>}
        </div>
    )
};

export default Tasks;
