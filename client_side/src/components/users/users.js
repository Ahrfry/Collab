import React, {Component} from 'react'
import {Button , Card , Container, Row, Col, Table} from 'react-bootstrap'
import { BrowserRouter as Router, Route, Routes, useParams} from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'

import styles from './users.css';

function withParams(Component) {
    return props => <Component {...props} params={useParams()} />;
  }
  

class Users extends Component {  
    constructor(){
        super();
        this.state = {
            user:[],
            users: [],
            projects: [],
            areas: [],
            affinities: [],
            
        }
        
        
    }

    componentDidMount(){
        
        let { id } = this.props.params;
        
        const urls = [
            'http://localhost:3000/users/logged/'+id,
            'http://localhost:3000/users',
            'http://localhost:3000/users/projects',
            'http://localhost:3000/areas/logged',
            'http://localhost:3000/users/affinity/'+id
            

        ]

        let requests = urls.map((url) => fetch(url));
        Promise.all(requests)
            .then((responses) => {
                return Promise.all(responses.map((response) => response.json()));
            })
            .then((responses) => {
                this.setState({
                    user : responses[0],
                    users: responses[1],
                    projects: responses[2],
                    areas: responses[3],
                    affinities: responses[4]
                });
            });
    
    }

    

    render (){
        return (
           
                <Container fluid style={{ fontcolor: 'black' }}>
                    <Row >
                        <Col className="mh-100" md lg="2">
                            <Card >
                                <Card.Img variant="top" src={require('./../images/user/rafael_oliveira.jpg')} />
                                <Card.Body className="mh-100">
                                    
                                    <Card.Title>
                                        {this.state.user.map(user =>
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
                                    
                                  </tr>
                                </thead>
                                <tbody>
                            {this.state.affinities.map(affinity =>
                                
                                  <tr key={affinity.area_name+"parent"}>
                                    <td key={affinity.area_name}>{affinity.area_name}</td>
                                    <td key={affinity.score}>{affinity.score}</td>
                                    
                                  </tr>
                                      
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
                                
                                  <tr key={project.name+"parent"}>
                                    <td key={project.name}>{project.name}</td>
                                    <td key={project.type}>{project.type}</td>
                                    
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

export default withParams(Users);
