import React from "react";
import { useTracker } from 'meteor/react-meteor-data';
import { ContactsCollection } from "../api/contacts.collections";

export const ContactList = () => {
    //const contacts = [  {_id: "id1", name: "name1", email: "email1", imageURL: "imageURL1"},
    //                    {_id: "id2", name: "name2", email: "email2", imageURL: "imageURL2"}]

    const contacts = useTracker(() => {
        const handle = Meteor.subscribe('contacts');
        return ContactsCollection.find().fetch();
    });

    return (
        <div>
            <h3>Contact List</h3>
            <ul>
                {contacts.map(contact => (
                    <li key={contact._id}>{contact.name} - {contact.email} - {contact.imageURL}</li>
                ))}
            </ul>
        </div>
    )
};
