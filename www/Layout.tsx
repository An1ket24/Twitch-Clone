import { PropsWithChildren, useCallback, FC, useRef, forwardRef } from 'react'
import { withDataId } from '~/utils'

const Container = withDataId('Layout')
const Center = withDataId('Center', { as: 'main' })

export function Layout({ children }: PropsWithChildren<{}>) {
    return (
        <Container
            {...{
                d: 'grid',
                position: 'fixed',
                gridTemplateColumns: '1fr',
                gridTemplateRows: '1fr',
                gridTemplateAreas: `
                    'Center'
                `,
                w: 'full',
            }}
            bg='#e5e5e5'
        >
            <Center gridArea='Center' w='100vw' bg='white'>
                {children}
            </Center>
        </Container>
    )
}
