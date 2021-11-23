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
            { value: 'GOOGLE', label: 'Google' },
            { value: 'BING', label: 'Bing', disabled: true }
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
          placeholder="mail@example.com"
          label="Email"
          required
          name="email"
          value={props.values.email}
          onChange={props.handleChange}
          error={props.touched.email && props.errors.email}
        />

        <Textarea
          label="Token"
          placeholder="JSON key"
          autosize
          minRows={10}
          maxRows={10}
          required
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
          loading={props.loadingCreateOAuthKey}
        >
          SAVE
        </Button>
      </div>
    </form>
  )
}

export default Form
