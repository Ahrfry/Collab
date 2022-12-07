const express = require('express')
const router = express.Router()
const conn = require('../db')

var bodyParser = require('body-parser')

var jsonParser = bodyParser.json()
 
// create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({ extended: false })
 


function get_user_areas(id){
    

    var promise = new Promise( function(resolve, reject) {
        var query = `SELECT User.id, User.first_name, User.last_name, User.degree, User.major, Area.name as area_name, Area.avg as avg , avg(AA.score) as score, Area.area_id FROM Collab.User as User join Collab.area_affinity as AA on AA.fk_receiver_id = User.id join Collab.Area as Area on Area.area_id = AA.fk_area_id where User.id = ${id} group by Area.area_id order by score DESC;`
        conn.query(query, function (err, results) {
          if (err || results.length === 0) {
            reject();
          } else {
            
            resolve(results);
          }
        });
    });
     
    return promise;
}



function get_user_detail(id){
    

    var promise = new Promise( function(resolve, reject) {
        var query = `SELECT * FROM User as User where id=${id}`
        conn.query(query, function (err, results) {
          if (err || results.length === 0) {
            reject();
          } else {
            
            resolve(results[0]);
          }
        });
    });
     
    return promise;
}


router.get('/logged/:id', jsonParser ,(req, res) => {
    var user_info = {};
    Promise.all([get_user_detail(req.params.id), get_user_areas(req.params.id)])
        .then(function (results) {
            user_info  = results[0];
            user_info['info'] = results[1];
            console.log("user info" , user_info);
            res.json(user_info);        
        });
    
        
    
    
})

router.post('/login', jsonParser , (req, res) => {
    
    conn.query(`SELECT * FROM User as User where username='${String(req.body.username)}' and password='${String(req.body.password)}'`, (err, rows, fields) => {
        if (err) throw err
      
        //console.log('The solution from logged is: ', rows)
        res.json(rows)
    })
    
    
})

router.get('/affinity/:id', (req, res) => {
    id = req.params.id;
    conn.query(`SELECT User.id, User.first_name, User.last_name, User.degree, User.major, Area.name as area_name, avg(AA.score) as score, Area.area_id FROM Collab.User as User join Collab.area_affinity as AA on AA.fk_receiver_id = User.id join Collab.Area as Area on Area.area_id = AA.fk_area_id where User.id = ${id} group by Area.area_id order by score DESC;`,
    (err, rows, fields) => {
        if (err) throw err
      
        //console.log('The solution from logged is: ', rows)
        res.json(rows)
    })
    
    
})

router.get('/projects/:id', (req, res) => {
    id = req.params.id;
    conn.query(`SELECT Project.name, Project.description, Project.project_id, Coll.collab_type FROM Collab.User User Inner Join Collab.Collaborate as Coll ON User.id = Coll.User_id Inner Join Collab.Project as Project ON Coll.project_id = Project.project_id where User.id = ${id};`,
    (err, rows, fields) => {
        if (err) throw err
      
        //console.log('The solution is: ', rows)
        res.json(rows)
    })
    
    
})


module.exports = router