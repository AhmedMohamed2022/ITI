    const fs = require("fs");
    const bcrypt = require("bcrypt");
    const readline = require("readline");
    const { timeStamp } = require("console");

    var r = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    });

    async function ask(message) {
    return new Promise(function (resolve, reject) {
        r.question(message, function (answer) {
        resolve(answer);
        });
    });
    }

    let data = [];
    async function hashPassword(password) {
    return new Promise(function (resolve, reject) {
        bcrypt.hash(password, 5, function (error, hashed) {
        resolve(hashed);
        });
    });
    return hash;
    }

    async function WriteToFile(data, fileName) {
    //   data.push({
    //     Name: userName,
    //     password: pass,
    //   });

    fs.createWriteStream(fileName,{flags:'a'}).write(
        JSON.stringify(data),
        "utf-8",
        function (error) {
        console.log(error);
        }
    );
    }
    /////////////////////////////////////////q2

    async function main() {
    // let userName=await ask("Enter your Name: ");
    // let password=await ask("Enter you password: ");
    // const hash = await hashPassword(password);
    // let data = [{
    //     usrName:userName,
    //     pass:hash
    // }];
    let file = "users.json";
    // await WriteToFile(data,file);
    // // r.close();
    // let data2=[];
    // let NumOfUsers=await ask("How Many users do you want to register: ");
    // for(let i=0;i<NumOfUsers;i++)
    // {
    //     let userName=await ask("Enter your Name: ");
    //     let age=await ask("Enter you age: ");
    //     let temp=`[${Date.now()}],Name:${userName},Age:${age},Status:${age>=18?"Adult":"Underage"}`;
    //     data2+=temp;
    // }
    // let file2="log.txt";
    // await WriteToFile(data2,file2);
    // let loginUserName = await ask("Enter you userName: ");
    // let loginPassword = await ask("Enter your Password: ");


    // fs.readFile("users.json", "utf8", (err, data) => {
    //     if (err) {
    //     console.error(err);
    //     return;
    //     }
    //     let result = JSON.parse(data);
    //     console.log(result);
    //     let found = false;
    //     for (let obj of result) {
    //     if (loginUserName == obj.usrName) {
    //         found = true;
    //         bcrypt.compare(loginPassword, obj.pass).then(function (result) {
    //         if (result) console.log("Successed");
    //         else console.log("login Failed");
    //         });
    //     }
    //     }
    //     if (!found) {
    //     console.log("UserName isn't found");
    //     }
    // });
    //////////////////////////////////////////

    while(true)
    {

    
        let option=await ask("Select from Options:1•Register a user 2•List all users 3•Login 4•Exit")
        if(option==1)
        {
        let userName=await ask("Enter your Name: ");
        let password=await ask("Enter you password: ");
        let data = [{
            usrName:userName,
            pass:hash
        }];
        const hash = await hashPassword(password);
        let file = "NewUsers.json";
        await WriteToFile(data,file);
        }
        else if(option==3)
        {
            let loginUserName1 = await ask("Enter you userName: ");
        let loginPassword1 = await ask("Enter your Password: ");


        fs.readFile("NewUsers.json", "utf8", (err, data) => {
            if (err) {
            console.error(err);
            return;
            }
            let result = JSON.parse(data);
            console.log(result);
            let found = false;
            for (let obj of result) {
            if (loginUserName1 == obj.usrName) {
                found = true;
                bcrypt.compare(loginPassword1, obj.pass).then(function (result) {
                if (result) console.log("Successed");
                else console.log("login Failed");
                });
            }
            }
            if (!found) {
            console.log("UserName isn't found");
            }
        });
        }
        else if(option==2)
        {
            let data2=[];
            let NumOfUsers=await ask("How Many users do you want to register: ");
            for(let i=0;i<NumOfUsers;i++)
            {
                let userName=await ask("Enter your Name: ");
                let age=await ask("Enter you age: ");
                let temp=`[${Date.now()}],Name:${userName},Age:${age},Status:${age>=18?"Adult":"Underage"}`;
                data2+=temp;
            }
            let file2="log.txt";
            await WriteToFile(data2,file2);
        }
        else
        {
            break;
        
        }
    }

    r.close();
    }


    main();
