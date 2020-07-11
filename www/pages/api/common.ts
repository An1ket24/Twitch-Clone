import OpenTok from 'opentok'
import { GraphQLClient } from 'graphql-request'
import { NextApiRequest, NextApiResponse } from 'next'
// import Cors from 'cors'

// const cors = Cors({
//     methods: ['GET', 'HEAD'],
// })

// Helper method to wait for a middleware to execute before continuing
// And to throw an error when an error happens in a middleware
// function runMiddleware(req: NextApiRequest, res: NextApiResponse, fn: typeof cors) {
//     return new Promise((resolve, reject) => {
//         fn(req, res, (result) => {
//             if (result instanceof Error) {
//                 return reject(result)
//             }

//             return resolve(result)
//         })
//     })
// }

export let opentok = new OpenTok(process.env.OPENTOK_PROJECT_API_KEY, process.env.OPENTOK_PROJECT_SECRET)
export let graphQLClient = new GraphQLClient('https://graphql.fauna.com/graphql', {
    headers: {
        authorization: `Bearer ${process.env.FAUNA_DB_SECRET}`,
    },
})

export class CustomError extends Error {
    [key: string]: any
    constructor(message: string, status?: number) {
        super(message)
        this.status = status
    }
}
