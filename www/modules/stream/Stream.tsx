import { useEffect, FC } from 'react'
import { useUpdateEffect } from 'react-use'
import { useState } from 'reinspect'
import { Divider, Image, Box, Text, IconButton, Collapse, Icon } from '@chakra-ui/core'
import { useRouter } from 'next/router'
import { useStoreState, useStoreActions } from '~/store/store'
import { useAutoCallback, useAutoMemo, useAutoEffect } from 'hooks.macro'
import { useDelta, useConditionalEffect } from 'react-delta'

import { OutBound } from './outbound/Outbound'
import { Inbound } from './inbound/Inbound'

export const Stream = () => {
    let router = useRouter()
    return router.route === '/outbound-stream' ? <OutBound /> : <Inbound />
}
