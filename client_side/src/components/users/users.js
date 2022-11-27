import React, {Component} from 'react'
import {Button , Card , Container, Row, Col} from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import styles from './users.css';


class Users extends Component {  
    constructor(){
        super();
        this.state = {
            user:[],
            users: [],
            projects: [],
            areas: [],
        }
    }

    componentDidMount(){
        const urls = [
            'http://localhost:3000/users/logged',
            'http://localhost:3000/users',
            'http://localhost:3000/users/projects',
            'http://localhost:3000/areas/logged'

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
                    areas: responses[3]
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
                    </Row>
                    <Row>
                        <Col >
                            
                            
                                    
                        </Col>
                    </Row>
                </Container>
                
                 
                
           
        );
    }  
}

export default Users;
