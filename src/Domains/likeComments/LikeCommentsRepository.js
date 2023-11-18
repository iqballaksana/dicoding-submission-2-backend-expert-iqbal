/* eslint-disable no-unused-vars */
class LikeCommentsRepository {
    async likeComment(payload) {
      throw new Error('LIKE_COMMENT_REPOSITORY.METHOD_NOT_IMPLEMENTED');
    }
  
    async unlikeComment({userId, commentId}) {
      throw new Error('LIKE_COMMENT_REPOSITORY.METHOD_NOT_IMPLEMENTED');
    }
  
    async verifyAvailableCommentLike({userId, commentId}) {
      throw new Error('LIKE_COMMENT_REPOSITORY.METHOD_NOT_IMPLEMENTED');
    }
  
    async getCommentLikesCountByThreadId(threadId) {
      throw new Error('LIKE_COMMENT_REPOSITORY.METHOD_NOT_IMPLEMENTED');
    }
  }
  
  module.exports = LikeCommentsRepository;