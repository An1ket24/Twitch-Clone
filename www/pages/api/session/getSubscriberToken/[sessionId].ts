import { NextApiRequest, NextApiResponse } from 'next'

import { graphQLClient, opentok } from '~/pages/api/common'

export default async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        if (req.method !== 'POST') {
            throw Error('Only POST allowed')
        }
        let sessionId = req.query.sessionId as string
        let token = opentok.generateToken(sessionId, { role: 'subscriber' })
        return res.status(200).json({ sessionId, apiKey: process.env.OPENTOK_PROJECT_API_KEY, token })
    } catch (error) {
        console.error(error)
        return res.status(error.status || 500).end(error.message)
    }
}
