 /// <reference types="cypress" />
 import {passwordTab} from  '../../utils/changePasswordTab'
  describe("NeetoAuth change password functionality", () => {
  let userDetails;

   beforeEach(() => {
     passwordTab();
     cy.fixture("credentials").then((user)=>{
        userDetails = user;
      })
    });
    

  it("Changing current password and trying to valid it can't login anymore with old password",()=>{
        cy.pwdChange(userDetails.old.password, userDetails.new.password);
        cy.visit('https://spinkart.neetoauth.net')
        cy.login(userDetails.correct.email,userDetails.correct.password);
        cy.get('[data-cy=login-submit-button]').click(); 
        cy.get('[data-cy=toastr-message-container]').should('have.text','Something went wrong.');      
  })

  it.only("Changing current password and trying to valid that it can only login with new password",()=>{

        cy.pwdChange(userDetails.old.password, userDetails.new.password);
        cy.visit('https://spinkart.neetoauth.net')
        cy.fixture("credentials").then((userDetails) => {
            cy.login(userDetails.old.email,userDetails.new.password);
        })
        cy.get('[data-cy=login-submit-button]').click(); 
        cy.get('[data-cy=heading]').should('have.text',"Profile Settings");
      
  })
  
});