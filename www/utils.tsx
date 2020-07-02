import React, { useState, useEffect, forwardRef } from 'react'
import { PseudoBox, Button, BoxProps } from '@chakra-ui/core'

export const sleep = (ms: number) => {
    return new Promise((resolve) => setTimeout(resolve, ms))
}

export const isObject = (obj: any) => typeof obj === 'object' && obj !== null

export const withDataId = (dataId: string, moreProps?: BoxProps | Function) => {
    const Component = forwardRef(({ children, ...props }: BoxProps, ref) => (
        <PseudoBox
            ref={ref}
            data-id={dataId}
            {...(typeof moreProps === 'function' ? moreProps(props) : moreProps)}
            {...props}
        >
            {children}
        </PseudoBox>
    ))
    Component.displayName = dataId
    return Component
}

type MapProps = {
    collection: [any]
    children: React.ReactElement | Function
    visible: boolean
}
export const Map = ({ collection, children, visible = true }: MapProps) =>
    visible && (
        <>
            {collection.map((value: any, key: number) => {
                if (typeof children === 'function') {
                    return React.cloneElement(children(value, key), { index: key, key })
                } else {
                    return React.cloneElement(children, { ...value, key, index: key })
                }
            })}
        </>
    )
