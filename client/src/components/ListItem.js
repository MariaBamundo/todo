import React, { Component } from 'react';
import gql from 'graphql-tag';
import { graphql, Mutation, compose } from 'react-apollo';
import { COMPLETE_TASK } from '../mutations';
import { DELETE_TASK } from '../mutations';

class ListItem extends Component {
    constructor(props) {
        super(props);
        this.state = {
            item: this.props.task.item,
            id: this.props.task.id,
            isDone: this.props.task.isDone,
            editing: false
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
    editTask() {
    }

    updateTask(item) {
        console.log(item.id);
        // change item.name into a text box and then on submit update item.name
    }

    createTask(){
        //base off code in taskList then change TaskList
    }

    render() {
        return (this.createTask)
    }

}
export default compose(graphql(GET_TASKS, { name: 'getTasks' }),
    graphql(DELETE_TASK, { name: 'removeTask' }),
    graphql(COMPLETE_TASK, { name: 'completeTask' }),
    graphql(UPDATE_TASK, { name: 'updateTask' }))
    (ListItem);
