import axios from 'axios'
import { useState } from 'react'
import {useNavigate} from 'react-router-dom'

const URI = 'http://localhost:8000/blogs/register'

const CompRegister = () =>{
    const [user, setUser]= useState('')
    const [name, setName]= useState('')
    const [pass, setPass]= useState('')
    const navigate = useNavigate()
    const store = async (e) =>{
        e.preventDefault()
        await axios.post(URI,{user:user,name:name,pass:pass})
        navigate('/')
    }
    return(
        <div className='container'>
            <h3>Register</h3>
            <form onSubmit={store}>
                <div className="mb-6">
                    <label for="user" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your User</label>
                    <input type="text" id="user" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@flowbite.com" required
                    value={user}
                    onChange={(e)=>setUser(e.target.value)}
                    />
                </div>
                <div className="mb-6">
                    <label for="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your Name</label>
                    <input type="text" id="name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@flowbite.com" required
                    value={name}
                    onChange={(e)=>setName(e.target.value)}
                    />
                </div>
                <div class="mb-6">
                    <label for="pass" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your password</label>
                    <input type="password" id="pass" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required
                    value={pass}
                    onChange={(e)=>setPass(e.target.value)}
                    />
                </div>
                <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit</button>

            </form>
        </div>
    )

} 

export default CompRegister