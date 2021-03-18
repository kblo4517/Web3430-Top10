import React from 'react';
import {FaStar} from 'react-icons/fa';

const createArray = length => [...Array(length)];

export default function StarRating({totalStars = 5, selectedStars}) {
    return (
        <>
        {createArray(totalStars).map((n, i) => (
            <Star key={i}
            selectedStars={selectedStars > i}
        />
        ))}
        </>
    )
}

const Star = ({selected}) => (
    <FaStar color={selected ? "maroon" : "grey"} />
);