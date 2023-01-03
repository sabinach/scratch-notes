import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';

export const ContactsCollection = new Mongo.Collection('contacts');

ContactsCollection.schema = new SimpleSchema({
  name: {type: String},
  email: {type: Number, defaultValue: ""},
  imageURL: {type: String, optional: true}
});
