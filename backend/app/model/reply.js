const db = require('./../../library/db.js');
const TABLE = 't_food_reply';
const moment = require('moment');

module.exports = {
    /**
    * @author dven 
    * @description 发送评论 
    * @param {Number} comment_fid 评论用户id
    * @param {Number} comment_id 评论id
    */
    getReplyListByCommentId: async function ({ comment_fid, comment_id }){
        let res = await db.readMysql.select(
            'reply_id',
            'comment_id',
            'reply_fid',
            'comment_fid',
            'content'
        )
        .where({
            'comment_fid': comment_fid,
            'comment_id': comment_id
        })
        .from(TABLE);

        return res;
    },

    /**
    * @author dven 
    * @description 增加回复记录 
    * @param {Number} comment_fid 评论用户id
    * @param {Number} comment_id 评论id
    * @param {Number} fid 回复的用户
    * @param {String} content 回复的内容
    */
    addReplyRecord: async function({ comment_fid, comment_id, fid, content }){
        let time = moment().unix();
        let res = await db.writeMysql.insert({
            comment_id: comment_id,
            comment_fid: comment_fid,
            reply_fid: fid,
            content: content,
            create_time: time,
            update_time: time
        })
        .from(TABLE)

        return res;
    },

    /**
    * @author dven 
    * @description 获取ids回复列表 
    * @param {Array} comment_ids 评论id数组
    */
    getReplyListByIds: async function(comment_ids) {
        let res = await db.readMysql.select(
            'reply_id',
            'comment_id',
            'reply_fid',
            'comment_fid',
            'content'
        )
        .whereIn('comment_id', comment_ids)
        .from(TABLE)

        return res;
    },

    /**
    * @author dven 
    * @description 删除评论 
    * @param {Number} comment_id 评论id
    */
    deleteComment: async function(comment_id) {
        let res = await db.writeMysql.where({
            'comment_id': comment_id
        })
        .del()
        .from(TABLE)

        return res;
    }
}
