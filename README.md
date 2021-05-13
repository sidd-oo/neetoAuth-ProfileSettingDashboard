# NeetoAuth Profile Setting Dashboard tested using Cypress

Cypress tests are performed on Login section, Profile Image Upload, Email Change and Password Chaange. All the positive and negative test cases are covered according to my knowledge.

## Instruction: Before starting the challenge, please read this.

* This challenge is not only to check that whether you can automate using cypress but also to check that you can think of test scenarios, divide and organize them properly.
* Following steps are just to give the overview to which parts to test. It may have only positive test case scenarios, you are expected to consider negative test scenarios as well.
* After performing any test, please make sure that you assert to verify the tests.
* If your code is repetitive, please make sure that either you create a cypress command or create a utility function whichever is appropriate.
* Please check these quick [cypress guidelines](https://github.com/bigbinary/bigbinary-engineering/blob/main/cypress-guidelines.md).

### The challenge

In this challenge, you will the test login and profile settings functionality.

* Login details.

  + URL: https://spinkart.neetoauth.net
  + Email: adam@example.com
  + Password: welcome

* At the left-bottom most you will see an element(either image or two-letter text). After hovering on that element you will see 'My profile' and 'Logout' link. Click on 'My Profile'.

* You have to check functionality of update profile section.
  + Read the guidelines(allowed size and file types) for uploading profile image.
  + Upload image file.
  + Test change image functionality.
  + Test remove functionality.
  + As you will upload file multiple times.
  + Please make sure that you can store these files in fixtures folder.
  + Based on the image upload guidelines, all test cases are expected to cover in this.
  + Update first name field.(new name will be Oliver followed by today's date)
  + Change country to Canada and select time zone as America/Dawson-UTC-07.00.
  + Change the date format to DD/MM/YYY and Save Changes.
* Test the password change functionality.
  + Navigate to My profile and click on Change Password tab.
  + Click on change password link on the same page, enter new password and save changes.
  + Please verify that the user is able to login with new password and not with old password. You may need to logout. ; )
  + Restore the old password and verify that user is able to login with original password(welcome).
* Test the email change functionality.
  + Click on Change Email tab, enter new email(temporary@example.com) and save changes.
  + Please verify that the user is able to login with new email and not with old email. You may need to logout. ; )
  + Restore the old email and verify that user is able to login with original email(adam@example.com).

