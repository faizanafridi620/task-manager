import { useEffect } from 'react'
import { useState } from 'react'

function TaskForm({ onSubmit, initialData, isEditing }) {
    const [formData, setFormData] = useState({
        title: "",
        description: ""
    })
    const [error, setError] = useState("")

    useEffect(() => {
      if(initialData) {
        setFormData({
            title: initialData.title || "",
            description: initialData.description || ""
        })
      }
    },[initialData])

    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormData((prev) => ({
            ...prev,[name] : value
        }))
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if(!formData.title){
            setError("Title is required")
            return
        }
        onSubmit(formData)
        if(!isEditing){
            setFormData({
                title: "",
                description: ""
            })
        }
        setError("")
    }

  return (
    <div className="bg-white shadow-lg rounded-xl p-6 mb-6 max-w-2xl mx-auto">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
                {isEditing ? "Edit Task" : "Add New task"}
            </h2>
        <form onSubmit={handleSubmit}
        className="space-y-4"
        >
            {error && <p className="bg-red-100 text-red-600 p-3 rounded-md">{error}</p>}
            <div>

            <label className="block text-gray-700 font-medium mb-2">
                        Task Title
                    </label>

            <input type="text"
            name='title'
            placeholder='Task Title'
            value={formData.title}
            onChange={handleChange}
             className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            </div>

            <div>
            <label className="block text-gray-700 font-medium mb-2">
                Description
            </label>
            <textarea 
            name="description"
            placeholder='Task Description'
            value={formData.description}
            onChange={handleChange}
            rows={4}
            className="w-full border border-gray-300 rounded-lg p-3 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
             />

             </div>
             <button type='submit'
             className={`w-full py-3 rounded-lg text-white font-semibold transition duration-200 cursor-pointer ${isEditing ? "bg-yellow-500 hover:bg-yellow-600" : "bg-green-600 hover:bg-green-700"}`}
             >
               {isEditing ? "Update Task" : "Add Task"}
             </button>
        </form>
    </div>
  )
}

export default TaskForm