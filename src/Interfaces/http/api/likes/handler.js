const autoBind = require('auto-bind');
const LikeOrUnlikeUseCase = require('../../../../Applications/use_case/LikeOrUnlikeUseCase');

class LikesHandler {
    constructor(container) {
        this._container = container;
        autoBind(this);
    }

    async putCommentLikeHandler(request) {
        const {threadId, commentId} = request.params;
        const payload = {
            userId: request.auth.credentials.id,
            commentId,
            threadId,
        };

        const likeOrUnlikeUseCase = this._container.getInstance(LikeOrUnlikeUseCase.name);

        await likeOrUnlikeUseCase.execute(payload);

        return {
            status: 'success'
        };
    }
}

module.exports = LikesHandler;