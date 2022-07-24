import React, { useState } from 'react';
import 'bulma/css/bulma.min.css';
export const TodoItem = ({ todo, onDelete }) => {
    return (
        <>
            <div className= "has-text-white">
                <h4>{todo.title}</h4>
                <p>{todo.desc}</p>
                <button className="button is-white" onClick={() => { onDelete(todo) }}>Close</button>
            </div>
            <hr />
        </>
    )
}