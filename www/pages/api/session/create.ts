import { NextApiRequest, NextApiResponse } from 'next'

import { graphQLClient, opentok } from '~/pages/api/common'

let query = /* GraphQL */ `
    mutation CreateSession($id: ID!) {
        createSession(data: { id: $id }) {
            id
            _id
        }
    }
`

export default async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        if (req.method !== 'POST') {
            throw Error('Only POST allowed')
        }
        return new Promise((resolve) => {
            opentok.createSession({ mediaMode: 'routed' }, async function (error, session) {
                if (error) {
                    throw Error(error.message)
                }
                console.log('sessionId', session!.sessionId)
                let result = await graphQLClient.request(query, { id: session!.sessionId })
                let { _id, id: sessionId } = result.createSession
                let token = opentok.generateToken(sessionId, { role: 'publisher' })
                resolve(res.status(200).json({ _id, sessionId, apiKey: process.env.OPENTOK_PROJECT_API_KEY, token }))
            })
        })
    } catch (error) {
        console.error(error)
        return res.status(error.status || 500).end(error.message)
    }
}
