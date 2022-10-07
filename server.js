import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';

import usersService from './usersService.js';

const PORT = 5000;
const app = express();

app.use(bodyParser.json());
app.use(cors());

app.get('/', (req, res)=>{
    console.log("Hello World");
    res.send("SOFIA is here!");
});

app.get('/users', (req, res)=>{
    res.send(usersService.getAllUsers())
});

app.get('/users/:userId', (req, res)=>{
    const { userId } = req.params;
    const requestedUser = usersService.getUserById(userId);
    res.send(requestedUser);
});


app.post('/users', (req, res)=>{
    const user= {
        id: Math.ceil((Math.random(4)*100000)),
        ...req.body
    }
    usersService.addNewUser(user);
    res.send('User added successfully')
});

app.patch('/users/:userId', (req, res)=>{
    const { userId } = req.params;
    const data = req.body;

    usersService.updateUserById(userId, data)

    res.send({
        status:"success",
    });   
});

app.delete('/users/:userId', (req, res)=>{
    const {userId} = req.params;
    const data = req.body;

    usersService.removeUserById(userId);
    res.send({
        status: "success",
    });
})

app.listen(PORT, (err)=> {
    if(!err){
        console.log("Server is listening at Port ", PORT);
    }
    else
        console.log("Server not responding because ", err);
});