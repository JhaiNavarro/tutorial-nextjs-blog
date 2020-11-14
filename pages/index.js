import Head from 'next/head'
import Link from 'next/link'
import Layout, { siteTitle } from '../components/layout'
import utilStyles from '../styles/utils.module.css'
import { getSortedPostsData } from '../lib/posts'

export default function Home({ allPostsData }) {
  return (
    <>
      <Head>
        <title>{siteTitle}</title>
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

export async function getStaticProps() {
  return {
    props: {
      allPostsData: getSortedPostsData()
    }
  }
}