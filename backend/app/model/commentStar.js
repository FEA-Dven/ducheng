const db = require('./../../library/db.js');
const TABLE = 't_food_comment_star_refs';
const moment = require('moment');

module.exports = {
    /**
    * @author dven 
    * @description 获取用户点赞信息 
    * @param {Number} comment_id 评论id
    * @param {Number} comment_fid 评论主id
    * @param {Number} fid 点赞用户的id
    */
    getUserStarInfo: async function ({ comment_id, comment_fid, fid }) {
        let res = await db.readMysql.select(
            'id'
        ).where({
            'comment_id': comment_id,
            'comment_fid': comment_fid,
            'star_fid': fid
        }).from(TABLE)
            .first();

        return res;
    },


    /**
    * @author dven 
    * @description 增加用户点赞记录 
    * @param {Number} comment_id 评论id
    * @param {Number} comment_fid 评论主id
    * @param {Number} fid 点赞用户的id
    */
    addUserStarRecord: async function ({ comment_id, comment_fid, fid }) {
        let time = moment().unix();
        let res = await db.writeMysql.insert({
            comment_fid: comment_fid,
            comment_id: comment_id,
            star_fid: fid,
            create_time: time,
            update_time: time
        }).from(TABLE)
            .returning('id');

        return res;
    }
}
