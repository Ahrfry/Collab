import React, {Component} from 'react'
import {Button , Card , Container, Row, Col, Table, Badge} from 'react-bootstrap'
import { BrowserRouter as Router, Route, Routes, useParams, useNavigate} from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'



function withParams(Component) {
    return props => <Component {...props} params={useParams()} navigate={useNavigate()} />;
}
  

class Area extends Component {  
    constructor(){
        super();
        this.state = {
            area:[],
          
            affinities: [],
            
        }
        
        
    }

    componentDidMount(){
        
        let { id } = this.props.params;
        //let aut = localStorage.getItem('user');
        
        
        
        const urls = [
            
            
            
            'http://localhost:3000/areas/area/'+id,
            
            
            

        ]
        
        

        let requests = urls.map((url) => fetch(url));
        Promise.all(requests)
            .then((responses) => {
                return Promise.all(responses.map((response) => response.json()));
            })
            .then((responses) => {
                
                this.setState({
                   
                    
                   
                    area: [responses[0]]
                    
                });
                console.log(this.state.area);
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
                                <Card.Img variant="top" src={require('./../images/area/operating.jpg')} />
                                <Card.Body className="mh-100">
                                    
                                    
                                    {this.state.area.map(area =>
                                
                                        <div key={area.area_id+"parent"}>
                                            
                                                <h1 key={area.area_id}>{area.name}</h1>
                                            
                                                <h5 >
                                                    {area.description}
                                                    
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
                                            
                                            <th>Members</th>
                                            
                                            <th>Member Type</th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        {this.state.area.map(area =>
                                                area.people.map(people =>
                                                <tr key={people.id+"parent"}>
                                                    <td key={people.id}><a href={"/users/profile/"+ people.id}>{people.first_name} {people.last_name}</a></td>
                                                    <td key={people.id+"type"}>{people.user_type}</td>
                                                    
                                                    
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
                                            
                                            <th>Project Name</th>
                                            
                                            
                                        </tr>
                                        </thead>
                                        <tbody>
                                        {this.state.area.map(area =>
                                                area.projects.map(project =>
                                                <tr key={project.project_id+"parent"}>
                                                    <td key={project.name}><a href={"/project/"+ project.project_id}>{project.name}</a></td>
                                                    
                                                    
                                                    
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

export default withParams(Area);
