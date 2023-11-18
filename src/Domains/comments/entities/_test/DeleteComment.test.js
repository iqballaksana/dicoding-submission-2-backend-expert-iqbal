const DeleteComment = require('../DeleteComment');

describe('DeleteComment entities', () => {
    it('should throw error when payload did not contain needed property', () => {
        const payload = {};

        expect(() => new DeleteComment(payload)).toThrowError('DELETE_COMMENT.NOT_CONTAIN_NEEDED_PROPERTY');
    });

    it('should throw error when payload di not meet data type spec', () => {
        const payload = {
            commentId: 777,
            threadId: 'thread-test-999',
            userId: 'user-123',
        };

        expect(() => new DeleteComment(payload)).toThrowError('DELETE_COMMENT.NOT_MEET_DATA_TYPE_SPECIFICATION');
    });

    it('should create deleteCommentById object correctly', () => {
        const payload = {
            commentId: 'comment-test-999',
            threadId: 'thread-test-999',
            userId: 'user-123',
        };
      
        const deleteComment = new DeleteComment(payload);
      
        expect(deleteComment.commentId).toEqual(payload.commentId);
        expect(deleteComment.threadId).toEqual(payload.threadId);
        expect(deleteComment.userId).toEqual(payload.userId);
    });
});