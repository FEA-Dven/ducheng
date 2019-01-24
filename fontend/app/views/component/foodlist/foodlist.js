import React from 'react'
import * as UTIL from '@libs/util';
import * as API from '@api/index';
import { Radio, Modal, Button, message } from 'antd';
const RadioGroup = Radio.Group;
import './foodlist.less';



class FoodList extends React.Component {
    state = {
        foodList: [],
        foodListSrc: [],
        selectFood: '',
        searchKey: '',
        isSearch: false,
        has_order: false,
        content: '',
        modalVisible: false,
        cacheMenuList: []
    }

    componentWillMount() {
    }

    componentDidMount(){
        this.getFoodList();
    }

    /**
    * @author dven
    * @description 获取食物列表
    */
    getFoodList = async () => {
        let res = await API.getFoodList({
            per_page: 50,
            page_number: 1
        });
        if (!res) return;
        let foodData = {
            daliy: [],
            hotfood: [],
            fire: []
        }
        let foodList = res.list;
        foodList.forEach(item => {
            item.value = item.menu_id;
            item.label = item.menu_name;
            if (item.type === 0) {
                foodData.daliy.push(item);
            }
            if (item.type === 1) {
                foodData.hotfood.push(item);
            }
            if (item.type === 2) {
                foodData.fire.push(item);
            }
        });
        let allFoodList = [...foodData.daliy, ...foodData.hotfood, ...foodData.fire];
        this.setState({
            foodList: foodData,
            foodListSrc: foodData,
            allFoodList: allFoodList
        })
    }

    /**
    * @author dven
    * @description 更改食物选择
    */
    onChange = (e) => {
        let menu_id = e.target.value;
        let food = this.state.allFoodList.find(item => item.value === menu_id);
        this.setState({
            selectFood: menu_id,
            modalVisible: true,
            content: `是否选择${food.label}${this.state.soup ? '且加汤' : ''}`,
        });
    }

    /**
    * @author dven 
    * @description 用户点餐 
    */
    userSelectAndOrder = async(menu_id) => {
        
    }

    /**
    * @author dven 
    * @description 用户取消点餐 
    */
    userCancelOrder = () => {
        this.setState({
            selectFood: 0,
            modalVisible: false
        })
    }

    componentWillReceiveProps = (newProps) => {
        let isSearch = false;
        if (newProps.searchKey !== '') {
            isSearch = true
        }
        this.setState({
            searchKey: newProps.searchKey,
            isSearch,
            has_order: newProps.has_order
        }, () => {
            if (isSearch) {
                this.filterFoodList();
                return
            }
            this.getFoodList();
        })
    }

    /**
    * @author dven
    * @description 过滤食物列表
    */
    filterFoodList = () => {
        let { searchKey, foodListSrc, allFoodList } = this.state;
        let foodList = [];
        for (let i =  0; i < allFoodList.length; i++) {
            let food = allFoodList[i];
            if (food.label.indexOf(searchKey) >= 0) {
                foodList.push(food);
            }
        }
        this.setState({
            foodList
        });
    }

    /**
    * @author dven 
    * @description 添加新的菜单 
    */
    addMenu = (e) => {
        let { cacheMenuList, allFoodList } = this.state; 
        let menu_id = parseInt(e.target.dataset.menuid);
        let menu = allFoodList.find(item => item.menu_id === menu_id);
        let cacheMenu = cacheMenuList.find(item => item.menu_id === menu.menu_id);
        if (!cacheMenu) {
            cacheMenu = {
                ...menu,
                num: 1
            };
            cacheMenuList.push(cacheMenu);
        } else {
            cacheMenu.num++;
        }
        this.setState({
            cacheMenuList
        });
    }

    /**
    * @author dven 
    * @description 减少缓存的菜单 
    */
    reduceMenu = (e) => {
        let { cacheMenuList } = this.state; 
        let menu_id = parseInt(e.target.dataset.menuid);
        for (let i = 0; i < cacheMenuList.length; i++) {
            let cacheMenu = cacheMenuList[i];
            if (menu_id === cacheMenu.menu_id) {
                if (cacheMenu.num === 1) {
                    cacheMenuList.splice(i, 1);
                } else {
                    cacheMenu.num--;
                }
                break;
            }
        }
        this.setState({
            cacheMenuList
        });
    }

