 /// <reference types="cypress" />
 
 describe("NeetoAuth Login Test", () => {
   let userDetails;
   
   beforeEach(() => {
     cy.viewport(1280,720);
     cy.visit('https://spinkart.neetoauth.net')
     cy.fixture("credentials").then((user)=>{
       userDetails = user;
     })
  });
    
  it("Login test with correct email and correct password", () => {
      cy.login(userDetails.correct.email,userDetails.correct.password);
      cy.loginSubmit();
  });

  it("Login test with correct email and wrong password", () => {
      cy.login(userDetails.correct.email,userDetails.incorrect.password);
      cy.loginSubmit();
      cy.msgPrompt('Something went wrong.');
  });

  it("Login test with wrong email and correct password", () => {
      cy.login(userDetails.incorrect.email,userDetails.correct.password);
      cy.loginSubmit();
      cy.msgPrompt('Something went wrong.');
  });

  it("Login test with wrong email and wrong password", () => {
      cy.login(userDetails.incorrect.email,userDetails.incorrect.password);
      cy.loginSubmit();
      cy.msgPrompt('Something went wrong.');
  });

  it("Login test with empty email and empty password", () => {
      cy.get('[data-cy="login-email-text-field"]').and(($input) => {
            expect($input).to.have.value('')
      })
      cy.get('[data-cy="login-password-text-field"]').and(($input) => {
            expect($input).to.have.value('')
      })
      cy.loginSubmit();
      cy.location().should((loc) => {
          expect(loc.toString()).to.eq('https://spinkart.neetoauth.net/login')
      })

    });

    it("Login test with empty email and correct password", () => {
      cy.get('[data-cy="login-email-text-field"]').and(($input) => {
            expect($input).to.have.value('')
      })
      cy.get('[data-cy="login-password-text-field"]').type(userDetails.correct.password);
      cy.loginSubmit();
      cy.location().should((loc) => {
          expect(loc.toString()).to.eq('https://spinkart.neetoauth.net/login')
      })
    });

    it("Login test with correct email and empty password", () => {
      cy.get('[data-cy="login-email-text-field"]').type(userDetails.correct.email);
      cy.get('[data-cy="login-password-text-field"]').and(($input) => {
            expect($input).to.have.value('')
      })
      cy.loginSubmit();
      cy.location().should((loc) => {
          expect(loc.toString()).to.eq('https://spinkart.neetoauth.net/login')
      })
    });
});