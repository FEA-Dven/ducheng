import React from 'react';
import { Comment, Form, Button, Input, Tooltip, message, Pagination  } from 'antd';
import moment from 'moment';
import { connect } from 'react-redux';
import * as UTIL from '@libs/util';
import * as API from '@api/index';
import './chat.less';
const TextArea = Input.TextArea;



// 回复评论模型
const ReplyList = ({ author, content, datetime, key }) => (<Comment
    className='reply-list'
    author={<span className='white-font'>@{author} 回复:</span>}
    content={(
        <p className='white-font'>{content}</p>
    )}
    datetime={datetime}
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
const mainContent = ({ author, content, datetime, key, actions, list, showReplyList }) => (
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
        {showReplyList ? ReplyTotalList({ list }) : ''}
    </Comment>)




class Chat extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            likes: 0,
            dislikes: 0,
            action: null,
            commentValue: '',
            // 评论人的名字
            masterName: '', 
            // 评论人id
            comment_fid: '',
            isReply: false,
            // 显示聊天弹窗
            showLaunchCommentModal: false,
            per_page: 10,
            page_number: 1,
            mainCommentList: [],
            total: 0,
            // 是否超级管理员
            isSuper: false
        }
    }

    componentDidMount = () => {
        this.renderPage();
        
    }

    /**
    * @author dven 
    * @description 获取评论列表 
    */
    renderPage = async () => {
        let { per_page, page_number } = this.state;
        // 获取评论列表和获取是否超级管理员
        let [commentRes, userInfo] = await Promise.all([
            API.getCommentList({
                per_page,
                page_number
            }),
            API.getUserInfo()
        ]);
        if (commentRes.list) {
            commentRes.list.forEach(item => {
                item.showReplyList = false;
            });
            this.setState({
                mainCommentList: commentRes.list,
                total: commentRes.total
            })
        }
        if (userInfo && userInfo.role === 1) {
            this.setState({
                isSuper: true
            })
        }
    }

    /**
    * @author dven 
    * @description 更改textAreaInput 
    * @param {Object} e
    */
    textAreaInput = (e) => {
        e.persist();
        let val = e.target.value;
        this.setState({
            commentValue: val
        });
    }

    /**
    * @author dven 
    * @description 用户提交评论 
    * @param {Object} e 提交的评论对象 
    */
    userSubmitComment = async (e) => {
        e.persist();
        let { isReply, comment_fid, commentValue, replyCommentId } = this.state;
        let res;
        if (isReply) {
            res = await API.replyUserComment({
                comment_fid: comment_fid,
                comment_id: replyCommentId,
                content: commentValue
            });
        } else {
            res = await API.sendComment({
                content: commentValue
            });
        }
        if (res) {
            message.success('操作成功');
            this.setState({
                showLaunchCommentModal: false
            }, () => {
                this.renderPage();
            });
        }
    }

    /**
    * @author dven 
    * @description 用户点赞 
    * @param {Number} comment_id 评论id
    * @param {Number} fid 用户id
    */
    userLike = async (e) => {
        e.persist()
        let fid = e.target.dataset.fid;
        let comment_id = e.target.dataset.commentid;
        let res = await API.userStar({
            comment_fid: fid, 
            comment_id: comment_id
        })
        if (res) {
            let { mainCommentList } = this.state;
            let comment = mainCommentList.find(comment => comment.comment_id === parseInt(comment_id));
            comment.star = comment.star + 1;
            this.setState({
                mainCommentList
            }, () => {
                message.success('操作成功');
            });
        }
    }

    /**
    * @author dven 
    * @description 关闭评论弹窗 
    */
    closeCommentModal = () => {
        this.setState({
            showLaunchCommentModal: false
        });
    }

    /**
    * @author dven 
    * @description 显示聊天信息 
    */
    showCommentModal = () => {
        this.setState({
            showLaunchCommentModal: true,
            isReply: false,
            commentValue: ''
        })
    }

    /**
    * @author dven 
    * @description 回答用户 
    */
    replyUser = (e) => {
        let fid = e.currentTarget.dataset.fid;
        let username = e.currentTarget.dataset.username;
        let comment_id = e.currentTarget.dataset.commentid;
        let { mainCommentList } = this.state;
        let comment = mainCommentList.find(comment => comment.comment_id === parseInt(comment_id));
        comment.showReplyList = true;
        this.setState({
            showLaunchCommentModal: true,
            isReply: true,
            masterName: username,
            comment_fid: fid,
            replyCommentId: comment_id,
            mainCommentList,
            commentValue: ''
        });
    }

    /**
    * @author dven 
    * @description 返回首页 
    */
    backToIndex = () => {
        this.props.history.goBack();
    }

    /**
    * @author dven 
    * @description 展开评论 
    */
    toggleReplyListByBtn = (e) => {
        e.persist();
        let { mainCommentList } = this.state;
        let commentid = e.currentTarget.dataset.commentid;
        let comment = mainCommentList.find(comment => comment.comment_id === parseInt(commentid));
        comment.showReplyList = !comment.showReplyList;
        this.setState({
            mainCommentList
        })
    }

    /**
    * @author dven 
    * @description 评论分页 
    */
    changeCommentPage = (e) => {
        this.setState({
            page_number: e
        }, () => {
            this.renderPage();
        })
    }

    /**
    * @author dven 
    * @description 删除评论 
    */
    deleteComment = async (e) => {
        let comment_id = e.currentTarget.dataset.commentid;
        comment_id = parseInt(comment_id);
        let res = await API.deleteComment({
            comment_id
        });
        res && message.success('删除评论成功') && this.renderPage();
    } 

    render() {
        const { mainCommentList, commentValue, isReply, masterName, showLaunchCommentModal, per_page, total, isSuper } = this.state;
        const actions = (reply_list, showReplyList, star, comment_id, fid, user_name) => {
            return [
                <div>
                    <span>
                        <Tooltip title="Like">
                            <Button ghost={true} icon="like" className='white-font none-border' onClick={this.userLike} data-commentid={comment_id} data-fid={fid} />
                        </Tooltip>
                        <span style={{ cursor: 'auto', color: 'white' }}>
                            {star}
                        </span>
                    </span>,
                    <span style={{ color: 'white', cursor:'pointer' }} onClick={this.replyUser} data-fid={fid} data-username={user_name} data-commentid={comment_id}>回复</span>
                    <span data-commentid={comment_id} onClick={this.toggleReplyListByBtn} style={{ cursor:'pointer', color: 'white', marginLeft: '10px' }}>{ showReplyList ? '收起评论' : `${reply_list.length > 0 ? '展开评论 (' + reply_list.length + ')' : ''}` }</span>
                    { isSuper ? <Button className='deletebtn' onClick={this.deleteComment} data-commentid={comment_id} icon='close' ghost={true}/> : '' }
                </div>
            ];
        }
        let contentList = mainCommentList && mainCommentList.map(item => {
            return mainContent({
                author: item.user_name,
                content: item.content,
                time: item.time,
                key: item.comment_id,
                actions: actions(item.reply_list, item.showReplyList, item.star, item.comment_id, item.fid, item.user_name),
                list: item.reply_list,
                showReplyList: item.showReplyList
            })
        });
        return (
            <div className='bg'>
                <div className='bgmask'></div>
                <Button icon='rollback' ghost={true} className='back' onClick={this.backToIndex}></Button>
                <div className='chat-title' >都城圈</div>
                <Button type='primary' className='launch-btn' onClick={this.showCommentModal}>提交需求</Button>
                <div className="comment-list">
                    {contentList}
                    { contentList.length > 0 ? <Pagination style={{ float:'left', marginTop: '20px' }} defaultCurrent={1} total={total} pageSize={per_page} onChange={this.changeCommentPage}/> : '' }
                </div>
                { showLaunchCommentModal ? <div className='editor'>
                    <div className='reply-title'>{isReply ? `回复${masterName}的需求` : '提出话题'}</div>
                    <Form.Item>
                        <Input  style={{ marginTop: '0px' }} placeholder='请开始你的表演...' autosize={{ minRows: 4, maxRows: 4 }} onChange={this.textAreaInput} value={commentValue} />
                    </Form.Item>
                    <Form.Item>
                        <Button
                            htmlType="submit"
                            onClick={this.userSubmitComment}
                            type="primary"
                            style={{ marginLeft: '20px'}}
                        > 发送</Button>
                        <Button htmlType="submit" onClick={this.closeCommentModal} type="primary" style={{ marginLeft: '20px'}}>取消</Button>
                    </Form.Item>
                </div> : '' }
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