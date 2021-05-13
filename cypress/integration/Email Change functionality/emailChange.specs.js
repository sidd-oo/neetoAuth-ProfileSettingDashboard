 /// <reference types="cypress" />
 
 describe("NeetoAuth Email Change Functionality", () => {
   before(() => {
     cy.viewport(1280,720);
     cy.visit('https://spinkart.neetoauth.net')
     cy.fixture("credentials").then((user) => {
        cy.login(user.correct.email,user.correct.password);
      })
      cy.get('[data-cy=login-submit-button]').click();

      cy.get('.bp3-popover-target > .relative').click();
      cy.get('[data-cy="nav-profile-link"]').click();

      cy.get('[data-cy=profile-settings-change-email-tab]').click();
  });
    
  it("Change email and verify by login with new email, old email should prompt error msg while login", () => {
      cy.fixture("credentials").then((user)=>{
        cy.get('[data-cy=change-email-new-email-text-field]').type(user.new.email);
        cy.get('[data-cy=change-email-current-password-text-field]').type(user.old.password);
        cy.get('[data-cy=change-email-submit-button]').click();
        cy.get('[data-cy=toastr-message-container]').should('have.text','Email successfully changed!')
        cy.get('[data-cy="profile-settings-logout-button"]').click();
      })

      cy.fixture("credentials").then((user) => {
      cy.login(user.correct.email,user.correct.password);
      })
      cy.get('[data-cy=login-submit-button]').click();
      cy.get('[data-cy=toastr-message-container]').should('have.text','Something went wrong.');

      cy.fixture("credentials").then((user) => {
        cy.login(user.new.email,user.correct.password);
      })
      cy.get('[data-cy=login-submit-button]').click();
      cy.get('[data-cy=heading]').should('have.text',"Profile Settings");
  });

  it("Restore the old email and verfify",()=>{
      cy.visit('https://spinkart.neetoauth.net')
      cy.fixture("credentials").then((user) => {
        cy.login(user.new.email,user.old.password);
      })
      cy.get('[data-cy=login-submit-button]').click();

      cy.get('.bp3-popover-target > .relative').click();
      cy.get('[data-cy="nav-profile-link"]').click();

      cy.get('[data-cy=profile-settings-change-email-tab]').click();

      cy.fixture("credentials").then((user)=>{
        cy.get('[data-cy=change-email-new-email-text-field]').type(user.old.email);
        cy.get('[data-cy=change-email-current-password-text-field]').type(user.old.password);
        cy.get('[data-cy=change-email-submit-button]').click();
        cy.get('[data-cy=toastr-message-container]').should('have.text','Email successfully changed!')
        cy.get('[data-cy="profile-settings-logout-button"]').click();
      })

      cy.fixture("credentials").then((user) => {
        cy.login(user.new.email,user.old.password);
      })
      cy.get('[data-cy=login-submit-button]').click();
      cy.get('[data-cy=toastr-message-container]').should('have.text','Something went wrong.');

      cy.fixture("credentials").then((user) => {
        cy.login(user.old.email,user.old.password);
      })
      cy.get('[data-cy=login-submit-button]').click();
      cy.get('[data-cy=heading]').should('have.text',"Profile Settings");
  })



});