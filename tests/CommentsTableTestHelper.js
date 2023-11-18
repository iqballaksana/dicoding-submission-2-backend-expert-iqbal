/* instanbul ignore file */
const pool = require('../src/Infrastructures/database/postgres/pool');

const CommentsTableTestHelper = {
    async addComment({
        id = 'comment-test-999',
        thread_id = 'thread-test-999',       
        owner = 'user-123',
        content = 'content test',
        date = new Date(),
        is_deleted = false,
    }){
        const query = {
            text: 'INSERT INTO comments VALUES($1, $2, $3, $4, $5, $6)',
            values: [id, thread_id, owner, content, date, is_deleted],
        };

        await pool.query(query);
    },
    
    async findCommentById(id){
        const query = {
            text: 'SELECt * FROM comments WHERE id=$1',
            values: [id],
        };

        const result = await pool.query(query);

        return result.rows;
    },

    async cleanTable() { 
        await pool.query('DELETE FROM comments WHERE 1=1');
    }
}

module.exports = CommentsTableTestHelper;
