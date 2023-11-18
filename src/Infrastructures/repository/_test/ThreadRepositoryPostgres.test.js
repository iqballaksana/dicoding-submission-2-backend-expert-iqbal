const ThreadsTableTestHelper = require('../../../../tests/ThreadsTableTestHelper');
const UsersTableTestHelper = require('../../../../tests/UsersTableTestHelper');
const ThreadRepositoryPostgres = require('../ThreadRepositoryPostgres');
const pool = require('../../database/postgres/pool');
const AddThread = require('../../../Domains/threads/entities/AddThread');
const AddedThread = require('../../../Domains/threads/entities/AddedThread');
const NotFoundError = require('../../../Commons/exceptions/NotFoundError');
const DetailThread = require('../../../Domains/threads/entities/DetailThread');

describe('ThreadRepositoryPostgres', () => {
  afterEach(async () => {
    await ThreadsTableTestHelper.cleanTable();
    await UsersTableTestHelper.cleanTable();
  });

  afterAll(async () => {
    await pool.end;
  });

  describe('addThread function', () => {
    it('should persist new thread and return added thread correctly',
        async () => {
          await UsersTableTestHelper.addUser({});
          const newThread = new AddThread({
            title: 'some thread',
            body: 'x',
            owner: 'user-123',
          });
          const fakeIdGenerator = () => 'test-999';
          const threadRepositoryPostgres =
              new ThreadRepositoryPostgres(pool, fakeIdGenerator);

          await threadRepositoryPostgres.addThread(newThread);

          const thread = await ThreadsTableTestHelper
              .findThreadById('thread-test-999');
          expect(thread).toHaveLength(1);
        },
    );

    it('should return added thread correctly', async () => {
      await UsersTableTestHelper.addUser({});
      const newThread = new AddThread({
        title: 'some thread',
        body: 'x',
        owner: 'user-123',
      });
      const fakeIdGenerator = () => 'test-999';
      const threadRepositoryPostgres =
          new ThreadRepositoryPostgres(pool, fakeIdGenerator);

      const addedThread = await threadRepositoryPostgres.addThread(newThread);

      expect(addedThread).toStrictEqual(new AddedThread({
        id: 'thread-test-999',
        title: 'some thread',
        owner: 'user-123',
      }));
    });
  });

  describe('verifyAvailableThread function', () => {
    it('should throw NotFoundError when thread not found', async () => {
      const threadRepositoryPostgres = new ThreadRepositoryPostgres(pool, '');

      await expect(threadRepositoryPostgres.verifyAvailableThread('1')).rejects
          .toThrowError(NotFoundError);
    });

    it('should return nothing when thread found', async () => {
      const threadRepositoryPostgres = new ThreadRepositoryPostgres(pool, '');

      await UsersTableTestHelper.addUser({});
      await ThreadsTableTestHelper.addThread({id: 'thread-test-998'});

      await expect(threadRepositoryPostgres.verifyAvailableThread('thread-test-998'))
          .resolves.not.toThrowError(NotFoundError);
    });
  });

  describe('getThreadById function', () => {
    it('should throw NotFoundError when thread not found', async () => {
      const threadRepositoryPostgres = new ThreadRepositoryPostgres(pool, '');

      await expect(threadRepositoryPostgres.getThreadById('1')).rejects
          .toThrowError(NotFoundError);
    });

    it('should return thread correctly', async () => {
      const threadRepositoryPostgres = new ThreadRepositoryPostgres(pool, '');

      await UsersTableTestHelper.addUser({});

      const currentDate = new Date();
      await ThreadsTableTestHelper.addThread(
          {
            id: 'thread-test-998',
            title: 'some thread',
            body: 'anything',
            date: currentDate,
            owner: 'user-123',
          },
      );

      const thread = await threadRepositoryPostgres.getThreadById('thread-test-998');
      expect(thread).toStrictEqual(new DetailThread({
        id: 'thread-test-998',
        title: 'some thread',
        body: 'anything',
        date: currentDate,
        username: 'dicoding',
      }));
    });
  });
});