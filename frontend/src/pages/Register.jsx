import { api } from '../services/api'
import { jwtDecode } from 'jwt-decode'
import { useAuth } from '../context/AuthContext'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

function Register() {

    const {setUser} = useAuth();
    const [isLogin, setIsLogin] = useState(true);
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: ""
    })
    const navigate = useNavigate()

    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormData((prev) => ({
            ...prev, [name] : value
        }))
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if(isLogin) {
                const res = await api.post("/auth/login", {
                    email: formData.email,
                    password: formData.password
                })

                const token = res.data.token;
                localStorage.setItem("token", token)

                const decoded = jwtDecode(token)
                setUser(decoded)
                alert("Login Successful")
                navigate("/dashboard")
            } else {
                await api.post("/auth/signup", formData)
                alert("Signup successful now Login")
                setIsLogin(true)

                setFormData({
                    name: "",
                    email: "",
                    password: ""
                })
            }
        } catch (error) {
            console.log(error);
            alert(error.response?.data?.message || "Error occured")
        }
    }

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-center px-4">
        <div className="bg-white shadow-lg rounded-xl w-full max-w-md p-8">
            <h1 className="text-3xl font-bold text-center text-blue-600 mb-2">Task Manager</h1>
            <p className="text-center text-gray-500 mb-6">
                {isLogin ? "Welcome Back" : "Create an account"}
            </p>

            {isLogin ? (
                
                 <form onSubmit={handleSubmit}
                 className="space-y-4"
                 >

                    <div>
                        <label className="block mb-1 font-medium">Email</label>
                        <input type="email" 
                        name='email'
                        placeholder='Enter your email'
                        onChange={handleChange}
                        required
                         className="w-full border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    <div>
                        <label className="block mb-1 font-medium">Password</label>
                        <input type="password" 
                        name='password'
                        placeholder='Enter your password'
                        onChange={handleChange}
                        required
                        className="w-full border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    <button type='submit'
                     className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold transition cursor-pointer"
                    >
                        Login
                    </button>
                </form>
            ): (
                              <form onSubmit={handleSubmit}
                              className="space-y-4"
                              >
                    <div>
                        <label className="block mb-1 font-medium">Full Name</label>
                        <input type="text"
                        name='name'
                        placeholder='Enter your name'
                        onChange={handleChange}
                        className="w-full border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                        />
                    </div>

                    <div>
                        <label className="block mb-1 font-medium">Email</label>
                        <input type="email" 
                        name='email'
                        placeholder='Enter your email'
                        onChange={handleChange}
                        className="w-full border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                        />
                    </div>
                    
                    <div>
                        <label className="block mb-1 font-medium">Password</label>
                        <input type="password" 
                        name='password'
                        placeholder='Enter your password'
                        onChange={handleChange}
                        className="w-full border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                        />
                    </div>

                    <button type='submit'
                    className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg font-semibold transition cursor-pointer"
                    >
                        Signup
                    </button>
                </form>
            )}

            <p className="text-center mt-6 text-gray-600">
                {isLogin ? "Don't have an account?" : "Already have an account"}
                <span onClick={() => setIsLogin(!isLogin)}
                    className="ml-2 text-blue-600 font-semibold cursor-pointer hover:underline"
                    >
                    {isLogin ? "Signup" : "Login"}
                </span>
            </p>
        </div>

    </div>
  )
}

export default Register