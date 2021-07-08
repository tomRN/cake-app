import React from 'react';
import { render, screen } from '@testing-library/react';
import CakeListItem from './CakeListItem';
import { Cake } from '../types';

describe("Cake List Item Component", () => {

    const chocolateCake: Cake = {
        ID: "choc-cake-ID",
        name: "Chocolate Cake",
        comment: "A delicious chocolate based cake",
        imageURL: "https://via.placeholder.com/400x200.png",
        yumFactor: 4
    }

    it('Renders without throwing', () => {
        render(<CakeListItem cake={chocolateCake} />);
    });

    it('Renders the name', () => {
        render(<CakeListItem cake={chocolateCake} />);
        const nameElement = screen.getByText(/Chocolate Cake/i);
        expect(nameElement).toBeInTheDocument();
    });

    it('Renders the comment', () => {
        render(<CakeListItem cake={chocolateCake} />);
        const nameElement = screen.getByText(/A delicious chocolate based cake/i);
        expect(nameElement).toBeInTheDocument();
    });


    it('Renders a number of filled stars equal to the yum factor', () => {
        render(<CakeListItem cake={chocolateCake} />);
        const filledStars = screen.getAllByText("★")
        expect(filledStars.length).toBe(4);
    })

    it('Renders a number of un-filled stars equal to 5 minus the yum factor', () => {
        render(<CakeListItem cake={chocolateCake} />);
        const filledStars = screen.getAllByText("☆")
        expect(filledStars.length).toBe(1);
    })

    it('Renders the image of the cake', () => {
        render(<CakeListItem cake={chocolateCake} />);
        const imageElem = screen.getByAltText("A picture of the cake")
        expect(imageElem).toHaveAttribute("src", chocolateCake.imageURL);
    })
})


