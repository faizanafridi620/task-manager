import { Menu, X } from 'lucide-react'
import { useState } from 'react'

function Navbar({ searchTerm, setSearchTerm, handleLogout }) {
    const [isOpen, setIsOpen] = useState(false);

  return (
    <>
    <nav className="bg-slate-800 text-white p-4 shadow-md">
        <div className="max-w-6xl mx-auto flex px-4 py-4 md:flex-row items-center justify-between gap-4">
            <h1 className="text-2xl font-bold">
                Task Manager
            </h1>
            <div className="hidden md:flex items-center gap-4">

            <input type="text"
            placeholder='Search tasks...'
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full md:w-80 px-3 py-2 rounded text-white border"
             />

             <button
             onClick={handleLogout}
            className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded cursor-pointer"
             >
                Logout
             </button>
             </div>
             <button className='md:hidden'
             onClick={() => setIsOpen(true)}
             >
                <Menu size={28}/>
             </button>
        </div>
    </nav>

    {isOpen && (
        <div className="fixed inset-0 bg-black/50 z-40"
        onClick={() => setIsOpen(false)}
        />
    )}
        <div className={`fixed top-0 right-0 h-full w-72 bg-white shadow-xl z-50 transform transition-transform duration-300 ${
          isOpen
            ? "translate-x-0"
            : "translate-x-full"
        }`}>
        <div className="flex justify-between items-center p-4 border-b">
        <h2 className="text-xl font-bold text-slate-800">
        Menu
        </h2>
        <button onClick={() => setIsOpen(false)}
        className="text-slate-700"
        >
        <X size={28}/>
        </button>
        </div>
        <div className="p-4 space-y-4">
                <input type="text" 
                placeholder='Search tasks...'
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full border rounded-lg px-3 py-2"
                />

                <button onClick={handleLogout}
                className="w-full bg-red-500 hover:bg-red-600 text-white py-2 rounded-lg"
                >
                Logout
                </button>
        </div>
        
        </div>
    
    </>
  )
}

export default Navbar