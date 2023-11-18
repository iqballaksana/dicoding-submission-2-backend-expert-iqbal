const AddCommentLike = require('../../Domains/likes/entities/AddCommentLike');

class LikeOrUnlikeUseCase {
  constructor({likeRepository, commentRepository}) {
    this._likeRepository = likeRepository;
    this._commentRepository = commentRepository;
  }

  async execute(payload) {
    const useCasePayload = new AddCommentLike(payload);
    await this._commentRepository.verifyAvailableCommentInThread(
        useCasePayload.commentId,
        useCasePayload.threadId,
    );
    const isExist = await this._likeRepository
        .verifyAvailableCommentLike(useCasePayload);

    if (isExist) {
      return await this._likeRepository.unlikeComment(useCasePayload);
    }

    return await this._likeRepository.likeComment(useCasePayload);
  }
}

module.exports = LikeOrUnlikeUseCase;