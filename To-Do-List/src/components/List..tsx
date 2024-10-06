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

    // состояния для фильтров
    const [status, setStatus] = useState("all");
    const [deadline, setDeadline] = useState("old");

    const filteredTasks = tasks.filter((task) => {
        if (status === "completed") {
            return task.completed;
        } else if (status === "notcompleted") {
            return !task.completed;
        }
        return true; // "all" - возвращаем все задачи
    });

    const sortedByDeadline = filteredTasks.sort((a, b) => {
        const dateA = new Date(a.deadline);
        const dateB = new Date(b.deadline);

        if (deadline === "new") {
            return dateB.getTime() - dateA.getTime(); // Новые задачи будут выше
        } else {
            return dateA.getTime() - dateB.getTime(); // Старые задачи будут выше
        }
    });

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
            <div className="todoList">
                <h1 className="title">To-Do List</h1>
                <div className="filters">
                    <form className="filter statusFilter">
                        <label htmlFor="status" className="label">
                            Задачи:
                        </label>
                        <select
                            id="status"
                            name="status"
                            value={status}
                            onChange={(e) => setStatus(e.target.value)}
                            className="select">
                            <option value="all">Все</option>
                            <option value="completed">Выполненные</option>
                            <option value="notcompleted">Невыполненные</option>
                        </select>
                    </form>
                    <form className="filter deadlineFilter">
                        <label htmlFor="deadline" className="label">
                            Дедлайн:
                        </label>
                        <select
                            id="deadline"
                            name="deadline"
                            value={deadline}
                            onChange={(e) => setDeadline(e.target.value)}
                            className="select">
                            <option value="new">Несрочно</option>
                            <option value="old">Срочно</option>
                        </select>
                    </form>
                </div>
                <input
                    type="text"
                    placeholder="Введите задачу"
                    value={newTask}
                    onChange={handleInputChange}
                    className="input"
                />
                <input
                    type="date"
                    value={newDeadline}
                    onChange={handleDeadlineChange}
                    className="input"
                />
                <button className="addButton" onClick={handleAddTask}>
                    Добавить
                </button>
            </div>
            <ol className="tasks">
                {sortedByDeadline.map((task: Task) => (
                    <li key={task.id} className="task">
                        <span
                            className={
                                task.completed
                                    ? "taskStatus completed"
                                    : "taskStatus"
                            }>
                            {task.description} (Deadline:{" "}
                            {task.deadline || "None"})
                        </span>
                        {task.completed && task.completionTime && (
                            <span className="completedTime">
                                (Завершено в:{" "}
                                {new Date(task.completionTime).toLocaleString()}
                                )
                            </span>
                        )}
                        <button
                            className="deleteButton"
                            onClick={() => handleDeleteTask(task.id)}>
                            Удалить
                        </button>
                        <input
                            type="checkbox"
                            checked={task.completed}
                            onChange={() => handleDoneTask(task.id)}
                            className="checkbox"
                        />
                    </li>
                ))}
            </ol>
        </>
    );
};
