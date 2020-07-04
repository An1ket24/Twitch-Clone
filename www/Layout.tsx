import { PropsWithChildren, useCallback, FC, useRef, forwardRef } from 'react'
import { withDataId } from '~/utils'
import { useMediaQuery } from 'react-responsive'

const Container = withDataId('Layout')
const Center = withDataId('Center', { as: 'main' })

export function Layout({ children }: PropsWithChildren<{}>) {
    const isMobile = useMediaQuery({ query: '(max-width: 550px)' })

    return (
        <Container
            {...{
                d: 'grid',
                position: 'fixed',
                justifyItems: 'center',
                gridTemplateColumns: '1fr',
                gridTemplateRows: '1fr',
                gridTemplateAreas: `
                    'Center'
                `,
                w: 'full',
            }}
            bg='#e5e5e5'
        >
            <Center gridArea='Center' maxW='500px' bg='white'>
                {children}
            </Center>
        </Container>
    )
}
