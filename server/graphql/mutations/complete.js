var GraphQLNonNull = require('graphql').GraphQLNonNull;
var GraphQLID = require('graphql').GraphQLID;
var GraphQLBoolean = require('graphql').GraphQLBoolean;
var TodoType = require('../types/task');
var TodoModel = require('../../schema');

exports.complete = {
  type: TodoType.todoType,
  args: {
    id: {
      type: new GraphQLNonNull(GraphQLID)
    },
    isDone: {
      type: new GraphQLNonNull(GraphQLBoolean),
    }
  },
// to mark task as done?
    resolve(root, params) {
        return TodoModel.findByIdAndUpdate(
          params.id,
          { $set: { isDone: true } }
        )
          .catch(err => new Error(err));
      }
    }