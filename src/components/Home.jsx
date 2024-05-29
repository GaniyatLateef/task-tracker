import { useEffect, useState } from "react";
import Header from "./Header";
import TaskForm from "./TaskForm";
import { getAllTasks } from "../api/service";
import Tasks from "./Tasks";

const Home = () => {
  const [showForm, setShowForm] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const [tasks, setTasks] = useState([]);
  const [updTask, setUpdTask] = useState({});

  useEffect(() => {
    setIsLoading(true);
    getAllTasks()
      .then((res) => setTasks(res.data))
      .catch((err) =>
        setError(
          err.response?.data?.message || err.request?.message || err.message
        )
      )
      .finally(() => setIsLoading(false));
  }, []);

  const onButtonClicked = () => {
    setShowForm(!showForm);
  };

  return (
    <div>
      <Header title="Guest" showForm={showForm} setShowForm={onButtonClicked} />

      {!isLoading && (
        <>
          {showForm && ( 
          <TaskForm 
             setTasks={setTasks}
             tasks= {tasks}
             setShowForm={setShowForm}
             updTask={updTask}
             setUpdTask={setUpdTask}
          />
          )}
          {error && <p> Unable to fetch tasks {error}</p>}
          {!showForm && (
             <Tasks 
                tasks={tasks} 
                setUpdTask={setUpdTask}
                setShowForm={setShowForm}
                />
          )}
        </>
      )}
      {isLoading && <p>Fetching tasks...</p>}
    </div>
  );
};

export default Home;
