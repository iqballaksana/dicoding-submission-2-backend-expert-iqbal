const DeleteReply =
    require('../../../Domains/replies/entities/DeleteReply');
const ReplyRepository = require('../../../Domains/replies/ReplyRepository');
const DeleteReplyUseCase = require('../DeleteReplyUseCase');

describe('DeleteReplyUseCase', () => {
  it('should orchestrating the delete reply action correctly', async () => {
    const useCasePayload = {
      replyId: 'reply-test-999',
      commentId: 'comment-test-999',
      threadId: 'thread-test-999',
      userId: 'user-123',
    };

    const mockReplyRepository = new ReplyRepository();

    mockReplyRepository.verifyAvailableReply = jest.fn(() => Promise.resolve());
    mockReplyRepository.verifyReplyOwner = jest.fn(() => Promise.resolve());
    mockReplyRepository.deleteReplyById = jest.fn(() => Promise.resolve());

    const deleteReplyUseCase = new DeleteReplyUseCase({
      replyRepository: mockReplyRepository,
    });

    await expect(deleteReplyUseCase.execute(useCasePayload))
        .resolves.not.toThrowError();
    expect(mockReplyRepository.verifyAvailableReply)
        .toBeCalledWith(new DeleteReply(useCasePayload));
    expect(mockReplyRepository.verifyReplyOwner)
        .toBeCalledWith(useCasePayload);
    expect(mockReplyRepository.deleteReplyById)
        .toBeCalledWith(useCasePayload.replyId);
  });
});