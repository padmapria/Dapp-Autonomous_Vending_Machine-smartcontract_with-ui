import React, { useState } from 'react';
import { TodoItem } from "./TodoItem";
import 'bulma/css/bulma.min.css';
export const Todos = (props) => {
    let myStyle = {
        minHeight: "70vh",
        margin: "20px auto"
        
    }
    return (
        <div className="container">
            <h3 className="my-3 has-text-grey-lighter  is-size-4">Past Reviews</h3>
        <div className="control has-text-white is-size-5" style={myStyle}>
            {props.todos.length === 0 ? "No reviews to display" :
                props.todos.map((todo) => {
                    console.log(todo.sno);
                    return (<TodoItem todo={todo} key={todo.sno} onDelete={props.onDelete} />
                    )
                })
            }
        </div>
        </div>
    )
}