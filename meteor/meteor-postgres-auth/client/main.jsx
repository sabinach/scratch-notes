import React from 'react';
import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';
import { App } from '/imports/ui/App';
import { DDP } from 'meteor/ddp-client'

Meteor.startup(() => {
  render(<App/>, document.getElementById('react-target'));
});

Meteor.connection.setUserId(userId);

DDP.onReconnect(() => {
   const resumeToken = localStorage.getItem('sessionToken')
   
   if (sessionToken) {
      // woot woot! client is already authenticated
      // -> resume the session
      Meteor.call('resumeSession', sessionToken)
   } else {
      // login first
   }
})
