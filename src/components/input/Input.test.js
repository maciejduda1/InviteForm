import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect'
import Input from './Input';

const renderInput = (props) => {
    const utils = render(<Input label="test" name="test" {...props} />)
    const input = utils.getByLabelText(/test/i)
    return { ...utils, input };
}

describe('Input Component', () => {
    it('renders input ', () => {
        const { input } = renderInput()
        expect(input).toBeInTheDocument()
    });
    it('displays label', () => {
        const { getByLabelText } = renderInput()
        expect(getByLabelText('test')).toBeInTheDocument()
    });
    it('displays user entered value', () => {
        const { input } = renderInput()
        expect(input).toBeInTheDocument()
        fireEvent.change(input, { target: { value: 'Maciej' } })
        expect(input).toHaveValue('Maciej');
    })
});
