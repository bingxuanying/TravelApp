import React, { Component } from "react";
import "./GuidCard.sass";
import image from "./tokyo.jpg";
import { Card, Button } from "react-bootstrap";

class GuidCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cardTitle: "Tokyo 3 Days",
      cardSubTitle: "Weili",
      cardText: "Nice Trip to Tokyo",
      stars: 5
    };
  }
  render() {
    return (
      <Card className="card border-0 text-left ml-1">
        <Card.Img variant="top" src={image} />
        <Card.Body className="pl-0 pt-2">
          <Card.Title>
            {this.state.cardTitle}
            <span>bcd</span>
          </Card.Title>
          <Card.Subtitle className="mb-2 text-muted">
            {this.state.cardSubTitle}
          </Card.Subtitle>
          <Card.Text>{this.state.cardText}</Card.Text>
        </Card.Body>
      </Card>
    );
  }
}

export default GuidCard;
