import dynamic from 'next/dynamic'

import { useFormik } from 'formik'
import * as Yup from 'yup'

import Layout from '@/layouts/Admin'

import { Editor } from '@tinymce/tinymce-react'

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

const Page = () => {
  const initialValues = { text: '' }
  const validationSchema = Yup.object().shape({
    text: Yup.string().required()
  })

  const form = useFormik({
    enableReinitialize: true,
    initialValues,
    validationSchema,
    onSubmit: async (values, { resetForm }) => {
      try {
        console.log(values)
      } catch (e) {
        console.log('e', e)
      } finally {
        resetForm({})
      }
    }
  })

  return (
    <Layout title="Themes">
      <h1>Coming Soon</h1>

      <form onSubmit={form.handleSubmit}>
        <Editor
          id="postTemplate"
          tinymceScriptSrc="/js/tinymce/tinymce.min.js"
          initialValue={form.values.text}
          init={tinymceInit}
          name="text"
          value={form.values.text}
          onEditorChange={(e, editor) =>
            form.handleChange({
              target: { name: 'text', value: e }
            })
          }
        />
        <button type="submit">SUBMIT</button>
      </form>
    </Layout>
  )
}

export default Page
