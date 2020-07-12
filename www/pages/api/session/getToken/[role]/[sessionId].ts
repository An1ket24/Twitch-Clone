import { NextApiRequest, NextApiResponse } from 'next'
import { Role } from 'opentok'

import { CustomError, graphQLClient, opentok } from '~/pages/api/common'

export default async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        if (req.method !== 'POST') {
            throw new CustomError('Only POST allowed', 400)
        }
        let sessionId = req.query.sessionId as string
        let role = req.query.role as Role
        let token = opentok.generateToken(sessionId, { role, expireTime: new Date().getTime() / 60 + 3600 * 5 })
        return res.status(200).json({ sessionId, apiKey: process.env.OPENTOK_PROJECT_API_KEY, token })
    } catch (error) {
        console.error(error)
        return res.status(error.status || 500).end(error.message)
    }
}
