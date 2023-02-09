// this is where our api calls for the exercises resource will live
import apiUrl from '../apiConfig'
import axios from 'axios'

// READ -> Index
export const getAllExercise = () => {
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

// Delete (delete a exercise)