import { TextInput, Button, NativeSelect } from '@mantine/core'

const Form = props => {
  return (
    <form onSubmit={props.handleSubmit}>
      <div className="mb-4 space-y-5">
        <TextInput
          placeholder="7"
          label="Total run"
          required
          name="totalRun"
          value={props.values.totalRun}
          onChange={props.handleChange}
          error={props.touched.totalRun && props.errors.totalRun}
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

        <NativeSelect
          data={props.keywords.datas.edges.map(({ node: { _id, label } }) => ({
            value: _id,
            label
          }))}
          placeholder="Pick one"
          label="Keyword"
          required
          name="keyword"
          value={props.values.keyword}
          onChange={props.handleChange}
          error={props.touched.keyword && props.errors.keyword}
        />

        <NativeSelect
          data={props.themes.datas.edges.map(({ node: { _id, label } }) => ({
            value: _id,
            label
          }))}
          placeholder="Pick one"
          label="Theme"
          required
          name="theme"
          value={props.values.theme}
          onChange={props.handleChange}
          error={props.touched.theme && props.errors.theme}
        />

        <NativeSelect
          data={props.projectTemplates.datas.edges.map(
            ({ node: { _id, label } }) => ({
              value: _id,
              label
            })
          )}
          placeholder="Pick one"
          label="Template"
          required
          name="template"
          value={props.values.template}
          onChange={props.handleChange}
          error={props.touched.template && props.errors.template}
        />

        <TextInput
          placeholder="GTM-1234567"
          label="GTM"
          name="gtm"
          value={props.values.gtm}
          onChange={props.handleChange}
          error={props.touched.gtm && props.errors.gtm}
        />

        <TextInput
          placeholder="Histats-1234567"
          label="Histats"
          name="histats"
          value={props.values.histats}
          onChange={props.handleChange}
          error={props.touched.histats && props.errors.histats}
        />
      </div>
      <div>
        <Button
          fullWidth
          className="bg-blue-500 hover:bg-blue-600"
          type="submit"
          loading={props.isSubmitting}
        >
          CREATE
        </Button>
      </div>
    </form>
  )
}

export default Form
