import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event'
import CakeAddModal from './CakeAddModal';

describe("Cake Add Modal Component", () => {

    it('Renders without throwing', () => {
        render(<CakeAddModal
            addStatus="NONE"
            onAdd={() => { ; }}
            onCancel={() => { ; }}
        />);
    });

    it("Renders text input for name", () => {
        render(<CakeAddModal
            addStatus="NONE"
            onAdd={() => { ; }}
            onCancel={() => { ; }}
        />);
        const nameElem = screen.getByPlaceholderText(/enter a name for this cake/i);
        expect(nameElem).toBeInTheDocument();

    })

    it("Renders text input for comment", () => {
        render(<CakeAddModal
            addStatus="NONE"
            onAdd={() => { ; }}
            onCancel={() => { ; }}
        />);

        const commentElem = screen.getByPlaceholderText(/type a comment about this cake/i);
        expect(commentElem).toBeInTheDocument();
    })

    it("Renders text input for image url", () => {
        render(<CakeAddModal
            addStatus="NONE"
            onAdd={() => { ; }}
            onCancel={() => { ; }}
        />);
        const imageElem = screen.getByPlaceholderText(/paste the URL of an image of this cake/i);
        expect(imageElem).toBeInTheDocument();
    })

    it("Renders an input for yum factor", () => {
        render(<CakeAddModal
            addStatus="NONE"
            onAdd={() => { ; }}
            onCancel={() => { ; }}
        />);
        const yumElem = screen.getByLabelText(/Select the yum factor for this cake/i);
        expect(yumElem).toBeInTheDocument();
    })

    it("Renders a save button", () => {
        render(<CakeAddModal
            addStatus="NONE"
            onAdd={() => { ; }}
            onCancel={() => { ; }}
        />);
        const saveElem = screen.getByRole("button", { name: /save/i })
        expect(saveElem).toBeInTheDocument();
    })

    it("Renders a cancel button", () => {
        render(<CakeAddModal
            addStatus="NONE"
            onAdd={() => { ; }}
            onCancel={() => { ; }}
        />);
        const cancelElem = screen.getByRole("button", { name: /cancel/i })
        expect(cancelElem).toBeInTheDocument();
    })

    it("Calls onCancel when cancel button is clicked", () => {
        const mockOnCancel = jest.fn();
        render(<CakeAddModal
            addStatus="NONE"
            onAdd={() => { ; }}
            onCancel={mockOnCancel}
        />);
        expect(mockOnCancel).toHaveBeenCalledTimes(0);
        const cancelElem = screen.getByRole("button", { name: /cancel/i })
        userEvent.click(cancelElem);
        expect(mockOnCancel).toHaveBeenCalledTimes(1);

    });

    it("Renders a close button as part of the modal", () => {
        render(<CakeAddModal
            addStatus="NONE"
            onAdd={() => { ; }}
            onCancel={() => { ; }}
        />);
        const closeElem = screen.getByRole("button", { name: /close/i })
        expect(closeElem).toBeInTheDocument();
    })

    it("Calls onCancel when close button is clicked", () => {
        const mockOnCancel = jest.fn();
        render(<CakeAddModal
            addStatus="NONE"
            onAdd={() => { ; }}
            onCancel={mockOnCancel}
        />);
        expect(mockOnCancel).toHaveBeenCalledTimes(0);
        const closeElem = screen.getByRole("button", { name: /close/i })
        userEvent.click(closeElem);
        expect(mockOnCancel).toHaveBeenCalledTimes(1);

    });

    /* Validation tests etc. etc. */

})
