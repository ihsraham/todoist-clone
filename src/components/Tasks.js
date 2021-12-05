import React, { useState } from 'react';
import DayPickerInput from 'react-day-picker/DayPickerInput';
import "react-day-picker/lib/style.css";
import dateFnsFormat from 'date-fns/format';

const FORMAT = 'dd/MM/yyyy';
function formatDate(date, format, locale) {
    return dateFnsFormat(date, format, { locale });
}
function AddTask({ onCancel, onAddTask }) {
    const [task, setTask] = useState("");
    const [date, setDate] = useState(null);

    return (
        <div className="add-task-dialog">
            <input 
                value={task} 
                onChange={({ target: { value } }) => setTask(value)} 
            />
            <div className="add-task-actions-container">
                <div className="btns-container">
                    <button 
                        disabled={!task}
                        className="add-btn"
                        onClick={() => {
                            onAddTask(task, date);
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
                <div className="icon-container">
                    <DayPickerInput 
                        formatDate={formatDate}
                        format={FORMAT}
                        onDayChange={(day) => setDate(day)}
                        placeholder={`${dateFnsFormat(new Date(), FORMAT)}`}
                        dayPickerProps={{
                            modifiers: {
                                disabled: [{ before: new Date() }]
                            }
                        }}
                    />
                </div>
            </div>
        </div>
    )
};



function Tasks() {
    const [showAddTask, setShowAddTask] = useState(false);
    const [tasks, setTasks] = useState([]);

    function addNewTask(text, date) {
        const newTaskItem = {text , date: date || new Date()};
        setTasks(prevState => [...prevState, newTaskItem]);
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
                <p>
                    {task.text}
                    {" "}
                    {dateFnsFormat(new Date(task.date), FORMAT)}
                </p>
            )) : <p>No tasks yet</p>}
        </div>
    )
};

export default Tasks;
