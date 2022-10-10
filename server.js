import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import usersService from './usersService.js'
import dotenv from 'dotenv'
import dbService from './dbService.js'

dotenv.config()
//const dbUser= dbService.getUsers();

const PORT = 5000
const app = express()

app.use(bodyParser.json())
app.use(cors())

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.get('/users', dbService.getUsers)

app.get('/users/:userId', dbService.getUserById)

app.post('/users', dbService.addNewUser)

app.patch('/users/:userId', dbService.updateUserById)

app.delete('/users/:userId', dbService.deleteUser)

app.listen(PORT, err => {
  if (!err) {
    console.log('Server is listening at Port ', PORT)
  } else console.log('Server not responding because ', err)
})
