const LikeRepository = require('../../Domains/likes/LikeRepository');

class LikeRepositoryPostgres extends LikeRepository {
  constructor(pool, idGenerator) {
    super();

    this._pool = pool;
    this._idGenerator = idGenerator;
  }

  async likeComment({userId, commentId}) {
    const id = `like-comment-${this._idGenerator()}`;
    const date = new Date();
    const query = {
      text: 'INSERT INTO like_comments VALUES($1,$2,$3,$4) RETURNING id',
      values: [id, commentId, userId, date],
    };

    await this._pool.query(query);
  }

  async unlikeComment({userId, commentId}) {
    const query = {
      text: 'DELETE FROM like_comments WHERE user_id=$1 AND comment_id=$2',
      values: [userId, commentId],
    };

    await this._pool.query(query);
  }

  async verifyAvailableCommentLike({userId, commentId}) {
    const query = {
      text: `
        SELECT 1 FROM like_comments WHERE user_id=$1 AND comment_id=$2
      `,
      values: [userId, commentId],
    };

    const {rowCount} = await this._pool.query(query);
    if (rowCount) {
      return true;
    }

    return false;
  }

  async getCommentLikesCountByThreadId(threadId) {
    const query = {
      text: `
        SELECT CAST(COUNT(l.id) AS INTEGER) AS likes, c.id AS comment_id
        FROM like_comments AS l
        RIGHT JOIN comments as c ON c.id = l.comment_id
        WHERE c.thread_id=$1
        GROUP BY c.id
      `,
      values: [threadId],
    };

    const {rows} = await this._pool.query(query);
    return rows;
  }
}

module.exports = LikeRepositoryPostgres;