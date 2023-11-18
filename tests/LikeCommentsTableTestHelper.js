/* instanbul ignore file */
const pool = require('../src/Infrastructures/database/postgres/pool');

const LikeCommentsTableTestHelper = {
    async addLike({
        id = 'like-comment-test-999',
        comment_id = 'comment-test-999',       
        user_id = 'user-123',
        date = new Date(),
    }){
        const query = {
            text: 'INSERT INTO like_comments VALUES($1, $2, $3, $4)',
            values: [id, comment_id, user_id, date],
        };

        await pool.query(query);
    },
    
    async findLikeCommentById(id){
        const query = {
            text: 'SELECt * FROM like_comments WHERE id=$1',
            values: [id],
        };

        const result = await pool.query(query);

        return result.rows;
    },

    async cleanTable() { 
        await pool.query('DELETE FROM like_comments WHERE 1=1');
    }
}

module.exports = LikeCommentsTableTestHelper;
