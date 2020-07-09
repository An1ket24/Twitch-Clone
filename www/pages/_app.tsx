import React, { useLayoutEffect, ReactNode, FC, useEffect, ReactElement } from 'react'
import { useState } from 'reinspect'
import Head from 'next/head'
import { AppProps } from 'next/app'
import Router from 'next/router'
import { ThemeProvider, Box } from '@chakra-ui/core'
import { StateInspector } from 'reinspect'
import { CSSReset, Grid, Spinner } from '@chakra-ui/core'
import { Global } from '@emotion/core'
import screenfull from 'screenfull'
import { useAutoCallback, useAutoMemo, useAutoEffect } from 'hooks.macro'
import { StoreProvider } from 'easy-peasy'
import { useMountedState } from 'react-use'
import { useQuery } from 'react-query'

import { theme } from '~/styles/theme'
import { store } from '~/store/store'
import { Layout } from '~/Layout'
import { Login } from '~/modules/login/Login'
import { useStoreState, useStoreActions } from '~/store/store'

export let OTSession: any, OTPublisher: any, OTStreams: any, OTSubscriber: any, preloadScript: any

export let API_KEY = '46828034'
export let SESSION_ID = '1_MX40NjgyODAzNH5-MTU5NDExODcxNjU1NH5Ka3FZOFU5S2hiUnVpdytSQW5MVkIyQSt-fg'
export let TOKEN =
    'T1==cGFydG5lcl9pZD00NjgyODAzNCZzaWc9MmJkYmY5YmUxMjg4Yzg5MDNjMDA5MWFmNmM2ZmZhOGJiNWY0NzZiNjpzZXNzaW9uX2lkPTFfTVg0ME5qZ3lPREF6Tkg1LU1UVTVOREV4T0RjeE5qVTFOSDVLYTNGWk9GVTVTMmhpVW5WcGR5dFNRVzVNVmtJeVFTdC1mZyZjcmVhdGVfdGltZT0xNTk0MTI1Nzc5Jm5vbmNlPTAuNzAyNDUwMjE2ODQ4NjUyNiZyb2xlPXB1Ymxpc2hlciZleHBpcmVfdGltZT0xNTk2NzE3Nzc4JmluaXRpYWxfbGF5b3V0X2NsYXNzX2xpc3Q9'

const Auth: FC = ({ children }) => {
    const isAuth = useStoreState((state) => state.auth.isAuth)
    let PASSWORD = useStoreState((state) => state.auth.PASSWORD)
    let setAuth = useStoreActions((state) => state.auth.setAuth)
    let readStoredPassword = useStoreActions((state) => state.auth.readStoredPassword)

    if (!isAuth) {
        if (readStoredPassword() === PASSWORD) {
            setAuth(true)
        } else {
            return <Login />
        }
    }

    return <>{children}</>
}

import wretch from 'wretch'

const fetch = () => {
    console.log('fetching')
    // return wretch(process.env.NODE_ENV === 'production' ? '/' 'http://localhost:3000/api/try')
    return wretch('/api/try').post().setTimeout(1000).json()
}

function App({ Component, pageProps }: AppProps) {
    console.log('App MOUNT')
    console.log('API process.env', process.env)
    let { data } = useQuery('api', fetch)
    console.log('data', data)
    // useLayoutEffect(() => {
    // window.scrollTo(0, 1)
    // })
    // useAutoEffect(() => {
    //     onOpen()
    // })
    // useAutoEffect(() => {
    //     let imp = async () => await import('@opentok/client')
    //     imp().then(() => {
    //         console.log('imported')
    //         setLoading(false)
    //     })
    // })
    return (
        <ThemeProvider theme={theme}>
            <CSSReset />
            <Global
                styles={{
                    '::-webkit-search-cancel-button': {
                        WebkitAppearance: 'none',
                    },
                    body: {
                        color: 'black',
                        fontSize: '14px',
                        lineHeight: '24px',
                        // display: 'block',
                        margin: 0,
                    },
                    '#__next': {
                        backgroundColor: '#e5e5e5',
                        // display: 'block',
                    },
                }}
            />
            <StoreProvider store={store}>
                <StateInspector name='App'>
                    <Head>
                        {/* <meta charSet='utf-8' name='viewport' content='width=1170' /> */}
                        <meta
                            charSet='utf-8'
                            name='viewport'
                            content='width=device-width, initial-scale=1, shrink-to-fit=no, user-scalable=no, maximum-scale=1'
                        />
                        {/* <script defer async src='https://static.opentok.com/v2/js/opentok.min.js' /> */}

                        <meta name='description' content='WEB-RTC' />
                        <meta name='apple-mobile-web-app-capable' content='yes' />
                        <meta name='mobile-web-app-capable' content='yes' />
                        <meta name='apple-mobile-web-app-status-bar-style' content='black' />
                        <title>Web RTC</title>
                        <link href='https://fonts.googleapis.com/css2?family=Roboto&display=swap' rel='stylesheet' />
                        <link
                            href='https://fonts.googleapis.com/css2?family=Yanone+Kaffeesatz&display=swap'
                            rel='stylesheet'
                        />
                        <link rel='icon' type='image/x-icon' href='favicon.ico' />
                    </Head>

                    <Auth>
                        {/* <div */}
                        {/*// onClick={() => {
                        //     if (screenfull.isEnabled) {
                        //         try {
                        //             screenfull.request()
                        //         } catch (error) {
                        //             console.error('fullscreen error')
                        //         }
                        //     }
                        // }}
                        // onDrag={() => {
                        //     try {
                        //         if (screenfull.isEnabled) {
                        //             screenfull.request()
                        //         }
                        //     } catch (error) {
                        //         console.error('ffullscreen error')
                        //     }
                        // }}
                        // >*/}
                        {/* <Layout> */}

                        <Box maxW='450px' bg='white'>
                            <Component {...pageProps} />
                        </Box>
                        {/* </Layout> */}
                        {/* </div>*/}
                    </Auth>
                </StateInspector>
            </StoreProvider>
        </ThemeProvider>
    )
}

const LoadOpenTokThenApp = (props: any) => {
    const [loading, setLoading] = useState(true, 'setLoadingOpenTok')

    useAutoEffect(() => {
        let imp = async () => {
            let module = await import('opentok-react')
            ;({ OTSession, OTPublisher, OTStreams, OTSubscriber, preloadScript } = module)
        }
        imp().then(() => {
            console.log('imported')
            setLoading(false)
        })
    })

    if (loading) {
        return null
    }
    let Component = preloadScript(App)
    return <Component {...props} />
}

const DefaultOnSSR = () => <span />
const NoSSRComponent = ({ children }: { children: ReactElement }) => {
    return useMountedState() ? children : <DefaultOnSSR />
}
const NoSSR = (Component: any) => (props: any) => (
    <NoSSRComponent>
        <Component {...props} />
    </NoSSRComponent>
)

export default NoSSR(LoadOpenTokThenApp)
