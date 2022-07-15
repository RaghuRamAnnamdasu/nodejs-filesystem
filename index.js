import fs from "fs";
import express from "express";
import dotenv from "dotenv";

const app = express();

dotenv.config();

const port = process.env.PORT || 5000;





app.get("/",(req,res)=>{
  res.send(
    "Create File & Retrieve Files in Folder. </br></br></br>Hi EveryOne, this is an illustration to create a file in backup folder and retrieve files from backup folder.</br></br>When ever we go to URL localhost:5000/createFile every time a file is created with file name as current date and time and content as Timestamp.</br></br>When ever we go to URL localhost:5000/retrieveFile we can get the list of files in backup folder."
  );
})

app.get("/createFile",(req,res)=>{
  const fileName = `${new Date().toLocaleDateString("es-CL")} T${new Date().getHours()}(Hrs)-${new Date().getMinutes()}(Min)-${new Date().getSeconds()}(Sec)`;
  const timeStamp = new Date().toString();
  fs.writeFile(`./backup/${fileName}.txt`,timeStamp,(err)=>{
    if(err){
      console.log(err);
    }else{
      res.send({"message" : `File Created with file name as ${fileName} and having content as ${timeStamp}`});
    }
  });
})



app.get("/retreiveFile",(req,res)=>{
  fs.readdir("./backup","utf-8",(err,data)=>{
    if(err){
        console.log(err);
    }else{
      let dataList ="";
      data.map((value)=>{
      dataList = dataList + value + "</br>";
      })
      res.send(dataList.trim());
    }
  })
})


app.listen(port,()=>{console.log(`App has started in ${port}`)})