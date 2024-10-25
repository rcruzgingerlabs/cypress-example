// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

import {APP_URL, Selector} from '@/e2e/constants'
import 'cypress-real-events'
import '@percy/cypress'

Cypress.Commands.add('login', (username: string, password: string) => {
  cy.visit(APP_URL)
  cy.contains('Log In').click()

  cy.get('#nav-email-input').type(username)
  cy.get('#nav-password-input').type(password)
  cy.get('#nav-email-input').closest('form').submit()
  cy.wait(500)

  // cy.getCookie('nb-auth-token').should('exist')
  cy.url().should('contain', '/app')
})

Cypress.Commands.add('createNote', () => {
  cy.get('[data-cy="new-note"]').click()
  cy.wait(1000)
})

/*
options
color - look at color picker for defaults
width - 4 -> 18, increments of 2
style - solid|dashed|dotted
path
  2 points + interval
  path (list of points)
*/

type Hex = `#${string}`
// type InkWidth = 4|6|8|10|12|14|16|18|20
// type InkStyle = 'solid' | 'dashed' | 'dotted'
type Point = [number, number]
type DrawInkInterval = number

export type DrawInkProps = {
  // color: Hex,
  // width: InkWidth,
  // style: InkStyle
  path: Point[]
  interval?: DrawInkInterval
}

const POINTER_EVENT_CONSTRUCTOR = { eventConstructor: 'MouseEvent' }

Cypress.Commands.add('drawInk', ({ path, interval = 5 }: DrawInkProps) => {
  cy.get(Selector.TOOLBOX_PEN_BUTTON).click()
  const noteRenderer = cy.get(Selector.NOTE_RENDERER)
  const start = path[0]
  const end = path[path.length - 1]

  const pathExpanded = [];
  for (let i = start[0]; i <= end[0]; i += interval) {
    pathExpanded.push([i, i])
  }

  noteRenderer.trigger('pointerdown', start[0], start[1], POINTER_EVENT_CONSTRUCTOR)
  pathExpanded.forEach(point =>{ 
    noteRenderer.trigger('pointermove', point[0], point[1], { eventConstructor: 'MouseEvent' })
  })
  noteRenderer.trigger('pointerup', end[0], end[1], POINTER_EVENT_CONSTRUCTOR)
  noteRenderer.trigger('pointerleave', POINTER_EVENT_CONSTRUCTOR)
  noteRenderer.blur()
})
