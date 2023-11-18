const CommentRepository = require('../../../Domains/comments/CommentRepository');
const LikeRepository = require('../../../Domains/likes/LikeRepository');
const LikeOrUnlikeUseCase = require('../LikeOrUnlikeUseCase');

describe('LikeOrUnlikeUseCase', () => {
  it('should orchestrating the like action correctly', async () => {
    const payload = {
      userId: 'user-123',
      commentId: 'comment-test-123',
      threadId: 'thread-test-123',
    };

    const mockCommentRepository = new CommentRepository();
    const mockLikeRepository = new LikeRepository();

    mockCommentRepository.verifyAvailableCommentInThread = jest
        .fn(() => Promise.resolve());
    mockLikeRepository.verifyAvailableCommentLike = jest
        .fn(() => Promise.resolve());
    mockLikeRepository.likeComment = jest.fn(() => Promise.resolve());

    const likeOrUnlikeUseCase = new LikeOrUnlikeUseCase({
      commentRepository: mockCommentRepository,
      likeRepository: mockLikeRepository,
    });

    await likeOrUnlikeUseCase.execute(payload);

    expect(mockCommentRepository.verifyAvailableCommentInThread)
        .toBeCalledWith(payload.commentId, payload.threadId);
    expect(mockLikeRepository.verifyAvailableCommentLike)
        .toBeCalledWith(payload);
    expect(mockLikeRepository.likeComment)
        .toBeCalledWith(payload);
  });

  it('should orchestrating the unlike action correctly', async () => {
    const payload = {
      userId: 'user-123',
      commentId: 'comment-test-123',
      threadId: 'thread-test-123',
    };

    const mockCommentRepository = new CommentRepository();
    const mockLikeRepository = new LikeRepository();

    mockCommentRepository.verifyAvailableCommentInThread = jest
        .fn(() => Promise.resolve());
    mockLikeRepository.verifyAvailableCommentLike = jest
        .fn(() => Promise.resolve(true));
    mockLikeRepository.unlikeComment = jest.fn(() => Promise.resolve());

    const likeOrUnlikeUseCase = new LikeOrUnlikeUseCase({
      commentRepository: mockCommentRepository,
      likeRepository: mockLikeRepository,
    });

    await likeOrUnlikeUseCase.execute(payload);

    expect(mockCommentRepository.verifyAvailableCommentInThread)
        .toBeCalledWith(payload.commentId, payload.threadId);
    expect(mockLikeRepository.verifyAvailableCommentLike)
        .toBeCalledWith(payload);
    expect(mockLikeRepository.unlikeComment)
        .toBeCalledWith(payload);
  });
});