import React,{ Component, useState} from 'react'

export default function SignUp() {
    const [fname, setFname] = useState('');
    const [lname, setLname] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [Usertype, setUsertype] = useState('');
    const [secretKey, setsecretKey] = useState('')


    const handleSubmit = (e) =>{
        if(Usertype==='Admin' && secretKey!=="Munkh"){
            e.preventDefault();
            alert("Invalid admin")
        }else{
            e.preventDefault();

            console.log(fname,lname, email,password);
            fetch('http://localhost:3000/register',{
                method:'POST',
                crossDomain:true,
                headers:{
                    "Content-type":"application/json",
                    Accept:"appilcation/json",
                    "Access-Control-Allow-Origin":"*",
                },
                body:JSON.stringify({
                    fname,
                    email,
                    lname,
                    password,
                    Usertype
                }),
            })
                .then((res)=> res.json())
                .then((data)=> {
                    console.log(data, "userSign")
                    if(data.status === 'ok'){
                        alert("registeration success")
                        window.location.href='./sign-in'
                    }else{
                        alert("something went wrong")
                    }
                })
        }
      
    };
    return(
        <form onSubmit={handleSubmit}>
             <h3>Sign Up</h3>
            <div>
                Register as
                <input
                    type='radio'
                    name="UserType"
                    value='User'
                    onChange = {(e)=>setUsertype(e.target.value)}
                /> User
                <input
                    type='radio'
                    name='UserType'
                    value='Admin'
                    onChange={(e)=> setUsertype(e.target.value)}
                />  Admin

            </div>
            {Usertype==="Admin"?
                 <div className='mb-3'>
                 <label>Secret Key</label>
                 <input
                     type='text'
                     className='form-control'
                     placeholder='Secret Key'
                     onChange={(e)=> setsecretKey(e.target.value)}
                 />
             </div>
             :null
        }
           



             <div className='mb-3'>
                 <label>Firstname</label>
                 <input
                     type='text'
                     className='form-control'
                     placeholder='First name'
                     onChange={(e)=> setFname(e.target.value)}
                 />
             </div>
             <div className='mb-3'>
                 <label>Lastname</label>
                 <input
                     type='text'
                     className='form-control'
                     placeholder='Last name'
                     onChange={(e)=> setLname(e.target.value)}
                 />
             </div>
             <div className='mb-3'>
                 <label>Email</label>
                 <input
                     type='email'
                     className='form-control'
                     placeholder='First name'
                     onChange={(e)=> setEmail(e.target.value)}
                 />
             </div>
             <div className='mb-3'>
                 <label>Password</label>
                 <input
                     type='password'
                     className='form-control'
                     placeholder='Enter password'
                     onChange={(e)=> setPassword(e.target.value)}
                 />
             </div>
             <div className='d-grid'>
                <button type='submit' className='btn btn-primary'>
                    Sign Up
                </button>
                <p className='forgot-password text-right'>
                    Already registered<a href='/sign-in'>Sign in?</a>
                </p>
            </div>

        </form>
     )
}

    