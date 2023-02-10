import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { Container, Card, Button } from 'react-bootstrap'
import { getOneExercise, removeExercise } from '../../api/exercises'
import messages from '../shared/AutoDismissAlert/messages'
import LoadingScreen from '../shared/LoadingScreen'


const ShowExercise = (props) => {
    const [exercise, setExercise] = useState(null)
    const { id } = useParams()
    const navigate = useNavigate()
    const { user, msgAlert } = props
    console.log('user in ShowExercise props', user)
    console.log('msgAlert in ShowExercise props', msgAlert)

    useEffect(() => {
        getOneExercise(id)
            .then(res => setExercise(res.data.exercise))
            .catch(err => {
                msgAlert({
                    heading: 'Error getting exercises',
                    message: messages.getExerciseFailure,
                    variant: 'danger'
                })
            })
    }, [])

    
    const deleteExercise = () => {
        removeExercise(user, exercise.id)
            .then(() => {
                msgAlert({
                    heading: 'Success',
                    message: messages.removeExerciseSuccess,
                    variant: 'success'
                })
            })
            .then(() => {navigate('/')})
            
            .catch(err => {
                msgAlert({
                    heading: 'Error',
                    message: messages.removeExerciseFailure,
                    variant: 'danger'
                })
            })
    }


    if(!exercise) {
        return <LoadingScreen />
    }

    return (
        <>
            <Container className="m-2">
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
                    <Card.Footer>
                        { exercise.owner && user && exercise.owner._id === user._id ?
                            <>
                                <Button 
                                    className="m-2" variant="danger"
                                    onClick={() => deleteExercise()}
                                >
                                    Remove {exercise.name}
                                </Button>
                            </>
                            :
                            null
                        }
                    </Card.Footer>
                </Card>
            </Container>
        </>
    )
}

export default ShowExercise