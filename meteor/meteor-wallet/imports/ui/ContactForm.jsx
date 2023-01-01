import React, { useState } from "react";

export const ContactForm = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [imageURL, setImageURL] = useState("");

    const saveContact = () => {
        console.log({name, email, imageURL});
        
        Meteor.call('contacts.insert', { name, email, imageURL });
        setName("");
        setEmail("");
        setImageURL("");
    }

    return (
        <form>
            <div>
                <label htmlFor="name">Name: </label>
                <input 
                    id="name" 
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)} />
            </div>
            <div>
                <label htmlFor="email">Email: </label>
                <input 
                    id="email" 
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)} />
            </div>
            <div>
                <label htmlFor="imageURL">Image URL: </label>
                <input 
                    id="imageURL"
                    type="text"
                    value={imageURL}
                    onChange={(e) => setImageURL(e.target.value)} />
            </div>
            <div>
                <button type="button" onClick={saveContact}>Save Contact</button>
            </div>
        </form>
    )
}
