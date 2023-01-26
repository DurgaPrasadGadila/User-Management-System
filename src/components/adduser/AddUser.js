import {useState} from 'react'
import './AddUser.css'
import {useForm} from 'react-hook-form'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'


function AddUser() {

    //navigate hook
    let navigate=useNavigate();

    //use form hook
    let {register,handleSubmit,formState:{errors}}=useForm();
    //HTTP req error state
    let [err,setErr]=useState("")


    let addNewUser=(newUser)=>{

        console.log(newUser)
        //save new user to json-server by HTTP post req
        axios.post(" http://localhost:4000/users",newUser)
        .then(response=>{
            console.log(response)
            if(response.status===201)
            {
                setErr("")
                //navigate to users component
                navigate("/users");
            }
        })
        .catch(err=>{
            //console.log("err is ",err)
            //the client was given an error response(4..,5..)
            if(err.respone){
                setErr(err.message);
            }
            //the client received a response and the req was never left
            else if(err.request){
                setErr(err.message);
            }
            //other errors
            else{
                setErr(err.message);
            }
        })
    }

  return (
    <div className='add-user'>
        <p className='display-3 text-center'>Add New User</p>
        {/* HTTP err message*/}
         {err.length!=0 && <p className='display-3 fw-bold text-center text-danger'>{err}</p>}
        {/* responsive form */}
        <div className='row'>
            <div className='col-11 col-sm-8 col-md-6 mx-auto'>
                <form onSubmit={handleSubmit(addNewUser)}>
                    {/* name */}
                    <div className='mb-3'>
                        <label htmlFor='name'>Name</label>
                        <input type="text" id="name" className='form-control' {...register("name",{required:true})}></input>
                    </div>
                    {/* validation errors for name */}
                    {errors.name?.type==="required" && <p className='text-danger fw-bold'>*Name is required</p>}
                    {/* email */}
                    <div className='mb-3'>
                        <label htmlFor='mail'>Email</label>
                        <input type="text" id="email" className='form-control' {...register("email",{required:true})}></input>
                    </div>
                    {/* validation errors for email */}
                    {errors.name?.type==="required" && <p className='text-danger fw-bold'>*Email is required</p>}
                    {/* date of birth */}
                    <div className='mb-3'>
                        <label htmlFor='dob'>Date of birth</label>
                        <input type="date" id="dob" className='form-control' {...register("dob",{required:true})}></input>
                    </div>
                    {/* validation errors for dob */}
                    {errors.name?.type==="required" && <p className='text-danger fw-bold'>*DOB is required</p>}
                    {/* image url */}
                    <div className='mb-3'>
                        <label htmlFor='image'>User image</label>
                        <input type="text" id="image" className='form-control' {...register("image",{required:true})}></input>
                    </div>
                    {/* validation errors for image */}
                    {errors.name?.type==="required" && <p className='text-danger fw-bold'>*Image URL is required</p>}
                    {/* submit button */}
                    <button type="submit" className='btn add-user-btn'>Create New User</button>
                </form>
            </div>
        </div>
    </div>
  )
}

export default AddUser