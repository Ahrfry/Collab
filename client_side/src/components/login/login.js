import React, {Component} from 'react'
import {Button , Card , Container, Row, Col, Table, Form} from 'react-bootstrap'
import { BrowserRouter as Router, Route, Routes, useParams, useNavigate} from 'react-router-dom'
import Users from '../users/user'
import 'bootstrap/dist/css/bootstrap.min.css'

import styles from './login.css';


async function loginUser(credentials) {
return fetch('http://localhost:3000/users/login/', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify(credentials)
    })
    .then(data => data.json())
}

function withParams(Component) {
    return props => <Component {...props} params={useParams()} navigate={useNavigate()} />;
  }

class Login extends Component {  
    constructor(){
        super();
                
        this.state = {
            username: "username",
            password: "password",
            
        }

        this.handleSubmit = this.handleSubmit.bind(this);
        
    }

    async handleSubmit(e){
        e.preventDefault()
        
        const user = await loginUser({
            username: this.state.username, password: this.state.password
        });
        
        localStorage.setItem("authenticated", true);
        localStorage.setItem("user", user[0].id);
        this.props.navigate("/users/user");
                
    }

    componentDidMount(){
        
        
    }

    

    render (){
        return (
           
           
            <div>
                <Form onSubmit={this.handleSubmit}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>Email address</Form.Label>
                  <Form.Control type="text" placeholder="Username" value={this.username}
            onChange={(e) => this.setState({username: e.target.value})}/>
                  <Form.Text className="text-muted">
                    Your information is secure with us!.
                  </Form.Text>
                </Form.Group>
          
                <Form.Group className="mb-3" controlId="formBasicPassword">
                  <Form.Label>Password</Form.Label>
                  <Form.Control type="password" placeholder="Password"  onChange={(e) => this.setState({password: e.target.value})}/>
                </Form.Group>
                
                <Button variant="primary" type="submit">
                  Submit
                </Button>
              </Form>
            </div>
           
        );
    }  
}

export default withParams(Login);
