import { NextApiRequest, NextApiResponse } from 'next'

import { graphQLClient, opentok } from '~/pages/api/common'
import { deleteSession } from '~/pages/api/session/delete/[_id]'
import { queryCache } from 'react-query'

let query = /* GraphQL */ `
    query {
        allSessions {
            data {
                id
                _ts
                _id
            }
            after
        }
    }
`

let queryCursor = /* GraphQL */ `
    query q($_cursor: String!) {
        allSessions(_cursor: $_cursor) {
            data {
                id
                _ts
                _id
            }
            after
        }
    }
`

type Session = { id: string; _id: string; _ts: string }

export type ApiFeedAllResult = { sessions: [Session] }

export default async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        if (req.method !== 'POST') {
            throw Error('Only POST allowed')
        }
        let results = await graphQLClient.request(query)
        let sessions = results.allSessions.data as Session[]
        let after = results.allSessions.after as string
        while (after) {
            results = await graphQLClient.request(queryCursor, { _cursor: after })
            sessions = [...sessions, ...(results.allSessions.data as Session[])]
            after = results.allSessions.after as string
        }

        let now = new Date().getTime() * 1000 // us
        let hr24 = 24 * 3600 * 1000 * 1000 // uS
        let toBeProcessed = sessions.length

        return new Promise((resolve) => {
            if (!toBeProcessed) {
                console.log('toBeProcessed = 0, activeSessions', [])
                resolve(res.status(200).json({ sessions: [] }))
            }
            let activeSessions = [] as Session[]
            let nProcessed = 0
            sessions.forEach(async ({ _id, id, _ts }) => {
                if (now - +_ts > hr24) {
                    toBeProcessed--
                    if (!toBeProcessed) {
                        console.log('toBeProcessed = 0, all deleted, activeSessions', [])
                        resolve(res.status(200).json({ sessions: [] }))
                    }
                    console.log('deleting sessionId that is more than 24hr old: _id, id, _ts', _id, id, _ts)
                    await deleteSession(_id)
                } else {
                    opentok.listStreams(id, function (error: any, streams: []) {
                        nProcessed++
                        if (streams?.length >= 1) {
                            activeSessions.push({ id, _ts, _id })
                        }
                        if (nProcessed === toBeProcessed) {
                            console.log('nProcessed', nProcessed)
                            console.log('activeSessions', activeSessions)
                            resolve(res.status(200).json({ sessions: activeSessions }))
                        }
                    })
                }
            })
        })
    } catch (error) {
        console.error(error)
        return res.status(error.status || 500).end(error.message)
    }
}
