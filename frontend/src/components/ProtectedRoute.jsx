import { useAuth } from "../context/AuthContext"
import { Navigate } from 'react-router-dom';

function ProtectedRoute({ children }) {
    const {user, loading} = useAuth();

    if(loading) {
        return   <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center">
      <div className="bg-white p-8 rounded-xl shadow-lg flex flex-col items-center">
        
        <div className="w-14 h-14 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>

        <h2 className="mt-4 text-lg font-semibold text-gray-800">
          Loading
        </h2>

        <p className="text-gray-500">
          Please wait...
        </p>
      </div>
    </div>
    }

    if(!user) {
        return <Navigate to="/" />
    }

  return children
}

export default ProtectedRoute