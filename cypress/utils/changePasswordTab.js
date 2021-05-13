export const passwordTab = ()=>{
    cy.viewport(1280,720);
     cy.visit('https://spinkart.neetoauth.net')
     cy.fixture("credentials").then((user) => {
        cy.login(user.correct.email,user.correct.password);
      })
      cy.loginSubmit();
      cy.get('.bp3-popover-target > .relative').click();
      cy.get('[data-cy="nav-profile-link"]').click();

      cy.get('[data-cy=profile-settings-change-password-tab]').click();
}
