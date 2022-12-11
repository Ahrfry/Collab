const express = require('express')
var cors = require('cors');
const user = require('./routes/user/user')
const project = require('./routes/project/project')
const area = require('./routes/area/area')
const setup = require('./routes/setup/setup')

const app = express()

const port = 3000

app.use(cors({origin: 'http://localhost:5000'}));
app.use('/users' , user)
app.use('/areas' , area)
app.use('/projects' , project)
app.use('/setup' , setup)


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})