 /// <reference types="cypress" />
 
 describe("NeetoAuth Profile Image upload functionality", () => {
   beforeEach(() => {
     cy.viewport(1280,720);
     cy.visit('https://spinkart.neetoauth.net')
     cy.fixture("credentials").then((user) => {
        cy.login(user.correct.email,user.correct.password);
      })
      cy.get('[data-cy=login-submit-button]').click();

      cy.get('.bp3-popover-target > .relative').click();
      cy.get('[data-cy="nav-profile-link"]').click();
  });
    
  it("Uploading image less than 5MB", () => {
      cy.uploadImg('lessThan5MB.jpg','Profile image successfully updated!');
  });

  it("Uploading image more than 5MB", () => {
      cy.uploadImg('moreThan5MB.jpg','Something went wrong.');
  });

    it("Uploading unallowed file type (.pdf)", () => {
      cy.uploadImg('wrongFileFormat.pdf','Something went wrong.');
  });

  it("Uploading multiple images file", () => {
      cy.get('[data-cy="profile-image-upload-file-field"]').attachFile('./lessThan5MB').attachFile('./lessThan5MB');
      cy.get('[data-cy=toastr-message-container]').eq(0).should('have.text','Something went wrong.')
      cy.get('[data-cy=toastr-message-container]').eq(1).should('have.text','Something went wrong.')
  });

  it("Uploading new image of allowed file type using change functionality",()=>{
    cy.uploadImg('lessThan5MB.jpg','Profile image successfully updated!'); 
    cy.wait(5000); 
    cy.uploadImg('anotherLessThan5MB.jpg','Profile image successfully updated!');
  })

  it("Uploading new image more than 5MB using change functionality",()=>{
    cy.uploadImg('lessThan5MB.jpg','Profile image successfully updated!'); 
    cy.wait(5000); 
    cy.uploadImg('anotherMoreThan5MB.jpg','Something went wrong.');
  })

  it("Uploading multiple new images using change functionality",()=>{
    cy.uploadImg('lessThan5MB.jpg','Profile image successfully updated!'); 
    cy.wait(5000); 
    cy.get('[data-cy=profile-image-upload-label]').attachFile('./anotherLessThan5MB').attachFile('./lessThan5MB');
    // cy.get('[data-cy=toastr-message-container]').should('have.text', "Profile image successfully updated!");
  })

  it("Uploading unallowed file type (.pdf) using change functionality",()=>{
    cy.uploadImg('lessThan5MB.jpg','Profile image successfully updated!'); 
    cy.wait(5000); 
    cy.uploadImg('wrongFileFormat.pdf','Something went wrong.');
  })

  it.only("Updating first name, Change Country, Select timezone, Change date format",()=>{
      cy.get('[data-cy=profile-first-name-text-field]').type("Oliver")
    //   cy.get('[data-cy="profile-country-select"]').select('')
    cy.get(':nth-child(2) > [data-cy=profile-date-format-select]').click();
    cy.get('[data-cy=profile-submit-button]').click();
    cy.get('[data-cy=toastr-message-container]').should('have.text',"Profile successfully updated!");



      
  })

});