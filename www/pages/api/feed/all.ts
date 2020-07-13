import { NextApiRequest, NextApiResponse } from 'next'

import { graphQLClient, opentok } from '~/pages/api/common'

let query = /* GraphQL */ `
    query {
        allSessions {
            data {
                id
            }
        }
    }
`

export type Session = { id: string }
export type ApiFeedAllResult = { sessions: [{ id: string }] }

export default async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        if (req.method !== 'POST') {
            throw Error('Only POST allowed')
        }
        let results = await graphQLClient.request(query)
        let sessions = results.allSessions.data as Session[]

        return new Promise((resolve) => {
            let activeSessions = [] as Session[]
            let nProcessed = 0
            sessions.forEach(({ id }) => {
                opentok.listStreams(id, function (error: any, streams: []) {
                    nProcessed++
                    if (streams?.length >= 1) {
                        activeSessions.push({ id })
                    }
                    if (nProcessed === sessions.length) {
                        console.log('activeSessions', activeSessions)
                        resolve(res.status(200).json({ sessions: activeSessions }))
                    }
                })
            })
        })
    } catch (error) {
        console.error(error)
        return res.status(error.status || 500).end(error.message)
    }
}
