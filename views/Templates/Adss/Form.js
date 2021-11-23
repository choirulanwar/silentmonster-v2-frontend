import { TextInput, Textarea, Button } from '@mantine/core'

const Form = props => {
  return (
    <form onSubmit={props.handleSubmit}>
      <div className="mb-4 space-y-5">
        <TextInput
          placeholder="Nice"
          label="Label"
          required
          name="label"
          value={props.values.label}
          onChange={props.handleChange}
          error={props.touched.label && props.errors.label}
        />

        <Textarea
          label="Code"
          placeholder="JS scripts"
          autosize
          minRows={10}
          maxRows={10}
          required
          name="code"
          value={props.values.code}
          onChange={props.handleChange}
          error={props.touched.code && props.errors.code}
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
