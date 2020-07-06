import React, { useLayoutEffect, ReactNode, FC, useEffect, useState, ReactElement } from 'react'
import Head from 'next/head'
import { AppProps } from 'next/app'
import Router from 'next/router'
import { ThemeProvider } from '@chakra-ui/core'
import { StateInspector } from 'reinspect'
import { CSSReset, Grid, Spinner } from '@chakra-ui/core'
import { Global } from '@emotion/core'
import screenfull from 'screenfull'
import { useAutoCallback, useAutoMemo, useAutoEffect } from 'hooks.macro'
import { StoreProvider } from 'easy-peasy'

import { theme } from '~/styles/theme'
import { store } from '~/store/store'
import { Layout } from '~/Layout'
import { Login } from '~/modules/login/Login'
import { useStoreState, useStoreActions } from '~/store/hooks'

const DefaultOnSSR = () => <span />

const NoSSRComponent = ({ children }: { children: ReactElement }) => {
    const [state, setState] = useState(false)
    useEffect(() => {
        setState(true)
    }, [])
    return state ? children : <DefaultOnSSR />
}

const NoSSR = (Component: any) => (props: any) => (
    <NoSSRComponent>
        <Component {...props} />
    </NoSSRComponent>
)

const Auth: FC = ({ children }) => {
    const isAuth = useStoreState((state) => state.isAuth)
    let setAuth = useStoreActions((state) => state.setAuth)

    if (!isAuth) {
        let isVisited = localStorage.getItem('web-rtc')
        if (isVisited) {
            setAuth(true)
            localStorage.setItem('web-rtc', 'signed-in')
        } else {
            return <Login />
        }
    }

    return <>{children}</>
}

function MyApp({ Component, pageProps }: AppProps) {
    console.log('App MOUNT')
    // useLayoutEffect(() => {
    // window.scrollTo(0, 1)
    // })
    // useAutoEffect(() => {
    //     onOpen()
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
                        // bg: '#e5e5e5',
                        color: 'black',
                        fontSize: '14px',
                        lineHeight: '24px',
                        // display: 'block',
                        margin: 0,
                    },
                    '#__next': {
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
                        <Component {...pageProps} />
                        {/* </Layout> */}
                        {/* </div>*/}
                    </Auth>
                </StateInspector>
            </StoreProvider>
        </ThemeProvider>
    )
}

export default NoSSR(MyApp)
