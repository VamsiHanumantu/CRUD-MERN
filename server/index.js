import express from 'express'
import cors from 'cors'
import mongoose from 'mongoose'


const app = express();
const corsOptions = {
    origin: 'http://localhost:5173',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true, // Enable cookies and session support if needed
    optionsSuccessStatus: 204, // Set the status code for successful OPTIONS requests
  };
  
  app.use(cors(corsOptions));
  
app.use(express.json())

mongoose.connect("mongodb://127.0.0.1:27017/crud");

const UserSchema = new mongoose.Schema({
    name: String,
    email: String,
    age: Number
})

const UserModel = mongoose.model("users",UserSchema)

app.get('/',(req,res)=>{
    UserModel.find({})
    .then(users=>res.json(users)) 
    .catch(err=>res.json(err))
})

app.get("/getuser/:id",(req,res)=>{
    const id = req.params.id;
    UserModel.findById({_id:id})
    .then(users=>res.json(users))
    .catch(err=>res.json(err))
})

app.post("/createuser",(req,res)=>{
    UserModel.create(req.body)
    .then((users)=>res.json(users))
    .catch((err)=> res.json(err))  
})

app.put('/updateuser/:id', (req, res) => {
    const id = req.params.id;
    const { name, email, age } = req.body; // Destructure the request body
    UserModel.findByIdAndUpdate(
      { _id: id },
      { name, email, age }, // Update all fields in a single object
      { new: true } // This option returns the updated document
    )
      .then((user) => res.json(user))
      .catch((err) => res.json(err));
  });


app.delete('/deleteUser/:id',(req,res)=>{
    const id = req.params.id;
    UserModel.findByIdAndDelete({_id: id})
    .then((res)=>res.json(res))
    .catch((err)=>res.json(err))

})

app.listen(3000,()=>{
    console.log("server is running on port 3000")
})