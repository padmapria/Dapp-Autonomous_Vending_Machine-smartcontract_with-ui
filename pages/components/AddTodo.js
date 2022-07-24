import React, { useState } from 'react';
import 'bulma/css/bulma.min.css';
 
export const AddTodo = ({ addTodo }) => {
    const [title, setTitle] = useState("");
    const [desc, setDesc] = useState("");
 
    const submit = (e) => {
        e.preventDefault();
        if (!title || !desc) {
            alert("Title or Description cannot be blank");
        }
        else {
            addTodo(title, desc);
            setTitle("");
            setDesc("");
        }
    }
    return (
        <>
        <div>
            <br/>
        </div>
        <div className="container">
            <h3 className="is-size-17 has-text-white is-size-4">Add a review</h3>
            <form onSubmit={submit}>
                <div className="mb-3 column is-4">
                    <label htmlFor="title" className="form-label is-size-5 has-text-white mx-4">Title</label>
                    
                    <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} className="input is-hovered mx-4 mt-2" id="title" aria-describedby="emailHelp" />
 
                </div>
                <div className="mb-3 column is-20">
                    <label htmlFor="desc" className="form-label is-size-5 has-text-white mx-4">Description</label>
                    <textarea className="textarea is-small is-primary" placeholder="Enter your review" 
                        value={desc} onChange={(e) => setDesc(e.target.value)} id="desc">
                    </textarea>
                </div>
                <button type="submit" className="button is-warning is-size-6 mx-5">Add Review</button>
            </form>
        </div>
        </>
    )
}