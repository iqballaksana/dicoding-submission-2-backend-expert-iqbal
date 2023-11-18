const AddedReply = require('../AddedReply');

describe('AddedReply entities', () => {
    it('should throw error when payload did not contain needed property', () => {
        const payload = {
            id: 'reply-test-999',
            content: 'abcdefghijkl',
        };
    
        expect(() => new AddedReply(payload))
            .toThrowError('ADDED_REPLY.NOT_CONTAIN_NEEDED_PROPERTY');
    });
    
    it('should throw error when payload did not meet data type spec', () => {
        const payload = {
            id: {},
            content: 'abcdefghijkl',
            owner: 1,
        };
    
        expect(() => new AddedReply(payload))
            .toThrowError('ADDED_REPLY.NOT_MEET_DATA_TYPE_SPECIFICATION');
    });
    
    it('should create AddedReply object correctly', () => {
        const payload = {
            id: 'reply-test-999',
            content: 'abcdefghijkl',
            owner: 'user-123',
        };
    
        const {id, content, owner} = new AddedReply(payload);
    
        expect(id).toEqual(payload.id);
        expect(content).toEqual(payload.content);
        expect(owner).toEqual(payload.owner);
    });
})
