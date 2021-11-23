import { TextInput, Textarea, Button } from '@mantine/core'

const Form = props => {
  return (
    <form onSubmit={props.handleSubmit}>
      <div className="mb-4 space-y-5">
        <TextInput
          placeholder="Awesome keywords"
          label="Label"
          required
          name="label"
          value={props.values.label}
          onChange={props.handleChange}
          error={props.touched.label && props.errors.label}
        />
        <Textarea
          label="Keywords"
          placeholder="how to cook fried rice"
          autosize
          minRows={10}
          maxRows={10}
          required
          name="content"
          value={props.values.content}
          onChange={props.handleChange}
          error={props.touched.content && props.errors.content}
        />
      </div>
      <div>
        <Button
          fullWidth
          className="bg-blue-500 hover:bg-blue-600"
          type="submit"
          loading={props.isSubmitting}
        >
          SAVE
        </Button>
      </div>
    </form>
  )
}

export default Form
