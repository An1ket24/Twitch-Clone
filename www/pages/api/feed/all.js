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

export default async (req, res) => {
    try {
        if (req.method !== 'POST') {
            throw Error('Only POST allowed')
        }
        let results = await graphQLClient.request(query)
        let sessions = results.allSessions.data

        return new Promise((resolve) => {
            let activeSessions = []
            let nProcessed = 0
            sessions.forEach(({ id }, index) => {
                opentok.listStreams(id, function (error, streams) {
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
