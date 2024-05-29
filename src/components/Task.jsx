import React from "react";
import {
  FaList,
  FaTrash,
  FaCaretUp,
  FaCaretDown,
  FaClock,
  FaBell,
} from "react-icons/fa";

const Task = ({ task }) => {
  const [more, setMore] = React.useState(false);

  const showMoreDetails = () => {
    setMore(!more);
  };

  return (
    <div className={`task ${task.status && "remind"}`}>
      <div className="header">
        <span className="title">
          <FaList />
          <h4> {task.title}</h4>
        </span>
        <FaTrash color="dark" cursor="pointer" />
      </div>
      <p className="task-desc">
        {more ? task.description : task.description.substring(0, 100) + "..."}
      </p>
      <span className="show more" onClick={showMoreDetails}>
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
            {task.reminder && <FaBell color="darkgreen" />}
          </span>
        </>
      )}
    </div>
  );
};

export default Task;
