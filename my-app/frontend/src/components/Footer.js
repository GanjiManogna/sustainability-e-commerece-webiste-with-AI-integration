import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { Link } from 'react-router-dom';
import { faqData } from '../data/faqData';
import "./Footer.css"; // Make sure to include this CSS for styling

const Footer = () => {
  return (
    <footer className="footer-container">
      <Container fluid="lg">
        <Row className="footer-row">
          <Col className="footer-col">
            <h5>EcoRevive</h5>
            <p>
              Making sustainability simple and accessible through our circular economy marketplace.
            </p>
            <ul className="footer-social-links">
              <li><a href="#">Facebook</a></li>
              <li><a href="#">Twitter</a></li>
              <li><a href="#">Instagram</a></li>
            </ul>
          </Col>
          <Col className="footer-col">
            <h5>Quick Links</h5>
            <ul className="footer-links">
              <li><Link to="/">Home</Link></li>
              <li><Link to="/sell">Sell</Link></li>
              <li><Link to="/redesign">Redesign</Link></li>
              <li><Link to="/about">About Us</Link></li>
              <li><Link to="/contact">Contact</Link></li>
              <li><Link to="/faq">FAQ</Link></li>
            </ul>
          </Col>
          <Col className="footer-col">
            <h5>Categories</h5>
            <ul className="footer-links">
              <li><Link to="/category/fashion">Fashion</Link></li>
              <li><Link to="/category/furniture">Furniture</Link></li>
              <li><Link to="/category/electronics">Electronics</Link></li>
              <li><Link to="/category/homedecor">Home Decor</Link></li>
            </ul>
          </Col>
          <Col className="footer-col">
            <h5>FAQ</h5>
            <ul className="footer-links">
              {faqData.slice(0, 4).map(faq => (
                <li key={faq.id}>
                  <Link to={`/faq#${faq.slug}`}>{faq.question}</Link>
                </li>
              ))}
              <li><Link to="/faq" style={{ fontWeight: 'bold', marginTop: '5px', display: 'inline-block' }}>View All...</Link></li>
            </ul>
          </Col>
        </Row>
        <Row className="footer-bottom">
          <Col>
            <p className="text-center">
              &copy; {new Date().getFullYear()} ECOREVIVE. All rights reserved.
            </p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
