const DetailCommentLike = require('../DetailCommentLike');

describe('etailCommentLike entities', () => {
  it('should throw error when payload did not contain needed property', () => {
    const payload = {};

    expect(() => new DetailCommentLike(payload))
        .toThrowError('DETAIL_COMMENT_LIKE.NOT_CONTAIN_NEEDED_PROPERTY');
  });

  it('should throw error when payload did not meet data type spec', () => {
    const payload = {
      likes: 'aaa',
    };

    expect(() => new DetailCommentLike(payload))
        .toThrowError('DETAIL_COMMENT_LIKE.NOT_MEET_DATA_TYPE_SPECIFICATION');
  });

  it('should throw error when payload did not meet data type spec', () => {
    const payload = {
      likes: 0,
    };

    const {likes} = new DetailCommentLike(payload);

    expect(likes).toEqual(payload.likes);
  });
});