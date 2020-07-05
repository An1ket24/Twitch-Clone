import { FC, useEffect, useRef } from 'react'
import { Box, BoxProps, Text, Button, Collapse, Icon } from '@chakra-ui/core'
import { useAutoCallback, useAutoMemo, useAutoEffect } from 'hooks.macro'
import { useState } from 'reinspect'
import faker from 'faker'
import _ from 'lodash'
import format from 'date-fns/format'

import { font16, font14 } from '~/styles/fonts'
import { Avatar } from '~/svg'

let Row: FC<{ time: string; user: string; avatarColor: string; text: string } & BoxProps> = ({
    time,
    avatarColor,
    user,
    text,
}) => {
    return (
        <Box data-id='Row' d='flex' alignItems='flex-start'>
            <Box flex={0}>
                <Avatar fill={avatarColor} />
            </Box>
            <Box ml='15px' d='flex' flexDirection='column' minH='35px' mt='-2px'>
                {/* center verticall on the avatar, when sentence is short, otherwise top leveled with avatar */}
                <Box flexShrink={1} flexGrow={1} minH={0} maxH='11px' />
                <Box flexGrow={0} d='inline-block' {...font16}>
                    <Box as='span' {...font14} color='#969696'>
                        {time}
                    </Box>
                    <Box as='span' ml='8px' fontWeight='bold' color='#6F6F6F'>
                        {user}
                    </Box>
                    <Box as='span' ml='8px'>
                        {text}
                    </Box>
                </Box>
            </Box>
        </Box>
    )
}

let colors = [
    '#8866DD',
    '#307740',
    '#F1CE41',
    '#22EE33',
    '#C1DAF3',
    '#D53828',
    '#FF8C00',
    '#00EE33',
    '#40E0D0',
    '#2257AA',
    '#2411B7',
    '#FF8844',
]
let len = 100
const generateTime = (index: number, n: number) => {
    // generate hh:mm time sequantily
    let range = 24 * 3600 * 1000
    let cycle = range / n
    let date = new Date(new Date().getTime() - range + cycle * index + Math.random() * cycle)
    return format(date, 'hh:mm')
}
let ar = [...Array(len).keys()].map((__, index) => {
    return {
        user: faker.internet.userName(),
        avatarColor: _.sample(colors) ?? '#FF8C00',
        time: generateTime(index, len),
        text: index % 7 ? faker.lorem.sentence() : 'short sentence',
    }
})

export function ChatList() {
    let ref = useRef<HTMLElement>()
    let [data, setData] = useState(ar, 'setChatData')

    useAutoEffect(() => {
        let int = setInterval(() => {
            // rotate
            setData((currentData) => [...currentData.slice(1), currentData[0]])
        }, 1500)
        return () => clearInterval(int)
    })

    return (
        <Box
            ref={ref}
            data-id='ChatList'
            d='grid'
            gridAutoFlow='row'
            alignContent='end'
            gridGap='15px'
            pb='8px'
            h='100%'
        >
            {data.map((row, index) => (
                <Row key={index} {...row} />
            ))}
        </Box>
    )
}
