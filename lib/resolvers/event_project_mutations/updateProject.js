const User = require('../../models/User');
const { tenantCtx } = require('../../helper_functions');

const { NotFoundError, UnauthorizedError } = require('errors');
const requestContext = require('talawa-request-context');

const updateEvent = async (parent, args, context) => {
  const user = await User.findOne({ _id: context.userId });

  if (!user) {
    throw new NotFoundError(
      process.env.NODE_ENV !== 'production'
        ? 'User not found'
        : requestContext.translate('user.notFound'),
      'user.notFound',
      'user'
    );
  }
  const { id, db } = await tenantCtx(args.id);
  const { EventProject } = db;

  const eventProject = await EventProject.findOne({ _id: id });

  if (!eventProject) {
    throw new NotFoundError(
      process.env.NODE_ENV !== 'production'
        ? 'EventProject not found'
        : requestContext.translate('eventProject.notFound'),
      'eventProject.notFound',
      'eventProject'
    );
  }

  // toString() method converts mongodb's objectId to a javascript string for comparision
  if (eventProject.creator.toString() !== context.userId) {
    throw new UnauthorizedError(
      process.env.NODE_ENV !== 'production'
        ? 'User not authorized'
        : requestContext.translate('user.notAuthorized'),
      'user.notAuthorized',
      'userAuthorization'
    );
  }

  const newEventProject = await EventProject.findOneAndUpdate(
    { _id: id },
    { ...args.data },
    { new: true }
  );
  return newEventProject;
};

module.exports = updateEvent;
