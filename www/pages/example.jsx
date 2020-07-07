import React from 'react'
import { useState } from 'reinspect'
import { useAutoCallback, useAutoMemo, useAutoEffect, useLayoutAutoEffect } from 'hooks.macro'

import ConnectionStatus from '~/modules/example/ConnectionStatus'
import Publisher from '~/modules/example/Publisher'
import Subscriber from '~/modules/example/Subscriber'
import { OTSession, OTPublisher, OTStreams, OTSubscriber, preloadScript } from './_app'
import { API_KEY, SESSION_ID, TOKEN } from './_app'

export default class Example extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            error: null,
            connected: false,
        }

        this.sessionEvents = {
            sessionConnected: () => {
                this.setState({ connected: true })
            },
            sessionDisconnected: () => {
                this.setState({ connected: false })
            },
        }
    }

    onError = (err) => {
        this.setState({ error: `Failed to connect: ${err.message}` })
    }

    render() {
        return (
            <OTSession
                apiKey={API_KEY}
                sessionId={SESSION_ID}
                token={TOKEN}
                eventHandlers={this.sessionEvents}
                onError={this.onError}
            >
                {this.state.error ? <div>{this.state.error}</div> : null}
                <ConnectionStatus connected={this.state.connected} />
                <Publisher />
                <OTStreams>
                    <Subscriber />
                </OTStreams>
            </OTSession>
        )
    }
}

// class App extends React.Component {
//     constructor(props) {
//         super(props)

//         this.state = {
//             error: null,
//             connection: 'Connecting',
//             publishVideo: true,
//             // loading: true,
//         }

//         this.sessionEventHandlers = {
//             sessionConnected: () => {
//                 this.setState({ connection: 'Connected' })
//             },
//             sessionDisconnected: () => {
//                 this.setState({ connection: 'Disconnected' })
//             },
//             sessionReconnected: () => {
//                 this.setState({ connection: 'Reconnected' })
//             },
//             sessionReconnecting: () => {
//                 this.setState({ connection: 'Reconnecting' })
//             },
//         }

//         this.publisherEventHandlers = {
//             accessDenied: () => {
//                 console.log('User denied access to media source')
//             },
//             streamCreated: () => {
//                 console.log('Publisher stream created')
//             },
//             streamDestroyed: ({ reason }) => {
//                 console.log(`Publisher stream destroyed because: ${reason}`)
//             },
//         }

//         this.subscriberEventHandlers = {
//             videoEnabled: () => {
//                 console.log('Subscriber video enabled')
//             },
//             videoDisabled: () => {
//                 console.log('Subscriber video disabled')
//             },
//         }
//     }

//     // async componentDidMount() {
//     //     ;({ OTSession, OTPublisher, OTStreams, OTSubscriber, preloadScript } = await import('opentok-react'))
//     //     console.log('imported')
//     //     this.setState({ loading: false })
//     // }

//     onSessionError = (error) => {
//         this.setState({ error })
//     }

//     onPublish = () => {
//         console.log('Publish Success')
//     }

//     onPublishError = (error) => {
//         this.setState({ error })
//     }

//     onSubscribe = () => {
//         console.log('Subscribe Success')
//     }

//     onSubscribeError = (error) => {
//         this.setState({ error })
//     }

//     toggleVideo = () => {
//         this.setState((state) => ({
//             publishVideo: !state.publishVideo,
//         }))
//     }

//     render() {
//         let apiKey = process.env.NEXT_PUBLIC_API_KEY
//         let sessionId = process.env.NEXT_PUBLIC_SESSION_ID
//         let token = process.env.NEXT_PUBLIC_TOKEN
//         const { error, connection, publishVideo } = this.state

//         return (
//             <div>
//                 <div id='sessionStatus'>Session Status: {connection}</div>
//                 {error ? (
//                     <div className='error'>
//                         <strong>Error:</strong> {error}
//                     </div>
//                 ) : null}
//                 <OTSession
//                     apiKey={apiKey}
//                     sessionId={sessionId}
//                     token={token}
//                     onError={this.onSessionError}
//                     eventHandlers={this.sessionEventHandlers}
//                 >
//                     <button id='videoButton' onClick={this.toggleVideo}>
//                         {publishVideo ? 'Disable' : 'Enable'} Video
//                     </button>
//                     <OTPublisher
//                         properties={{ publishVideo, width: 50, height: 50 }}
//                         onPublish={this.onPublish}
//                         onError={this.onPublishError}
//                         eventHandlers={this.publisherEventHandlers}
//                     />
//                     <OTStreams>
//                         <OTSubscriber
//                             properties={{ width: 100, height: 100 }}
//                             onSubscribe={this.onSubscribe}
//                             onError={this.onSubscribeError}
//                             eventHandlers={this.subscriberEventHandlers}
//                         />
//                     </OTStreams>
//                 </OTSession>
//             </div>
//         )
//     }
// }
