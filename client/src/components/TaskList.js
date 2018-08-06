import React from 'react';
//import Checkbox from './Checkbox';
//import gql from 'graphql-tag';
//import { graphql } from 'react-apollo';
import { COMPLETE_TASK } from '../mutations';
import { DELETE_TASK } from '../mutations';
import { GET_TASKS } from '../queries';
import { graphql, compose } from 'react-apollo';
import ListItem from "./ListItem";

// Create a todo list react component to display list of tasks
class TaskList extends React.Component {

    constructor(props) {
        super(props);
        //this.state = { id: '' };
        this.state = {
            tasks: props.items,
        };
    }

    deleteTask(item) {
        console.log(item.id);
        console.log(this.props);
        this.props.removeTask({
            variables: {
                id: item.id,
            },
            update: (store, { data: { removeTask } }) => {
                const data = store.readQuery({
                    query: GET_TASKS
                })
                data.tasks = data.tasks.filter(task => task.id !== item.id)
                store.writeQuery({ query: GET_TASKS, data })
            }
        }).then(function getResponse(response) {
            console.log(response);
        });
    }

    checkTask(item) {
        console.log(item.id);
        console.log(this.props);
        console.log(item.isDone)
        this.props.completeTask({
            variables: {
                id: item.id,
                isDone: item.isDone,
            }
        })
    }
    editButton() {
    }


    render() {

       
        console.log("taskList");
        console.log(this.state.tasks);
        return (

            
            <ul className="tasks">
             <p>memes</p>
             
                    {
                    this.state.tasks.map((item) => {
                        //console.log(item);
                        <li>
                            <input type="checkbox" checked={item.isDone}></input>
                            <ListItem task={this.props.item} />
                            <button onClick={() => this.deleteTask(item)}>
                                {'delete'}
                            </button>
                        </li>
                    })
                }
            </ul>);
    }
}


export default compose(graphql(GET_TASKS, { name: 'getTasks' }),
    graphql(DELETE_TASK, { name: 'removeTask' }),
    graphql(COMPLETE_TASK, { name: 'completeTask' }))
    (TaskList);