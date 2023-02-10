import { useState, useEffect } from 'react'
import Card from 'react-bootstrap/Card'
import { Link } from 'react-router-dom'
import LoadingScreen from '../shared/LoadingScreen'
import { getAllExercises } from '../../api/exercises'
import messages from '../shared/AutoDismissAlert/messages'

const cardContainerStyle = {
    display: 'flex',
    flexFlow: 'row wrap',
    justifyContent: 'center'
}

const ExerciseIndex = (props) => {
    const [exercise, setExercise] = useState(null)
    const [error, setError] = useState(false)

    const { msgAlert } = props

    
    useEffect(() => {
        getAllExercises()
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

    if (error) {
        return <p>Error!</p>
    }

    if (!exercise) {
        return <LoadingScreen />
    } else if (exercise.length === 0) {
        return <p>No exercises yet, go add some!</p>
    }

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