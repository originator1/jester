//future development

import React from 'react';
import {
    Jumbotron,
    Container,
    CardColumns,
    Card,
    Button,
  } from 'react-bootstrap';
  import "../App.css";

import { useQuery, useMutation } from '@apollo/client';
import { QUERY_JESTS } from '../utils/queries';

import { REMOVE_JEST } from '../utils/mutations';
import { removeJestId } from '../utils/localStorage';

import Auth from '../utils/auth';
import image from '../jester2.jpg';

function PastTasks() {
  
    const { loading, data } = useQuery(QUERY_JESTS);
    const [removeJest, { error }] = useMutation(REMOVE_JEST);
  
    const userData = data?.tasks || {};
   
    
  const handleDeleteJest = async (jestId) => {
    // check if logged in, if so... get token
    const token = Auth.loggedIn() ? Auth.getToken() : null;

    if (!token) {
      return false;
    }

    try {
      const { data } = await removeJest({
        variables: { jestId },
      });

      // upon success, remove id from localStorage
      removeJestId(jestId);
    } catch (err) {
      console.error(err);
    }
  };
  
  if (loading) {
    return <h2>LOADING...</h2>;
  }

  const jests = data?.jests || [];


  return (
    <>
      <Jumbotron fluid className="text-light bg-dark">
        <Container>
          <h1>Viewing { }'s Jests!</h1>
        </Container>
      </Jumbotron>
      <Container>
        <h2>
          {userData.savedJests?.length
            ? `Viewing ${userData.savedJests.length} saved ${userData.savedJests.length === 1 ? 'Jest' : 'Jests'
            }:`
            : 'You have no saved Jests!'}
        </h2>
        <CardColumns>
          {userData.map((jest, i) => {
            // console.log(jest, i)
            return (
              <Card key={jest._id} border="dark">
                {jest.jestsArray ? (
                  <Card.Img
                    src={image}
                    alt={`The cover for ${jest.caption}`}
                    variant="top"
                  />
                ) : null}
                <Card.Body>
                  <Card.Title>{jest._id}</Card.Title>
                  <p className="small">Jester: {jest.user}</p>
                  <Card.Text>{jest.caption}</Card.Text>
                  <Button
                    className="btn-block btn-danger"
                    onClick={() => handleDeleteJest(jest.jestId)}
                  >
                    Delete this Jest!
                  </Button>
                </Card.Body>
              </Card>
            );

          })}
        </CardColumns>
      </Container>
    </>
  );
};

export default PastTasks