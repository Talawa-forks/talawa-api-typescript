const Organization = require('../../models/Post');
const User = require('../../models/Post');
const { getAllConnections } = require('../../ConnectionManager/connections');
const { addTenantId } = require('../../helper_functions');
module.exports = async (parent, args) => {
  var sort = {};
  var isSortingExecuted = args.orderBy !== null;

  //Sorting List
  if (isSortingExecuted) {
    if (args.orderBy === 'id_ASC') {
      sort = { _id: 1 };
    } else if (args.orderBy === 'id_DESC') {
      sort = { _id: -1 };
    } else if (args.orderBy === 'text_ASC') {
      sort = { text: 1 };
    } else if (args.orderBy === 'text_DESC') {
      sort = { text: -1 };
    } else if (args.orderBy === 'title_ASC') {
      sort = { title: 1 };
    } else if (args.orderBy === 'title_DESC') {
      sort = { title: -1 };
    } else if (args.orderBy === 'createdAt_ASC') {
      sort = { createdAt: 1 };
    } else if (args.orderBy === 'createdAt_DESC') {
      sort = { createdAt: -1 };
    } else if (args.orderBy === 'imageUrl_ASC') {
      sort = { imageUrl: 1 };
    } else if (args.orderBy === 'imageUrl_DESC') {
      sort = { imageUrl: -1 };
    } else if (args.orderBy === 'videoUrl_ASC') {
      sort = { videoUrl: 1 };
    } else if (args.orderBy === 'videoUrl_DESC') {
      sort = { videoUrl: -1 };
    } else if (args.orderBy === 'likeCount_ASC') {
      sort = { likeCount: 1 };
    } else if (args.orderBy === 'likeCount_DESC') {
      sort = { likeCount: -1 };
    } else if (args.orderBy === 'commentCount_ASC') {
      sort = { commentCount: 1 };
    } else {
      sort = { commentCount: -1 };
    }
  }
  let p = [];
  const connections = getAllConnections();
  for (let conn in connections) {
    const posts = await connections[conn].Post.find()
      .populate('organization', '', Organization)
      .populate('likedBy', '', User)
      .populate({
        path: 'comments',
        populate: {
          path: 'creator',
          model: User,
        },
      })
      .populate('creator', '-password', User)
      .sort(sort);
    for (let i = 0; i < posts.length; i++) {
      posts[i]._doc._id = addTenantId(posts[i]._id, conn);
      p.push(posts[i]);
    }
  }
  const posts = p.map((post) => {
    post.likeCount = post.likedBy.length || 0;
    post.commentCount = post.comments.length || 0;
    return post;
  });
  return posts;
};
