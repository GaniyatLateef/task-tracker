import React from "react";
import { getTaskById, postTask, updateTask } from "../api/service";

const TaskForm = ({setTasks, tasks, setShowForm, updTask, setUpdTask}) => {
  const defaultValues = {
    title: updTask.title || "",
    description: updTask.description || "",
    taskDay: updTask.taskDay || "",
    reminder: updTask.reminder || false,
  };

  const [isLoading, setIsLoading] = React.useState(false);
  const [formValues, setFormValues] = React.useState(defaultValues);
  const [errorMsg, setErrorMsg] = React.useState(false);
  const [fieldError, setFieldError] = React.useState({
    title: false,
    taskDay: false,
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    setFieldError({
      ...fieldError,
      title: !formValues.title,
      taskDay: !formValues.taskDay,
    });

    if (!formValues.title || !formValues.taskDay) {
      return;
    }

    setIsLoading(true);

    try {
      if (!updTask.id) {
      const res = await postTask(formValues);
      console.log(res);
      console.log(res.headers["Location"]);
      setFormValues(defaultValues);

      const newLocation = res.headers.location;
      if (newLocation) {
        const index = newLocation.lastIndexOf("/"); 
        const taskId = newLocation.substring(index + 1);
        const createdTask = await getTaskById(taskId);
        setTasks([...tasks, createdTask.data]);
        setShowForm(false);
      }
      } else {
        const taskId = updTask.id;
        const res = await updateTask({...formValues, id: taskId });
        setUpdTask({});
        const filteredTask = tasks.filter((t) => t.id !== taskId);
        setTasks([...filteredTask, res.data]);
        setShowForm(false);
      }
    } catch (err) {
      setErrorMsg(err.response?.data?.message || err.message);
    }

    setIsLoading(false);
  };

  return (
  <div>
    <form className="add-form" onSubmit={handleSubmit}>
        {errorMsg && <p style={{ color: "red"}}>{errorMsg}</p>}
     <br />
     <div className="form-control">
        <label>Task*</label>
        <input 
          style={{borderColor:fieldError.title && "red"}}
          type="text"
          placeholder="Add task title"
          disabled={isLoading}
          value={formValues.title}
          onChange={(e) => setFormValues({...formValues, title: e.target.value})
          }
        />
        {fieldError.title && (
            <span style={{color: "red"}}>
                 Please add a task title 
            </span>
        )}

     </div>
     <div className="form-control">
        <label>Description</label>
        <input 
           type="text"
           placeholder="Add task description"
           disabled={isLoading}
           value={formValues.description}
           onChange={(e) => setFormValues({ ...formValues, description: e.target.value})
        }
        />
     </div>
     <div className="form-control">
        <label> Task Day &amp; Time*</label>
        <input 
        style={{borderColor: fieldError.taskDay && "red"}}
        type="text"
        placeholder="Add Day &amp; Time"
        value={formValues.taskDay}
        disabled={isLoading}
        onChange={(e) => setFormValues({ ...formValues,taskDay: e.target.value})
        }
         />

         {fieldError.taskDay &&(
            <span style={{ color: "red"}}>
                Please add a date and time
            </span>
         )}
     </div>
     <div className="form-control form-control-check">
        <label>Set Reminder</label>
        <input type="checkbox"
        checked={formValues.reminder}
        disabled={isLoading}
        onChange={(e) => setFormValues({
          ...formValues, reminder: e.currentTarget.checked,
        })
        } 
        />
     </div>
     <input 
        className="btn btn-block"
        type="submit"
        value={`${isLoading
           ? "saving Task..." 
           :  updTask.id
           ?  "update Task"
           :  "Save Task"
          }`}
     />
    </form>
    </div>
  )
};

export default TaskForm;
