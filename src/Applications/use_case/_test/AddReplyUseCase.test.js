const CommentRepository = require('../../../Domains/comments/CommentRepository');
const ReplyRepository = require('../../../Domains/replies/ReplyRepository');
const AddReply = require('../../../Domains/replies/entities/AddReply');
const AddedReply = require('../../../Domains/replies/entities/AddedReply');
const ThreadRepository = require('../../../Domains/threads/ThreadRepository');
const AddReplyUseCase = require('../AddReplyUseCase');

describe('AddReplyUseCase', () => {
    it('should orchestrating the add reply action correctly', async () => {
        const useCasePayload = {
            threadId: 'thread-test-999',
            commentId: 'comment-test-999',
            owner: 'user-123',
            content: 'isi konten',
        };

        const expectedAddedReply = new AddedReply({
            id: 'reply-test-999',
            content: useCasePayload.content,
            owner: useCasePayload.owner,
        });

        const mockThreadRepository = new ThreadRepository();
        const mockCommentRepository = new CommentRepository();
        const mockReplyRepository = new ReplyRepository();

        mockThreadRepository.verifyAvailableThread = jest.fn(() => Promise.resolve());
        mockCommentRepository.verifyAvailableCommentInThread = jest.fn(() => Promise.resolve());
        mockReplyRepository.addReply = jest.fn(() => Promise.resolve(
            new AddedReply({
                id: 'reply-test-999',
                content: useCasePayload.content,
                owner: useCasePayload.owner,
            }),
        ));

        const addReplyUseCase = new AddReplyUseCase({
            replyRepository: mockReplyRepository,
            commentRepository: mockCommentRepository,
            threadRepository: mockThreadRepository,
        });

        const addedReply = await addReplyUseCase.execute(useCasePayload);

        expect(addedReply).toStrictEqual(expectedAddedReply);
        expect(mockThreadRepository.verifyAvailableThread).toBeCalledWith(useCasePayload.threadId);
        expect(mockCommentRepository.verifyAvailableCommentInThread).toBeCalledWith(useCasePayload.commentId, useCasePayload.threadId);
        expect(mockReplyRepository.addReply).toBeCalledWith(new AddReply({
            content: useCasePayload.content,
            commentId: useCasePayload.commentId,
            threadId: useCasePayload.threadId,
            owner: useCasePayload.owner,
        }));
    });
});