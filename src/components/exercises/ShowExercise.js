import { useState, useEffect } from 'react'

// useParams from react-router-dom allows us to see our route parameters
import { useParams } from 'react-router-dom'

import { Container, Card, Button } from 'react-bootstrap'

import { getOneExercise } from '../../api/exercises'

import messages from '../shared/AutoDismissAlert/messages'

// we need to get the exercise's id from the route parameters
// then we need to make a request to the api
// when we retrieve a exercise from the api, we'll render the data on the screen

const ShowExercise = (props) => {
    const [exercise, setExercise] = useState(null)

    const { id } = useParams()

    const { user, msgAlert } = props
    console.log('user in ShowExercise props', user)
    console.log('msgAlert in ShowExercise props', msgAlert)

    useEffect(() => {
        getOneExercise(id)
            .then(res => setExercise(res.data.exercise))
            .catch(err => {
                msgAlert({
                    heading: 'Error getting exercises',
                    message: messages.getExercisesFailure,
                    variant: 'danger'
                })
            })
    }, [])

    if(!exercise) {
        return <p>loading...</p>
    }

    return (
        <>
            <Container>
                <Card>
                    <Card.Header>{ exercise.fullTitle }</Card.Header>
                    <Card.Body>
                        <Card.Text>
                            <div><small>Name: { exercise.name }</small></div>
                            <div><small>Type: { exercise.type }</small></div>
                            <div><small>Day: { exercise.day }</small></div>
                            <div>
                                <small>
                                    Difficult: { exercise.difficult ? 'yes' : 'no' }
                                </small>
                            </div>
                        </Card.Text>
                    </Card.Body>
                </Card>
            </Container>
        </>
    )
}

export default ShowExercise