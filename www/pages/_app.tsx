import React, { useLayoutEffect, ReactNode, FC, useEffect, ReactElement } from 'react'
import { useState } from 'reinspect'
import Head from 'next/head'
import { AppProps } from 'next/app'
import Router from 'next/router'
import { ThemeProvider, Box } from '@chakra-ui/core'
import { StateInspector } from 'reinspect'
import { CSSReset, Grid, Spinner } from '@chakra-ui/core'
import { Global } from '@emotion/core'
import { useAutoCallback, useAutoMemo, useAutoEffect } from 'hooks.macro'
import { StoreProvider } from 'easy-peasy'
import { useMountedState } from 'react-use'
import { ReactQueryConfigProvider } from 'react-query'
import { ReactQueryDevtools } from 'react-query-devtools'

import { theme } from '~/styles/theme'
import { store } from '~/store/store'
import { Layout } from '~/Layout'
import { Login } from '~/modules/login/Login'
import { useStoreState, useStoreActions } from '~/store/store'

export let OT: any, OTSession: any, OTPublisher: any, OTStreams: any, OTSubscriber: any

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

function App({ Component, pageProps }: AppProps) {
    console.log('App MOUNT')

    return (
        <ThemeProvider theme={theme}>
            <ReactQueryConfigProvider config={{ queries: { refetchOnWindowFocus: false } }}>
                {/* <ReactQueryDevtools initialIsOpen={false} /> */}
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
                            <link
                                href='https://fonts.googleapis.com/css2?family=Roboto&display=swap'
                                rel='stylesheet'
                            />
                            <link
                                href='https://fonts.googleapis.com/css2?family=Yanone+Kaffeesatz&display=swap'
                                rel='stylesheet'
                            />
                            <link rel='icon' type='image/x-icon' href='favicon.ico' />
                        </Head>

                        <Auth>
                            <Box maxW='450px' bg='white'>
                                <Component {...pageProps} />
                            </Box>
                        </Auth>
                    </StateInspector>
                </StoreProvider>
            </ReactQueryConfigProvider>
        </ThemeProvider>
    )
}

const LoadNoSSR = ({ children }: { children: ReactElement }) => {
    const [loading, setLoading] = useState(true, 'setLoadingOpenTok')

    useAutoEffect(() => {
        let imp = async () => {
            let module = await import('opentok-react')
            ;({ OTSession, OTPublisher, OTStreams, OTSubscriber } = module)
            OT = await import('@opentok/client')
        }
        imp().then(() => {
            console.log('imported')
            setLoading(false)
        })
    })

    if (loading) {
        return null
    }
    return loading ? <span /> : children
}

const NoSSRComponent = ({ children }: { children: ReactElement }) => {
    return useMountedState() ? children : <span />
}
const NoSSR = (Component: any) => (props: any) => (
    <NoSSRComponent>
        <LoadNoSSR>
            <Component {...props} />
        </LoadNoSSR>
    </NoSSRComponent>
)

export default NoSSR(App)
