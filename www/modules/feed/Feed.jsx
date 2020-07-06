import { useLayoutEffect } from 'react'
import { List } from './List'
import { Divider, Box, Text, Button, Collapse, Icon } from '@chakra-ui/core'
import { Tags } from './Tags'
import { Top } from './Top'
import { Bottom } from './Bottom'

let xPadding = '9px'

export function Feed() {
    useLayoutEffect(() => {
        let vh = window.innerHeight * 0.01
        document.documentElement.style.setProperty('--vh', `${vh}px`)
    }, [])

    return (
        <Box data-id='Feed' pt='12px' pb='65px'>
            <Box px={xPadding} pb='3px' h='46px'>
                <Top />
            </Box>
            <Box as='hr' borderTopWidth='2px' borderColor='#E3E3E3' opacity='50%' />
            <Box pl={xPadding} h='47px'>
                <Tags />
            </Box>
            <Box
                px={xPadding}
                // h={`calc(var(--vh, 1vh) * 100 - ${12 + 46 + 2 + 47}px)`}
            >
                <List />
            </Box>
            <Box px={xPadding} h='65px' pos='fixed' bg='white' zIndex={100} bottom='0' w='100%' maxW='450px'>
                <Bottom />
            </Box>
        </Box>
    )
}
