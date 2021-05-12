 /// <reference types="cypress" />
 
 describe("NeetoAuth change password functionality", () => {
   beforeEach(() => {
     cy.viewport(1280,720);
     cy.visit('https://spinkart.neetoauth.net')
     cy.fixture("credentials").then((user) => {
        cy.login(user.correct.email,user.correct.password);
      })
      cy.get('[data-cy=login-submit-button]').click();

      cy.get('.bp3-popover-target > .relative').click();
      cy.get('[data-cy="nav-profile-link"]').click();

      cy.get('[data-cy=profile-settings-change-password-tab]').click();
  });
    

  it("Changing current password and trying to valid that it can't login anymore with old password",()=>{
      cy.fixture("credentials").then((user)=>{
        cy.get('[data-cy=change-password-current-password]').type(user.old.password);
        cy.get('[data-cy=change-password-new-password]').type(user.new.password);
        cy.get('[data-cy=change-password-confirm-new-password]').type(user.new.password);
        cy.get('[data-cy=change-password-submit-button]').click();
        cy.get('[data-cy=toastr-message-container]').should('have.text','Password successfully changed!');
        cy.get('[data-cy=profile-settings-logout-button]').click();
        
        cy.visit('https://spinkart.neetoauth.net')
        cy.fixture("credentials").then((user) => {
            cy.login(user.correct.email,user.correct.password);
        })
        cy.get('[data-cy=login-submit-button]').click(); 
        cy.get('[data-cy=toastr-message-container]').should('have.text','Something went wrong.');

      })
      
  })

  it("Changing current password and trying to valid that it can only login with new password",()=>{
      cy.fixture("credentials").then((user)=>{
        cy.get('[data-cy=change-password-current-password]').type(user.old.password);
        cy.get('[data-cy=change-password-new-password]').type(user.new.password);
        cy.get('[data-cy=change-password-confirm-new-password]').type(user.new.password);
        cy.get('[data-cy=change-password-submit-button]').click();
        cy.get('[data-cy=toastr-message-container]').should('have.text','Password successfully changed!');
        cy.get('[data-cy=profile-settings-logout-button]').click();
        
        cy.visit('https://spinkart.neetoauth.net')
        cy.fixture("credentials").then((user) => {
            cy.login(user.old.email,user.new.password);
        })
        cy.get('[data-cy=login-submit-button]').click(); 
        cy.get('[data-cy=heading]').should('have.text',"Profile Settings");

      })
      
  })
  
});