// this form will take several props and be used both to create and update exercises
// the action will be dependent upon the parent component
// but the form will look the same on both Create and Update
import { Form, Button, Container } from 'react-bootstrap'

const ExerciseForm = (props) => {
    // we need several props for a working, reusable form
    // the object itself(exercise), some handleChange fn, some handleSubmit fn
    // and in this case, we'll add a custom heading
    const { exercise, handleChange, handleSubmit, heading } = props

    return (
        <Container className="justify-content-center">
            <h3>{heading}</h3>
            <Form onSubmit={handleSubmit}>
                <Form.Group className="m-2">
                    <Form.Label>Name:</Form.Label>
                    <Form.Control 
                        placeholder="What is your exercise's name?"
                        name="name"
                        id="name"
                        value={ exercise.name }
                        onChange={handleChange}
                    />
                </Form.Group>
                <Form.Group className="m-2">
                    <Form.Label>Type:</Form.Label>
                    <Form.Control 
                        placeholder="What type of exercise is this?"
                        name="type"
                        id="type"
                        value={ exercise.type }
                        onChange={handleChange}
                    />
                </Form.Group>
                <Form.Group className="m-2">
                    <Form.Label>Day:</Form.Label>
                    <Form.Control 
                        type="number"
                        placeholder="What day do you program this exercise?"
                        name="day"
                        id="day"
                        value={ exercise.age }
                        onChange={handleChange}
                    />
                </Form.Group>
                <Form.Group className="m-2">
                    <Form.Check 
                        label="Is this exercise difficult?"
                        name="difficult"
                        defaultChecked={ exercise.adoptable }
                        onChange={handleChange}
                    />
                </Form.Group>
                <Button className="m-2" type="submit">Submit</Button>
            </Form>
        </Container>
    )
}

export default ExerciseForm