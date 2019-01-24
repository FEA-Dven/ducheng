const moment = require('moment');
module.exports = {

    /**
     * 获取指定日期的指定类型的第一天和最后一天
     * @param momentTime 日期格式： moment("2018-08-18T11:10:21.568")
     * @param type 'week' 周， 'month' 月， 'year' 年
     * @returns {{start: string, end: string}} 返回类型格式 20180817
     */
    getStartEndDate: function(momentTime, type){
        let start = '';
        let end = '';
        if (type === 'week'){
            if (momentTime.format('E') === '7'){
                end = momentTime.format('YYYYMMDD');
                start = momentTime.add(-6, 'days').format('YYYYMMDD');
                return {start: start, end: end};
            }
            start = momentTime.startOf(type).add(1, 'days').format('YYYYMMDD');
            end = momentTime.endOf(type).add(1, 'days').format('YYYYMMDD');
        } else{
            start = momentTime.startOf(type).format('YYYYMMDD');
            end = momentTime.endOf(type).format('YYYYMMDD');
        }
        return {start: start, end: end};
    },

   changeDateForm: function(date){
        return moment(date).format('YYYY-MM-DD');
   },

    /**
     * 获取给定时间到下周差值
     * @param momentTime 日期格式： moment("2018-08-18T11:10:21.568")
     * @returns {number} 单位 s
     */
    getDiffNextWeek: function(momentTime){
        let nextMonday = momentTime.subtract(momentTime.format('E') -8, 'days').format('YYYYMMDD');
        let nextMondayTime = moment(nextMonday+' 080000', 'YYYYMMDD HHmmss').format('x');
        let time = moment().format('x');
        return Math.round((nextMondayTime - time)/1000);
    },


    /**
     * 获取一月过期时间查值
     * @param momentTime 日期格式： moment("2018-08-18T11:10:21.568")
     * @returns {number} 单位 s
     */
    getDifferNextMonth: function(momentTime){
        let year = parseInt(momentTime.format('YYYY'));
        let month = parseInt(momentTime.format('M'));
        if (month === 12) {
            year += 1;
            month = 1;
        } else if(month < 9){
            month = '0' + (month + 1);
        } else {
            month += 1;
        }
        let nextMonthTime = moment(year+month+'01'+' 080000', 'YYYYMMDD HHmmss').format('x');
        let time = moment().format('x');
        return Math.round((nextMonthTime - time)/ 1000);
    },

    /**
     * 获取一年过期时间查值
     * @param momentTime 日期格式： moment("2018-08-18T11:10:21.568")
     * @returns {number} 单位 s
     */
    getDifferNextYear: function(momentTime){
        let year = parseInt(momentTime.format('YYYY')) + 1;
        let nextYearTime = moment(year+'01'+'01'+' 080000', 'YYYYMMDD HHmmss').format('x');
        let time = moment().format('x');
        return Math.round((nextYearTime - time)/ 1000);
    },

    /**
     * 获取时间戳，单位 s
     * @returns {number}
     */
    getUnix: function(){
        return moment().unix();
    },

    /**
     * 获取指定日期格式
     * @param momentTime moment()
     */
    getDateFormat: function(momentTime){
        return momentTime.format('YYYYMMDD');
    },

    /**
    * @author dven 
    * @description 获取本日开始和结束时间 
    */
    getStartAndEndByDay: function() {
        let time = moment();
        let todayStartTime = time.startOf('day').unix();
        let todayEndTime = time.endOf('day').unix();
        return { todayStartTime, todayEndTime };
    }


};
