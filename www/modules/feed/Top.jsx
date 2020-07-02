import { List } from './List'
import { Avatar, Divider, Box, Text, Button, Collapse, Icon } from '@chakra-ui/core'
import { Tags } from './Tags'

import { font36, fontRoboto } from '~/styles/fonts'
import { TitleSvg } from '~/svg'

export function Top() {
    return (
        <Box data-id='Top' d='flex' alignItems='center' {...font36}>
            <TitleSvg />
            <Text ml='6px'>Freedom</Text>
            <Avatar name='D' ml='auto' {...fontRoboto} fontSize='18px' width='35px' height='35px' bg='#8C8C8C' />
        </Box>
    )
}
