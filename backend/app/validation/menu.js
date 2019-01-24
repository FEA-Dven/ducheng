/**
 * Created by Jerson on 2018/8/3
 */
const Joi = require('joi');

module.exports = {
    menuList: {
        schema: Joi.object({
            fid: Joi.string().min(1).required(),
            per_page: Joi.string().min(1).required(),
            page_number: Joi.string().min(1).required()
        }),
        options: {
            //允许存在不在 schema 中的字段
            allowUnknown: true,
            //过滤不存在 schema 中的字段
            stripUnknown: true,
            //替换提示文本
            language: {
                any: {
                    required: '是必填项',
                },
                number: {
                    min: '需大于或等于 {{limit}}',
                    max: '需小于或等于 {{limit}}',
                    positive: '必须是一个正数',
                    less: '必须小于 {{limit}}',
                    greater: '必须大于 {{limit}}'
                }
            }
        }
    }
}