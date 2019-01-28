const commentModel = require('./../model/comment.js');
const userModel = require('./../model/user.js');
const replyModel = require('./../model/reply.js');
const commentStarModel = require('./../model/commentStar.js');
const UTIL = require('./../../util/utils.js');
const foodDefines = require('./../../library/foodDefines.js');
const ApiError = require('./../../library/apiError');
const moment = require('moment');
const REPLY_LIMIT = 4;

module.exports = {
    /**
    * @author dven 
    * @description 发送评论 
    * @param {String} content 内容
    */
    sendComment: async function ({ fid, content }) {
        let time = moment().unix();
        await commentModel.sendComment({
            fid: fid,
            content: content,
            star: 0,
            create_time: time,
            update_time: time
        });

        return {};
    },

    /**
    * @author dven 
    * @description 获取评论列表 
    * @param {Number} per_page 页码限制
    * @param {Number} page_number 页码
    */
    getCommentList: async function({ page_number, per_page }) {
        per_page = parseInt(per_page);
        page_number = parseInt(page_number);
        let offset = per_page * (page_number - 1);
        commentList = await commentModel.getCommentList(per_page, offset);
        let userList = await this._getUserList(commentList);
        commentList.forEach(item => {
            let { user_name } = userList.find(user => user.fid === item.fid);
            item.user_name = user_name;
        });
        commentList = await this._getReplyList(commentList);
        let { total } = await commentModel.getCommentListTotal();
        let has_more = UTIL.getPageHasMore({ per_page, page_number, total });
        let list = commentList;
        return  { list, has_more, total};
    },

    /**
    * @author dven 
    * @description 获取用户列表 
    * @param {Array} commentList 评论列表
    */
    _getUserList: async function(commentList) {
        let user_ids = [];
        commentList.forEach(item => {
            user_ids.push(item.fid);
        });
        let userList = await userModel.findUserList(user_ids);
        return userList;
    },

    /**
    * @author dven 
    * @description 获取评论里面的回复列表 
    * @param {Array} commentList 评论列表
    */
    _getReplyList: async function(commentList) {
        let commentIds = [];
        commentList.forEach(item => {
            commentIds.push(item.comment_id);
            item.reply_list = [];
        });
        let list = await replyModel.getReplyListByIds(commentIds);
        list = await this._getUserName(list);
        if (list.length > 0) {
            commentList.forEach(comment => {
                list.forEach(item => {
                    if (comment.fid === item.comment_fid) {
                        delete item.comment_fid;
                        comment.reply_list.push(item);
                    }
                })
            });
        }
        return commentList;
    },

    /**
    * @author dven 
    * @description 用户点赞 
    * @param {Number} comment_fid
    * @param {Number} comment_id
    */
    starComment: async function({ fid, comment_id, comment_fid }){
        let starInfo = await commentStarModel.getUserStarInfo({fid, comment_id, comment_fid});
        if (starInfo) {
            throw new ApiError('food.userHasStared');
        }
        await commentStarModel.addUserStarRecord({ fid, comment_id, comment_fid });
        await commentModel.userStar({ fid, comment_id, comment_fid });
        return {};
    },

    /**
    * @author dven 
    * @description 回复用户评论 
    * @param {Number} comment_fid 评论主id
    * @param {Number} fid 用户id
    * @param {String} content 回复的内容
    * @param {Number} comment_id 评论id
    */
    replyComment: async function({comment_fid, fid, content, comment_id}) {
        if (comment_fid === fid) {
            throw new ApiError('food.canNotReplySelf');
        }
        let replyList = await replyModel.getReplyListByCommentId({comment_id, comment_fid});
        if (replyList.length > REPLY_LIMIT) {
            throw new ApiError('food.overReplyLimit', REPLY_LIMIT);
        }
        await replyModel.addReplyRecord({ comment_fid, fid, content, comment_id });
        return {};
    },

    /**
    * @author dven 
    * @description 获取回复用户的名字
    * @param {Array} list 需要获取用户名的列表
    */
    _getUserName: async function(list){
        let user_ids = [];
        list.forEach(item => {
            user_ids.push(item.reply_fid);
        });
        let userList = await userModel.findUserList(user_ids);
        list.forEach(item => {
            userList.forEach(user => {
                if (item.reply_fid === user.fid) {
                    item.user_name = user.user_name;
                }
            })
        });
        return list;
    },

    /**
    * @author dven 
    * @description 删除用户评论 
    * @param {Number} comment_id 评论id
    */
    deleteComment: async function({ comment_id, comment_fid }){
        await commentModel.deleteComment(comment_id);
        await replyModel.deleteComment(comment_id);

        return {};
    }
}