import { useState } from "react";
import "./app.css";
import Task from "./Task";
import TaskForm from "./TaskForm";
import TaskHookForm from "./TaskHookForm";
import PeopleForm from "./PeopleForm";
import { initialTasks, initialTeam } from "./data";
import { ToastContainer } from "react-toastify";

function App() {
  const [tasks, setTasks] = useState(initialTasks);
  const [team, setTeam] = useState(initialTeam);

  function handleTaskSubmit(yeniTask) {
    setTasks([yeniTask, ...tasks]);
  }

  function handlePeopleSubmit(yeniKisi) {
    setTeam([...team, yeniKisi]);
  }

  function handleComplete(id) {
    const copyTask = [...tasks];
    const clickTask = copyTask.filter((olay) => olay.id === id)[1];
    clickTask.status = "done";
    setTasks(copyTask);
  }

  return (
    <>
      <div className="app">
        <div className="formColumn">
          <div className="form-container">
            <h2>New Task</h2>
            <TaskHookForm
              kisiler={team}
              submitFn={handleTaskSubmit}
              tasks={tasks}
            />
          </div>

          <div className="form-container">
            <h2>New Person</h2>
            <PeopleForm kisiler={team} submitFn={handlePeopleSubmit} />
          </div>
        </div>
        <div className="columns">
          <div className="column">
            <h2 className="column-title">To Do</h2>
            <div className="column-list">
              {tasks
                .filter((t) => t.status === "to do")
                .map((t) => (
                  <Task key={t.id} taskObj={t} />
                ))}
            </div>

            <div className="columns2">
              <div className="column2">
                <h2 className="column2-title">Done</h2>
                <div className="column2-list">
                  {tasks
                    .filter((t) => t.status === "done")
                    .map((t) => (
                      <Task key={t.id} taskObj={t} />
                    ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer
        position="bottom-right"
        autoClose={9000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
    </>
  );
}

export default App;
