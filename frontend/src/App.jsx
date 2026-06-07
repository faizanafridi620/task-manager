import ProtectedRoute from "./components/ProtectedRoute"
import Dashboard from "./pages/DashBoard"
import Register from "./pages/Register"
import { BrowserRouter, Routes, Route } from "react-router-dom"


function App() {

  return (
    <>
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<Register />} />
        <Route path="/dashboard" element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }/>
      </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
