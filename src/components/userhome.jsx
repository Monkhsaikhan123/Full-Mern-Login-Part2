
import React, { useState, useEffect, } from 'react';
import { IoPerson } from "react-icons/io5";
import { useNavigate } from 'react-router-dom';

export default function Userhome() {


    const navigate = useNavigate()

    const [userData, setUserData] = useState('')

    useEffect(()=>{

        fetch('http://localhost:3000/userData',{
            method:"POST",
            crossDomain:true,
            headers:{
                "Content-Type" : 'application/json',
                Accept: 'appilcation/json',
                'Access-Control-Allow-Origin' : '*',
            },
            body:JSON.stringify({
                token:window.localStorage.getItem("token")
            })
        })
        .then((res)=>res.json())
        .then((data)=>{
            console.log(data)
            setUserData(data.data)
        })
    }, []);


    const logOut=()=>{
        window.localStorage.clear();
        window.location.href='./sign-in'
    };
        return(

            <div>
                <IoPerson onClick={()=>navigate('/updateuser' , {state: userData})} />
                <div className='user-header' style={{backgroundColor:'aqua'}}>
                    <h1>Хэрэглэгч</h1>
                    Name<h3>{userData.fname}{userData.lname}</h3>
                    Email<h3>{userData.email}</h3>
                    <br/>
                    <button onClick={logOut}>Log Out</button>

                    <h1>THIS IS USERHOME</h1>
                </div>
            </div>
           
        )
    }