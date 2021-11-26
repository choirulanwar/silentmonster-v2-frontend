import {
  TextInput,
  NumberInput,
  Textarea,
  Button,
  NativeSelect,
  Tabs,
  Tab
} from '@mantine/core'

const Form = props => {
  return (
    <form onSubmit={props.handleSubmit}>
      <Tabs>
        <Tab label="General">
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

            <TextInput
              placeholder="fill to deploy as subdomain"
              label="Hostname"
              name="hostname"
              value={props.values.hostname}
              onChange={props.handleChange}
              error={props.touched.hostname && props.errors.hostname}
            />

            <TextInput
              placeholder="Example"
              label="Title"
              name="title"
              required
              value={props.values.title}
              onChange={props.handleChange}
              error={props.touched.title && props.errors.title}
            />

            <TextInput
              placeholder="This is example site"
              label="Description"
              name="description"
              required
              value={props.values.description}
              onChange={props.handleChange}
              error={props.touched.description && props.errors.description}
            />

            <TextInput
              placeholder="Tartar sauce"
              label="Tagline"
              name="tagline"
              required
              value={props.values.tagline}
              onChange={props.handleChange}
              error={props.touched.tagline && props.errors.tagline}
            />
          </div>
        </Tab>
        <Tab label="Vars">
          <div className="mb-4 space-y-5">
            <NativeSelect
              data={[
                {
                  value: 'tailwind-mp3',
                  label: 'tailwind-mp3'
                },
                {
                  value: 'tailwind-wall',
                  label: 'tailwind-wall'
                },
                {
                  value: 'z-wallpaper',
                  label: 'z-wallpaper'
                },
                {
                  value: 'slayton',
                  label: 'slayton'
                },
                {
                  value: 'blackford',
                  label: 'blackford'
                },
                {
                  value: 'hames',
                  label: 'hames'
                }
              ]}
              placeholder="Pick one"
              label="Theme"
              required
              name="theme"
              value={props.values.theme}
              onChange={props.handleChange}
              error={props.touched.theme && props.errors.theme}
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

            <TextInput
              placeholder="14"
              label="Init post count"
              name="initPostCount"
              required
              value={props.values.initPostCount}
              onChange={props.handleChange}
              error={props.touched.initPostCount && props.errors.initPostCount}
            />

            <TextInput
              placeholder="7"
              label="Post per day"
              name="postPerDay"
              required
              value={props.values.postPerDay}
              onChange={props.handleChange}
              error={props.touched.postPerDay && props.errors.postPerDay}
            />
          </div>
        </Tab>
      </Tabs>

      <div>
        <Button
          fullWidth
          className="bg-blue-500 hover:bg-blue-600"
          type="submit"
          loading={props.isSubmitting}
        >
          DEPLOY
        </Button>
      </div>
    </form>
  )
}

export default Form
