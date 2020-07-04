import { Divider, Box, Text, Button, Collapse, Icon } from '@chakra-ui/core'
import { ChatList } from './ChatList'

let xPadding = '18px'

export function Stream() {
    return (
        <Box data-id='Stream' h='100vh' pt='12px'>
            <Box px={xPadding}>
                <ChatList />
            </Box>
        </Box>
    )
}
