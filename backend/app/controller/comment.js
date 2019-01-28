const commenValidation = require('./../validation/comment.js');
const response = require('../../util/response.js');
const validator = require('../../util/requestValidator.js');
const commentService = require('./../service/comment.js');

module.exports = {
    /**
    * @author dven 
    * @description 发送评论
    */
    sendComment: async function(ctx, next) {
        await validator.validate(
            ctx.input,
            commenValidation.sendComment.schema,
            commenValidation.sendComment.options
        )
        let res = await commentService.sendComment({
            ...ctx.input,
            ...ctx.headerInput
        });

        return response.map(ctx, res);
    },

    /**
    * @author dven 
    * @description 回复用户评论
    */
    replyComment: async function(ctx, next) {
        let validateObj = {
            ...ctx.headerInput,
            ...ctx.input,
            ...ctx.params
        };
        await validator.validate(
            validateObj,
            commenValidation.replyComment.schema,
            commenValidation.replyComment.options
        )
        let res = await commentService.replyComment(validateObj);

        return response.map(ctx, res);
    },

    /**
    * @author dven 
    * @description 点赞用户评论 
    */
    starComment: async function(ctx, next) {
        await validator.validate(
            ctx.params,
            commenValidation.starComment.schema,
            commenValidation.starComment.options
        )
        let obj = {
            ...ctx.params,
            ...ctx.headerInput
        };
        let res = await commentService.starComment(obj);

        return response.map(ctx, res);
    },

    /**
    * @author dven 
    * @description 获取评论列表 
    */
    getCommentList: async function(ctx, next) {
        await validator.validate(
            ctx.input,
            commenValidation.getCommentList.schema,
            commenValidation.getCommentList.options
        )
        let res = await commentService.getCommentList(ctx.input);

        return response.map(ctx, res);
    },

    /**
    * @author dven 
    * @description 删除评论 
    */
    deleteComment: async function(ctx, next) {
        await validator.validate(
            ctx.params,
            commenValidation.deleteComment.schema,
            commenValidation.deleteComment.options
        )
        let res = await commentService.deleteComment(ctx.params);

        return response.map(ctx, res);
    }
}