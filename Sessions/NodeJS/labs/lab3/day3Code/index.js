const express= require("express");
const fs=require("fs");
const jwt=require("jsonwebtoken");
const { title } = require("process");
const app = express();
let usersFile="Users.json";
let users=[]
app.use(express.urlencoded())
app.use(express.json())

//register user
app.post("/api/register",function(req,res)
{
    let data=req.body;
    if(data.userName == "" ||data.UserName === undefined)
        res.status(422).json({error:"{UserName} is requierd"});   
    else if(data.Password == "" ||data.Password== undefined)
        res.status(422).json({error:"{Passwore} is requierd"});   
    else if(data.FirstName == "" ||data.FirstName== undefined)
        res.status(422).json({error:"{FirstName} is requierd"});   
    else
    {
        users.push(data);
        let token=jwt.sign(data,"secretKey");
        fs.writeFileSync(usersFile,JSON.stringify(users));
        res.status(200).json({message:"user was registered and token  successfully",token:token});
    }
})

//login user
app.post("/api/login",function(req,res)
{
    let userName=req.body.UserName;
    let password=req.body.Password;
    let firstName=req.body.FirstName;

    let users=JSON.parse(fs.readFileSync(usersFile));
    console.log(users);
    users.filter(function(item,index)
        {
            console.log(item.FirstName);
            console.log(item);
            if(item.UserName==userName)
                res.status(200).json({message: "logged in successfully", profile:`{UserName:${item.UserName}}`});
            // else if(item.Password==password)
            //     res.status(200).json({message: "logged in successfully", profile:`{Password:${item.Password}}`});
            // else if(item.FirstName==firstName)
            //     res.status(200).json({message: "logged in successfully", profile:`{FirstName:${item.FirstName}}`});
            else 
                res.status(401).json({error:"invalid credentials"});
        })
})

//get todos

app.get("/api/todos",function(req,res)
{
    try{
        let found=fs.existsSync("Todos.json");
        if(found)
        {
            let todos=JSON.parse(fs.readFileSync("Todos.json"));
            console.log(todos);
            res.status(200).json(todos);
        }
        else
        {
            res.send("there is no data");
        }
    }
    catch
    {
        res.send("error while getting the todos");
    }
})
// create todos

app.post("/api/todos",function(req,res)
{
    // let id=req.params.id;
    try{
        let found=fs.existsSync("Todos.json");
        if(found)
            {
            let todos=JSON.parse(fs.readFileSync("Todos.json"));
            let currentID=todos.length;
            let todoItem1=req.body;
            todoItem1['id']=currentID++;
            todos.push(todoItem1);
            fs.writeFileSync("Todos.json",JSON.stringify(todos));
            console.log(todos);
            res.status(200).json({message:"item added successfully"});
        }
        else
        {
            let i=0;
            let content=[];
            let todoItem2=req.body;
            todoItem2['id']=i++;
            content.push(todoItem2)
            fs.writeFileSync("Todos.json",JSON.stringify(content));
            
            // todos.push(todoItem);
            // console.log("Pushed",todoItem);
            // console.log("after push",todos);
            // fs.writeFileSync("Todos.json",JSON.stringify(todos));
            res.status(200).json({message: "todo created successfully"});
        }
    }
    catch
    {
        res.send("error while adding todo");
    }
    

})

//get with index
{
    
app.get("/api/todos/:index",function(req,res)
{
    try{
        let found=fs.existsSync("Todos.json");
        let index=req.params.index;
        console.log(index);
        
        if(found)
        {
            let todos=JSON.parse(fs.readFileSync("Todos.json"));
            console.log(todos);
            let wantedItem = todos.filter(function(item,i)
        {
            if(item.id==index)
                return item
        })
            res.status(200).json(wantedItem);
        }
        else
        {
            res.send("there is no data");
        }
    }
    catch
    {
        res.send("error while getting the todos");
    }
})
}

//update status with patch
app.patch("/api/todos/:index",function(req,res)
{
    try{
        let found=fs.existsSync("Todos.json");
        let index=req.params.index;
        console.log(index);
        
        if(found)
        {
            let todos=JSON.parse(fs.readFileSync("Todos.json"));
            console.log(todos);
            let wantedItem = todos.map(function(item,i)
        {
            if(item.id==index)
            {
                item.status=true;
                return item
            }
        })
            
            res.status(200).json(wantedItem);
        }
        else
        {
            res.send("there is no data");
        }
    }
    catch
    {
        res.send("error while updating status the todos");
    }
})


app.delete("/api/todos/:id",function(req,res){
    try{
        let found=fs.existsSync("Todos.json");
        let deletedId=req.params.id;
        
        if(found)
        {
            let todos=JSON.parse(fs.readFileSync("Todos.json"));
            console.log(todos);
            let newTodos = todos.filter((item, index) => index != deletedId - 1);

        //     let newTodos = todos.filter(function(item,index)
        // {
        //     item.id != deletedId
        // })
            console.log(newTodos);
            res.status(200).json(newTodos);
        }
        else
        {
            res.send("there is no data");
        }
    }
    catch (err)
    {
        res.send("error while deleting  the todos"+err);
    }


})
app.listen(3000,function()
{
    console.log("Server is listening");
})