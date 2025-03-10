import { APP_URL, Selector } from "@/e2e/constants";

describe("template spec", () => {
  beforeEach(() => {
    cy.eyesOpen({
      appName: 
    })
    cy.viewport(1280, 1024);
    cy.login(Cypress.env("username"), Cypress.env("password"));
  });

  it("creates a note and adds pen", async () => {
    cy.createNote();

    cy.drawInk({
      path: [
        [100, 100],
        [300, 300],
      ],
      interval: 10,
    });

    cy.get('[data-cy="toolbox-text"]').click();
    const noteRenderer = cy.get(Selector.NOTE_RENDERER);
    noteRenderer.click(200, 100);
    const textBlockEditor = cy.get('[data-cy="text-block-editor"]').last();
    textBlockEditor.focus();
    textBlockEditor.type("lorem ipsum");

    cy.wait(2000);
    // noteRenderer.screenshot();
    cy.screenshot("Note renderer");
    // cy.percySnapshot('note-renderer', {
    //   scope: Selector.NOTE_RENDERER
    // })
  });
});
