import Head from 'next/head'

const AuthLayout = ({ title, children }) => (
  <>
    <Head>
      <title>{title} - SilentMonster</title>
      <meta name="robots" content="noindex,nofollow" />
    </Head>
    <div className="flex justify-center h-screen bg-gray-500">
      <div className="flex items-center justify-center h-screen w-96">
        <div className="w-full px-5 pt-5 bg-white rounded-lg lg:rounded-l-none shadow-md">
          <h3 className="text-3xl font-semibold text-center mb-3">
            SilentMonster
          </h3>
          <hr className="border-t border-gray-500" />
          {children}
        </div>
      </div>
    </div>
  </>
)

export default AuthLayout
