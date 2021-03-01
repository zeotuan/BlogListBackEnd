import React from 'react'
import {render, fireEvent} from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import NoteForm from '../Components/NoteForm'

test('NoteForm update parent state and call onSubmit', () => {
    const createNote = jest.fn()
    
    const component = render(
        <NoteForm addNote={createNote}/>
    )

    const input = component.container.querySelector('input')
    const form = component.container.querySelector('form')

    fireEvent.change(input,{
        target:{value: 'testing of forms could be easier'}
    })

    fireEvent.submit(form)
})