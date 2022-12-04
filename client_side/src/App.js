
import {Container, Row, Col, Navbar, Nav} from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import { BrowserRouter as Router, Navigate, Route, Routes, useNavigate} from 'react-router-dom'
import './App.css';
import Users from './components/users/users'
import Areas from './components/areas/areas'
import Login from './components/login/login'
import PrivateRoute from './components/private_route/private_route'



function App() {
  //const navigate = useNavigate();
  let navigate = useNavigate(); 
  const handleClick = () => {
    localStorage.removeItem("user");
    console.log("HELLOOOOOOO");
    
    navigate("/login");
    
  };

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
                <Nav.Link  onClick={() => handleClick()}>
                  logout
                </Nav.Link>
                
              </Nav>
                
            </Navbar.Collapse>
          </Container>
        </Navbar>
     
          <Routes>
            <Route path="/users/" element={
              <PrivateRoute>
                <Users/>
              </PrivateRoute>
            
            }/>
          </Routes>
          <Routes>
            <Route path="/areas/" element={<Areas/>}/>
          </Routes>
          <Routes>
            <Route path="/login/" element={<Login/>}/>
          </Routes>    
       
        
      </Container>
  
  );
}

export default App;
