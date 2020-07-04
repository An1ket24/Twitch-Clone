import { FC } from 'react'
import { Box, BoxProps, Text, Button, Collapse, Icon } from '@chakra-ui/core'
import { useAutoCallback, useAutoMemo, useAutoEffect } from 'hooks.macro'
import faker from 'faker'
import _ from 'lodash'
import format from 'date-fns/format'

import { font15 } from '~/styles/fonts'
import { Avatar } from '~/svg'
import { keys } from 'lodash'

let Row: FC<{ time: string; user: string; avatarColor: string; text: string } & BoxProps> = ({
    time,
    avatarColor,
    user,
    text,
    ...props
}) => {
    return (
        <Box data-id='Row' d='flex'>
            <Avatar fill={avatarColor} />
            <Box ml='10px'>{time}</Box>
            <Box ml='10px'>{user}</Box>
            <Box ml='10px'>{text}</Box>
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
const generateTime = (index: number) => {
    // generate hh:mm time sequantily in the last 10 hours
    let range = 10 * 3600 * 1000
    let cycle = range / len
    let date = new Date(new Date().getTime() - range + cycle * index + Math.random() * cycle)
    return format(date, 'hh:mm')
}

export function ChatList() {
    let data = useAutoMemo(
        [...Array(len).keys()].map((__, index) => {
            return {
                user: faker.internet.userName(),
                avatarColor: _.sample(colors) ?? '#FF8C00',
                time: generateTime(index),
                text: faker.lorem.sentence(),
            }
        })
    )

    return (
        <Box data-id='ChatList' d='grid' gridAutoFlow='row' gridGap='12px' pt='9px' pb='8px'>
            {data.map((row, index) => (
                <Row key={index} {...row} />
            ))}
        </Box>
    )
}
