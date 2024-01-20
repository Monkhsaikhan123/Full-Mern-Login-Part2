
import React, {useEffect, useState} from 'react';
import { FaTrash } from "react-icons/fa";
import axios from 'axios'

export default function AdminHome() {
    const [data, setData] = useState([])
    const [addSection, setAddSection] = useState(false)


    useEffect(()=>{
        fetch('http://localhost:3000/getUser', {
            method:"GET"
        })
        .then((res)=>res.json())
        .then((data)=>{
            console.log(data,'userData')
            setData(data.data)
        })
    },[])

    const handleSubmit = (e)=>{
        e.preventDefault()
    }
    axios.defaults.baseURL = 'http://localhost:3000/'
//​http://localhost:3000/deleteUser/65827ff9af863c83570ee2e0
    const deleteUser = async(id)=>{
        const data = await axios.delete('/deleteUser/'+id)
        alert(data.data.message)
        window.location.href='/userDetails'
    }

   


    const logOut=()=>{
        window.localStorage.clear();
        window.location.href='./sign-in'
    };
        return(
        <div className='auth-wrapper'>
            <form onSubmit={handleSubmit}>

            
                <div className='auth-inner'>
                    <h3>Welcome Admin</h3>
                    <table>
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Name</th>
                                <th>Name</th>
                                <th>Name</th>
                                <th>Name</th>
                            </tr>
                        </thead>
                        <tbody>
                        {
                            data.map((user, index) =>
                                {
                                return(
                                    <tr>
                                        <td>{index+1}</td>
                                        <td>{user.fname}</td>
                                        <td>{user.lname}</td>
                                        <td>{user.Usertype}</td>
                                        <td>{user.password}</td>
                                        <td><FaTrash onClick={()=>deleteUser(user._id)}/></td>
                                    </tr>
                                )
                            })
                        }
                        </tbody>     
                    </table>
                
                    <button onClick={logOut} type="button" className="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700">Log Out</button>
             

                </div>
            </form>
        </div>
        


          
        )
    }