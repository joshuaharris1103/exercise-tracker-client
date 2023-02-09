import ExerciseIndex from './exercises/ExerciseIndex'
import Container from 'react-bootstrap/Container'

const Home = (props) => {
	// const { msgAlert, user } = props
	console.log('props in home', props)

	return (
		<Container className="m-2" style={{textAlign: 'center'}}>
			<h2>Home Page</h2>
			<h2>See All The Exercises</h2>
			<ExerciseIndex msgAlert={ props.msgAlert } />
		</ Container>
	)
}

export default Home