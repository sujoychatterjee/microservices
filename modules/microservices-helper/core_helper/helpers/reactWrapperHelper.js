import { Frame } from "../components/frame";
import React from 'react';

export function getReactWrapper(Component) {
    return (params) => {
        const {htmlLink, ...componentParams} = params;
        return <Frame htmlLink={htmlLink}>
            <Component {...componentParams} />
        </Frame>
    }
}
