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

import 'cypress-file-upload';

Cypress.Commands.add('login',(email, password)=>{
    cy.get('[data-cy="login-email-text-field"]').type(email);
    cy.get('[data-cy="login-password-text-field"]').type(password);
})

Cypress.Commands.add('loginSubmit',()=>{
    cy.get('[data-cy=login-submit-button]').click();
})

Cypress.Commands.add('logout',()=>{
    cy.get('[data-cy=profile-settings-logout-button]').click();
    
})

Cypress.Commands.add('msgPrompt',(msg)=>{
    cy.get('[data-cy=toastr-message-container]').should('have.text', msg);
})

Cypress.Commands.add('uploadImg',(imgName, message)=>{
    cy.get('[data-cy="profile-image-upload-file-field"]').attachFile(imgName);
    cy.get('[data-cy=toastr-message-container]').should('have.text', message);
})

Cypress.Commands.add('changeImg',(imgName, message)=>{
    cy.get('[data-cy=profile-image-upload-label]').attachFile(imgName);
    cy.wait(2000);
    cy.get('[data-cy=toastr-message-container]').should('have.text', message);
})

Cypress.Commands.add('pwdChange',(currentPwd, newPwd)=>{
    cy.get('[data-cy=change-password-current-password]').type(currentPwd);
    cy.get('[data-cy=change-password-new-password]').type(newPwd);
    cy.get('[data-cy=change-password-confirm-new-password]').type(newPwd);
    cy.get('[data-cy=change-password-submit-button]').click();
    cy.get('[data-cy=toastr-message-container]').should('have.text','Password successfully changed!');
    cy.logout();
        
})

Cypress.Commands.add('resetPassword',(currentPwd, newPwd)=>{
    cy.visit('https://spinkart.neetoauth.net')
    cy.fixture("credentials").then((user) => {
        cy.login(user.correct.email,currentPwd);
    })
    cy.loginSubmit();
    cy.get('.bp3-popover-target > .relative').click();
    cy.get('[data-cy="nav-profile-link"]').click();

    cy.get('[data-cy=profile-settings-change-password-tab]').click();

    cy.get('[data-cy=change-password-current-password]').type(currentPwd);
    cy.get('[data-cy=change-password-new-password]').type(newPwd);
    cy.get('[data-cy=change-password-confirm-new-password]').type(newPwd);
    cy.get('[data-cy=change-password-submit-button]').click();
    cy.get('[data-cy=toastr-message-container]').should('have.text','Password successfully changed!');
    cy.logout();
})

Cypress.Commands.add('emailChange',(newEmail, currentPwd)=>{
        cy.get('[data-cy=change-email-new-email-text-field]').type(newEmail);
        cy.get('[data-cy=change-email-current-password-text-field]').type(currentPwd);
        cy.get('[data-cy=change-email-submit-button]').click();
        cy.get('[data-cy=toastr-message-container]').should('have.text','Email successfully changed!')
        cy.logout();
})


Cypress.Commands.add('restoreEmail',(newEmail, currentPwd)=>{
    cy.visit('https://spinkart.neetoauth.net')
    cy.fixture("credentials").then((user) => {
        cy.login(newEmail,currentPwd);
    })
    cy.loginSubmit();
    cy.get('.bp3-popover-target > .relative').click();
    cy.get('[data-cy="nav-profile-link"]').click();
    
    cy.get('[data-cy=profile-settings-change-email-tab]').click();
    
    cy.fixture("credentials").then((user)=>{
        cy.emailChange(user.old.email,user.old.password)
    })
})    


