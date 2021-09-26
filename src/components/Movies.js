import { useParams } from "react-router-dom";
import { useMovie } from '../services/useMovie'
import React, { useEffect, useState, useRef } from "react";
import { CDN } from '../utils/constants';

export default function Movies() {
    // We can use the `useParams` hook here to access
    // the dynamic pieces of the URL.
    let { movieId } = useParams();

    const { data, isFetching } = useMovie(movieId);
    
    useEffect(() => {
        console.log('mount oluyor')
        console.log(data);
        return () => {
            console.log('unmount oluyor')
        }
    }, [data])
    return (
        <div>
            {!isFetching ? (
                <>
                    <h3>{data.title}</h3>
                    <img src={`${CDN}${data.backdrop_path}`}></img>
                    <h6>Popularity: {data.popularity}</h6>
                </>
            ) : 'loading...'}
            
      </div>
    );
  }