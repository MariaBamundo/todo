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

        //console.log(this.state.tasks);
        return (

            
            <ul className="tasks">
                {
                    //something wrong with this line?
                    this.state.tasks.map((item) => {
                        //console.log(item);
                        <div>
                            <input type="checkbox" checked={item.isDone}></input>
                            <ListItem task={item} />
                            <button onClick={() => this.deleteTask(item)}>
                                {'delete'}
                            </button>
                            </div>
                    })
                }
            </ul>);
    }
}


export default compose(graphql(GET_TASKS, { name: 'getTasks' }),
    graphql(DELETE_TASK, { name: 'removeTask' }),
    graphql(COMPLETE_TASK, { name: 'completeTask' }))
    (TaskList);