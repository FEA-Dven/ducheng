CREATE DATABASE food_program;
USE food_program;
# 用户表
CREATE TABLE t_food_user(
    fid int(11) auto_increment primary key COMMENT '用户id',
    user_name varchar(255) NOT NULL COMMENT '用户昵称',
    password varchar(255) NOT NULL COMMENT '用户密码',
    role TINYINT(2) DEFAULT 0 COMMENT '用户角色(项目关系，没有用关联表)',
    create_time BIGINT(20) DEFAULT 0 NOT NULL COMMENT '创建时间',
    update_time BIGINT(20) DEFAULT 0 NOT NULL COMMENT '修改时间',
    status TINYINT(2) DEFAULT 1 NOT NULL COMMENT '状态 0:删除, 1:正常',
    UNIQUE KEY `uidx_uid_user_name` (`uid`,`user_name`) USING BTREE
)ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COMMENT = 'food 用户表' ;

CREATE TABLE t_food_menu(
    menu_id int(11) auto_increment primary key COMMENT '菜单id',
    menu_name varchar(255) NOT NULL COMMENT '菜单昵称',
    type TINYINT(2) DEFAULT 0 NOT NULL COMMENT '状态 0:每日菜单, 1:常规, 2:明炉烧腊',
    price int(11) NOT NULL COMMENT '价格',
    status TINYINT(2) DEFAULT 1 NOT NULL COMMENT '状态 0:删除, 1:正常',
    create_time BIGINT(20) DEFAULT 0 NOT NULL COMMENT '创建时间',
    update_time BIGINT(20) DEFAULT 0 NOT NULL COMMENT '修改时间',
    UNIQUE KEY `uidx_menu_id_menu_name` (`menu_id`,`menu_name`) USING BTREE,
    UNIQUE KEY `uidx_menu_id_menu_name_type` (`menu_id`,`menu_name`,`type`) USING BTREE
)ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COMMENT = 'food 菜单列表' ;

CREATE TABLE t_food_user_menu_refs(
    id int(11) auto_increment primary key COMMENT '记录id',
    fid int(11) NOT NULL COMMENT '用户id',
    menu_id int(11) NOT NULL COMMENT '菜单id'
    create_time BIGINT(20) DEFAULT 0 NOT NULL COMMENT '创建时间',
    update_time BIGINT(20) DEFAULT 0 NOT NULL COMMENT '修改时间',
    status TINYINT(2) DEFAULT 1 NOT NULL COMMENT '状态 0:删除, 1:正常',
    KEY `idx_fid_menu_id` (`fid`,`menu_id`) USING BTREE,
    KEY `idx_fid_menu_id_status` (`fid`,`menu_id`,`status`) USING BTREE
)ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COMMENT = '用户选择什么菜单' ;

CREATE TABLE t_food_system(
    id int(11) auto_increment primary key COMMENT '系统id',
    order_end TINYINT(2) DEFAULT 0 NOT NULL COMMENT '订单是否截止',
    update_time BIGINT(20) DEFAULT 0 NOT NULL COMMENT '修改时间'
)ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COMMENT = '都城订单系统' ;

CREATE TABLE t_food_comment(
    comment_id int(11) auto_increment primary key COMMENT '评论id',
    fid int(11) NOT NULL COMMENT '用户id',
    content TEXT COMMENT '评论内容',
    star int(11) DEFAULT 0 NOT NULL COMMENT '点赞数',
    create_time BIGINT(20) DEFAULT 0 NOT NULL COMMENT '创建时间',
    update_time BIGINT(20) DEFAULT 0 NOT NULL COMMENT '修改时间'
)ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COMMENT = '都城聊天表' ;

CREATE TABLE t_food_reply(
    reply_id int(11) auto_increment primary key COMMENT '回复id',
    reply_fid int(11) NOT NULL COMMENT '回复用户fid',
    comment_fid int(11) NOT NULL COMMENT '评论用户fid',
    content TEXT COMMENT '回复内容',
    create_time BIGINT(20) DEFAULT 0 NOT NULL COMMENT '创建时间',
    update_time BIGINT(20) DEFAULT 0 NOT NULL COMMENT '修改时间',
    KEY `idx_reply_fid_comment_fid` (`reply_fid`,`comment_fid`) USING BTREE
)ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COMMENT = '都城聊天表' ;


