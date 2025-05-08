const express=require("express");
const fs=require("fs");
const Path=require("path");
const { request } = require("http");
const bcrypt=require("bcrypt");
const { json } = require("body-parser");
const app=express();
//global variables
let logFile=Path.join(__dirname,"Static","log.log");
let UserData=Path.join(__dirname,"Static","userData.json");
let productFile=Path.join(__dirname,"Static","products.json");
let visitingCount={
    index:0,
    home:0,
    users:0
};
let currentTime=new Date();

//middlewares
//1 Logging Route and time
app.use(function(req,res,next)
{
    let content= `Route:${req.url.split("/")[1]}\nTime:${Date()}\n`;
    fs.appendFileSync(logFile,content);
    next();
})

//2 Count route visited
app.use(function(req,res,next)
{
    // console.log(req.path);
     if(req.path=="/home")
        visitingCount.home++;
    else if(req.path=="/index")
        visitingCount.index++;
    else if(req.path == "/users")
        visitingCount.users++;
        // console.log(visitingCount);
    next();
})

app.get("/index",function(request,response)
{
    response.sendFile(logFile);
    // response.send("running");
})
app.get("/home",function(request,response)
{
    // response.sendFile(path);
    response.send("Home running");
})
app.get("/users",function(req,res)
{
    res.send("users running");
})

app.get("/welcom/:username",function(req,res)
{
    let username=req.params.username;
    res.send("Welcom "+username)
})

app.get("/register/:email/:password",function(req,res)
{
    let email=req.params.email;
    let password=req.params.password;
    let hashedPassword=bcrypt.hashSync(password,5);
    let user=[{Email:email,HashedPassword:hashedPassword}];
    fs.appendFileSync(UserData,JSON.stringify(user));
    res.send("Regsitered successfully");
})
app.get("/login/:email/:password",function(req,res)
{
    let loginEmail=req.params.email;
    let loginPassword=req.params.password;
    fs.readFile(UserData,function(error,data)
    {
        if(error)
            throw error;
        // console.log(JSON.parse(data));
        
        let userData=JSON.parse(data);
            for(let obj of userData)
            {
                if(obj.Email==loginEmail)
                {
                    console.log("Email matched")
                    bcrypt.compare(loginPassword,obj.HashedPassword,function(err,same)
                        {
                            if(err)
                            {
                                console.log("not matched")
                                res.send("password not matched")
                                
                            }
                            console.log(same);
                            
                            if(same)
                                {
                                console.log("matched")
                                console.log(same)
                                res.send("ok");
                            }
                            else
                            res.status(401).send("password not Match")
                        })
                }
            }
        }
    );
    // console.log(userData);
    // // console.log(userfile[0]);
    // res.send("ok");
    // bcrypt.compare(password,)
})

let contentArray=[]
app.get("/product/:name/:price",function(req,res)
{
    let name=req.params.name;
    let price=req.params.price;
    let userinput={
        Name:name,
        Price:price
    }
    // fs.writeFileSync(productFile,"");
    let productFile2=fs.readFileSync(productFile,"utf-8");
    if(productFile2!="")
    {
        contentArray.push(userinput);
        fs.writeFileSync(productFile,JSON.stringify(contentArray));
    }
    else{
        console.log("second");
        fs.writeFileSync(productFile,JSON.stringify(contentArray));
    }

    // ,function(err,data)
    //     {
    //         console.log("data: ",JSON.stringify(data));
    //         if(data=="")
    //         {
    //             contentArray.push(userinput);
    //             fs.appendFileSync(productFile,JSON.stringify(contentArray));
    //         }
    //         else
    //         {
    //             data.push(userinput);
    //             fs.appendFileSync(productFile,JSON.stringify(contentArray));
    //         }
    //     });
    // // onsole.log("###########");
    res.send("Product Added");

})
app.get("/productSearch/:name",function(req,res)
{
    let name=req.params.name;
    // let content=[{
    //     Name:name,
    //     Price:price
    // }]
    let fileBeforeSearch= fs.readFileSync(productFile);
    let array=JSON.parse(fileBeforeSearch);
    console.log(array);
    let found=false;
    for(let obj of array)
    {
        console.log(obj);
        console.log(obj.Name==name);

        if(obj.Name==name)
        {
            found=true
        }
    }
    if(found)
    {
        res.send("ProductFound");
    }
    else
    {
        res.send("Product Not Found");
    }
});
app.get("/product/:index",function(req,res)
{
    let index=req.params.index;
    let file=fs.readFileSync(productFile);
    let found=false;
    for(let obj in JSON.parse(file))
    {
        if(obj==index)
            found=true;
    }
    if(found)
    {
        res.send("Found by index");
    }
    else
        res.send("not found by index");
});
app.get("/deleteProduct/:index",function(req,res)
{
    let index=req.params.index;
    let file=fs.readFileSync(productFile);
    let arr=JSON.parse(file);
    if(index>-1 && index<arr.length)
    {
        arr.splice(index,1);
        res.send("Product deleted successfully");
        fs.writeFileSync(productFile,JSON.stringify(arr));
    }
    else{
        res.send("Product deletion failed");
    }
});

app.get("/UpdateProduct/:index/:name/:price",function(req,res)
{
    let index=req.params.index;
    let name=req.params.name;
    let price=req.params.price;
    let newProduct={
        Name:name,
        Price:price
    }
    let file=fs.readFileSync(productFile);
    let arr=JSON.parse(file);
    if(index>-1 && index<arr.length)
    {
        arr.splice(index,1,newProduct);
        res.send("Product updated successfully");
        fs.writeFileSync(productFile,JSON.stringify(arr));
    }
    else{
        res.send("Product updated failed");
    }
});
app.listen(3000,function()
{
    console.log("Application is running ");
})

