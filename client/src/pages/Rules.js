import React from "react";
import { Jumbotron, Container, CardColumns, Card } from "react-bootstrap";
import "../App.css";

function Rules() {
  return (
    <>
      <div className="rules">
        <Jumbotron id="mainTitle">
          <Container className="rulesTitle">
            <h3>How to play Jester</h3>
          </Container>
        </Jumbotron>
        <Container>
          
            <Card className="rulecard">
              <Card.Title>Step 1:</Card.Title> Don't talk about Jester.
            </Card>
            <Card className="rulecard">
              <Card.Title>Step 2:</Card.Title>
              Just kidding on rule 1. Tell everyone about Jester.
            </Card>
            <Card className="rulecard">
              <Card.Title>Step 3: </Card.Title>
              Read the task.
            </Card>
            <Card className="rulecard">
              <Card.Title>Step 4</Card.Title>
              Take a pic of the task. 
            </Card>
            <Card className="rulecard">
              <Card.Title>Step 5</Card.Title>
              Upload the link to your profile. 
            </Card>
            <Card className="rulecard">
              <Card.Title>Step 6</Card.Title>
              Like your favorite pic. Winner is the Jest with the most likes.  
            </Card>
         
        </Container>
        {/* 4 cards of blah blah blah */}
      </div>
    </>
  );
}

export default Rules;
