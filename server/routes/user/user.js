const express = require('express')
const router = express.Router()
const conn = require('../db')



router.get('/', (req, res) => {
    conn.query('SELECT * FROM User as User', (err, rows, fields) => {
        if (err) throw err
      
        console.log('The solution is: ', rows)
        res.json(rows)
    })
    
    
})


router.get('/logged', (req, res) => {
    
    conn.query('SELECT * FROM User as User where id=1', (err, rows, fields) => {
        if (err) throw err
      
        console.log('The solution from logged is: ', rows)
        res.json(rows)
    })
    
    
})

router.get('/projects', (req, res) => {
    conn.query('SELECT Project.name, Project.description FROM Collab.User User Inner Join Collab.Collaborate as Coll ON User.id = Coll.User_id Inner Join Collab.Project as Project ON Coll.Project_project_id = Project.project_id where User.id = 1;',
    (err, rows, fields) => {
        if (err) throw err
      
        console.log('The solution is: ', rows)
        res.json(rows)
    })
    
    
})


module.exports = router