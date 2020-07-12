import { FC } from 'react'
import { List } from './FeedList'
import { Box, BoxProps, Text, Button, Collapse, Icon } from '@chakra-ui/core'
import { useAutoCallback, useAutoMemo, useAutoEffect } from 'hooks.macro'

import { font15 } from '~/styles/fonts'

let Tag: FC<{ label: string; index: number } & BoxProps> = ({ label, index, ...props }) => {
    return (
        <Box
            data-id='Tag'
            borderRadius='26px'
            border='1px solid #D9D9D9'
            bg={index ? '#EBEBEB' : 'black'}
            color={index ? 'black' : 'white'}
            py='5px'
            px='10px'
            {...font15}
            {...props}
        >
            {label}
        </Box>
    )
}

export function Tags() {
    let tags = useAutoMemo([
        'All',
        'Politics',
        'Economy',
        'Sciense',
        'Fashion',
        'Games',
        'Health',
        'Sport',
        'Entertainment',
    ])

    return (
        <Box
            data-id='Tags'
            d='grid'
            gridAutoFlow='column'
            justifyContent='start'
            gridGap='12px'
            pt='9px'
            pb='8px'
            overflow='auto'
        >
            {tags.map((label, index) => (
                <Tag key={index} index={index} label={label} />
            ))}
        </Box>
    )
}
