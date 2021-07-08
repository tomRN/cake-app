import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event'
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
        render(<CakeListItem cake={chocolateCake} onDelete={(id: string) => { }} />);
    });

    it('Renders the name', () => {
        render(<CakeListItem cake={chocolateCake} onDelete={(id: string) => { }} />);
        const nameElement = screen.getByText(/Chocolate Cake/i);
        expect(nameElement).toBeInTheDocument();
    });

    it('Renders the comment', () => {
        render(<CakeListItem cake={chocolateCake} onDelete={(id: string) => { }} />);
        const nameElement = screen.getByText(/A delicious chocolate based cake/i);
        expect(nameElement).toBeInTheDocument();
    });


    it('Renders a number of filled stars equal to the yum factor', () => {
        render(<CakeListItem cake={chocolateCake} onDelete={(id: string) => { }} />);
        const filledStars = screen.getAllByText("★")
        expect(filledStars.length).toBe(4);
    })

    it('Renders a number of un-filled stars equal to 5 minus the yum factor', () => {
        render(<CakeListItem cake={chocolateCake} onDelete={(id: string) => { }} />);
        const filledStars = screen.getAllByText("☆")
        expect(filledStars.length).toBe(1);
    })

    it('Renders the image of the cake', () => {
        render(<CakeListItem cake={chocolateCake} onDelete={(id: string) => { }} />);
        const imageElem = screen.getByAltText("A picture of the cake")
        expect(imageElem).toHaveAttribute("src", chocolateCake.imageURL);
    })

    it('Renders a delete button', () => {
        render(<CakeListItem cake={chocolateCake} onDelete={(id: string) => { }} />);
        const deleteElem = screen.getByRole("button", { name: /delete/i })
        expect(deleteElem).toBeInTheDocument();
    })

    it('Calls the delete function with the cakes ID when the delete button is clicked', () => {
        const mockDelete = jest.fn();
        render(<CakeListItem cake={chocolateCake} onDelete={mockDelete} />);
        expect(mockDelete).toHaveBeenCalledTimes(0);
        const deleteElem = screen.getByRole("button", { name: /delete/i })
        userEvent.click(deleteElem);
        expect(mockDelete).toHaveBeenCalledTimes(1);
        expect(mockDelete).toHaveBeenCalledWith(chocolateCake.ID);
    })
})


