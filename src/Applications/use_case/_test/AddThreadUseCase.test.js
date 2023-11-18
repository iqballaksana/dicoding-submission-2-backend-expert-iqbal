const ThreadRepository = require('../../../Domains/threads/ThreadRepository');
const AddThread = require('../../../Domains/threads/entities/AddThread');
const AddedThread = require('../../../Domains/threads/entities/AddedThread');
const AddThreadUseCase = require('../AddThreadUseCase');

describe('AddThreadUseCase', () => {
    it('should orchestrating the add thread action correctly', async () => {
        const useCasePayload = {
            title: 'judul thread',
            body: 'isi',
            owner: 'user-123',
        };

        const expectedAddedThread = new AddedThread({
            id: 'thread-test-999',
            title: useCasePayload.title,
            owner: useCasePayload.owner,
        });

        const mockThreadRepository = new ThreadRepository();

        mockThreadRepository.addThread = jest.fn(() => Promise.resolve(
            new AddedThread({
                id: 'thread-test-999',
                title: useCasePayload.title,
                owner: useCasePayload.owner,
            }),
        ));

        const addThreadUseCase = new AddThreadUseCase({
            threadRepository: mockThreadRepository,
        });

        const addedThread = await addThreadUseCase.execute(useCasePayload);

        expect(addedThread).toStrictEqual(expectedAddedThread);
        expect(mockThreadRepository.addThread).toBeCalledWith(new AddThread({
            title: useCasePayload.title,
            body: useCasePayload.body,
            owner: useCasePayload.owner,
        }));
    });
});