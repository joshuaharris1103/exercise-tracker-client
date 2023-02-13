import React, { useState } from 'react'
import { Modal } from 'react-bootstrap'
import ExerciseForm from '../shared/ExerciseForm'
import messages from '../shared/AutoDismissAlert/messages'

const EditExerciseModal = (props) => {
    const { user, show, handleClose, updateExercise, msgAlert, triggerRefresh } = props

    const [exercise, setExercise] = useState(props.exercise)

    const onChange = (e) => {
        e.persist()

        setExercise(prevExercise => {
            const updatedName = e.target.name
            let updatedValue = e.target.value

            if (e.target.type === 'number') {
                updatedValue = parseInt(e.target.value)
            }

            if (updatedName === 'adoptable' && e.target.checked) {
                updatedValue = true
            } else if (updatedName === 'adoptable' && !e.target.checked) {
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

        updateExercise(user, exercise)
            .then(() => handleClose())
            .then(() => {
                msgAlert({
                    heading: 'Oh Yeah!',
                    message: messages.updateExerciseSuccess,
                    variant: 'success'
                })
            })
            .then(() => triggerRefresh())
            .catch(() => {
                msgAlert({
                    heading: 'Oh No!',
                    message: messages.updateExerciseFailure,
                    variant: 'danger'
                })
            })

    }

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton />
            <Modal.Body>
                <ExerciseForm 
                    exercise={exercise} 
                    handleChange={onChange} 
                    handleSubmit={onSubmit} 
                    heading="Update exercise"
                />
            </Modal.Body>
        </Modal>
    )
}

export default EditExerciseModal