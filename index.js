
const express = require('express')
const users = require('./state.js')
const app = express()
//getting users

app.get('/', (req, res) => {
  res.send(`<a href="http://localhost:4000/users"> Get Users </a>`)
})
app.get('/users', (req, res) => {
  res.json(users)
})
app.get('/users/:id', (req, res) => {

  const found = users.some(user => user._id === parseInt(req.params.id));

  if(found){
    res.send(users.filter(user => user._id === parseInt(req.params.id)))
  }else{
    res.status(400).json(`User ID '${req.params.id}' not found`)
  }
})

//posting users

app.post('/users', (req, res) => {

 const newUser = {
    id: req.body._id,
    name: req.body.name,
    occupation: req.body.occupation,
    avatar: req.body.avatar
}
users.push(newUser)
res.json(users)
})


// updating users
app.put('/users/:id', (req, res) => {

  const found = users.some(user => user._id === parseInt(req.params.id));

  if(found){
    const updateUser = req.body;
    users.forEach(user => {
      if(user.id === parseInt(req.params.id)){
          user.name = updateUser.name ? updateUser.name : user.name;
          user.occupation = updateUser.occupation ? updateUser.occupation : user.occupation;
          user.avatar = updateUser.avatar ? updateUser.avatar : user.avatar;

          res.json({msg: 'User updated', user})
      }
    })
  }else{
    res.status(400).json(`User ID '${req.params.id}' not found`)
  }
})

//deleting users
app.delete('/users/:id', (req, res) => {

  const found = users.some(user => user._id === parseInt(req.params.id));

  if(found){
    res.send({ msg: 'User deleted', users: users.filter(user => user._id !== parseInt(req.params.id))})
  }else{
    res.status(400).json(`User ID '${req.params.id}' not found`)
  }
})


const port = process.env.PORT || 4000

app.listen(port, () => 
  console.log(`Example app listening on port ${port}!`))