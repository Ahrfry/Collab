const express = require('express')
const router = express.Router()
const conn = require('../db')



router.get('/', (req, res) => {
    conn.query('SELECT * FROM User as User', (err, rows, fields) => {
        if (err) throw err
      
        //console.log('The solution is: ', rows)
        res.json(rows)
    })
    
    
})



router.get('/logged/:id', (req, res) => {
    id = req.params.id.substring(req.params.id.indexOf(':')+1);
    conn.query(`SELECT * FROM User as User where id=${id}`, (err, rows, fields) => {
        if (err) throw err
      
        //console.log('The solution from logged is: ', rows)
        res.json(rows)
    })
    
    
})

router.get('/affinity/:id', (req, res) => {
    id = req.params.id.substring(req.params.id.indexOf(':')+1);
    conn.query(`SELECT User.id, User.first_name, User.last_name, User.degree, User.major, Area.name as area_name, sum(AA.score) as score FROM Collab.User as User join Collab.area_affinity as AA on AA.fk_receiver_id = User.id join Collab.Area as Area on Area.area_id = AA.fk_area_id where User.id = ${id} group by Area.area_id order by score DESC;`,
    (err, rows, fields) => {
        if (err) throw err
      
        //console.log('The solution from logged is: ', rows)
        res.json(rows)
    })
    
    
})

router.get('/projects', (req, res) => {
    conn.query('SELECT Project.name, Project.description, Coll.type FROM Collab.User User Inner Join Collab.Collaborate as Coll ON User.id = Coll.User_id Inner Join Collab.Project as Project ON Coll.Project_project_id = Project.project_id where User.id = 1;',
    (err, rows, fields) => {
        if (err) throw err
      
        //console.log('The solution is: ', rows)
        res.json(rows)
    })
    
    
})


module.exports = router