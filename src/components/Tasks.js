import React, { useState } from 'react';
import DayPickerInput from 'react-day-picker/DayPickerInput';
import "react-day-picker/lib/style.css";
import dateFnsFormat from 'date-fns/format';
import isAfter from 'date-fns/isAfter';
import isBefore from 'date-fns/isBefore';
import addDays from 'date-fns/addDays';
import isToday from 'date-fns/isToday';

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

const TASKS_HEADER_MAPPING = {
    INBOX: "Inbox",
    TODAY: "Today",
    NEXT_7: "Next 7 days",
}

function TaskItems({ selectedTab, tasks }) {
    let tasksToRender = [...tasks];
    if(selectedTab === "NEXT_7") {
        tasksToRender = tasks.filter(
            (task) => 
                isAfter(task.date, new Date()) && 
                isBefore(task.date, addDays(new Date(), 7))
        );
    }

    if(selectedTab === "TODAY") {
        tasksToRender = tasks.filter(task => isToday(task.date));
    }

    return (
        <div className="task-items-container">
            {tasksToRender.map((task) => (
                <div className="task-item">
                    <p>{task.text}</p>
                    <p>{dateFnsFormat(new Date(task.date), FORMAT)}</p>
                </div>
            ))}
        </div>
    );
}

function Tasks({ selectedTab }) {
    const [showAddTask, setShowAddTask] = useState(false);
    const [tasks, setTasks] = useState([]);

    function addNewTask(text, date) {
        const newTaskItem = {text , date: date || new Date()};
        setTasks(prevState => [...prevState, newTaskItem]);
    }

    return (
        <div className="tasks">
            <h1>{TASKS_HEADER_MAPPING[selectedTab]}</h1>
            {selectedTab === "INBOX" ? <div 
                className="add-task-btn" 
                onClick={() => setShowAddTask((prevState) => !prevState)}
            >
                <span className="plus">+</span>
                <span className="add-task-text">Add Task</span>
            </div> : null}
            {showAddTask && (
                <AddTask 
                    onAddTask={addNewTask} 
                    onCancel={() => setShowAddTask(false)} />
                )
            }
            {tasks.length > 0 ? 
            <TaskItems tasks={tasks} selectedTab={selectedTab} /> : 
            <p>No tasks yet</p>}
        </div>
    )
};

export default Tasks;
