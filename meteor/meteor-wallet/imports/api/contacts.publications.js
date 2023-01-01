import { Meteor } from 'meteor/meteor';
import { ContactsCollection } from "./contacts.collections";

Meteor.publish('contacts', () => {
    return ContactsCollection.find();
});
