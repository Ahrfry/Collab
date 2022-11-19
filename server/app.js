const express = require('express')
var cors = require('cors');
const user = require('./routes/user/user')
const app = express()

const port = 3000

app.use(cors({origin: 'http://localhost:5000'}));
app.use('/users' , user)





app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})