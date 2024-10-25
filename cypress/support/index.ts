import {DrawInkProps} from '@/support/commands'

declare namespace Cypress {
  interface Chainable {
    login(email: string, password: string): Chainable<void>
    createNote(): Chainable<void>
    drawInk(props: DrawInkProps): Chainable<void>
  }
}
