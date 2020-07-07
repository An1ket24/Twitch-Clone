declare namespace NodeJS {
    export interface ProcessEnv {
        NODE_ENV: string
        API_URL: string
        PASSWORD: string
    }
}

declare module 'opentok-react'
declare module '@opentok/client'
