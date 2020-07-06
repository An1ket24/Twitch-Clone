import { FC, useState } from 'react'

import {
    IconButton,
    InputRightElement,
    FormControl,
    InputGroup,
    Input,
    Icon,
    InputLeftElement,
    FormLabel,
    FormErrorMessage,
} from '@chakra-ui/core'
import type { InputProps } from '@chakra-ui/core'

import { font16 } from '~/styles/fonts'

export const Password: FC<
    InputProps & {
        value: string
        error: string
        label: string
        onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
    }
> = ({ label, value, onChange, error, ...props }) => {
    const [show, setShow] = useState(false)
    let submitting = false
    let id = label
    let name = id

    return (
        <FormControl pos='relative' isInvalid={!!error}>
            <FormLabel {...font16} {...{ fontWeight: '400' }} htmlFor={id}>
                {label}
            </FormLabel>
            <InputGroup>
                <InputLeftElement children={<Icon name='lock' color='rgba(0, 40, 100, 0.62)' />} />
                <Input
                    isDisabled={submitting}
                    variant='outline'
                    type={show ? 'text' : 'password'}
                    placeholder='Enter password'
                    autoComplete='password'
                    id={id}
                    name={name}
                    value={value}
                    onChange={onChange}
                    {...props}
                />
                <InputRightElement>
                    <IconButton
                        color='rgba(0, 40, 100, 0.62)'
                        aria-label='view password'
                        size='sm'
                        icon={show ? 'view' : 'view-off'}
                        onClick={() => setShow(!show)}
                    />
                </InputRightElement>
            </InputGroup>
            <FormErrorMessage {...{ position: 'absolute' }}>{error}</FormErrorMessage>
        </FormControl>
    )
}
