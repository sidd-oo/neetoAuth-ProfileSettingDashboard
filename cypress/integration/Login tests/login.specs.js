 /// <reference types="cypress" />
 
 describe("NeetoAuth Login Test", () => {
   beforeEach(() => {
     cy.viewport(1280,720);
     cy.visit('https://spinkart.neetoauth.net')
  });
    
  it("Login test with correct email and correct password", () => {
      cy.fixture("credentials").then((user) => {
        cy.login(user.correct.email,user.correct.password);
      })
      cy.get('[data-cy=login-submit-button]').click();
  });

  it("Login test with correct email and wrong password", () => {
      cy.fixture("credentials").then((user) => {
        cy.login(user.correct.email,user.incorrect.password);
      })
      cy.get('[data-cy=login-submit-button]').click();
      cy.get('[data-cy=toastr-message-container]').should('have.text','Something went wrong.')
  });

  it("Login test with wrong email and correct password", () => {
      cy.fixture("credentials").then((user) => {
        cy.login(user.incorrect.email,user.correct.password);
      })
      cy.get('[data-cy=login-submit-button]').click();
      cy.get('[data-cy=toastr-message-container]').should('have.text','Something went wrong.')
  });

  it("Login test with wrong email and wrong password", () => {
      cy.fixture("credentials").then((user) => {
        cy.login(user.incorrect.email,user.incorrect.password);
      })
      cy.get('[data-cy=login-submit-button]').click();
      cy.get('[data-cy=toastr-message-container]').should('have.text','Something went wrong.')
  });

  it("Login test with empty email and empty password", () => {
      cy.get('[data-cy="login-email-text-field"]').and(($input) => {
            expect($input).to.have.value('')
      })
      cy.get('[data-cy="login-password-text-field"]').and(($input) => {
            expect($input).to.have.value('')
      })
      cy.get('[data-cy=login-submit-button]').click();
      cy.location().should((loc) => {
          expect(loc.toString()).to.eq('https://spinkart.neetoauth.net/login')
      })

    });

    it("Login test with empty email and correct password", () => {
      cy.get('[data-cy="login-email-text-field"]').and(($input) => {
            expect($input).to.have.value('')
      })
      cy.fixture("credentials").then((user) => {
        cy.get('[data-cy="login-password-text-field"]').type(user.correct.password);
      })
      cy.get('[data-cy=login-submit-button]').click();
      cy.location().should((loc) => {
          expect(loc.toString()).to.eq('https://spinkart.neetoauth.net/login')
      })
    });

    it.only("Login test with correct email and empty password", () => {
      cy.fixture("credentials").then((user) => {
        cy.get('[data-cy="login-email-text-field"]').type(user.correct.email);
      })

      cy.get('[data-cy="login-password-text-field"]').and(($input) => {
            expect($input).to.have.value('')
      })
      cy.get('[data-cy=login-submit-button]').click();
      cy.location().should((loc) => {
          expect(loc.toString()).to.eq('https://spinkart.neetoauth.net/login')
      })
    });
});