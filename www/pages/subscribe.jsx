import React from 'react'
import { useState } from 'reinspect'
import { useAutoCallback, useAutoMemo, useAutoEffect, useLayoutAutoEffect } from 'hooks.macro'

import { OTSession, OTPublisher, OTStreams, OTSubscriber, preloadScript } from './_app'
import { API_KEY, SESSION_ID, TOKEN } from './_app'

export default function Subscribe({ properties }) {
    return (
        <OTSession apiKey={API_KEY} sessionId={SESSION_ID} token={TOKEN}>
            <OTStreams>
                <OTSubscriber
                    properties={{
                        subscribeToAudio: true,
                        subscribeToVideo: true,
                        ...properties,
                    }}
                    retry
                    maxRetryAttempts={3}
                    retryAttemptTimeout={2000}
                />
            </OTStreams>
        </OTSession>
    )
}
