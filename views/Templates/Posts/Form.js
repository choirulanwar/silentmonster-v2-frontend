import { TextInput, Textarea, Button, NativeSelect } from '@mantine/core'

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

        <NativeSelect
          data={[
            { value: 'VIDEO', label: 'Video' },
            { value: 'IMAGE', label: 'Image' },
            {
              value: 'RECIPE',
              label: 'Recipe',
              disabled: true
            }
          ]}
          placeholder="Pick one"
          label="Type"
          required
          name="type"
          value={props.values.type}
          onChange={props.handleChange}
          error={props.touched.type && props.errors.type}
        />

        <Textarea
          label="Keywords"
          placeholder="{spintax|word1,word2,word3}"
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
