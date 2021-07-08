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
        const nameElement = screen.getByText(/"Chocolate Cake"/i);
        expect(nameElement).toBeInTheDocument();
    });
})


