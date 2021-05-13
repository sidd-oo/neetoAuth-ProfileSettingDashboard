 /// <reference types="cypress" />
 import {emailTab} from '../../utils/changeEmailTab'
 describe("NeetoAuth Email Change Functionality", () => {
   
  it("Change email and verify that the old email can't be used for login", () => {
    emailTab();
    cy.fixture("credentials").then((user)=>{
        cy.emailChange(user.new.email, user.old.password);
        cy.login(user.correct.email,user.correct.password);
        cy.get('[data-cy=login-submit-button]').click();
        cy.get('[data-cy=toastr-message-container]').should('have.text','Something went wrong.');
        cy.restoreEmail(user.new.email,user.old.password);
    })
      
  });

  it("Change email and verify that only current email can be used for login", () => {
    emailTab();
      cy.fixture("credentials").then((user)=>{
        cy.emailChange(user.new.email, user.old.password);
        cy.login(user.new.email,user.correct.password);
        cy.loginSubmit();
        cy.get('[data-cy=heading]').should('have.text',"Profile Settings");
        cy.logout();
        cy.restoreEmail(user.new.email,user.old.password);
      })
  });

  it("Restore the old email and verfify",()=>{
    emailTab();
    cy.fixture("credentials").then((user) => {
        cy.emailChange(user.new.email, user.old.password);
        cy.restoreEmail(user.new.email,user.old.password);
        cy.visit('https://spinkart.neetoauth.net')
        cy.login(user.old.email,user.old.password);
        cy.loginSubmit();
        cy.get('[data-cy=heading]').should('have.text',"Profile Settings");
        cy.logout();
      })
  })

});