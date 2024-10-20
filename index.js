const express = require('express')

const app = express()

const PORT = 8000
const users = require('./MOCK_DATA.json')


app.get('/',(req,res)=>{
  res.send('Home Page')
})


app.get('/api/users',(req,res)=>{
    res.send(users)
})


app.route('/api/users/:id').get((req,res)=>{
  const id1 = Number(req.params.id)
  const user = users.find(users=>users.id === id1)
  res.send(user)
}).post((req,res)=>{
  res.send({status:'pending'})
}).patch((req,res)=>{
  res.send({status:'pending'})
}).delete((req,res)=>{
  res.send({status:'pending'})
})

app.get('/users',(req,res)=>{
  const html = `<ul>
  ${users.map((users)=>`<li>${users.first_name}</li>`).join("")}
  </ul>`

  res.send(html)
})



app.listen(PORT,()=>{
  console.log(`Server is running on port ${PORT}`)
})