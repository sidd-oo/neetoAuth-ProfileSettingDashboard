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

Cypress.Commands.add('msgPrompt',(msg)=>{
    cy.get('[data-cy=toastr-message-container]').should('have.text', msg);
})

Cypress.Commands.add('uploadImg',(imgName, message)=>{
    cy.get('[data-cy="profile-image-upload-file-field"]').attachFile(imgName);
    cy.wait(2000);
    cy.get('[data-cy=toastr-message-container]').should('have.text', message);
})

Cypress.Commands.add('changeImg',(imgName, message)=>{
    cy.get('[data-cy=profile-image-upload-label]').attachFile(imgName);
    cy.wait(2000);
    cy.get('[data-cy=toastr-message-container]').should('have.text', message);
})

