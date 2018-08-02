var GraphQLNonNull = require('graphql').GraphQLNonNull;
var GraphQLString = require('graphql').GraphQLString;
var GraphQLBoolean = require('graphql').GraphQLBoolean;
var TodoType = require('../types/task');
var TodoModel = require('../../schema');

exports.update = {
  type: TodoType.todoType,
  args: {
    id: {
      name: 'id',
      type: new GraphQLNonNull(GraphQLString)
    },
    name: {
      type: new GraphQLNonNull(GraphQLString),
    },
    isDone: {
      type: new GraphQLNonNull(GraphQLBoolean),
    }
  },

  // need to figure out how to mark task as done
  resolve(root, params) {
    return TodoModel.findByIdAndUpdate(
      params.id,
      { $set: { name: params.name } },
      { new: true }
    )
      .catch(err => new Error(err));
  }
}



