
import {Container, Row, Col, Navbar, Nav} from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import './App.css';
import Users from './components/users/users'
import Areas from './components/areas/areas'
import Login from './components/login/login'


function App() {

  if(1==1){
    console.log("Yeah this is possible");

  }

  return (
    
      <Container id="main-container" fluid style={{ fontcolor: 'black' }}>
          <Navbar bg="light" expand="lg">
          <Container fluid>
            <Navbar.Brand href="#">Collab</Navbar.Brand>
            <Navbar.Toggle aria-controls="navbarScroll" />
            <Navbar.Collapse id="navbarScroll">
              <Nav
                className="me-auto my-2 my-lg-0"
                style={{ maxHeight: '100px' }}
                navbarScroll
              >
                <Nav.Link href="#action1">Home</Nav.Link>
                <Nav.Link href="#action2">Projects</Nav.Link>
                
                <Nav.Link href="#">
                  Areas
                </Nav.Link>
              </Nav>
                
            </Navbar.Collapse>
          </Container>
        </Navbar>
        <Router>
          <Routes>
            <Route path="/users/:id" element={<Users/>}/>
          </Routes>
          <Routes>
            <Route path="/areas" element={<Areas/>}/>
          </Routes>
          <Routes>
            <Route path="/login" element={<Login/>}/>
          </Routes>    
        </Router>
        
      </Container>
  
  );
}

export default App;
