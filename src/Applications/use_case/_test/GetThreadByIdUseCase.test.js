const ThreadRepository = require('../../../Domains/threads/ThreadRepository');
const CommentRepository =
    require('../../../Domains/comments/CommentRepository');
const ReplyRepository = require('../../../Domains/replies/ReplyRepository');
const DetailThread = require('../../../Domains/threads/entities/DetailThread');
const GetThreadByIdUseCase = require('../GetThreadByIdUseCase');
const LikeRepository = require('../../../Domains/likes/LikeRepository');

describe('GetThreadByIdUseCase', () => {
  it('should orchestrating the get thread by id action correctly', async () => {
    const useCasePayload = {id: 'thread-test-999'};
    const currentDate = new Date();
    const expectedThread = {
      id: 'thread-test-999',
      title: 'title thread',
      body: 'isi thread',
      date: currentDate,
      username: 'dicoding',
      comments: [
        {
          id: 'comment-test-999',
          username: 'dicoding',
          date: currentDate,
          content: 'a content',
          likeCount: 1,
          replies: [
            {
              id: 'reply-test-999',
              content: 'a reply for comment',
              date: currentDate,
              username: 'dicoding',
            },
          ],
        },
      ],
    };

    const mockThreadRepository = new ThreadRepository();
    const mockCommentRepository = new CommentRepository();
    const mockReplyRepository = new ReplyRepository();
    const mockLikeRepository = new LikeRepository();

    mockThreadRepository.getThreadById = jest.fn(() => Promise.resolve(
        new DetailThread({
          id: 'thread-test-999',
          title: 'title thread',
          body: 'isi thread',
          date: currentDate,
          username: 'dicoding',
        }),
    ));
    mockCommentRepository.getCommentsByThreadId = jest.fn(() => Promise.resolve(
        [
          {
            id: 'comment-test-999',
            username: 'dicoding',
            date: currentDate,
            content: 'a content',
            is_deleted: false,
          },
        ],
    ));
    mockReplyRepository.getRepliesByThreadId = jest.fn(() => Promise.resolve(
        [
          {
            id: 'reply-test-999',
            comment_id: 'comment-test-999',
            content: 'a reply for comment',
            date: currentDate,
            is_deleted: false,
            username: 'dicoding',
          },
        ],
    ));
    mockLikeRepository.getCommentLikesCountByThreadId = jest.fn(() => Promise.resolve(
      [
        {
          likes: 1,
          comment_id: 'comment-test-999',       
        },
      ],
    ));

    const getThreadByIdUseCase = new GetThreadByIdUseCase({
      threadRepository: mockThreadRepository,
      commentRepository: mockCommentRepository,
      replyRepository: mockReplyRepository,
      likeRepository: mockLikeRepository
    });

    const thread = await getThreadByIdUseCase.execute(useCasePayload.id);

    expect(thread).toStrictEqual(expectedThread);
    expect(mockThreadRepository.getThreadById)
        .toBeCalledWith(useCasePayload.id);
    expect(mockCommentRepository.getCommentsByThreadId)
        .toBeCalledWith(useCasePayload.id);
    expect(mockReplyRepository.getRepliesByThreadId)
        .toBeCalledWith(useCasePayload.id);
  });

  it('should not display deleted content', async () => {
    const useCasePayload = {id: 'thread-test-999'};
    const currentDate = new Date();
    const expectedThread = {
      id: 'thread-test-999',
      title: 'title thread',
      body: 'isi thread',
      date: currentDate,
      username: 'dicoding',
      comments: [
        {
          id: 'comment-test-999',
          username: 'dicoding',
          date: currentDate,
          content: 'a content',
          likeCount: 0,
          replies: [
            {
              id: 'reply-test-999',
              content: '**balasan telah dihapus**',
              date: currentDate,
              username: 'dicoding',
            },
          ],
        },
        {
          id: 'comment-test-998',
          username: 'dicoding',
          date: currentDate,
          content: '**komentar telah dihapus**',
          likeCount: 0,
          replies: [],
        },
      ],
    };

    const mockThreadRepository = new ThreadRepository();
    const mockCommentRepository = new CommentRepository();
    const mockReplyRepository = new ReplyRepository();
    const mockLikeRepository = new LikeRepository();

    mockThreadRepository.getThreadById = jest.fn(() => Promise.resolve(
        new DetailThread({
          id: 'thread-test-999',
          title: 'title thread',
          body: 'isi thread',
          date: currentDate,
          username: 'dicoding',
        }),
    ));
    mockCommentRepository.getCommentsByThreadId = jest.fn(() => Promise.resolve(
        [
          {
            id: 'comment-test-999',
            username: 'dicoding',
            date: currentDate,
            content: 'a content',
            is_deleted: false,
          },
          {
            id: 'comment-test-998',
            username: 'dicoding',
            date: currentDate,
            content: 'a content',
            is_deleted: true,
          },
        ],
    ));
    mockReplyRepository.getRepliesByThreadId = jest.fn(() => Promise.resolve(
        [
          {
            id: 'reply-test-999',
            comment_id: 'comment-test-999',
            content: 'a reply for comment',
            date: currentDate,
            is_deleted: true,
            username: 'dicoding',
          },
        ],
    ));
    mockLikeRepository.getCommentLikesCountByThreadId = jest
        .fn(() => Promise.resolve([
          {
            comment_id: 'comment-test-999',
            likes: 0,
          },
          {
            comment_id: 'comment-test-998',
            likes: 0,
          },
      ]));

    const getThreadByIdUseCase = new GetThreadByIdUseCase({
      threadRepository: mockThreadRepository,
      commentRepository: mockCommentRepository,
      replyRepository: mockReplyRepository,
      likeRepository: mockLikeRepository,
    });

    const thread = await getThreadByIdUseCase.execute(useCasePayload.id);

    expect(thread).toStrictEqual(expectedThread);
    expect(mockThreadRepository.getThreadById)
        .toBeCalledWith(useCasePayload.id);
    expect(mockCommentRepository.getCommentsByThreadId)
        .toBeCalledWith(useCasePayload.id);
    expect(mockReplyRepository.getRepliesByThreadId)
        .toBeCalledWith(useCasePayload.id);
  });
});