import { TextInput, Textarea, Button, NativeSelect } from '@mantine/core'

const Form = props => {
  return (
    <form onSubmit={props.handleSubmit}>
      <div className="mb-4 space-y-5">
        <TextInput
          placeholder="Awesome theme"
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

        <TextInput
          placeholder="Theme about"
          label="Description"
          name="description"
          value={props.values.description}
          onChange={props.handleChange}
          error={props.touched.description && props.errors.description}
        />

        <TextInput
          placeholder="https://github.com/example/theme.git"
          label="Git URL"
          required
          name="url"
          value={props.values.url}
          onChange={props.handleChange}
          error={props.touched.url && props.errors.url}
        />

        <TextInput
          placeholder="token-abc12345"
          label="Token"
          name="token"
          value={props.values.token}
          onChange={props.handleChange}
          error={props.touched.token && props.errors.token}
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
