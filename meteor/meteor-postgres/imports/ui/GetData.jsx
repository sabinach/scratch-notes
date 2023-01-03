import React, { useState } from "react";

export const GetData = () => {
    const getData = () => {
        Meteor.call('db.getTable', "COMPANY" );
    }

    return (
        <form>
            <div>
                <button type="button" onClick={getData}>Get Data</button>
            </div>
        </form>
    )
}
