import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event'
import CakeDeleteModal from './CakeDeleteModal';

describe("Cake Delete Modal Component", () => {

    it('Renders without throwing', () => {
        render(<CakeDeleteModal
            onConfirm={() => { ; }}
            onCancel={() => { ; }}
            deleteStatus="NONE"
            cakeName="Test Cake"
        />);
    });

    it("Shows a message asking to confirm deletion", () => {
        render(<CakeDeleteModal
            onConfirm={() => { ; }}
            onCancel={() => { ; }}
            deleteStatus="NONE"
            cakeName="Test Cake"
        />);
        const messageElement = screen.getByText(/are you sure you want to delete Test Cake\?/i);
        expect(messageElement).toBeInTheDocument();
    })

    it("Renders a delete button", () => {
        render(<CakeDeleteModal
            onConfirm={() => { ; }}
            onCancel={() => { ; }}
            deleteStatus="NONE"
            cakeName="Test Cake"
        />);
        const deleteElem = screen.getByRole("button", { name: /delete/i })
        expect(deleteElem).toBeInTheDocument();
    })

    it("Renders a cancel button", () => {
        render(<CakeDeleteModal
            onConfirm={() => { ; }}
            onCancel={() => { ; }}
            deleteStatus="NONE"
            cakeName="Test Cake"
        />);
        const cancelElem = screen.getByRole("button", { name: /cancel/i })
        expect(cancelElem).toBeInTheDocument();
    })

    it("Calls onConfirm when delete is clicked", () => {
        const mockOnConfirm = jest.fn();
        render(<CakeDeleteModal
            onConfirm={mockOnConfirm}
            onCancel={() => { ; }}
            deleteStatus="NONE"
            cakeName="Test Cake"
        />);
        expect(mockOnConfirm).toHaveBeenCalledTimes(0);
        const deleteElem = screen.getByRole("button", { name: /delete/i })
        userEvent.click(deleteElem);
        expect(mockOnConfirm).toHaveBeenCalledTimes(1);

    });

    it("Calls onCancel when cancel is clicked", () => {
        const mockOnCancel = jest.fn();
        render(<CakeDeleteModal
            onConfirm={() => { ; }}
            onCancel={mockOnCancel}
            deleteStatus="NONE"
            cakeName="Test Cake"
        />);
        expect(mockOnCancel).toHaveBeenCalledTimes(0);
        const cancelElem = screen.getByRole("button", { name: /cancel/i })
        userEvent.click(cancelElem);
        expect(mockOnCancel).toHaveBeenCalledTimes(1);

    });

    it("Shows a deleting... message while the deletion is occuring", () => {
        render(<CakeDeleteModal
            onConfirm={() => { ; }}
            onCancel={() => { ; }}
            deleteStatus="PENDING"
            cakeName="Test Cake"
        />);
        const messageElement = screen.getByText(/deleting your cake, just a sec.../i);
        expect(messageElement).toBeInTheDocument();
    })

    it("Doesn't show the buttons while the deletion is occuring", () => {
        render(<CakeDeleteModal
            onConfirm={() => { ; }}
            onCancel={() => { ; }}
            deleteStatus="PENDING"
            cakeName="Test Cake"
        />);
        const cancelElem = screen.queryByRole("button", { name: /cancel/i })
        const deleteElem = screen.queryByRole("button", { name: /delete/i })
        expect(cancelElem).not.toBeInTheDocument();
        expect(deleteElem).not.toBeInTheDocument();
    })

    it("Shows a generic error message if the delete fails", () => {
        render(<CakeDeleteModal
            onConfirm={() => { ; }}
            onCancel={() => { ; }}
            deleteStatus="ERROR"
            cakeName="Test Cake"
        />);
        const messageElement = screen.getByText(/Sorry, there was an error deleting the cake/i);
        expect(messageElement).toBeInTheDocument();
    })

    it("When the delete fails, still shows cancel button, but not delete button", () => {
        render(<CakeDeleteModal
            onConfirm={() => { ; }}
            onCancel={() => { ; }}
            deleteStatus="ERROR"
            cakeName="Test Cake"
        />);
        const cancelElem = screen.queryByRole("button", { name: /cancel/i })
        const deleteElem = screen.queryByRole("button", { name: /delete/i })
        expect(cancelElem).toBeInTheDocument();
        expect(deleteElem).not.toBeInTheDocument();
    })

    it("Renders a close button as part of the modal", () => {
        render(<CakeDeleteModal
            onConfirm={() => { ; }}
            onCancel={() => { ; }}
            deleteStatus="NONE"
            cakeName="Test Cake"
        />);
        const closeElem = screen.getByRole("button", { name: /close/i })
        expect(closeElem).toBeInTheDocument();
    })

    it("Calls onCancel when close button is clicked", () => {
        const mockOnCancel = jest.fn();
        render(<CakeDeleteModal
            onConfirm={() => { ; }}
            onCancel={mockOnCancel}
            deleteStatus="NONE"
            cakeName="Test Cake"
        />);
        expect(mockOnCancel).toHaveBeenCalledTimes(0);
        const closeElem = screen.getByRole("button", { name: /close/i })
        userEvent.click(closeElem);
        expect(mockOnCancel).toHaveBeenCalledTimes(1);

    });

})


