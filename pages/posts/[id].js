import Head from 'next/head'
import Date from '../../components/date'
import Layout from '../../components/layout'
import { getAllPostIds, getPostData } from '../../lib/posts'
import utilStyles from '../../styles/utils.module.css'

export default function Post({ postData }) {
  return (
    <>
      <Head>
        <title>{postData.title}</title>
      </Head>

      <Layout>
        <div className={utilStyles.headingXl}>{postData.title}</div>
        <br />

        <div className={utilStyles.lightText}>
          <Date dateString={postData.date} />
        </div>
        <br />

        <article dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />
      </Layout>
    </>
  )
}

export function getStaticPaths() {
  return {
    paths: getAllPostIds(),
    fallback: false
  }
}

export async function getStaticProps({ params }) {
  return {
    props: {
      postData: await getPostData(params.id)
    }
  }
}