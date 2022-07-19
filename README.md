# RodneyWongAdvDiv

This repository consists of my contribution to the build for The Institute to Advance Diversity.



Front End - React.js, Back End - .NET (C#), Database - MS SQL

Features I worked on:

1. Forgotpassword
-The forgotpassword is a component created  in REACT. One input that required the email address of the User. Formik was used to manage state. Used YUP with Formik to hanndle clientside validation. The email had to be valid. If the email was valid a SWAL poped up with a message that an email was send to change the passowrd. 

- C#/.net, SQL contains an api controller that would handle the email verification if verified true, A Token would be created and then inserted with an addToken method. 
Once inserted and email is then send out to the user at the provided email address. The verification of the email would use an UserEmailVerification stored procedure. I created the stored procedure to take in the email address and look for the User with that Email address to return true. The addToken method used a TokenInsert Stored procedure that I also created in SQL. 
The token was created  Guid.NewGuid().ToString("N")

2.ChangePassword
-The changePassword was a component created  in REACT. Two inputs that would require a password that met min. required validation. This Component was build with Formik to manage state. Client side validation did consist of YUP validation. clicking "change password", if successfull a SWAL would pop up alerting the user that the password was updated and would then be redirected to the log in page. There they would be able to use their email and their newly updated password. I pulled the Token and Email address from the URL for further verification

- C#/.net, SQL contains an api controller that would take in the the Token, Email and password. I Use the tokenTypes that were defined in Enums to properly identify the exitence of the token and for deletion of the correct Token. 
The passord would then be HASHED and Salt BCrypt.BCryptHelper.GenerateSalt to proctect against brute force attacks. Once hashed and salted the password would be updated in SQL Using the stored procedure that I created to verify if the Token is valid and avail, the the password would be updated. After the password was updated the Token now gets deleted from the Table. 

