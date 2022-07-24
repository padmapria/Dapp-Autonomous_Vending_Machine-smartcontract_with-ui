import { Todos } from './components/Todos'
import { AddTodo } from './components/AddTodo'
import React, { useState } from 'react';
import styles from '../styles/Home.module.css'

export default function Review() {
    const onDelete = (todo) => {
        setTodos(todos.filter((e) => {
          return e !== todo;
     
        }));
      }
    
      const addTodo = (title, desc) => {
        console.log("I am adding this todo", title, desc)
        let sno;
        if (todos.length === 0) {
          sno = 0;
        }
        else {
          sno = todos[todos.length - 1].sno + 1;
        }
        const myTodo = {
          sno: sno,
          title: title,
          desc: desc,
        }
        setTodos([...todos, myTodo]);
        console.log(myTodo);
      }
     
      const [todos, setTodos] = useState([]);
      return (
        <>
              <div  className={styles.container}  style={{ 
                backgroundImage: `url('/eth_logo.jpg')`,  
                backgroundSize: '100% 100%',   backgroundRepeat:'no-repeat'}}>
                <div>
                  <section className="mt-12 is-size-17">
                    <AddTodo addTodo={addTodo} />
                  </section>
                  <section>
                    <Todos todos={todos} onDelete={onDelete}  />
                  </section>
                </div>
            </div>
        </>
      );
};
