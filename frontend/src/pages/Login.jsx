import React from 'react'
import { useState } from 'react'

const Login = () => {


const [state, setState] = useState("Sign Up");
const [name, setName] = useState('');
const [password, setPassword] = useState('');
const [email, setEmail] = useState('');

const onSubmitHandler = async (event) => {
event.preventDefault();
}


  return (
    <>
      <form className='min-h-[80vh] flex items-center '>
      <div className='flex flex-col gap-3 m-auto items-start p-8 min-w-[340px] sm:min-w-96 rounded-xl text-zinc-600 text-sm shadow-lg '>
        <p className='text-xl font-semibold'>{state === "Sign Up" ? "Create Account" : "LogIn" }</p>
        <p>Please <b>{state === "Sign Up" ? "Sign Up" : "LogIn" }</b> to Book Your Appointment</p>
     
        {
          state === "Sign Up" && 
          <div className='w-full'> 
          <p>Full Name</p>
          <input className='border border-zinc-300 rounded w-full p-2 mt-1' type="text" onChange={(e) => setName(e.target.name)}  value={name}/>
          </div>
        }
              

      <div className='w-full'>
      <p>Email</p>
      <input className='border border-zinc-300 rounded w-full p-2 mt-1' type="email" onChange={(e) => setEmail(e.target.email)}  value={email}/>
      </div>

      <div className='w-full'>
      <p>Password</p>
      <input className='border border-zinc-300 rounded w-full p-2 mt-1' type="Password" onChange={(e) => setName(e.target.password)}  value={password}/>
      </div>

      <button className='w-full bg-primary text-white text-md rounded py-2'>{state === "Sign Up" ? "Create Account" : "LogIn" }</button>
          {
            state === "Sign Up"
            ?
            <p>Already have a account? <span onClick={() => setState('LogIn') }  className='text-primary underline cursor-pointer'>Login here</span></p> 
            :
            <p>Create a account? <span onClick={() => setState('Sign Up') } className='text-primary underline cursor-pointer'>Click here</span> </p>
          }


      </div>
      </form>

    </>
  )
}

export default Login
