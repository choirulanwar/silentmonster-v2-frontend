import Link from 'next/link'
import Layout from '@/layouts/Auth'
import { TextInput, Button } from '@mantine/core'
import { EnvelopeClosedIcon } from '@radix-ui/react-icons'

const ForgotPassword = ({ mutations }) => (
  <Layout title="Forgot Password">
    <form
      className="px-8 pt-6 pb-2 mb-4 bg-white rounded"
      onSubmit={mutations.handleSubmit}
    >
      <div className="mb-4 space-y-5">
        <TextInput
          icon={<EnvelopeClosedIcon />}
          placeholder="mail@example.com"
          label="Email"
          required
          name="email"
          onChange={mutations.handleChange}
          error={mutations.touched.email && mutations.errors.email}
        />
      </div>
      <div className="mb-3 text-center">
        <Button
          fullWidth
          className="bg-blue-500 hover:bg-blue-600"
          type="submit"
          loading={mutations.isSubmitting}
        >
          {mutations.isSubmitting ? 'SUBMITTING' : 'FORGOT PASSWORD'}
        </Button>
      </div>

      <hr className="mb-6 border-t border-gray-500" />

      <div className="flex items-center justify-center text-sm">
        <div className="text-center">
          <span className="mr-1">Dont have an account?</span>
          <Link href="/register">
            <a className="inline-block font-medium text-blue-500 align-baseline hover:text-blue-800">
              Create account
            </a>
          </Link>
        </div>
      </div>
    </form>
  </Layout>
)

export default ForgotPassword
