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
          data={[{ value: 'CLOUDFLARE', label: 'Cloudflare' }]}
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

        <TextInput
          placeholder="Key"
          label="Token"
          required
          name="token"
          value={props.values.token}
          onChange={props.handleChange}
          error={props.touched.token && props.errors.token}
        />

        <TextInput
          placeholder="mail@example.com"
          label="Zone ID"
          required
          name="zoneId"
          value={props.values.zoneId}
          onChange={props.handleChange}
          error={props.touched.zoneId && props.errors.zoneId}
        />

        {/* <TextInput
          placeholder="mail@example.com"
          label="IP Address"
          required
          name="ip"
          value={props.values.ip}
          onChange={props.handleChange}
          error={props.touched.ip && props.errors.ip}
        /> */}
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
