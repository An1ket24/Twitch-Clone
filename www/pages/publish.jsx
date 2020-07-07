import React from 'react'
import { useState } from 'reinspect'
import { useAutoCallback, useAutoMemo, useAutoEffect, useLayoutAutoEffect } from 'hooks.macro'
import { roundToNearestMinutesWithOptions } from 'date-fns/fp'

export let OTSession, OTPublisher, OTStreams, OTSubscriber, preloadScript

let apiKey = process.env.NEXT_PUBLIC_API_KEY
let sessionId = process.env.NEXT_PUBLIC_SESSION_ID
let token = process.env.NEXT_PUBLIC_TOKEN

import ConnectionStatus from '~/modules/example/ConnectionStatus'
import Publisher from '~/modules/example/Publisher'
import Subscriber from '~/modules/example/Subscriber'

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

    // componentWillMount() {
    //     OT.registerScreenSharingExtension('chrome', config.CHROME_EXTENSION_ID, 2)
    // }

    onError = (err) => {
        this.setState({ error: `Failed to connect: ${err.message}` })
    }

    render() {
        return (
            <OTSession
                apiKey={apiKey}
                sessionId={sessionId}
                token={token}
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
