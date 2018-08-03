import React from 'react';
//import Checkbox from './Checkbox';
//import gql from 'graphql-tag';
//import { graphql } from 'react-apollo';
import { COMPLETE_TASK } from '../mutations';
import { DELETE_TASK } from '../mutations';
import { GET_TASKS } from '../queries';
import { graphql, compose } from 'react-apollo';

// Create a todo list react component to display list of tasks
class TaskList extends React.Component {

    constructor(props) {
        super(props);
        //this.state = { id: '' };
        this.state = {
            items: props.items,
            editing: false
        };
    }

    deleteTask(item) {
        const variables = {
            id: item.id,
        }
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

        return (

            <ul className="tasks">
                {

                    this.props.items.map(item => {

                        /** if (this.state.editing === true) {
                             return (
                                 <div>
                                     <input value={this.state.item} placeholder={item.name} onChange={this.onChange} />
                                     <p></p>
                                 </div>
                             );
                         }*/

                        //if isDone is true then the checkbox should be checked
                        if (item.isDone) return <li key={item.id}>
                            <input type="checkbox" checked></input>
                            <span>{item.name}</span>
                            <button onClick={() => this.deleteTask(item)}>
                                {'delete'}
                            </button>
                            <input
                                className="addTask"
                                onChange={this.handleChange}
                                value={this.state.name}
                                placeholder={'Change Task'}
                                size="4"
                            />
                        </li>
                        //if checkbox is checked set isDone to true
                        //likewise when tasks are loaded with isDone as true they should be checked already
                        else {
                            return <li key={item.id}>
                                <input type="checkbox" onClick={() => this.checkTask(item)}></input>
                                {item.name}
                                <button onClick={() => this.deleteTask(item)}>
                                    {'delete'}
                                </button>
                                <input
                                    className="addTask"
                                    onChange={this.handleChange}
                                    value={this.state.name}
                                    placeholder={'Change Task'}
                                    size="4"
                                />
                            </li>
                        }
                    })

                }
            </ul>

        );
    }
}


export default compose(graphql(GET_TASKS, { name: 'getTasks' }),
    graphql(DELETE_TASK, { name: 'removeTask' }),
    graphql(COMPLETE_TASK, { name: 'completeTask' }))
    (TaskList);