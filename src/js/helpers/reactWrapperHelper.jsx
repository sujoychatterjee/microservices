import { Frame } from "../../react/components/frame";
import React from 'react';

export function getReactWrapper(Component) {
    return (params) => {
        return <Frame>
            <Component {...params} />
        </Frame>
    }
}