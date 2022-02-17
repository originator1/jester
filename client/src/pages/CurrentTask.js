import React from 'react';
import {
    Jumbotron,
    Container,
    CardColumns,
    Card,
    Button,

} from 'react-bootstrap';

//apollo cleint hook imports
import { useQuery, useMutation} from '@apollo/client';
//query jests data
import { QUERY_JESTS } from '../utils/queries';
//update likes mutation
import { UPDATE_LIKE } from '../utils/mutations';
//importing addJest component
import AddJest from '../components/AddJest';

import Auth from '../utils/auth';


function CurrentTask() {
    const { loading, data } = useQuery(QUERY_JESTS);

    //data returns an object allJests: Array(3)-> being an array of all current jests
    // console.log("original data======", data);
    // const [updateLike, { error }] = useMutation(UPDATE_LIKE);

    // when like button clicked function fires
    //takes current jest and updates likes field to increment by 1 
    const [updateLike] = useMutation(UPDATE_LIKE, {
        //refresh query data
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
                    <h3></h3>
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
                                    <p>Likes: {jest.likes}</p>
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