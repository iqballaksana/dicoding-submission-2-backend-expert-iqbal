const DeleteReply = require('../DeleteReply');

describe('DeleteReply entities', () => {
    it('should throw error when payload did not contain needed property', () => {
        const payload = {};

        expect(() => new DeleteReply(payload))
            .toThrowError('DELETE_REPLY.NOT_CONTAIN_NEEDED_PROPERTY');
    });

    it('should throw error when payload did not meet data type spec', () => {
        const payload = {
            replyId: 999,
            commentId: 'comment-test-999',
            threadId: 'thread-test-999',
            userId: true,
        };

        expect(() => new DeleteReply(payload))
            .toThrowError('DELETE_REPLY.NOT_MEET_DATA_TYPE_SPECIFICATION');
    });

    it('should create DeleteReply object correctly', () => {
        const payload = {
            replyId: 'reply-test-999',
            commentId: 'comment-test-999',
            threadId: 'thread-test-999',
            userId: 'user-123',
        };

        const deleteReply = new DeleteReply(payload);

        expect(deleteReply.replyId).toEqual(payload.replyId);
        expect(deleteReply.commentId).toEqual(payload.commentId);
        expect(deleteReply.threadId).toEqual(payload.threadId);
        expect(deleteReply.userId).toEqual(payload.userId);
    });
});