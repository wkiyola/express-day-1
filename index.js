
const express = require('express')
const app = express()
const port = process.env.PORT || 4000

const { users } = require('./state')

/* BEGIN - create routes here */


/* END - create routes here */

app.listen(port, () => 
  console.log(`Example app listening on port ${port}!`))