import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import Note from '../Components/note'
import { prettyDOM } from '@testing-library/dom'


test('render content',  () => {
  const note = {
    content:'a testing note',
    important:true
  }

  const component = render(
    <Note note={note} />
  )

  console.log('=============================== whole component ====================================')
  component.debug()

  const li = component.container.querySelector('li')
  console.log('=============================== li part of the component =============================')
  console.log(prettyDOM(li))

  expect(component.container).toHaveTextContent(
    'a testing note'
  )

  const element = component.getByText('a testing note')
  expect(element).toBeDefined()

  const div = component.container.querySelector('.note')
  expect(div).toHaveTextContent('a testing note')

})


test('testing clicking toggle Importnt button', () => {
  const note = {
    content:'note used for testing clicking button',
    important:true
  }

  const mockHandler = jest.fn()
  const component = render(
    <Note note={note} toggleImportance={mockHandler}/>
  )

  const button = component.getByText('make not important')
  fireEvent.click(button)
  expect(mockHandler.mock.calls).toHaveLength(1)
})