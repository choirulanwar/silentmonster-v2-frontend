import { Editor } from '@tinymce/tinymce-react'
import Layout from '@/layouts/Admin'

const tinymceInit = {
  height: 500,
  plugins: [
    'advlist autolink lists link image charmap preview anchor',
    'searchreplace visualblocks code fullscreen',
    'insertdatetime media table paste code help wordcount'
  ],
  toolbar:
    'undo redo | formatselect | bold italic backcolor | \
  alignleft aligncenter alignright alignjustify | \
  bullist numlist outdent indent | removeformat | \
  table | help'
}

const SelfHostedEditor = ({ value, init = tinymceInit }) => {
  // Any other closure related logic in here.

  return (
    <Editor
      // Uncontrolled component.
      initialValue={value}
      init={init}
      // If you're looking to self host the JS required to TinyMCE, you
      // can change from the cloud version to a locally hosted one using
      // a script include like so:
      tinymceScriptSrc="/js/tinymce/tinymce.min.js"
    />
  )
}

const Page = () => (
  <Layout title="Themes">
    <h1>Coming Soon</h1>
    <SelfHostedEditor value="Hooray for TinyMCE!" />
  </Layout>
)

export default Page
