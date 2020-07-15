declare namespace NodeJS {
    export interface ProcessEnv {
        NODE_ENV: string
        API_URL: string
        PASSWORD: string
        OPENTOK_PROJECT_API_KEY: string
        OPENTOK_PROJECT_SECRET: string
        FAUNA_DB_SECRET: string
        FAUNA_DB_SECRET_DEV: string
        OPENTOK_PROJECT_API_KEY_DEV: string
        OPENTOK_PROJECT_SECRET_DEV: string
    }
}

declare module 'opentok-react'
declare module '@opentok/client'
declare module 'opentok'
