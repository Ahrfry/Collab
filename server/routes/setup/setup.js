const express = require('express')
const router = express.Router()
const conn = require('../db')
var names = require('./names')
var bodyParser = require('body-parser')

var jsonParser = bodyParser.json()
 
// create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({ extended: false })

const total_users = 100;
const total_faculties = 20;

function random_between(min, max) { // min and max included 
  return Math.floor(Math.random() * (max - min + 1) + min)
}


function project_to_area(){
  description = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad ";
  
      
  conn.query("Select * from Collab.Project", function (err, projects) {
    if (err || projects.length === 0) {
      console.log(err);
    } else {   
      
      projects.map(project => {
        console.log(project);
        picked_aread = [];
        
        for(i=4; i < 9; i++){
          val = random_between(1,6); 
          while(picked_aread.includes(val)){
            val = random_between(1,6);
          }
          picked_aread.push(val)
          query = `INSERT INTO Collab.project_to_area (project_fk, area_fk, level)
    VALUES ('${project.project_id}', '${val}' , '${random_between(5 ,10)}')`;
        
          
          conn.query(query, function (err, results) {
            if (err || results.length === 0) {
              console.log(err);
            } else {
              
            console.log("Success");
              
            }
          });
          console.log(query);
      }
    });
      
    }
  });

}

function create_parts(){
  description = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad ";
  
      
  conn.query("Select * from Collab.Testbed", function (err, testbeds) {
    if (err || testbeds.length === 0) {
      console.log(err);
    } else {   
     
      testbeds.map(testbed => {

      
        for(i=4; i < 10; i++){
          query = `INSERT INTO Collab.Parts (part_name, part_description, fk_parts_testbed_id)
    VALUES ('${"Part" + testbed.Testbed.toString()+ i}', '${description}' , '${testbed.Testbed}')`;
        

          conn.query(query, function (err, results) {
            if (err || results.length === 0) {
              console.log(err);
            } else {
              
            console.log("Success");
              
            }
          });
      }
    });
      
    }
  });

}

function create_testbed(){
  
  description = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad ";
  
      
  conn.query("Select * from Collab.User as User where User.user_type = 'faculty'", function (err, faculty) {
    if (err || faculty.length === 0) {
      reject();
    } else {   
     

        for(i=0; i < 20; i++){
          query = `INSERT INTO Collab.Testbed (tb_name, tb_description,fk_tb_faculty_owner)
    VALUES ('${"Testbed" + i}', '${description}' , '${faculty[i].id}')`;
        

          conn.query(query, function (err, results) {
            if (err || results.length === 0) {
              console.log(err);
            } else {
              
            console.log("Success");
              
            }
          });
      }
      
    }
  });
      
   

}


function create_project(){
  project_names = ["Quantum" , "Database" , "In-memory" , "Accelerator", "Fast", "React", "Disk", "Slow", "Ultra"];
  description = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex";
  conn.query("Select * from Collab.User as User where User.user_type = 'faculty'", function (err, faculty) {
    if (err || faculty.length === 0) {
      reject();
    } else {
      
     
     conn.query("Select * from Collab.User as User where User.user_type = 'student'", function (err, students) {
      if (err || students.length === 0) {
        reject();
      } else {
        
        console.log(students[0], faculty[0]);

        for(i=0; i < 20; i++){
          query = `INSERT INTO Collab.Project (name, description, fk_student_owner, fk_faculty_owner)
    VALUES ('${project_names[random_between(0, 8)]+" "+project_names[random_between(0, 8)]+" "+project_names[random_between(0, 8)]}', '${description}' , '${students[random_between(0, students.length-1)].id}', '${faculty[random_between(0, faculty.length-1)].id}')`;
        }

        conn.query(query, function (err, results) {
          if (err || results.length === 0) {
            console.log(err);
          } else {
            
           console.log("Success");
            
          }
        });
      }
    });
      
    }
  });
  

}

function create_user(){
  degree = ["Undergrad" , "Master" , "PhD", "Postdoc"]
  user_type = ["Student" , "Faculty"]
  
  user_type_index = 0;
  min_degree = 0;
  for(i=0; i <total_users; i++){
    if(i > (total_users - total_faculties)){
      user_type_index = 1;
      min_degree = 2;
    }
    query = `INSERT INTO Collab.User (first_name, last_name, degree, major, username, password, user_type)
    VALUES ('${names[i]}', '${names[random_between(0, 500)]}' , '${degree[random_between(0, min_degree)]}', 'Computer Science', '${names[i]}', '12345', '${user_type[user_type_index]}')`;
    //console.log(query);
    conn.query(query, function (err, results) {
      if (err || results.length === 0) {
        reject();
      } else {
        
       console.log("Success");
        
      }
    });
  }
    
}

function user_to_area(){
  next_area = 1;
  user_to_area_count = 0;
  users_per_area = Math.floor((total_users-total_faculties)/6);
  for(i=0; i <total_users - total_faculties; i++){
    

    query = `INSERT INTO Collab.area_to_user (fk_user_id, fk_area_id)
    VALUES ('${i}', '${next_area}')`;

    conn.query(query, function (err, results) {
      if (err || results.length === 0) {
        console.log(err)
        
      } else {
        
       console.log("Success");
        
      }
    });

    if(user_to_area_count >= users_per_area){
      next_area+=1
      
      if(next_area > 6){
        next_area = 6;

      }
      user_to_area_count = 0;
    }
    user_to_area_count++;
    console.log(query)
  }
  next_area = 1;
  user_to_area_count = 0;
  users_per_area = 5;
  for(i=89; i <108; i++){
    

    query = `INSERT INTO Collab.area_to_user (fk_user_id, fk_area_id)
    VALUES ('${i}', '${next_area}')`;

    conn.query(query, function (err, results) {
      if (err || results.length === 0) {
        console.log(err)
        
      } else {
        
       console.log("Success");
        
      }
    });

    if(user_to_area_count >= users_per_area){
      next_area+=1
      
      if(next_area > 6){
        next_area = 6;

      }
      user_to_area_count = 0;
    }
    user_to_area_count++;
    console.log(query)
  }



}

function create_affinity(){
  
  
      
  conn.query("Select * from Collab.User", function (err, Users) {
    if (err || Users.length === 0) {
      reject();
    } else {   
     
      Users.map(user =>{
        for(i=0; i < 5; i++){
          query = `INSERT INTO Collab.area_affinity (fk_giver_id, fk_receiver_id, score ,fk_area_id)
    VALUES ('${Users[random_between(0,Users.length-1)].id}', '${user.id}' , '${random_between(5,10)}', ${random_between(1,6)})`;
        
         
          conn.query(query, function (err, results) {
            if (err || results.length === 0) {
              console.log(err);
            } else {
              
            console.log("Success");
              
            }
          });
        }
      })
      
        
      
    }
  });
      
   

}


router.get('/setup/', (req, res) => {
    
     
    res.json(create_affinity());
})


module.exports = router