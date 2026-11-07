import { useState } from 'react'
import './App.css'
import { useEffect } from 'react';
import { axiosInstance } from './axios.js';
function App() {
  const [users, setUsers] = useState([])
  const [formData, setFormData] = useState({
    name: '',
    email : ''
  })
  // const fetchData = async()=>{
  //   const response = await axiosInstance.delete('/users/4')
  //   console.log(response.data);
  // }

  const fetchData = async()=>{
    const response = await axiosInstance.get('/users')
    setUsers(response.data);
  }
 
  useEffect(()=>{
    fetchData()
  },[])



  const postData = async()=>{
    if(formData.name === '' || formData.email === ''){
      alert('Empty values are not accepted')
      return
    }
    const response = await axiosInstance.post('/users',formData)
    fetchData()
  }

  const handleSubmit = (e)=>{
    e.preventDefault();
    postData()
    setFormData({
      name: '',
      email: ''
    })
  }

  const handleChange = (e)=>{
    const{name,value} = e.target;
    setFormData({...formData, [name] : value})
  }

  const handleDelete = async(id)=>{
    const response = await axiosInstance.delete(`/users/${id}`)
    fetchData()
  }

  const editData = async()=>{
    if(formData.name === '' || formData.email === ''){
      alert('Empty values are not accepted')
      return
    }
    const response = await axiosInstance.put(`/users/${formData.id}`, formData)
    setFormData({
      name:'',
      email:''
    })
    fetchData()
  }

  return(
    <>
      <form onSubmit={handleSubmit} >

        <br></br>
        <br></br>
        
        <input 
        placeholder='Enter Your Name...'
        type='text' 
        name='name' 
        value={formData.name} 
        onChange={handleChange} />

        <br></br>
        <br></br>

        <input 
        placeholder='Enter Your Email...'
        type='text' 
        name='email' 
        value={formData.email} 
        onChange={handleChange} />

        <br></br>
        <br></br>
        {formData.editMode?
        <button 
        type='button'
        onClick={editData}>
          Save Data
        </button>
          :
        <button 
        type='submit'>
        Post data
        </button>
        }

      </form>

      {users.map((curr)=>(
        <div key = {curr.id}>
          <div>{curr.name}</div>
          <div>{curr.email}</div>
          <button onClick={()=> handleDelete(curr.id) } >Delete</button>
          <button onClick={()=> setFormData({...curr, editMode: true})}>Edit</button>
          <br>
          </br>
          <br></br>
        </div>
      ))}
    </>
  )   
}

export default App
