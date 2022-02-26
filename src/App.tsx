import React from 'react';
import { Container, Nav, Navbar } from 'react-bootstrap';
import NavbarCollapse from 'react-bootstrap/esm/NavbarCollapse';
import NavbarToggle from 'react-bootstrap/esm/NavbarToggle';
import { LinkContainer } from 'react-router-bootstrap';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import Categories from './components/categories/Categories';
import Recipes from './components/recipes/Recipes';

function App() {
  return (
    <>
      <header>
        <Navbar bg="white" fixed="top" expand="lg" className="shadow-sm">
          <Container>
            <Navbar.Brand href="/">SmartFood</Navbar.Brand>
            <NavbarToggle aria-controls="Scroll" />
            <NavbarCollapse id="Scroll">
              <Nav className="me-auto">
                <LinkContainer to="/">
                  <Nav.Link>Home</Nav.Link>
                </LinkContainer>
                <LinkContainer to="/categories">
                  <Nav.Link>Categories</Nav.Link>
                </LinkContainer>
              </Nav>
            </NavbarCollapse>
          </Container>
        </Navbar>
      </header>
      <main>
        <Container>
          <Routes>
            <Route path="/" element={<Recipes />} />
            <Route path="/categories" element={<Categories />} />
          </Routes>
        </Container>
      </main>
    </>
  );
}

export default App;
