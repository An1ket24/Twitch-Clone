import OpenTok from 'opentok'
import { GraphQLClient } from 'graphql-request'

export type Session = { id: string }

let isProd = process.env.NODE_ENV == 'production'
console.log('isProd', isProd)
export const OPENTOK_PROJECT_API_KEY = isProd
    ? process.env.OPENTOK_PROJECT_API_KEY
    : process.env.OPENTOK_PROJECT_API_KEY_DEV
export let opentok = isProd
    ? new OpenTok(process.env.OPENTOK_PROJECT_API_KEY, process.env.OPENTOK_PROJECT_SECRET)
    : new OpenTok(process.env.OPENTOK_PROJECT_API_KEY_DEV, process.env.OPENTOK_PROJECT_SECRET_DEV)

export let graphQLClient = new GraphQLClient('https://graphql.fauna.com/graphql', {
    headers: {
        authorization: `Bearer ${isProd ? process.env.FAUNA_DB_SECRET : process.env.FAUNA_DB_SECRET_DEV}`,
    },
})

export class CustomError extends Error {
    [key: string]: any
    constructor(message: string, status?: number) {
        super(message)
        this.status = status
    }
}

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
