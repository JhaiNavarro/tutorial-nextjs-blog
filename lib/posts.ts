import { PathParams } from './../pages/posts/[id]';
import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import remark from 'remark'
import html from 'remark-html'

const POSTS_DIRECTORY = path.join(process.cwd(), 'posts')

export type PostData = {
  id: string,

  // Parsed from gray-matter
  contentHtml?: string,
  date: string,
  title: string
}

export function getSortedPostsData(): PostData[] {
  // Get file names under /posts
  const fileNames = fs.readdirSync(POSTS_DIRECTORY)

  const allPostsData: PostData[] = fileNames.map(fileName => {
    // Remove ".md" from file name to get id
    const id = fileName.replace(/\.md$/, '')

    // Read markdown file as string
    const fullPath = path.join(POSTS_DIRECTORY, fileName)
    const fileContents = fs.readFileSync(fullPath, 'utf8')

    // Use gray-matter to parse the post metadata section
    const matterResult = matter(fileContents)

    return {
      id,
      date: matterResult.data.date,
      title: matterResult.data.title
    }
  })

  // Sort posts by date
  return allPostsData.sort((a, b) => {
    if (a.date < b.date) {
      return 1
    } else {
      return -1
    }
  })
}

export function getAllPostIds(): PathParams[] {
  // Get file names under /posts
  const fileNames = fs.readdirSync(POSTS_DIRECTORY)
  
  return fileNames.map(fileName => ({
    // Remove ".md" from file name to get id
    id: fileName.replace(/\.md$/, '')
  }))
}

export async function getPostData(id: string): Promise<PostData> {
  // Read markdown file as string
  const fullPath = path.join(POSTS_DIRECTORY, `${id}.md`)
  const fileContents = fs.readFileSync(fullPath, 'utf8')

  // Use gray-matter to parse the post metadata section
  const matterResult = matter(fileContents)

  // Use remark to convert markdown into HTML string
  const processedContent = await remark()
  .use(html)
  .process(matterResult.content)
  
  const contentHtml = processedContent.toString()

  // Combine the data with the id and contentHtml
  return {
    id,
    contentHtml,
    date: matterResult.data.date,
    title: matterResult.data.title
  }
}