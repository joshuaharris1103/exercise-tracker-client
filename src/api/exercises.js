// this is where our api calls for the exercises resource will live
import apiUrl from '../apiConfig'
import axios from 'axios'

// READ -> Index
export const getAllExercises = () => {
    return axios(`${apiUrl}/exercises`)
}

// READ -> Show
export const getOneExercise = (id) => {
    return axios(`${apiUrl}/exercises/${id}`)
}

// Create (create a exercise)
export const createExercise = (user, newExercise) => {
    console.log('this is the user', user)
    console.log('this is the newExercise', newExercise)
    return axios({
        url: `${apiUrl}/exercises`,
        method: 'POST',
        headers: {
            Authorization: `Token token=${user.token}`
        },
        data: { exercise: newExercise }
    })
}

// Update (update a exercise)
export const updateExercise = (user, updatedPet) => {
    return axios({
        url: `${apiUrl}/exercise/${updatedPet.id}`,
        method: 'PATCH',
        headers: {
            Authorization: `Token token=${user.token}`
        },
        data: { pet: updatedPet }
    })
}

// Delete (delete a exercise)
export const removeExercise = (user, exerciseId) => {
    return axios({
        url: `${apiUrl}/exercises/${exerciseId}`,
        method: 'DELETE',
        headers: {
            Authorization: `Token token=${user.token}`
        }
    })
}