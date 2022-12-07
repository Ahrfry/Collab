const express = require('express')
const router = express.Router()
const conn = require('../db')

var bodyParser = require('body-parser')

var jsonParser = bodyParser.json()
 
// create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({ extended: false })
 


function get_parts(testbed_id){
    

  var promise = new Promise( function(resolve, reject) {
      var query = `Select * from Collab.Parts as P where P.fk_parts_testbed_id=${testbed_id};`
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

function get_testbeds(id){
    

  var promise = new Promise( function(resolve, reject) {
      var query = `Select TB.tb_name, TB.tb_description, TB.Testbed, TB.parts From Collab.Testbed as TB \
      join Collab.testbed_to_project as TBTP on TBTP.fk_testbed_id = TB.Testbed join Collab.Project as Project on Project.project_id = TBTP.fk_project_id  where Project.project_id =${id};`
      conn.query(query, function (err, results) {
        if (err || results.length === 0) {
          reject();
        } else {
          
         resolve(results);
          
          
        }
        
      });
  });

  
  return promise
    
  
}



function get_areas(id){
    

  var promise = new Promise( function(resolve, reject) {
      var query = `SELECT * FROM Collab.project_to_area as PTA join Collab.Area as Area on Area.area_id = PTA.area_fk where PTA.project_fk =${id};`
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


function get_collabs(id){
    

    var promise = new Promise( function(resolve, reject) {
        var query = `SELECT * FROM Collab.Collaborate as Cob join User on User.id = Cob.User_id where Cob.project_id =${id};`
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



function get_project_detail(id){
    

    var promise = new Promise( function(resolve, reject) {
        var query = `SELECT * FROM Collab.Project as Project  where Project.project_id = ${id};`
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





router.get('/project/:id', (req, res) => {
    id = req.params.id;
    
    console.log(id);
    Promise.all([get_project_detail(id), get_collabs(id), get_areas(id), get_testbeds(id)])
      .then(function (results) {
          project_info  = results[0];
          project_info['info'] = results[1];
          project_info['areas'] = results[2];
          project_info['testbeds'] = results[3];
          
          console.log(project_info['testbeds'][0])
          var promise = get_parts(project_info['testbeds'][0].Testbed);
          promise.then(function(item){
            
            project_info['testbeds'][0].parts = item
            res.json(project_info);   
          })
                 
    })
    
})


module.exports = router