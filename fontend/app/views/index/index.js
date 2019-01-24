import React from 'react';
import FoodList from '@component/foodlist/foodlist';
import { Input, List, Checkbox, Switch, Button, message } from 'antd';
import { connect } from 'react-redux';
import { logOut } from '@store/reducer/user';
import menu from '@assets/images/menu.png';
import payCode from '@assets/images/pay_code.jpg';
import * as API from '@api/index';
import './index.less';

class Index extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            search_key: '',
            showMenu: false,
            orderNum: 0,
            foodNum: 0,
            selectFoodList: [],
            contentList: [],
            order_end: false,
            has_order: false,
            showPayCode: false,
            isSuper: false
        }
    }

    componentDidMount = async () => {
        let order_end = false;
        let systemInfo = await API.getSystemInfo();
        order_end = systemInfo.order_end;
        order_end === 1 ? order_end = true : order_end = false;
        this.setState({
            order_end
        }, ()=> {
            this.renderPage();
        });
    }

    /**
    * @author dven 
    * @description 刷新页面，统一更新状态 
    * @param
    */
    renderPage = async () => {
        let [ userOrderListInfo, userOrderStatus, userInfo ] = await Promise.all([
            API.getUserOrderList(),
            API.getUserOrderStatus(),
            API.getUserInfo()
        ]);
        this.setState({
            selectFoodList: userOrderListInfo.menuList,
            contentList: userOrderListInfo.recordList,
            orderNum: userOrderListInfo.order_num,
            has_order: userOrderStatus.has_order,
            isSuper: userInfo.super === 1
        });
    }

    /**
    * @author dven
    * @description 获取列表
    * @param {Object} e	输入框输入事件
    */
    searchFood = (e) =>{
        e.persist();
        this.setState({
            search_key: e.target.value
        })
    }

    /**
    * @author dven
    * @description 查看菜单图片
    */
    watchMenuList = () => {
        this.setState({
            showMenu: true
        });
    }

    /**
    * @author dven
    * @description 关闭菜单蒙层
    */
    closeMenuMask = () =>{
        this.setState({
            showMenu: false
        });
    }

    /**
    * @author dven
    * @description 关闭菜单蒙层
    */
    goToWebsite = () => {
        window.open('http://www.dcyz.com/', '_blank');
    }

    /**
    * @author dven 
    * @description 改变开关 
    */
    changeSystemOpen = async (e) => {
        this.setState({
            order_end: e
        }, async () => {
            let is_open = e ? 1 : 0;
            await API.changeSystemOpen({
                is_open
            })
        });
    }

    /**
    * @author dven 
    * @description 取消订餐
    */
    resetUserOrder = async () => {
        await API.resetUserOrder();
        this.renderPage();
    }

    /**
    * @author dven 
    * @description 显示微信收款码 
    */
    showWxPayCode = () => {
        this.setState({
            showPayCode: true
        });
    }

    /**
    * @author dven 
    * @description 关闭支付二维码 
    */
    closePayCode = () =>{
        this.setState({
            showPayCode: false
        });
    }
    
    /**
    * @author dven 
    * @description 去聊天 
    */
    goToChat = () => {
        message.error('暂未开放');
        return;
        this.props.history.push('/food/chat');
    }

    /**
    * @author dven 
    * @description 用户请求订单，这里需要调用子组件的方法 
    */
    userOrder = () => {
        //调用组件进行通信
        this.refs.cfoodlist.showOrderModal();
    }

    render() {
        let { nickname } = this.props; 
        let { search_key, showMenu, orderNum, selectFoodList, contentList, has_order, showPayCode, isSuper } = this.state;
        let menuArea = <div onClick={this.closeMenuMask}>
            <div className='menu-area-mask'></div>
            <div className='menu-area'>
                <img src={menu} />
            </div>
        </div>
        let payArea = <div onClick={this.closePayCode}>
            <div className='menu-area-mask'></div>
            <div className='paycode-area'>
                <img src={payCode} />
            </div>
        </div>
        // 用户菜单列表模型
        const UserMenuList = ({menulist}) => {
            let list = [];
            list = menulist.map((item, index) => {
                return (
                    <div key={index}>
                        <div style={{ float:'left', width:'auto', color:'red' }}>{item.num}份</div>
                        <div style={{ float:'left', width:'auto' }} className='colorfont'>{item.menu_name}</div>
                    </div>
                )
            });
            return list;
        }
        // 用户列表模型
        let userOrderList = contentList && contentList.map((item, index) => {
            return (
                <div key={index} className='userlist'><div style={{ float:'left' }}><span className='colorfont'>{item.user_name}</span>点了</div><UserMenuList menulist={item.menu_list} /><div style={{ float:'left' }}>需付<span style={{ color:'red' }}>{item.price}</span>元</div></div>
            )
        })
        return (
            <div className='bg'>
                <div className='bgmask'></div>
                {showMenu ? menuArea : ''}
                { showPayCode ? payArea : '' }
                <div className='head'>
                    <div className='title'>都城快餐</div>
                    <div className='welcome-name'>欢迎您，{nickname}</div>
                    <div className='logout' onClick={this.props.logOut}>退出登录</div>
                    {isSuper ? <Switch checked={this.state.order_end} className='switch' checkedChildren="关" unCheckedChildren="开" onChange={this.changeSystemOpen} /> : ''}
                    <div className='chat' onClick={this.goToChat}>提交需求</div>
                    <div className='wxcode' onClick={this.showWxPayCode}>支付二维码</div>
                    <div className='official-website' onClick={this.goToWebsite}>去官网</div>
                    <div className='watchmenulist' onClick={this.watchMenuList}>查看菜单</div>
                </div>
                <div className='left-area'>
                    <Input placeholder='搜索你需要的快餐' className='search' onChange={this.searchFood}/>
                    <div className='special-area'>
                        { has_order ? <Button type='danger' size='small' onClick={this.resetUserOrder}>取消订餐</Button> : <Button type='primary' size='small' onClick={this.userOrder}>确认订单</Button>} 
                    </div>
                    <FoodList ref='cfoodlist' {...this.props} searchKey={search_key} has_order={has_order} renderPage={this.renderPage}/>
                </div>
                <div className='right-area'>
                    <div className='tips'>
                        <div className='item'>点餐份数:<span className='colorfont'>{orderNum}</span></div>
                    </div>
                    <List
                        className='select-menu-list'
                        size='small'
                        bordered
                        dataSource={selectFoodList}
                        renderItem={item => (<List.Item className='select-list-item'>{item.menu_name} * {item.order_num}</List.Item>)}
                    />
                    <div className='user-order-list'>
                        {userOrderList}
                    </div>
                </div>
            </div>
        );
    }
};

const mapStateToProps = (state, ownProps) => ({
    nickname: state.userReducer.nickname
})

const mapDispatchToProps = {
    logOut: logOut
};

export default connect(mapStateToProps, mapDispatchToProps)(Index);