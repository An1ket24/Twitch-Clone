import React from 'react'
import { useState } from 'reinspect'
import { useAutoCallback, useAutoMemo, useAutoEffect, useLayoutAutoEffect } from 'hooks.macro'

import { OTSession, OTPublisher, OTStreams, OTSubscriber, preloadScript } from './_app'
import { API_KEY, SESSION_ID, TOKEN } from './_app'

export default function Publish() {
    return (
        <OTSession apiKey={API_KEY} sessionId={SESSION_ID} token={TOKEN}>
            <OTPublisher
                properties={{
                    publishAudio: true,
                    publishVideo: true,
                    videoSource: 'screen',
                }}
            />
        </OTSession>
    )
}
