import React, { useState } from 'react';
import {
    Jumbotron,
    Container,
    CardColumns,
    Card,
    Button,

} from 'react-bootstrap';
// import "../App.css";


import { useQuery, useMutation} from '@apollo/client';
import { QUERY_JESTS } from '../utils/queries';
// import { REMOVE_JEST, UPDATE_LIKE } from '../utils/mutations';

//update likes mutation
import { UPDATE_LIKE } from '../utils/mutations';

// import { removeJestId } from '../utils/localStorage';
import AddJest from '../components/AddJest';

import Auth from '../utils/auth';
// import image from '../jester2.jpg';

function CurrentTask() {
    const { loading, data } = useQuery(QUERY_JESTS);

    //data returns an object allJests: Array(3)-> being an array of all current jests
    // console.log("original data======", data);
    // const [updateLike, { error }] = useMutation(UPDATE_LIKE);

     // when like button clicked function fires
    //takes current jest and updates likes field to add one 
    const [updateLike] = useMutation(UPDATE_LIKE, {
        refetchQueries: mutationResult => [{query: QUERY_JESTS}]
    });

    //userData is assigned an array of 3 objects(jests)
    const userData = data?.allJests || {};
   

    if (loading) {
        return <h2>LOADING...</h2>;
    }

    return (
        <>
        <div className="currenttask">
            <AddJest/>
            <Jumbotron fluid className="jumbotron">
                <Container>
                    <h3>Current Task:</h3>
                    <h3> A ridiculous Christmas sweater</h3>
                </Container>
            </Jumbotron>
            <Container >
                <h3 className="submissionTitle">
                    {userData.length?
                         `Viewing ${userData.length}  ${userData.length === 1 ? 'submission' : 'submissions'
                        }:`
                        : 'You have no saved submissions!'}
                </h3>
                
                <CardColumns>
                    {userData.map((jest, i) => {
                        // console.log(jest, i)
                        // console.log("each jest inside the returned map html", jest);
                        return (
                            <Card key={jest._id} border="dark">
                                {jest.image ? (
                                    <Card.Img
                                        src={jest.image}
                                        alt={`The cover for ${jest.caption}`}
                                        variant="top"
                                    />
                                ) : null}
                                <Card.Body>
                                    <Card.Title>{jest.jestTaskDescription}</Card.Title>
                                    <Card.Text>{jest.caption}</Card.Text>
                                    <p>likes: {jest.likes}</p>
                                    <Button onClick={() => updateLike({variables: {jestId: jest._id}})}>LIKE</Button>
                                   
                                </Card.Body>
                            </Card>
                        );

                    })}
                </CardColumns>
            </Container>
        </div>
        </>
    );
};

export default CurrentTask