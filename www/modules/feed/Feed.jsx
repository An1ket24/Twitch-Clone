import { List } from './List'
import { Divider, Box, Text, Button, Collapse, Icon } from '@chakra-ui/core'
import { Tags } from './Tags'
import { Top } from './Top'
import { Bottom } from './Bottom'

let xPadding = '7px'

export function Feed() {
    return (
        <Box data-id='Feed' h='100vh' pt='7px' pb='12px'>
            <Box px={xPadding} pb='3px'>
                <Top />
            </Box>
            <Box as='hr' borderTopWidth='2px' borderColor='#E3E3E3' />
            <Box pl={xPadding}>
                <Tags />
            </Box>
            <Box px={xPadding} h='500px'>
                <List />
            </Box>
            <Box px={xPadding}>
                <Bottom />
            </Box>
        </Box>
    )
}
