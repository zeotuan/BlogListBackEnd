import React from 'react'
import {render, fireEvent} from '@testing-library/react'
import {prettyDOM} from '@testing-library/dom'
import '@testing-library/jest-dom/extend-expect'
import Toggable from '../Components/Toggable'

describe('<Toggable />', () => {
    let component

    beforeEach(() => {
        component = render (
            <Toggable buttonLabel='show...'>
                <div className='testDiv'/>
            </Toggable>
        )
    })

    test('render it children', () => {
        expect(component.container.querySelector('.testDiv'))
    })


    test('at start children is not display', () => {
        const div = component.container.querySelector('.toggableContent')
        expect(div).toHaveStyle('display: none')
    })

    test('after clicking the button, children  are displayed', () => {
        const button = component.getByText('show...')
        fireEvent.click(button)
        const div = component.container.querySelector('.toggableContent')
        expect(div).not.toHaveStyle('display: none')

    })

    test('toggled content can be closed', () => {
        const button = component.getByText('show...')
        fireEvent.click(button)

        const closedButton = component.getByText('cancel')
        fireEvent.click(closedButton)

        const div = component.container.querySelector('.toggableContent')
        expect(div).toHaveStyle('display: none')
    
    })
    


})