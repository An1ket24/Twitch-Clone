import { NextApiRequest, NextApiResponse } from 'next'

import { graphQLClient, opentok, Session } from '~/pages/api/common'

let query = /* GraphQL */ `
    mutation DeleteSession($_id: ID!) {
        deleteSession(id: $_id) {
            id
            _id
        }
    }
`

export const deleteSession = async (_id: string) => {
    console.log('deleting _id', _id)
    return graphQLClient.request(query, { _id })
}

export default async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        if (req.method !== 'POST') {
            throw Error('Only POST allowed')
        }
        return new Promise((resolve, reject) => {
            opentok.createSession({ mediaMode: 'routed' }, async function (error: Error) {
                if (error) {
                    throw Error(error.message)
                }

                try {
                    let { _id } = req.query
                    let result = await deleteSession(_id as string)
                    return resolve(res.status(200).json(result.deleteSession))
                } catch (error) {
                    console.error(error)
                    return reject(res.status(error.status || 500).end(error.message))
                }
            })
        })
    } catch (error) {
        console.error(error)
        return res.status(error.status || 500).end(error.message)
    }
}
