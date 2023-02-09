import ExerciseIndex from './exercises/ExerciseIndex'

const Home = (props) => {
	// const { msgAlert, user } = props
	console.log('props in home', props)

	return (
		<>
			<h2>Home Page</h2>
			<h2>See All The Exercises</h2>
			<ExerciseIndex msgAlert={ props.msgAlert } />
		</>
	)
}

export default Home