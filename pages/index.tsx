import { GetStaticProps } from 'next'
import Head from 'next/head'
import Link from 'next/link'
import Layout from '../components/layout'
import utilStyles from '../styles/utils.module.css'
import { getSortedPostsData, PostData } from '../lib/posts'

export const SITE_TITLE = 'Next.js Sample Website'

interface Props {
  allPostsData: PostData[]
}

export default function Home({ allPostsData }: Props): JSX.Element {
  return (
    <>
      <Head>
        <title>{SITE_TITLE}</title>
      </Head>
    
      <Layout home>
        <section className={utilStyles.headingMd}>
          <p>n00b Software Engineer</p>
          <p>
            (This is a sample website - you’ll be building a site like this on{' '}
            <a href="https://nextjs.org/learn">our Next.js tutorial</a>.)
          </p>
        </section>

        <section className={utilStyles.headingMd}>…</section>
        
        <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
          <h2 className={utilStyles.headingLg}>Blog</h2>
          <ul className={utilStyles.list}>
            {allPostsData.map(({ id, date, title }) => (
              <li className={utilStyles.listItem} key={id}>
                <Link href={`/posts/${id}`}><a>{title}</a></Link>
                <br />
                {id}
                <br />
                {date}
              </li>
            ))}
          </ul>
        </section>
      </Layout>
    </>
  )
}

export const getStaticProps: GetStaticProps<Props> = async () => {
  return {
    props: {
      allPostsData: getSortedPostsData()
    }
  }
}