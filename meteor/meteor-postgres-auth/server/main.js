import { Meteor } from 'meteor/meteor';

Meteor.startup(() => {
   console.log('server started')
});

Meteor.methods({
   login: function(email, password) {
      // check credentials, get User from database
      // generate a sessionToken and store in database
      // now set the userId on the server-client connection
      this.setUserId(User.id)
      // return the generated sessionToken to the client
      return sessionToken
   },
   resumeLogin: function(sessionToken) {
      // get sessionToken from database
      // get User from database based on sessionToken
      if (!User) throw new Meteor.Error('unauthorized')
      // if there's a user, set its id again on the connection 
      this.setUserId(User.id)
      
      // optionally generate a new sessionToken
      return sessionToken
   },
   logout: function() {
      // clear the userId on the connection and 
      // make sure the remove/invalidate the sessionToken in the 
      // database
      this.setUserId(null)
   }
})