import { useState, useEffect } from 'react'
import Card from 'react-bootstrap/Card'
import { Link } from 'react-router-dom'
import LoadingScreen from '../shared/LoadingScreen'

// api function from our api file
import { getAllExercise } from '../../api/exercises'

// need our messages from our autodismissalert directory
import messages from '../shared/AutoDismissAlert/messages'

// this is a styling object. they're a quick easy way add focused css properties to our react components
const cardContainerStyle = {
    display: 'flex',
    flexFlow: 'row wrap',
    justifyContent: 'center'
}

// exerciseIndex will make a request to the API for all exercise
// once it receives a response, display a card for each exercise
const ExerciseIndex = (props) => {
    const [exercise, setExercise] = useState(null)
    const [error, setError] = useState(false)

    // pull the message alert (msgAlert) from props
    const { msgAlert } = props

    // get our exercise from the api when the component mounts
    useEffect(() => {
        getAllExercise()
            .then(res => setExercise(res.data.exercise))
            .catch(err => {
                msgAlert({
                    heading: 'Error getting exercise',
                    message: messages.getExerciseFailure,
                    variant: 'danger'
                })
                setError(true)
            })
    }, [])

    // if error, display an error
    if (error) {
        return <p>Error!</p>
    }

    if (!exercise) {
        // if no exercise loaded yet, display 'loading'
        return <LoadingScreen />
    } else if (exercise.length === 0) {
        // otherwise if there ARE no exercise, display that message
        return <p>No exercises yet, go add some!</p>
    }

    // once we have an array of exercise, loop over them
    // produce one card for every exercise
    const exerciseCards = exercise.map(exercise => (
        <Card key={ exercise.id } style={{ width: '30%', margin: 5 }}>
            <Card.Header>{ exercise.fullTitle }</Card.Header>
            <Card.Body>
                <Card.Text>
                    <Link to={`/exercise/${exercise.id}`} className="btn btn-info">View { exercise.name }</Link>
                </Card.Text>
                { exercise.owner ?
                <Card.Footer>
                     owner: {exercise.owner.email} 
                </Card.Footer>
                : null}
            </Card.Body>
        </Card>
    ))

    // return some jsx, a container with all the exercisecards
    return (
        <div className="container-md" style={ cardContainerStyle }>
            { exerciseCards }
        </div>
    )
}

// export our component
export default ExerciseIndex