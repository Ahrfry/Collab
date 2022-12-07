import React, {Component} from 'react'
import {Button , Card , Container, Row, Col, Table} from 'react-bootstrap'
import { BrowserRouter as Router, Route, Routes, useParams, useNavigate, Link} from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'

import styles from './users.css';

function withParams(Component) {
    return props => <Component {...props} params={useParams()} navigate={useNavigate()} />;
}
  

class Profile extends Component {  
    constructor(){
        super();
        this.state = {
            user:[],
            users: [],
            projects: [],
            areas: [],
            affinities: [],
            user_id : localStorage.getItem("user")
        }
       
        
    }

    componentDidMount(){
        
        let { id } = this.props.params;
        
        
        
        
        
        const urls = [
            'http://localhost:3000/users/logged/'+id,
            
            'http://localhost:3000/users/projects/'+id,
            'http://localhost:3000/areas/logged/'+id,
            
            

        ]
        
        
        
        let requests = urls.map((url) => fetch(url));
        Promise.all(requests)
            .then((responses) => {
                return Promise.all(responses.map((response) => response.json()));
            })
            .then((responses) => {
                
                this.setState({
                    user : [responses[0]],
                    
                    projects: responses[1],
                    areas: responses[2]
                });
            });
        /*
        if(localStorage.getItem('user') < 0){
            console.log(localStorage.getItem('user'));
            this.props.navigate("/login/");
            
        }*/
    }

    

    render (){
        return (
           
                <Container fluid style={{ fontcolor: 'black' }}>
                    <Row >
                        <Col className="mh-100" md lg="2">
                            <Card >
                                {
                                    this.state.user.map(user =>
                                        <Card.Img key={user.id} variant="top" src={require(`./../images/user/${user.first_name.toLowerCase()}.jpg`)} />
                                    )
                                }
                                <Card.Body className="mh-100">
                                    
                                    <Card.Title>
                                        {
                                        this.state.user.map(user =>
                                            <div key={user.id.toString()+user.first_name+"parent"}>
                                            
                                            <p id={user.id.toString()+user.first_name} key={user.id.toString()+user.first_name}>{user.first_name} {user.last_name}</p>
                                            <p key={user.major}>{user.degree} {user.major}</p>
                                            </div>      
                                        )}
                                    </Card.Title>
                                    <Card.Text>
                                        
                                        {this.state.areas.map(areas =>
                                        
                                        <li id={areas.name} key={areas.name}>{areas.name}</li>    
                                    )}
                                    </Card.Text>
                                    
                                </Card.Body>
                            </Card>
                        </Col>
                        <Col md lg="5">
                        <Table striped bordered hover>
                                <thead>
                                  <tr>
                                    
                                    <th>Area</th>
                                    <th>Score</th>
                                    <th>Global AVG</th>
                                  </tr>
                                </thead>
                                <tbody>
                            {this.state.user.map(user =>
                                user.info.map(affinity =>
                                  <tr key={affinity.area_name+"parent"}>
                                    <td key={affinity.area_name}><a href={"/areas/area/"+ affinity.area_id}>{affinity.area_name}</a></td>
                                    <td key={affinity.score}>{affinity.score}</td>
                                    <td key={affinity.name + "avg"}>{affinity.avg}</td>
                                    
                                  </tr>
                                )
                                      
                            )}
                                </tbody>
                            </Table>
                        </Col>
                        <Col md lg="5">
                        <Table striped bordered hover>
                                <thead>
                                  <tr>
                                    
                                    <th>Project</th>
                                    <th>Collab Type</th>
                                    
                                  </tr>
                                </thead>
                                <tbody>
                            {this.state.projects.map(project =>
                                                                   
                                  <tr key={project.name+"parent"}  >
                                    
                                    <td key={project.name}><a href={"/project/"+ project.project_id}>{project.name}</a></td>
                                    <td key={project.collab_type}>{project.collab_type}</td>
                                   
                                    
                                  </tr>
                                
                                      
                            )}
                                </tbody>
                            </Table>
                        </Col>
                    </Row>
                    <Row>
                        <Col >
                            
                            
                                    
                        </Col>
                    </Row>
                </Container>
                
                 
                
           
        );
    }  
}

export default withParams(Profile);
