import Link from 'next/link'
import Layout from '@/layouts/Auth'
import { TextInput, PasswordInput, Button } from '@mantine/core'
import {
  PersonIcon,
  EnvelopeClosedIcon,
  LockClosedIcon
} from '@radix-ui/react-icons'

const Register = ({ mutations }) => (
  <Layout title="Register">
    <form
      className="px-8 pt-6 pb-2 mb-4 bg-white rounded"
      onSubmit={mutations.handleSubmit}
    >
      <div className="mb-4 space-y-5">
        <TextInput
          icon={<PersonIcon />}
          placeholder="John Doe"
          label="Name"
          required
          name="name"
          onChange={mutations.handleChange}
          error={mutations.touched.name && mutations.errors.name}
        />
        <TextInput
          icon={<PersonIcon />}
          placeholder="johndoe"
          label="Username"
          required
          name="username"
          onChange={mutations.handleChange}
          error={mutations.touched.username && mutations.errors.username}
        />
        <TextInput
          icon={<EnvelopeClosedIcon />}
          placeholder="mail@example.com"
          label="Email"
          required
          name="email"
          onChange={mutations.handleChange}
          error={mutations.touched.email && mutations.errors.email}
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
      <div className="mb-3 text-center">
        <Button
          fullWidth
          className="bg-blue-500 hover:bg-blue-600"
          type="submit"
          loading={mutations.isSubmitting}
        >
          {mutations.isSubmitting ? 'REGISTERING' : 'REGISTER'}
        </Button>
      </div>

      <hr className="mb-6 border-t border-gray-500" />

      <div className="flex items-center justify-center text-sm">
        <div className="text-center">
          <span className="mr-1">Have an account?</span>
          <Link href="/login">
            <a className="inline-block font-medium text-blue-500 align-baseline hover:text-blue-800">
              Login
            </a>
          </Link>
        </div>
      </div>
    </form>
  </Layout>
)

export default Register
