import { Frame } from "../components/frame";
import React from 'react';

export function getFrameWrapper(Component) {
    return (params) => {
        const {htmlLink, ...componentParams} = params;
        return <Frame htmlLink={htmlLink}>
            <Component {...componentParams} />
        </Frame>
    }
}
