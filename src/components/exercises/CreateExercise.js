import { useState } from 'react'
import { createExercise } from '../../api/exercises'
import { createExerciseSuccess, createExerciseFailure } from '../shared/AutoDismissAlert/messages'
import ExerciseForm from '../shared/ExerciseForm' 

// bring in the useNavigate hook from react-router-dom
import { useNavigate } from 'react-router-dom'

const CreateExercise = (props) => {
    // pull out our props
    const { user, msgAlert } = props

    // set up(pull our navigate function from useNavigate)
    const navigate = useNavigate()
    console.log('this is navigate', navigate)

    const [exercise, setExercise] = useState({
        name: '',
        type: '',
        day: '',
        difficulty: false
    })

    const onChange = (e) => {
        e.persist()
        
        setExercise(prevExercise => {
            const updatedName = e.target.name
            let updatedValue = e.target.value

            console.log('this is the input type', e.target.type)

            // to handle a number, we look at the type, and parse a string to an integer
            if (e.target.type === 'number') {
                updatedValue = parseInt(e.target.value)
            }

            // to handle a checkbox, we can check the name, and change the value that is output. Checkboxes only know if they are checked or not
            if (updatedName === 'difficult' && e.target.checked) {
                updatedValue = true
            } else if (updatedName === 'difficult' && !e.target.checked) {
                updatedValue = false
            }
            
            const updatedExercise = {
                [updatedName] : updatedValue
            }
            
            console.log('the exercise', updatedExercise)

            return {
                ...prevExercise, ...updatedExercise
            }
        })
    }

    const onSubmit = (e) => {
        e.preventDefault()

        createExercise(user, exercise)
            // first we'll nav to the show page
            .then(res => { navigate(`/exercises/${res.data.exercise.id}`)})
            // we'll also send a success message
            .then(() => {
                msgAlert({
                    heading: 'Oh Yeah!',
                    message: createExerciseSuccess,
                    variant: 'success'
                })
            })
            // if there is an error, tell the user about it
            .catch(() => {
                msgAlert({
                    heading: 'Oh No!',
                    message: createExerciseFailure,
                    variant: 'danger'
                })
            })

    }

    return (
        <ExerciseForm 
            exercise={exercise}
            handleChange={onChange}
            handleSubmit={onSubmit}
            heading="Add a new exercise!"
        />
    )
}

export default CreateExercise