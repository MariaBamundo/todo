import React, { Component } from 'react';
import gql from 'graphql-tag';
import { graphql, Mutation, compose } from 'react-apollo';
import { COMPLETE_TASK } from '../mutations';
import { DELETE_TASK } from '../mutations';
import { UPDATE_TASK } from '../mutations';
import { GET_TASKS } from '../queries';

class ListItem extends Component {
    constructor(props) {
        super(props);
        this.state = {
            //some word is wrong here
            item: props.item,
            editing: false
        };
    }
/*
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
    }*/

    editTask() {
        this.setState({
            editing: true
        });
    }

    updateTask(item) {
        console.log(item.id);
        // change item.name into a text box and then on submit update item.name
    }

    showItem() {
        if (this.state.editing) {
            return (
                <div>
                    <input value={this.state.item.name} onChange={this.onChange} />
                </div>);
        }

        else {
            return (
                <li key={this.state.item.id}>
                    <p id={this.state.item.id}>{this.state.item.name}</p>
                    <button className="edit" onClick={() => this.editButton()}> Edit Item</button>
                </li>);
        }
        /*(item.isDone) {
            return <li key={item.id}>
                <input type="checkbox" checked></input>
                <span>{item.name}</span>
                <button onClick={() => this.deleteTask(item)}>
                    {'delete'}
                </button>
                <button onClick={() => this.editTask(item)}>
                    {'edit'}
                </button>
            </li>
        }
        //if checkbox is checked set isDone to true
        //likewise when tasks are loaded with isDone as true they should be checked already
        else {
            return <li key={item.id}>
                <input type="checkbox" onClick={() => this.checkTask(item)}></input>
                {item.name}
                <button onClick={() => this.deleteTask(item)}>
                    {'delete'}
                </button>
                <button onClick={() => this.editTask(item)}>
                    {'edit'}
                </button>
            </li>
        }*/
    }

    render() {
        return (this.showItem())
    }
}

export default compose(graphql(GET_TASKS, { name: 'getTasks' }),
    graphql(DELETE_TASK, { name: 'removeTask' }),
    graphql(COMPLETE_TASK, { name: 'completeTask' }),
    graphql(UPDATE_TASK, { name: 'updateTask' }))
    (ListItem);
