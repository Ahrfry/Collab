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
    id = req.params.id
    conn.query('SELECT Area.name, Area.description FROM Collab.User User Inner Join Collab.area_to_user as A2U ON User.id = A2U.fk_user_id Inner Join Collab.Area as Area ON Area.area_id = A2U.fk_area_id where User.id = 1', (err, rows, fields) => {
        if (err) throw err
      
        //console.log('The solution from logged is: ', rows)
        res.json(rows)
    })
    
    
})

function get_projects(id){
    

    var promise = new Promise( function(resolve, reject) {
        var query = `SELECT * FROM Collab.project_to_area as PA join Collab.Project as Project on Project.project_id = PA.project_fk where PA.area_fk = ${id};`
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


function get_people(id){
    

    var promise = new Promise( function(resolve, reject) {
        var query = `SELECT * FROM Collab.User as User join Collab.area_to_user as AU on AU.fk_user_id = User.id where AU.fk_area_id = ${id};`
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

function get_area(id){
    

    var promise = new Promise( function(resolve, reject) {
        var query = `SELECT Area.name, Area.description FROM Collab.Area as Area where Area.area_id= ${id};`
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

router.get('/area/:id', (req, res) => {
    id = req.params.id;
    console.log("area id", id)
    
    Promise.all([get_area(id), get_people(id), get_projects(id)])
      .then(function (results) {
          area_info  = results[0];
          area_info['people'] = results[1];
          area_info['projects'] = results[2];
          
          console.log(area_info);  
            
        res.json(area_info);   
        
                 
    })
    
})


module.exports = router