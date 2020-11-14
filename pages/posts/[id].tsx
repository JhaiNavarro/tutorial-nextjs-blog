import { GetStaticPaths, GetStaticProps, GetStaticPropsContext } from 'next'
import Head from 'next/head'
import { ParsedUrlQuery } from 'querystring'
import Date from '../../components/date'
import Layout from '../../components/layout'
import { getAllPostIds, getPostData, PostData } from '../../lib/posts'
import utilStyles from '../../styles/utils.module.css'

export interface PathParams extends ParsedUrlQuery {
  id: string
}

interface Props {
  postData: PostData
}

export default function Post({ postData }: Props): JSX.Element {
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

export const getStaticPaths: GetStaticPaths<PathParams> = async () => {
  const pathParams = getAllPostIds();

  return {
    paths: pathParams.map(params => ({ params })),
    fallback: false
  }
}

export const getStaticProps: GetStaticProps = async ({
  params
}: GetStaticPropsContext<PathParams>) => {
  // No support for catch-all routes yet
  if (Array.isArray(params.id)) {
    return
  }

  return {
    props: {
      postData: await getPostData(params.id)
    }
  }
}