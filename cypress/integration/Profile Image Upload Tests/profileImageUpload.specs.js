 /// <reference types="cypress" />
 import {profileTab} from '../../utils/profileTab'

 describe("NeetoAuth Profile Image upload functionality", () => {
   beforeEach(() => {
    profileTab();
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
    cy.uploadImg('anotherLessThan5MB.jpg','Profile image successfully updated!');
  })
  
  it("Uploading new image more than 5MB using change functionality",()=>{
    cy.uploadImg('lessThan5MB.jpg','Profile image successfully updated!'); 
    cy.wait(5000);   
    cy.changeImg('anotherMoreThan5MB.jpg','Something went wrong.');
  })

  it("Uploading multiple new images using change functionality",()=>{
    cy.uploadImg('lessThan5MB.jpg','Profile image successfully updated!'); 
    cy.get('[data-cy=profile-image-upload-label]').attachFile('./anotherLessThan5MB').attachFile('./lessThan5MB');
    //There is no "Something went wrong message" while uploading multiple images using change button
  })

  it("Uploading unallowed file type (.pdf) using change functionality",()=>{
    cy.uploadImg('lessThan5MB.jpg','Profile image successfully updated!');  
    cy.wait(5000);
    cy.uploadImg('wrongFileFormat.pdf','Something went wrong.');
  })

  it("Removing the image",()=>{
    cy.uploadImg('lessThan5MB.jpg','Profile image successfully updated!');
    cy.get('[data-cy=profile-image-remove-button]').click();
    cy.contains('Profile image successfully removed!').should('be.visible');
  })

  it("Updating first name, Change Country, Select timezone, Change date format",()=>{
    cy.get('[data-cy=profile-first-name-text-field]').clear().type("Oliver")
    cy.get('[data-cy=select-country-select-container-wrapper] > .nui-react-select-container > .nui-react-select__control > .nui-react-select__value-container > .nui-react-select__single-value').type('Pakistan{enter}{enter}');
    cy.get('[data-cy=select-time-zone-select-container-wrapper] > .nui-react-select-container > .nui-react-select__control > .nui-react-select__value-container > .nui-react-select__single-value').type('America/Dawson-UTC-07.00{enter}{enter}');
    cy.get(':nth-child(2) > [data-cy=profile-date-format-select]').click();
    cy.get('[data-cy=profile-submit-button]').click();
    cy.get('[data-cy=toastr-message-container]').should('have.text',"Profile successfully updated!");  
  })

});