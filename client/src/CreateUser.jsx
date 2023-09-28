import { useState } from "react";
import axios from "axios"
import { useNavigate } from "react-router-dom";

const CreateUser = () => {

  const [name,setName] = useState();
  const [email,setEmail]=useState();
  const [age,setAge]=useState()

  const navigate = useNavigate();

  const handleSubmit = (e)=>{
      e.preventDefault();
      axios.post("http://localhost:3000/createuser",{name,email,age})
      .then(result=>console.log(result))
      .catch((err)=>console.log(err))
      navigate('/')
  }
  return (
    <div className="d-flex vh-100 bg-primary justify-content-center align-items-center">
        <div className="w-50 bg-white rounded p-3">
             <form  onSubmit={handleSubmit} method="post">
                <h2>Add User</h2>
                <div className="mb-3">
                    <label>Name</label>
                    <input type="text" placeholder="Enter Name"  className="form-control" onChange={(e)=>setName(e.target.value)} />
                </div>
                <div className="mb-3">
                    <label >Email</label>
                    <input type="email" placeholder="Enter Email"  className="form-control"  onChange={(e)=>setEmail(e.target.value)}/>
                </div>
                <div className="mb-3">
                    <label >Age</label>
                    <input type="text" placeholder="Enter Age"  className="form-control"  onChange={(e)=>setAge(e.target.value)} />
                </div>
                <button type="submit" className="btn btn-success">Submit</button>
             </form>
        </div>
    </div>
  )
}

export default CreateUser
