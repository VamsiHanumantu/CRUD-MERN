import { useEffect, useState } from "react";
import axios from "axios"
import { useNavigate, useParams } from "react-router-dom"


const UpdateUser = () => {

   const {id} = useParams()
   const [name,setName] = useState('');
  const [email,setEmail]=useState('');
  const [age,setAge]=useState(0)
  const navigate = useNavigate();

  const update = (e)=>{
    e.preventDefault();
    axios.put("http://localhost:3000/updateuser/"+id,{name,email,age})
    .then(result=>{console.log(result)
      navigate('/')
    })
    .catch((err)=>console.log(err))
    
}


  useEffect(()=>{
    axios.get('http://localhost:3000/getuser/'+id)
    .then((result)=>{
      console.log(result)
      setName(result.data.name)
      setEmail(result.data.email)
      setAge(result.data.age)
    })
    .catch((err)=>console.log(err))
  },[id])
  return (
    <div className="d-flex vh-100 bg-primary justify-content-center align-items-center">
    <div className="w-50 bg-white rounded p-3">
    <form onSubmit={update} >
                <h2>Update User</h2>
                <div className="mb-3">
                    <label>Name</label>
                    <input type="text" placeholder="Enter Name"  className="form-control" value={name} onChange={(e)=>setName(e.target.value)}/>
                </div>
                <div className="mb-3">
                    <label >Email</label>
                    <input type="email" placeholder="Enter Email"  className="form-control" value={email}  onChange={(e)=>setEmail(e.target.value)} />
                </div>
                <div className="mb-3">
                    <label >Age</label>
                    <input type="text" placeholder="Enter Age"  className="form-control" value={age} onChange={(e)=>setAge(e.target.value)} />
                </div>
                <button type="submit" className="btn btn-success">Submit</button>
             </form>
    </div>
</div>
  )
}

export default UpdateUser
