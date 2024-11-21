import React from 'react';
import { Meteor } from 'meteor/meteor'
import { Accounts } from 'meteor/accounts-base'

var registerData = {
    email: event.target.registerEmail.value,
    password: event.target.registerPassword.value
 }

Accounts.createUser(registerData, function(error) {
    if (Meteor.user()) {
       console.log(Meteor.userId());
    } else {
       console.log("ERROR: " + error.reason);
    }
 });

export const Register = () => {

    return (
      <div>
        <h2>REGISTER:</h2>
        <form>
            <input type="email" name="registerEmail"/>
            <br/>
            <input type="password" name="registerPassword"/>
            <br/>
            <input type="submit" name="Register"/>
            <br/>
        </form>
      </div>
    );
  };