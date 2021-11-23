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

        <TextInput
          placeholder="mail@example.com"
          label="Email"
          required
          name="email"
          value={props.values.email}
          onChange={props.handleChange}
          error={props.touched.email && props.errors.email}
        />

        <TextInput
          placeholder="John"
          label="Name"
          required
          name="name"
          value={props.values.name}
          onChange={props.handleChange}
          error={props.touched.name && props.errors.name}
        />

        <TextInput
          placeholder="doe"
          label="Username"
          required
          name="username"
          value={props.values.username}
          onChange={props.handleChange}
          error={props.touched.username && props.errors.username}
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
          loading={props.isSubmitting}
        >
          SAVE
        </Button>
      </div>
    </form>
  )
}

export default Form
