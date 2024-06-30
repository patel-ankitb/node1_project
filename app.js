const express = require('express');
const mongoose = require('mongoose');
const app = express();
app.use(express.json())

//-----------------user api---------------------------------------------->
const userrouter = require("./src/router/UserRouter")
app.use("/data",userrouter)

//-----------post----------------------------------------------------------->
const postrouter = require('./src/router/PostRouter')
app.use("/posts",postrouter)

//--------------------comment api -------------------------------------------->

const commentrouter = require('./src/router/CommentRouter')
app.use("/comments",commentrouter)


mongoose.connect("mongodb://127.0.0.1:27017/project_node").then(()=>
 {
        console.log("connected to database......")
}).catch((err)=>
{
       console.log("error connecting to database...!",err)
})
    
const PORT = 3033;
app.listen(PORT,()=>{
    console.log(`server running on port---> ${PORT}`);
        
})