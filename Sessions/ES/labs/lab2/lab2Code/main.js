// function getUsers(getToDos,draw)
// {
//     fetch("https://jsonplaceholder.typicode.com/users").then(function(request)
// {
//     return request.json();
// }).then(function(data)
// {
//     for (let user of data)
//         {
//              getToDos(user,draw);
//         }
// }).catch(function(error)
// {
//     console.log(error)
// })
// }


// async function getToDos(user,draw)
// {
//     let userId=user.id;
//     let todos=await fetch(`https://jsonplaceholder.typicode.com/todos?userId=${userId}`);
//     let userName= user.name;
//     let todosData=await todos.json();

 
//     // console.log(todosData[userId].title);
//     draw(userName,todosData);   
// }

// let navContainer=document.createElement("div");
// let todosListContainer=document.createElement("ul");

// function draw(userName,todosData)
// {
//         let navbutton=document.createElement("button");
//         // let todosTitle=todosData.title;
//         // console.log("to do title ",todosData);
//         navbutton.innerHTML=userName;
//         navContainer.appendChild(navbutton);
        
        
//         navbutton.addEventListener("click",function()
//         {
//             todosListContainer.innerHTML="";
//             for(let t of todosData)
//                 {
//                     let todoList=document.createElement("li");
//                     todoList.innerHTML=t.title;
//                     todosListContainer.appendChild(todoList);
//                 }   
//         })
            
//     document.body.appendChild(navContainer,todosListContainer);
// }
// getUsers(getToDos,draw);


// async function getall(drawlist)
// {
//     let response= await fetch("https://reqres.in/api/users");
//     let data= await response.json();
//     drawlist(data.data)
    
//     console.log(data)
// }

// let container=document.getElementById("task2");
// let cardContainer=document.getElementById("card");
// let showImage=document.getElementById("showImg");
// let selectContainer=document.getElementById("selectContainer");
// function drawlist(data)
// {
//     for (let i of data)
//         {
//             let firstName=i.first_name;
//             console.log(firstName);
//             let option=document.createElement("option");
//             option.setAttribute("value",JSON.stringify(i));
//             option.innerHTML=firstName;
//             selectContainer.appendChild(option);
//             cardContainer.appendChild(showImage);
//             console.log(showImage);
            
                                  
//         }
//     container.append(selectContainer,cardContainer);
//     document.body.appendChild(container);
// }

// selectContainer.addEventListener("change",function()
// {  
    
//     let data=JSON.parse(this.value)
//     cardContainer.innerHTML=`       <img src=${data.avatar} alt="">
//     <h3>First Name : ${data.first_name}</h3>
//     <h4>Email : ${data.email}</h4>
//     `
// })
// getall(drawlist);

let obj={
    name: "ahmed",
    age:22,
    [Symbol.iterator]:function* ()
    {
        for(let i in this)
            yield [i,this[i]]
    }
  }
  
  for (var p of obj) {
    console.log(`Property ${p} : value ${p}`);
  }