import { NextApiRequest, NextApiResponse } from 'next'

type Data = {
    name: string
}

export default (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method === 'POST') {
        res.status(200).json({ name: 'Johsnsss Dcoe' })
    }
}
