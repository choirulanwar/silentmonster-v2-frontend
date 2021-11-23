import { TextInput, Button, NativeSelect } from '@mantine/core'

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
          placeholder="Hostname"
          label="Domain"
          required
          name="domain"
          value={props.values.domain}
          onChange={props.handleChange}
          error={props.touched.domain && props.errors.domain}
        />

        <NativeSelect
          data={props.dnss.datas.edges.map(({ node: { _id, label } }) => ({
            value: _id,
            label
          }))}
          placeholder="Pick one"
          label="DNS"
          required
          name="dns"
          value={props.values.dns}
          onChange={props.handleChange}
          error={props.touched.dns && props.errors.dns}
        />

        <NativeSelect
          data={props.clouds.datas.edges.map(({ node: { _id, label } }) => ({
            value: _id,
            label
          }))}
          placeholder="Pick one"
          label="Cloud Hosting"
          required
          name="cloud"
          value={props.values.cloud}
          onChange={props.handleChange}
          error={props.touched.cloud && props.errors.cloud}
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