    /**
    * @author dven 
    * @description 用户确认订单前弹窗提示 
    */
    showOrderModal = () => {
        let { cacheMenuList } = this.state;
        if (cacheMenuList.length === 0) {
            message.info('您还没有选择菜单');
            return;
        }
        let content = '您选择了';
        let totalPrice = 0;
        cacheMenuList.forEach((item, index) => {
            index === cacheMenuList.length ? content += `${item.num}份${item.menu_name}` : content += `${item.num}份${item.menu_name},`;
            totalPrice += item.num * item.price;
        });
        content += `总共花费${totalPrice}元`;
        this.setState({
            modalVisible: true,
            content: content
        })
    }

    /**
    * @author dven 
    * @description 用户取消订单 
    */
    userCancelOrder = () => {
        this.setState({
            modalVisible: false
        })
    }

    /**
    * @author dven 
    * @description  用户下单
    */
    userOrder = async () => {
        let { cacheMenuList } = this.state;
        let orderList = [];
        cacheMenuList.forEach(item => {
            let obj = {
                menu_id: item.menu_id,
                num: item.num
            };
            orderList.push(obj);
        })
        let res = await API.userOrder({
            orderList
        })
        this.props.renderPage();
        this.setState({
            modalVisible: false
        })
    }

    render() {
        let { foodList, isSearch, has_order, content, modalVisible, selectFood, cacheMenuList } = this.state;
        // 操作按钮区域
        const ActionArea = ({ menuid }) => {
            let showReduceBtn = cacheMenuList.find(item => item.menu_id === menuid);
            return (<div >
                <Button disabled={has_order} className='action-btn' size='small' icon='plus' data-menuid={menuid} onClick={this.addMenu} ghost={true}/>
                {showReduceBtn ? <Button disabled={has_order} className='action-btn' size='small' icon='minus' data-menuid={menuid} onClick={this.reduceMenu} ghost={true}/> : ''}
            </div>)
        }
        let selectModal = <Modal
            title="提示"
            style={{ top: 20 }}
            visible={modalVisible}
            onOk={() => this.userOrder()}
            onCancel={() => this.userCancelOrder()}
        >
            {content}
        </Modal>
        let searchArea = <div>
            <div className='title'>搜索菜式</div>
            <div className='foodlist'>
                <RadioGroup disabled={has_order} className='foodlist' options={foodList} onChange={this.onChange} value={this.state.selectFood} />
            </div>
        </div>

        let DaliyFoodList = foodList.daliy && foodList.daliy.map(item => {
            return (
                <div className='menu-item' key={item.menu_id}>
                    <div className='menu-name'>{item.menu_name}</div>
                    <div className='price'>({item.price}元)</div>
                    <ActionArea menuid={item.menu_id} />
                </div>
            )
        });
        let FireFoodList = foodList.fire && foodList.fire.map(item => {
            return (
                <div className='menu-item' key={item.menu_id}>
                    <div className='menu-name'>{item.menu_name}</div>
                    <div className='price'>({item.price}元)</div>
                    <ActionArea  menuid={item.menu_id} />
                </div>
            )
        });
        let HotFoodList = foodList.hotfood && foodList.hotfood.map(item => {
            return (
                <div className='menu-item' key={item.menu_id}>
                    <div className='menu-name'>{item.menu_name}</div>
                    <div className='price'>({item.price}元)</div>
                    <ActionArea  menuid={item.menu_id} />
                </div>
            )
        });
        let normalArea = <div>
            <div className='title'>每旬菜式</div>
            <div className='foodlist'>
                {DaliyFoodList}
            </div>
            <div className='title'>热销菜式</div>
            <div className='foodlist'>
                {HotFoodList}
            </div>
            <div className='title'>明炉烧味</div>
            <div className='foodlist'>
                {FireFoodList}
            </div>
        </div>
        let showCacheMenuList = cacheMenuList.map(item => {
            return (
                <div key={item.menu_id}>
                    <div className='menu-name'>{item.menu_name}</div>
                    <div className='menu-num'>*{item.num}</div>
                </div>
            )
        });
        return (
            <div>
                <div className='cache-menu'>
                    <div className='menu-title'>您的菜单</div>
                    { showCacheMenuList }
                </div>
                { isSearch ? searchArea : normalArea }
                { selectModal } 
            </div>
        )
    }
}

export default FoodList;