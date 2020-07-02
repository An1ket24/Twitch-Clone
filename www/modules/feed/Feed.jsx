import { List } from './List'
import { Divider, Box, Text, Button, Collapse, Icon } from '@chakra-ui/core'
import { Tags } from './Tags'
import { Top } from './Top'
import { Bottom } from './Bottom'

let xPadding = '7px'

export function Feed() {
    return (
        <Box data-id='Feed' h='100vh' pt='12px'>
            <Box px={xPadding} pb='3px' h='46px'>
                <Top />
            </Box>
            <Box as='hr' borderTopWidth='2px' borderColor='#E3E3E3' opacity='50%' />
            <Box pl={xPadding} h='47px'>
                <Tags />
            </Box>
            <Box px={xPadding} h={`calc(100vh - ${12 + 46 + 2 + 47 + 65}px)`}>
                <List />
            </Box>
            <Box px={xPadding} h='65px'>
                <Bottom />
            </Box>
        </Box>
    )
}
