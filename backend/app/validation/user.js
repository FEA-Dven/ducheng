/**
 * Created by Jerson on 2018/8/3
 */
const Joi = require('joi');

module.exports = {
    login: {
        schema: Joi.object({
            account: Joi.string().min(1).max(20).required(),
            password: Joi.string().min(1).max(20).required()
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
    },

    register: {
        schema: Joi.object({
            user_name: Joi.string().min(1).max(20).required(),
            password: Joi.string().min(1).max(20).required(),
            account: Joi.string().min(1).max(20).required()
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
    },

    resetPassword: {
        schema: Joi.object({
            account: Joi.string().min(1).max(20).required(),
            password: Joi.string().min(1).max(20).required()
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
    },

    getUserInfo: {
        schema: Joi.object({
            fid: Joi.string().min(1).required()
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
    },

    checkHeader: {
        schema: Joi.object({
            fid: Joi.number().positive().required().error(new Error('用户 uid 不能为空且必须是正数')),
            token: Joi.string().required().error(new Error('token 不能为空'))
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