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
    
    conn.query('SELECT Area.name, Area.description FROM Collab.User User Inner Join Collab.area_to_user as A2U ON User.id = A2U.fk_user_id Inner Join Collab.Area as Area ON Area.area_id = A2U.fk_area_id where User.id = 1', (err, rows, fields) => {
        if (err) throw err
      
        console.log('The solution from logged is: ', rows)
        res.json(rows)
    })
    
    
})




module.exports = router