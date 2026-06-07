
function TaskCard({ task, deleteTask, toggleStatus, startEdit }) {
  return (
    <div className="bg-white shadow-md rounded-xl p-5 border border-gray-200 hover:shadow-lg transition">
        <div className="flex justify-between items-start mb-3">

        <h2 className="text-xl font-semibold text-gray-800">
            {task.title}
        </h2>

        <span className={`px-3 py-1 text-sm rounded-full text-white ${
            task.status === "Completed"
              ? "bg-green-500"
              : "bg-yellow-500"
          }`}>
            {task.status}
        </span>
        </div>

        <p className="text-gray-600 mb-4" >
            {task.description || "No description provided"}
        </p>
        
        
        <div className="flex flex-wrap gap-2">
            <button onClick={() => toggleStatus(task)}
                className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition cursor-pointer"
                >
                Toggle Status
            </button>

            <button onClick={() => startEdit(task)}
                className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-lg transition cursor-pointer"
                >
                Edit
            </button>
            <button onClick={() => deleteTask(task._id)}
                className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition cursor-pointer"
                >
                Delete
            </button>
        </div>
    </div>
  )
}

export default TaskCard