import React from 'react'
import { CDN } from '../../utils/constants';

export default function Image({ src, style, alt, width, height }) {

    const imgPath = CDN + src;

    return (
        <>
            <img src={imgPath} width={width} height={height} style={style} alt={alt}></img>
        </>
    )
}
