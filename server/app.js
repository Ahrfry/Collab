const express = require('express')
var cors = require('cors');
const user = require('./routes/user/user')
const area = require('./routes/area/area')

const app = express()

const port = 3000

app.use(cors({origin: 'http://localhost:5000'}));
app.use('/users' , user)
app.use('/areas' , area)





app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})