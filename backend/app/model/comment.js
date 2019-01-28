const db = require('./../../library/db.js');
const TABLE = 't_food_comment';
const moment = require('moment');

module.exports = {
    /**
    * @author dven 
    * @description 发送评论 
    * @param {Object} data 插入数据
    */
    sendComment: async function (data) {
        let res = await db.writeMysql(TABLE).insert(data);
        return res;
    },

    /**
    * @author dven 
    * @description 获取评论列表 
    * @param {Number} per_page 页码限制
    * @param {Number} offset 偏移量
    */
    getCommentList: async function (per_page, offset) {
        let res = await db.readMysql.select(
            'comment_id',
            'fid',
            'content',
            'star'
        )
            .orderBy('create_time', 'desc')
            .limit(per_page)
            .offset(offset)
            .from(TABLE);

        return res;
    },

    /**
    * @author dven 
    * @description 获取评论列表总数
    */
    getCommentListTotal: async function () {
        let res = await db.readMysql.count('comment_id as total')
            .first()
            .from(TABLE);

        return res;
    },

    /**
    * @author dven 
    * @description 用户点赞,star数加一 
    * @param {Number} comment_id 评论id
    * @param {Number} comment_fid 评论主id
    * @param {Number} fid 点赞用户的id
    */
    userStar: async function({ comment_id, comment_fid}) {
        let time = moment().unix();
        let res = await db.writeMysql.where({
            fid: comment_fid,
            comment_id: comment_id
        })
        .update({ update_time: time })
        .increment('star', 1)
        .from(TABLE);

        return res;
    },

    /**
    * @author dven 
    * @description 删除评论 
    * @param {Number} comment_id
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
