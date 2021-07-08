import React from 'react';
import { Cake } from '../types';
import { Card } from 'react-bootstrap'

interface CakeListProps {
    cake: Cake
}

const CakeListItem = (props: CakeListProps) => {
    return <>
        <Card>
            <img src={props.cake.imageURL} alt="A picture of the cake" />
            <h4>{props.cake.name}</h4>
            <p>{props.cake.comment}</p>
            <h3>
                {[0, 1, 2, 3, 4].map(num =>
                    <span key={num}>{(num <= props.cake.yumFactor - 1) ? "★" : "☆"}</span>
                )}
            </h3>
        </Card>
    </>
}

export default CakeListItem