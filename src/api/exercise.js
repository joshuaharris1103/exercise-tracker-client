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

// Update (update a exercise)

// Delete (delete a exercise)