import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect'
import Header from './Header';

const renderHeader = () => {
    const utils = render(<Header />)
    const header = utils.getByTestId('header')
    return { ...utils, header }
}

// test utils file
function renderWithRouter(
    ui,
    {
        route = '/',
        history = createMemoryHistory({ initialEntries: [route] }),
    } = {}
) {
    const Wrapper = ({ children }) => (
        <Router history={history}>{children}</Router>
    )
    return {
        ...render(ui, { wrapper: Wrapper }),
        // adding `history` to the returned utilities to allow us
        // to reference it in our tests (just try to avoid using
        // this to test implementation details).
        history,
    }
}


describe('Header', () => {

    it('renders header', () => {
        const { header } = renderHeader();
        expect(header).toBeInTheDOM();
    })
})


