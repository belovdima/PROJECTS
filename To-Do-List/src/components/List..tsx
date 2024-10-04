import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { addTask, deleteTask, toggleTask } from "../redux/tasksSlice";

interface Task {
    id: number;
    description: string;
    deadline: string;
    completed: boolean;
    completionTime: string | null;
}

export const List = () => {
    const [newTask, setNewTask] = useState(""); // Для описания задачи
    const [newDeadline, setNewDeadline] = useState(""); // Для дедлайна
    const tasks = useSelector((state: RootState) => state.tasks);
    const dispatch = useDispatch();

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setNewTask(e.target.value);
    };

    const handleDeadlineChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setNewDeadline(e.target.value); // Устанавливаем значение дедлайна
    };

    const handleAddTask = () => {
        if (newTask.trim() !== "") {
            const newTaskObj: Task = {
                id: Date.now(),
                description: newTask,
                deadline: newDeadline,
                completed: false,
                completionTime: null,
            };
            dispatch(addTask(newTaskObj));
            setNewTask("");
            setNewDeadline("");
        }
    };

    const handleDeleteTask = (id: number) => {
        dispatch(deleteTask(id));
    };

    const handleDoneTask = (id: number) => {
        dispatch(toggleTask(id));
    };

    return (
        <>
            <div className="list">
                <h1>To-Do List</h1>
                <input
                    type="text"
                    placeholder="Enter a task"
                    value={newTask}
                    onChange={handleInputChange}
                />
                <input
                    type="date"
                    value={newDeadline}
                    onChange={handleDeadlineChange}
                />
                <button className="add-button" onClick={handleAddTask}>
                    Add
                </button>
            </div>
            <ol>
                {tasks.map((task: Task) => (
                    <li key={task.id}>
                        <span className={task.completed ? "completed" : "text"}>
                            {task.description} (Deadline:{" "}
                            {task.deadline ? task.deadline : "None"})
                        </span>
                        {task.completed && task.completionTime && (
                            <span className="completed-time">
                                (Completed at:{" "}
                                {new Date(task.completionTime).toLocaleString()}
                                )
                            </span>
                        )}
                        <button
                            className="delete"
                            onClick={() => handleDeleteTask(task.id)}>
                            Delete
                        </button>
                        <input
                            type="checkbox"
                            checked={task.completed}
                            onChange={() => handleDoneTask(task.id)}
                        />
                    </li>
                ))}
            </ol>
        </>
    );
};
