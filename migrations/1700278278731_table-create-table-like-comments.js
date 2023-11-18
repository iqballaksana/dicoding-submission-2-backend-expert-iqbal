exports.up = (pgm) => {
    pgm.createTable('like_comments', {
        id: {
            type: 'VARCHAR(50)',
            primaryKey: true,
        },
        comment_id: {
            type: 'VARCHAR(50)',
            notNUll: true,
            references: 'comments(id)',
            onDelete: 'CASCADE',
        },
        user_id: {
            type: 'VARCHAR(50)',
            notNull: true,
            references: 'users(id)',
            onDelete: 'CASCADE'
        },       
        date: {
            type: 'TIMESTAMP',
            notNull: true,
            default: 'NOW()',
        },      
    });
};

exports.down = (pgm) => {
    pgm.dropTable('like_comments');
};
