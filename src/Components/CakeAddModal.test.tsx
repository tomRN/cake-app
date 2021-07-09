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

    /* With more time we would add more detailed tests for the validation tests etc. etc. */

    it("Calls onAdd with the data we added when we hit Save", () => {

        const mockOnAdd = jest.fn();
        render(<CakeAddModal
            addStatus="NONE"
            onAdd={mockOnAdd}
            onCancel={() => { ; }}
        />);
        expect(mockOnAdd).toHaveBeenCalledTimes(0);
        const nameElem = screen.getByPlaceholderText(/enter a name for this cake/i);
        const commentElem = screen.getByPlaceholderText(/type a comment about this cake/i);
        const imageElem = screen.getByPlaceholderText(/paste the URL of an image of this cake/i);
        const yumElem = screen.getByLabelText(/Select the yum factor for this cake/i);
        const saveElem = screen.getByRole("button", { name: /save/i });

        userEvent.type(nameElem, "New Cake");
        userEvent.type(commentElem, "A new cake to eat");
        userEvent.type(imageElem, "http://someimageurl.com");
        userEvent.selectOptions(yumElem, "3");
        userEvent.click(saveElem);

        expect(mockOnAdd).toHaveBeenCalledTimes(1);
        expect(mockOnAdd).toHaveBeenLastCalledWith({
            name: "New Cake",
            comment: "A new cake to eat",
            imageURL: "http://someimageurl.com",
            yumFactor: 3
        })

    });

    it("Shows a saving message while the save is pending", () => {
        render(<CakeAddModal
            addStatus="PENDING"
            onAdd={() => { ; }}
            onCancel={() => { ; }}
        />);
        const messageElem = screen.getByText(/Saving your cake, just a sec.../i);
        expect(messageElem).toBeInTheDocument();

    });

    it("Hides the buttons while the save is pending", () => {
        render(<CakeAddModal
            addStatus="PENDING"
            onAdd={() => { ; }}
            onCancel={() => { ; }}
        />);
        const cancelElem = screen.queryByRole("button", { name: /cancel/i })
        expect(cancelElem).not.toBeInTheDocument();
        const saveElem = screen.queryByRole("button", { name: /save/i })
        expect(saveElem).not.toBeInTheDocument();

    });

    it("Shows a success message when it sees a success", () => {
        render(<CakeAddModal
            addStatus="SUCCESS"
            onAdd={() => { ; }}
            onCancel={() => { ; }}
        />);
        const messageElem = screen.getByText(/Your cake has been added/i);
        expect(messageElem).toBeInTheDocument();

    });

    it("Shows ONLY 'done' button after a success, and the done button closes the modal", () => {
        render(<CakeAddModal
            addStatus="SUCCESS"
            onAdd={() => { ; }}
            onCancel={() => { ; }}
        />);
        const doneElem = screen.getByRole("button", { name: /done/i });
        const cancelElem = screen.queryByRole("button", { name: /cancel/i })
        expect(cancelElem).not.toBeInTheDocument();
        const saveElem = screen.queryByRole("button", { name: /save/i })
        expect(saveElem).not.toBeInTheDocument();
    });



    it("Shows a 'done' button after a success, and the done button closes the modal", () => {
        const mockOnCancel = jest.fn();
        render(<CakeAddModal
            addStatus="SUCCESS"
            onAdd={() => { ; }}
            onCancel={mockOnCancel}
        />);
        const doneElem = screen.getByRole("button", { name: /done/i })
        expect(mockOnCancel).toHaveBeenCalledTimes(0);
        userEvent.click(doneElem);
        expect(mockOnCancel).toHaveBeenCalledTimes(1);
    });

    it("Shows a generic error message if adding the cake fails", () => {
        render(<CakeAddModal
            addStatus="ERROR"
            onAdd={() => { ; }}
            onCancel={() => { ; }}
        />);
        const messageElem = screen.getByText(/Sorry, there was a problem saving your cake/i);
        expect(messageElem).toBeInTheDocument();
    });

    it("Shows both buttons if there was an error so you can retry adding the cake", () => {
        render(<CakeAddModal
            addStatus="ERROR"
            onAdd={() => { ; }}
            onCancel={() => { ; }}
        />);
        const cancelElem = screen.queryByRole("button", { name: /cancel/i })
        expect(cancelElem).toBeInTheDocument();
        const saveElem = screen.queryByRole("button", { name: /save/i })
        expect(saveElem).toBeInTheDocument();
    });

})
