import React from "react";
import {
  FaList,
  FaTrash,
  FaCaretUp,
  FaCaretDown,
  FaClock,
  FaBell,
} from "react-icons/fa";
import {
  deleteTaskById,
  completeTaskById,
  taskReminderById,
} from "../api/service";
import { FaPencil } from "react-icons/fa6";

const Task = ({ task, setUpdTask, setShowForm }) => {
  const [more, setMore] = React.useState(false);

  const showMoreDetails = () => {
    setMore(!more);
  };

  const deleteTask = async (taskId) => {
    await deleteTaskById(taskId);
  };

  const editTask = async (task) => {
    setUpdTask(task);
    setShowForm(true);
  };

  const taskReminder = async (taskId) => {
    try {
      await taskReminderById(taskId);
    } catch (err) {
      console.log(err);
    }
  };

  const completeTask = async (taskId) => {
    try {
      await completeTaskById(taskId);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div
      className={`task ${task.status && "remind"}`}
      onDoubleClick={() => completeTask(task.id)}
    >
      <div className="header">
        <span className="title">
          <FaList />
          <h4> {task.title}</h4>
        </span>
        <span className="actions">
          <FaPencil
            color="blue"
            cursor="pointer"
            onClick={() => editTask(task)}
          />
          <FaTrash
            color="darkred"
            cursor="pointer"
            onClick={() => deleteTask(task.id)}
          />
        </span>
      </div>
      <p className="task-desc">
        {more ? task.description : task.description.substring(0, 100) + "..."}
      </p>
      <span className="show-more" onClick={showMoreDetails}>
        <p>{more ? "Hide details" : "more details"}</p>
        {more ? <FaCaretUp size="24" /> : <FaCaretDown size="24" />}
      </span>
      {more && (
        <>
          <hr />
          <span className="reminder">
            <p className="task-day">
              <FaClock color="purple" /> {task.taskDay}
            </p>
            {task.reminder && (
              <FaBell
                color="darkgreen"
                onDoubleClick={() => taskReminder(task.id)}
              />
            )}
          </span>
        </>
      )}
    </div>
  );
};

export default Task;
