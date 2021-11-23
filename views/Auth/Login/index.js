import Link from 'next/link'
import Layout from '@/layouts/Auth'
import { TextInput, PasswordInput, Checkbox, Button } from '@mantine/core'
import { EnvelopeClosedIcon, LockClosedIcon } from '@radix-ui/react-icons'

const Login = ({ mutations }) => (
  <Layout title="Login">
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
          name="login"
          onChange={mutations.handleChange}
          error={mutations.touched.login && mutations.errors.login}
        />
        <PasswordInput
          icon={<LockClosedIcon />}
          placeholder="***********"
          label="Password"
          required
          name="password"
          onChange={mutations.handleChange}
          error={mutations.touched.password && mutations.errors.password}
        />
      </div>
      <div className="flex items-center justify-between text-sm my-6">
        <div className="flex items-center">
          <Checkbox label="Remember me" />
        </div>
        <div className="">
          <Link href="/forgot-password">
            <a className="inline-block font-medium text-blue-500 align-baseline hover:text-blue-800">
              Forgot password?
            </a>
          </Link>
        </div>
      </div>
      <div className="mb-3 text-center">
        <Button
          fullWidth
          className="bg-blue-500 hover:bg-blue-600"
          type="submit"
          loading={mutations.isSubmitting}
        >
          {mutations.isSubmitting ? 'LOGGING IN' : 'LOGIN'}
        </Button>
      </div>

      <hr className="mb-6 border-t border-gray-500" />

      <div className="flex items-center justify-center text-sm">
        <div className="text-center">
          <span className="mr-1">{"Don't"} have an account?</span>
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

export default Login
