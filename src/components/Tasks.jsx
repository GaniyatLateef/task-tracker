import Task from "./Task";

const Tasks = ({ tasks }) => {
  return (
    <div>
      {!tasks.length && <p> No task available</p>}
      <div className="task-list">
        {tasks.map((task) => (
          <Task key={task.id} task={task} />
        ))}
      </div>
    </div>
  );
};

export default Tasks;
