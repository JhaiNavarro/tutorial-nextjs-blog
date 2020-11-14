import { NextApiHandler, NextApiRequest, NextApiResponse } from 'next'

export default (req: NextApiRequest, res: NextApiResponse): NextApiHandler => {
  res.status(200).json({ text: 'Hello, I am an API route!' })

  return
}