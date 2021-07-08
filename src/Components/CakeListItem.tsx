import React from 'react';
import { Cake } from '../types';
import { Card, Row, Col } from 'react-bootstrap'

interface CakeListProps {
    cake: Cake
}

const CakeListItem = (props: CakeListProps) => {
    return <>
        <Card className="p-2">
            <Row>
                <Col xs={12} md={6} className="center">
                    <img width="100%" src={props.cake.imageURL} alt="A picture of the cake" />
                </Col>
                <Col xs={12} md={6}>
                    <h4 className="mt-2">{props.cake.name}</h4>
                    <p>{props.cake.comment}</p>
                    <h3>
                        {[0, 1, 2, 3, 4].map(num =>
                            <span key={num}>{(num <= props.cake.yumFactor - 1) ? "★" : "☆"}</span>
                        )}
                    </h3>
                </Col>
            </Row>
        </Card>
    </>
}

export default CakeListItem