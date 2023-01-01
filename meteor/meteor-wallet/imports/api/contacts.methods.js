import { Meteor } from 'meteor/meteor';
import { ContactsCollection } from "./contacts.collections";

Meteor.methods({
    'contacts.insert'(obj) {
        ContactsCollection.insert(obj);
    }
});
