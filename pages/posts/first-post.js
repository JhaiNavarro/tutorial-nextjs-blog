import Head from 'next/head'
import Link from 'next/link'
import Layout from '../../components/layout'

export default function FirstPost() {
  return (
    <>
      <Head>
        <title>First Post</title>
      </Head>

      <Layout>
        <h1>First post</h1>
      </Layout>
    </>
  )
}