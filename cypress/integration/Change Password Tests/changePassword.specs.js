 /// <reference types="cypress" />
 import {passwordTab} from  '../../utils/changePasswordTab'
  describe("NeetoAuth change password functionality", () => {
    
  it("Changing current password and trying to valid it can't login anymore with old password",()=>{
          passwordTab();
          cy.fixture("credentials").then((userDetails)=>{
            cy.pwdChange(userDetails.old.password, userDetails.new.password);
            cy.visit('https://spinkart.neetoauth.net')
            cy.login(userDetails.correct.email,userDetails.correct.password);
            cy.loginSubmit(); 
            cy.get('[data-cy=toastr-message-container]').should('have.text','Something went wrong.');     
            cy.resetPassword(userDetails.new.password, userDetails.old.password); 
          }) 
  })

  it("Changing current password and trying to valid that it can only login with new current password",()=>{
        passwordTab();
        cy.fixture("credentials").then((userDetails)=>{
          cy.pwdChange(userDetails.old.password, userDetails.new.password);
          cy.visit('https://spinkart.neetoauth.net')
          cy.login(userDetails.old.email,userDetails.new.password);
          cy.loginSubmit();
          cy.get('[data-cy=heading]').should('have.text',"Profile Settings");
          cy.logout();
          cy.resetPassword(userDetails.new.password, userDetails.old.password); 
        }) 
  })

  it.only("Reset the password and verify",()=>{
      passwordTab();
      cy.fixture("credentials").then((userDetails)=>{
        cy.pwdChange(userDetails.old.password, userDetails.new.password);
        cy.resetPassword(userDetails.new.password, userDetails.old.password); 
        cy.visit('https://spinkart.neetoauth.net')
        cy.login(userDetails.old.email,userDetails.old.password);
        cy.loginSubmit();
        cy.get('[data-cy=heading]').should('have.text',"Profile Settings");
        cy.logout();
      }) 
  })
  
});
