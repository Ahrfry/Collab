import React, {Component} from 'react'
import {Button , Card , Container, Row, Col, Table, Badge} from 'react-bootstrap'
import { BrowserRouter as Router, Route, Routes, useParams, useNavigate} from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'

import styles from './users.css';

function withParams(Component) {
    return props => <Component {...props} params={useParams()} navigate={useNavigate()} />;
}
  

class Project extends Component {  
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
        //let aut = localStorage.getItem('user');
        
        
        
        const urls = [
            
            
            'http://localhost:3000/projects/project/'+id,
            
            
            

        ]
        
        

        let requests = urls.map((url) => fetch(url));
        Promise.all(requests)
            .then((responses) => {
                return Promise.all(responses.map((response) => response.json()));
            })
            .then((responses) => {
                
                this.setState({
                   
                    
                    projects: [responses[0]],
                    
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
                        <Col className="mh-100" md lg="4">
                            <Card >
                                <Card.Img variant="top" src={require('./../images/project/vazado.jpg')} />
                                <Card.Body className="mh-100">
                                    
                                    
                                    {this.state.projects.map(project =>
                                
                                        <div key={project.project_id.toString()+"parent"}>
                                            
                                                <h1 key={project.project_id}>{project.name}</h1>
                                            
                                                <h5 >
                                                    {project.description}
                                                    
                                                </h5>
                                                 
                                        </div>  
                                                
                                    )}
                                    
                                    
                                    
                                </Card.Body>
                            </Card>
                        </Col>
                        <Col md lg="8">
                            <Row>
                                <Col md lg="6">
                                    <Table striped bordered hover>
                                        <thead>
                                        <tr>
                                            
                                            <th>Collaborator</th>
                                            
                                            <th>Collab Type</th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                            {this.state.projects.map(project =>
                                                project.info.map(collab =>
                                                <tr key={collab.first_name+"parent"}>
                                                    <td key={collab.first_name}><a href={"/users/profile/"+ collab.id}>{collab.first_name} {collab.last_name}</a></td>
                                                    <td key={collab.type}>{collab.collab_type}</td>
                                                    
                                                    
                                                </tr>
                                                )
                                                    
                                            )}
                                        </tbody>
                                    </Table>
                                </Col>
                                <Col md lg="6">
                                    <Table striped bordered hover>
                                        <thead>
                                        <tr>
                                            
                                            <th>Area</th>
                                            
                                            <th>Affinity</th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                            {this.state.projects.map(project =>
                                                project.areas.map(area =>
                                                <tr key={area.name+"parent"}>
                                                    <td key={area.name}>{area.name}</td>
                                                    <td key={area.level+"level"}>{area.level}</td>
                                                    
                                                    
                                                </tr>
                                                )
                                                    
                                            )}
                                        </tbody>
                                    </Table>                 
                                
                                
                                
                                </Col>
                            </Row>
                            <Row>
                                <Col md lg="12">
                                    <Table striped bordered hover>
                                        <thead>
                                        <tr>
                                            
                                            <th>Testbed</th>
                                            
                                            <th>Testbed description</th>
                                            <th>Parts</th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                            {this.state.projects.map(project =>
                                                project.testbeds.map(testbed =>
                                                <tr key={testbed.tb_name+"parent"}>
                                                    <td key={testbed.tb_name}>{testbed.tb_name}</td>
                                                    <td key={testbed.Tesbed+"id"}>{testbed.tb_description}</td>
                                                    
                                                    <td>
                                                        {testbed.parts.map(part => 
                                                            <p>{part.part_name}</p>
                                                        )}
                                                    </td>
                                                    
                                                </tr>
                                                )
                                                    
                                            )}
                                        </tbody>
                                    </Table>                 
                                
                                
                                
                                </Col>
                            </Row>
                        </Col>
             
                    </Row>
                    
                    
                    
                </Container>
                
                 
                
           
        );
    }  
}

export default withParams(Project);
