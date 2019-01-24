import React from 'react';
import { Comment, Avatar, Form, Button, List, Input, Tooltip, Icon } from 'antd';
import moment from 'moment';
import { connect } from 'react-redux';
import * as UTIL from '@libs/util';
import * as API from '@api/index';
import './chat.less';
const TextArea = Input.TextArea;



// 回复评论模型
const ReplyList = ({ author, content, datetime, key }) => (<Comment
        className='reply-list'
        author={<span className='white-font'>{author}</span>}
        content={(
        <p className='white-font'>{content}</p>
        )}
        datetime={ datetime }
        key={key}
>
</Comment>)

// 回复总列表
const ReplyTotalList = ({ list }) => list.map(item => {
    return ReplyList({
        author: item.user_name, 
        content: item.content,
        time: item.time,
        key: item.reply_id
    })
})

// 主聊天模型
const mainContent = ({ author, content, datetime, key, actions, list }) => (
<Comment
        className='main-list'
        key={key}
        actions={actions}
        author={<span className='white-font'>{author}</span>}
        content={(
        <p className='white-font'>{content}</p>
        )}
        datetime={(
        <Tooltip title={moment().format('YYYY-MM-DD HH:mm:ss')}>
            <span>{datetime}</span>
        </Tooltip>
        )}
>
   {ReplyTotalList({ list })}
</Comment>)




class Chat extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            likes: 0,
            dislikes: 0,
            action: null,
        }
    }

    componentDidMount = () => {
       
    }

    /**
    * @author dven 
    * @description 用户点赞 
    * @param {Number} comment_id 评论id
    * @param {Number} uid 用户id
    */
    userLike = (e) => {
        e.persist()
        let uid = e.target.dataset.uid;
        let comment_id = e.target.dataset.commentid;
    }

    render() {
        const { likes, action } = this.state;
        let mainCommentList = [
            {
                comment_id: 1,
                uid: 3,
                user_name: 'dven',
                content: '这是发起人主题',
                like: 2,
                time: moment().unix(),
                reply_list: [
                    {
                        reply_id: 1,
                        uid: 1,
                        user_name: '小红',
                        content: 'hello',
                        time: moment().unix()
                    },
                    {
                        reply_id: 2,
                        uid: 2,
                        user_name: '小明',
                        content: 'hello_dj',
                        time: moment().unix()
                    }
                ]
            },
            {
                comment_id: 2,
                uid: 4,
                user_name: 'baby',
                content: '这是发起人主题1',
                like: 10,
                time: moment().unix(),
                reply_list: [
                    {
                        reply_id: 1,
                        uid: 1,
                        user_name: '小红',
                        content: 'hello',
                        time: moment().unix()
                    },
                    {
                        reply_id: 2,
                        uid: 2,
                        user_name: '小明',
                        content: 'hello_dj',
                        time: moment().unix()
                    }
                ]
            }
        ];
        const actions = (likes, comment_id, uid) => {
            return [
                <span>
                  <Tooltip title="Like">
                    <Button ghost={true} icon="like" className='white-font none-border' onClick={this.userLike} data-commentid={comment_id} data-uid={uid}/>
                  </Tooltip>
                  <span style={{ cursor: 'auto', color: 'white' }}>
                    {likes}
                  </span>
                </span>,
                <span style={{ color: 'white' }}>回复</span>
            ];
        }
        
        let contentList = mainCommentList.map(item => {
            return mainContent({
                author: item.user_name, 
                content: item.content, 
                time: item.time,
                key: item.comment_id, 
                actions: actions(item.like, item.comment_id, item.uid), 
                list: item.reply_list
            })
        });
        let { nickname } = this.props; 
        
        return (
            <div className='bg'>
                <div className='bgmask'></div>
                <div className='chat-title'>优化需求</div>
                <div className="comment-list">
                    {contentList}
                </div>
            </div>
        );
    }
};

const mapStateToProps = (state, ownProps) => ({
    nickname: state.userReducer.nickname
})

const mapDispatchToProps = {
    
};

export default connect(mapStateToProps, mapDispatchToProps)(Chat);