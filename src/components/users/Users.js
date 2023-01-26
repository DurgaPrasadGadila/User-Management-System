import React from 'react'
import './Users.css'
import { useState,useEffect } from 'react'
import axios from 'axios'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { ModalTitle } from 'react-bootstrap';
import { useForm } from 'react-hook-form';

function Users() {

  //use form hook
  let {register,handleSubmit,formState:{errors},setValue,getValues}=useForm();

  //users state
  let [users,setUsers]=useState([])

  //user to edit state
  let [userToEdit,setUserToEdit]=useState({})

  //Modal state
  let [show,setShow]=useState(false);
  let showModal=()=>{
    setShow(true);
  }
  let closeModal=()=>{
    setShow(false);
  }

  //HTTP req error state
  let [err,setErr]=useState("")

  //edit user
  let editUser=(userObjToBeEdited)=>{
    showModal();
    setUserToEdit(userObjToBeEdited)
    //fill input fields with user details
     setValue("name",userObjToBeEdited.name)
     setValue("email",userObjToBeEdited.email)
     setValue("dob",userObjToBeEdited.dob)
     setValue("image",userObjToBeEdited.image)
  }
  //save user
  let saveUser=()=>{
    closeModal();
    //get modified user data
    let modifiedUser=getValues()
    //set id for modifiedUser
    modifiedUser.id=userToEdit.id;
    //make HTTP PUT req to save modifiedUser object
    axios.put(`http://localhost:4000/users/${modifiedUser.id}`,modifiedUser)
    .then(res=>{
      if(res.status===200){
           getUsers();
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

  //get users
  let getUsers=()=>{
    //fetch users
    axios.get("http://localhost:4000/users")
    .then(response=>{   
        if(response.status===200){
          setUsers(response.data)
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
  //delete user
  let deleteUser=(user)=>{
    axios.post('http://localhost:4000/removedUsers',user)
    .then((res)=>{
      if(res.status===201){
        //remove user from "users"
        axios.delete(`http://localhost:4000/users/${user.id}`)
        .then(res=>{
          if(res.status===200){
            getUsers();
          }
        })
      //clear error message
      setErr("");
      }else{
        throw new Error("Something went wrong");
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

  //side effect
  useEffect(()=>{
   getUsers();
  },[]);

  return (
    <div className='users'>
       {/* errors data display */}
       {err.length!==0 && (<p className='text-danger fw-bold display-2 text-center'>{err}</p>)}
        <div className='row row-cols-1 row-cols-sn-2 row-cols-md-3 g-4'>
          {
            users.map(userObj=><div className='col text-center mx-auto' key={userObj.id}>
              <div className='card'>
                <img src={userObj.image} className='mx-auto p-3 profile-image' alt="NO IMAGE" />
                <div className='card-body'>
                  <p className='display-3 name'>{userObj.name}</p>
                  <p className='lead fs-4'>{userObj.email}</p>
                  <p className='lead'>DOB : {userObj.dob}</p>
                  {/* edit button */}
                  <button className='btn btn-warning float-start' onClick={()=>editUser(userObj)}>Edit</button>
                  {/* delete button */}
                  <button className='btn btn-danger float-end' onClick={()=>deleteUser(userObj)}>Delete</button>
                </div>
              </div>
            </div>
            )
          }
        </div>
        {/* Modal to edit the user */}
        <Modal show={show} onHide={closeModal} backdrop="static" centered className='modal'>
          {/* modal header */}
          <Modal.Header>
            <Modal.Title>Edit Profile</Modal.Title>
          </Modal.Header>
          {/* modal body */}
          <Modal.Body>
            {/* form to edit */}
            <form onSubmit={handleSubmit()}>
                    {/* name */}
                    <div className='mb-3'>
                        <label htmlFor='name'>Name</label>
                        <input type="text" id="name" className='form-control' {...register("name")}></input>
                    </div>
                    
                    {/* email */}
                    <div className='mb-3'>
                        <label htmlFor='mail'>Email</label>
                        <input type="text" id="email" className='form-control' {...register("email")}></input>
                    </div>
                    
                    {/* date of birth */}
                    <div className='mb-3'>
                        <label htmlFor='dob'>Date of birth</label>
                        <input type="date" id="dob" className='form-control' {...register("dob")}></input>
                    </div>
                    
                    {/* image url */}
                    <div className='mb-3'>
                        <label htmlFor='image'>User image</label>
                        <input type="text" id="image" className='form-control' {...register("image")} disabled></input>
                    </div>
                </form>
          </Modal.Body>
          {/* modal footer */}
          <Modal.Footer>
            <Button onClick={saveUser}>Save</Button>
          </Modal.Footer>
        </Modal>
    </div>
  )
}

export default Users