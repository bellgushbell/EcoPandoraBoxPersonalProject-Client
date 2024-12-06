import React from 'react'
import useUserStore from '../../stores/user-store'
import { useNavigate } from 'react-router-dom'

function SidebarAdmin() {
    const logout = useUserStore(state => state.logout)
    const navigate = useNavigate()


    const handleLogout = () => {
        logout()
        navigate("/")
    }

    return (
        <div className="bg-green-500 h-screen flex flex-col p-6 rounded-2xl shadow-2xl sticky top-0">



            <button className="w-full text-[#E0E0E0] text-lg font-semibold p-3 mt-2 hover:bg-[#66B3FF] hover:text-white rounded-lg transition-all duration-300 ease-in-out transform hover:scale-105"
                onClick={handleLogout}
            >
                LOGOUT
            </button>
        </div>

    )
}

export default SidebarAdmin





// import React from 'react'
// import useUserStore from '../../stores/user-store'
// import { useNavigate } from 'react-router-dom'

// function SidebarAdmin() {
//     const logout = useUserStore(state => state.logout)
//     const navigate = useNavigate()


//     const handleLogout = () => {
//         logout()
//         navigate("/")
//     }

//     return (
//         <div className="bg-green-500 h-screen flex flex-col p-6 rounded-2xl shadow-2xl sticky top-0">



//             <button className="w-full text-[#E0E0E0] text-lg font-semibold p-3 mt-2 hover:bg-[#66B3FF] hover:text-white rounded-lg transition-all duration-300 ease-in-out transform hover:scale-105"
//                 onClick={handleLogout}
//             >
//                 LOGOUT
//             </button>
//         </div>

//     )
// }

// export default SidebarAdmin

