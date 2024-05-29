import Task from "./Task";

const Tasks = ({ tasks, setUpdTask, setShowForm }) => {
  return (
    <div>
      {!tasks.length && <p> No task available</p>}
      <div className="task-list">
        {tasks.map((task) => (
          <Task key={task.id} task={task} setUpdTask={setUpdTask} setShowForm={setShowForm} />
        ))}
      </div>
    </div>
  );
};

export default Tasks;
