const LikeCommentsRepository = require('../LikeCommentsRepository');

describe('LikeCommentsRepository interface', () => {
  it('should throw error when invoke abstract behavior', async () => {
    const likeCommentsRepository = new LikeCommentsRepository();

    await expect(likeCommentsRepository.likeComment({})).rejects
        .toThrowError('LIKE_COMMENT_REPOSITORY.METHOD_NOT_IMPLEMENTED');
    await expect(likeCommentsRepository.unlikeComment({})).rejects
        .toThrowError('LIKE_COMMENT_REPOSITORY.METHOD_NOT_IMPLEMENTED');
    await expect(likeCommentsRepository.verifyAvailableCommentLike({})).rejects
        .toThrowError('LIKE_COMMENT_REPOSITORY.METHOD_NOT_IMPLEMENTED');
    await expect(likeCommentsRepository.getCommentLikesCountByThreadId('')).rejects
        .toThrowError('LIKE_COMMENT_REPOSITORY.METHOD_NOT_IMPLEMENTED');
  });
});