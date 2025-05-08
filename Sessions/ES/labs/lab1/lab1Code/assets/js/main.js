//1
let x=5;
let y=2;
let arr=[y,x];
let [tempX,tempY]=arr;
console.log(tempX);
console.log(tempY);


//2
let arr1=[12,33,52,-6];

function getMaxFromArray(arr)
{
    return Math.max(...arr);
}
function getMinFromArray(arr)
{
    return Math.min(...arr);
}
console.log(getMinFromArray(arr1));
//3
let Student={
    name:"Ahmed",
    university:"Luxor",
    faculty:"FCI",
    finalGrade:"B+"
}
console.log(`${Student.name} is a student in faculty of ${Student.university} in university ${Student.faculty} And his final grad is ${Student.finalGrade}.`);
//4

let Countires =["Egypt","Aswan","Aswan","Saudi Arabi","USA","Egypt"];
let CountiresSet= new Set(Countires);
// console.log(CountiresSet);
for(let c of CountiresSet)
    console.log(c);

console.log("# of repeated Countries: ",Countires.length-CountiresSet.size);


// Countires.forEach

//5

let Student2=new Map();
Student2.set("Ahmed",[{courseName:"JS",Grade:"Good"},{courseName:"JQuery",Grade:"V.Good"},{courseName:"ES",Grade:"Excellent"}]);
Student2.set("Saleh",[{courseName:"JS",Grade:"Excellent"},{courseName:"JQuery",Grade:"Excellent"},{courseName:"ES",Grade:"Excellent"}]);

for(let std of Student2)
    console.log(std);

let selected=document.getElementById("students");
let selectedData=document.getElementById("data");
let dataList=document.createElement("ul");
console.log("selected:");

console.log(selected.value);
selected.addEventListener('change',()=>{
    const studentData = Student2.get(selected.value)
    dataList.innerHTML="";
    console.log(studentData);
    studentData.forEach(function(e)
{
    let dataListitem=document.createElement("li");
    dataListitem.innerHTML=`${e.courseName}:${e.Grade}`;
    dataList.appendChild(dataListitem);
    
})
    selectedData.appendChild(dataList);
    document.body.appendChild(selectedData);
})




//6

var fruits = ["apple", "strawberry", "orange","mango"]

//a

// fruits.forEach(function(e)
// {
//     if(typeof(e)!=='string')
//     {
//         alert("Array Contains non String Value");
//         console.log(`the non String Value:${e}`);
//     }
    
// })

//b
console.log("###################");

console.log(fruits.some((val)=> val.startsWith("a")));

//c

// let newFruits = fruits.filter(function(Value)
// {
//     if(Value.startsWith("s")||Value.startsWith("b"))
//         return Value;
// })
// console.log(`NewFruits Array: ${newFruits}`);


//d
let likedFruits=fruits.map(function(v)
{
    return `i liked ${v}`;
})
console.log(likedFruits)


//e
likedFruits.forEach(function(e)
{
    console.log(e);
    
})