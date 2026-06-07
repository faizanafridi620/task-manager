import { api } from "../services/api";
import { useState } from "react";
import { useEffect } from "react";
import TaskForm from "../components/TaskForm";
import TaskCard from "../components/TaskCard";
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Dashboard() {
  const [tasks, setTasks] = useState([]);
  const [showTaskForm, setShowTaskForm] = useState(false);
  const [loading, setLoading] = useState(true);
  const [editTask, setEditTask] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();
  const { setUser } = useAuth();

  const fetchTasks = async () => {
    try {
      const res = await api.get("/tasks");
      //  console.log(res.data.tasks);

      setTasks(res.data.tasks);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const addTask = async (taskData) => {
    try {
      const res = await api.post("/tasks", taskData);
      // console.log("New Task", res.data);

      setTasks((prev) => [res.data.task, ...prev]);
      setShowTaskForm(false);
    } catch (error) {
      console.log(error);
    }
  };

  const updateTask = async (id, taskData) => {
    try {
      const res = await api.put(`/tasks/${id}`, taskData);
      // console.log(res.data);

      setTasks((prev) =>
        prev.map((task) => (task._id === id ? res.data.updateTask : task)),
      );
      setEditTask(null);
      setShowTaskForm(false);
    } catch (error) {
      console.log(error);
    }
  };

  const deleteTask = async (id) => {
    try {
      await api.delete(`/tasks/${id}`);

      setTasks((prev) => prev.filter((task) => task._id !== id));
    } catch (error) {
      console.log(error);
    }
  };

  const toggleStatus = async (task) => {
    try {
      const status = task.status === "Pending" ? "Completed" : "Pending";

      const res = await api.put(`/tasks/${task._id}`, { status });
      // console.log(res.data);

      setTasks((prev) =>
        prev.map((t) => (t._id === task._id ? res.data.updateTask : t)),
      );
    } catch (error) {
      console.log(error);
    }
  };

  const startEdit = (task) => {
    setEditTask(task);
    setShowTaskForm(true);
  };

  const filteredTasks = tasks.filter(
    (task) =>
      task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      task.description.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const handleLogout = () => {
    localStorage.removeItem("token");
    setUser(null);
    alert("Logged out Successfully");
    navigate("/");
  };

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center bg-gray-100">
        <div className="text-xl font-semibold text-gray-700">
          Loading Tasks...
        </div>
      </div>
    );
  }

  return (
    <>
      <Navbar
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        handleLogout={handleLogout}
      />
      <div className="min-h-screen bg-gray-100 p-6">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
            <h1 className="text-3xl font-bold text-gray-800">Task Dashboard</h1>
            <button
              onClick={() => {
                setShowTaskForm(!showTaskForm);
                if (!showTaskForm) setEditTask(null);
              }}
              className="px-5 py-3 rounded-lg text-white font-medium bg-green-600 hover:bg-green-700 transition cursor-pointer"
            >
              Add Task
            </button>
          </div>

          {showTaskForm && (
            <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
              <div className="relative w-full max-w-2xl mx-4">
                <button
                  onClick={() => {
                    setShowTaskForm(false);
                    setEditTask(null);
                  }}
                  className="absolute -top-12 right-0 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg cursor-pointer"
                >
                  X
                </button>

                <TaskForm
                  initialData={editTask}
                  isEditing={!!editTask}
                  onSubmit={(data) => {
                    if (editTask) {
                      updateTask(editTask._id, data);
                    } else {
                      addTask(data);
                    }
                  }}
                />
              </div>
            </div>
          )}

          {filteredTasks.length === 0 ? (
            <div className="bg-white rounded-xl shadow p-8 text-center">
              <h2 className="text-xl font-semibold text-gray-700">
                No Tasks Found
              </h2>

              <p className="text-gray-500 mt-2">
                Create a new task or try another search.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {filteredTasks.map((task) => (
                <TaskCard
                  key={task._id}
                  task={task}
                  deleteTask={deleteTask}
                  toggleStatus={toggleStatus}
                  startEdit={startEdit}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default Dashboard;
