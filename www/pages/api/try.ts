import { NextApiRequest, NextApiResponse } from 'next'

type Data = {
    name: string
}

export default (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method === 'POST') {
        console.log('process.env', process.env)
        res.status(200).json({ name: 'Johsnsss Dcoe' })
    }
}
