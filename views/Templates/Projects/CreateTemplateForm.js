import {
  TextInput,
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
              data={props.webmasters.datas.edges.map(
                ({ node: { _id, label } }) => ({
                  value: _id,
                  label
                })
              )}
              placeholder="Pick one"
              label="Webmaster"
              required
              name="webmaster"
              value={props.values.webmaster}
              onChange={props.handleChange}
              error={props.touched.webmaster && props.errors.webmaster}
            />

            <NativeSelect
              data={props.domains.datas.edges.map(
                ({ node: { _id, label } }) => ({
                  value: _id,
                  label
                })
              )}
              placeholder="Pick one"
              label="Domain"
              required
              name="domain"
              value={props.values.domain}
              onChange={props.handleChange}
              error={props.touched.domain && props.errors.domain}
            />

            <NativeSelect
              data={props.githubs.datas.edges.map(
                ({ node: { _id, label } }) => ({
                  value: _id,
                  label
                })
              )}
              placeholder="Pick one"
              label="Github"
              required
              name="github"
              value={props.values.github}
              onChange={props.handleChange}
              error={props.touched.github && props.errors.github}
            />

            <NativeSelect
              data={props.postTemplates.datas.edges.map(
                ({ node: { _id, label } }) => ({
                  value: _id,
                  label
                })
              )}
              placeholder="Pick one"
              label="Post Template"
              required
              name="post"
              value={props.values.post}
              onChange={props.handleChange}
              error={props.touched.post && props.errors.post}
            />
          </div>
        </Tab>
        <Tab label="Ads">
          <div className="mb-4 space-y-5">
            <NativeSelect
              data={props.adss.datas.edges.map(({ node: { _id, label } }) => ({
                value: _id,
                label
              }))}
              placeholder="Pick one"
              label="Social Bar"
              name="socialBar"
              value={props.values.socialBar}
              onChange={props.handleChange}
              error={props.touched.socialBar && props.errors.socialBar}
            />

            <NativeSelect
              data={props.adss.datas.edges.map(({ node: { _id, label } }) => ({
                value: _id,
                label
              }))}
              placeholder="Pick one"
              label="Banner 300x250"
              name="banner300x250"
              value={props.values.banner300x250}
              onChange={props.handleChange}
              error={props.touched.banner300x250 && props.errors.banner300x250}
            />

            <NativeSelect
              data={props.adss.datas.edges.map(({ node: { _id, label } }) => ({
                value: _id,
                label
              }))}
              placeholder="Pick one"
              label="Banner 468x60"
              name="banner468x60"
              value={props.values.banner468x60}
              onChange={props.handleChange}
              error={props.touched.banner468x60 && props.errors.banner468x60}
            />

            <NativeSelect
              data={props.adss.datas.edges.map(({ node: { _id, label } }) => ({
                value: _id,
                label
              }))}
              placeholder="Pick one"
              label="Banner 728x90"
              name="banner728x90"
              value={props.values.banner728x90}
              onChange={props.handleChange}
              error={props.touched.banner728x90 && props.errors.banner728x90}
            />

            <NativeSelect
              data={props.adss.datas.edges.map(({ node: { _id, label } }) => ({
                value: _id,
                label
              }))}
              placeholder="Pick one"
              label="Fixed"
              name="bannerFixed"
              value={props.values.bannerFixed}
              onChange={props.handleChange}
              error={props.touched.bannerFixed && props.errors.bannerFixed}
            />

            <NativeSelect
              data={props.adss.datas.edges.map(({ node: { _id, label } }) => ({
                value: _id,
                label
              }))}
              placeholder="Pick one"
              label="In Article"
              name="bannerInArticle"
              value={props.values.bannerInArticle}
              onChange={props.handleChange}
              error={
                props.touched.bannerInArticle && props.errors.bannerInArticle
              }
            />

            <NativeSelect
              data={props.adss.datas.edges.map(({ node: { _id, label } }) => ({
                value: _id,
                label
              }))}
              placeholder="Pick one"
              label="Pop Under"
              name="popUnder"
              value={props.values.popUnder}
              onChange={props.handleChange}
              error={props.touched.popUnder && props.errors.popUnder}
            />

            <NativeSelect
              data={props.adss.datas.edges.map(({ node: { _id, label } }) => ({
                value: _id,
                label
              }))}
              placeholder="Pick one"
              label="Direct Link"
              name="directLink"
              value={props.values.directLink}
              onChange={props.handleChange}
              error={props.touched.directLink && props.errors.directLink}
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
          SAVE
        </Button>
      </div>
    </form>
  )
}

export default Form
