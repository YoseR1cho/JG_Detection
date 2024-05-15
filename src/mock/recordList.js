import dayjs from "dayjs";

const recordList=[
    {
        pic_url:'https://img0.baidu.com/it/u=2814929314,3326333287&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=375',
        date:dayjs(new Date("2024-04-04 12:00:00")).format('YYYY.MM.DD HH:mm'),
        level:'危险',
        className:'red',
        status:0,
        id:1,
        area:'四川省成都市成华区保和街道迎晖路辅路',
        lng:104.148661,
        lat:30.635476,
    },{
        pic_url:'https://img1.baidu.com/it/u=609519613,2739626997&fm=253&fmt=auto&app=138&f=JPEG?w=552&h=500',
        date:dayjs(new Date("2024-04-04 10:40:02")).format('YYYY.MM.DD HH:mm'),
        level:'较危险',
        className:'yellow',
        status:1,
        id:2,
        area:'四川省成都市新都区新都街道西南石油大学成都校区二期田径场',
        lng:104.189344,
        lat:30.83002,
    },
    {
        pic_url:'https://img1.baidu.com/it/u=2010672187,2564510089&fm=253&fmt=auto&app=138&f=JPEG?w=375&h=500',
        date:dayjs(new Date("2024-04-04 9:40:02")).format('YYYY.MM.DD HH:mm'),
        level:'安全',
        className:'green',
        status:2,
        id:3,
        area:'四川省成都市新都区新都街道绕城大道东二段',
        lng:104.203975,
        lat:30.817769,
    },
    {
        pic_url:'https://pic.rmb.bdstatic.com/a244cabf056320a427c9dce0aabf4dbb.jpg@wm_1,k_cGljX2JqaHdhdGVyLmpwZw==',
        date:dayjs(new Date("2024-04-04 9:40:02")).format('YYYY.MM.DD HH:mm'),
        level:'危险',
        className:'red',
        status:1,
        id:4,
        area:'四川省眉山市彭山区青龙街道冯氏宾馆',
        lng:103.87354,
        lat:30.295658,
    }
]

const workOrderList = [
    {
        id:1,
        pic_url:'https://img0.baidu.com/it/u=2814929314,3326333287&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=375',
        type:'2024.4.05松动',
        createTime:dayjs(new Date("2024-04-04 12:00:00")).format('YYYY.MM.DD HH:mm'),
        advice:'井盖 ➜ 破损,露出了铁片和钢筋，若不及时修复车轮撞击很容易出现爆胎、塌陷,井盖 ➜ 跷跷板,轻轻踩下去，井盖就会“翻腾”起来人站立无法维持水平平衡,井盖 ➜ 缺失,周边无遮无挡稍有不慎、直接掉入',
        isUrgent:false,
        area:'四川省成都市成华区保和街道迎晖路辅路',
        lng:104.148661,
        lat:30.635476,
        level:'危险',
        status:'已保存', // 已保存 已接单
    },
    {
        id:2,
        pic_url:'https://pic.rmb.bdstatic.com/a244cabf056320a427c9dce0aabf4dbb.jpg@wm_1,k_cGljX2JqaHdhdGVyLmpwZw==',
        type:'2024.4.04损坏',
        createTime:dayjs(new Date("2024-04-04 10:40:02")).format('YYYY.MM.DD HH:mm'),
        advice:'井盖 ➜ 破损,露出了铁片和钢筋，若不及时修复车轮撞击很容易出现爆胎、塌陷,井盖 ➜ 跷跷板,轻轻踩下去，井盖就会“翻腾”起来人站立无法维持水平平衡,井盖 ➜ 缺失,周边无遮无挡稍有不慎、直接掉入',
        isUrgent:true,
        area:'四川省成都市成华区保和街道迎晖路辅路',
        lng:104.148661,
        lat:30.635476,
        level:'危险',
        status:'已保存', // 已保存 已接单
    },
    {
        id:3,
        pic_url:'https://img1.baidu.com/it/u=609519613,2739626997&fm=253&fmt=auto&app=138&f=JPEG?w=552&h=500',
        type:'2024.4.03不明显',
        createTime:dayjs(new Date("2024-04-04 9:40:02")).format('YYYY.MM.DD HH:mm'),
        advice:'井盖 ➜ 破损,露出了铁片和钢筋，若不及时修复车轮撞击很容易出现爆胎、塌陷,井盖 ➜ 跷跷板,轻轻踩下去，井盖就会“翻腾”起来人站立无法维持水平平衡,井盖 ➜ 缺失,周边无遮无挡稍有不慎、直接掉入',
        isUrgent:false,
        area:'四川省成都市成华区保和街道迎晖路辅路',
        lng:104.148661,
        lat:30.635476,
        level:'危险',
        status:'已保存', // 已保存 已接单
    },
    {
        id:3,
        pic_url:'https://img1.baidu.com/it/u=609519613,2739626997&fm=253&fmt=auto&app=138&f=JPEG?w=552&h=500',
        type:'2024.4.03不明显',
        createTime:dayjs(new Date("2024-04-04 9:40:02")).format('YYYY.MM.DD HH:mm'),
        advice:'井盖 ➜ 破损,露出了铁片和钢筋，若不及时修复车轮撞击很容易出现爆胎、塌陷,井盖 ➜ 跷跷板,轻轻踩下去，井盖就会“翻腾”起来人站立无法维持水平平衡,井盖 ➜ 缺失,周边无遮无挡稍有不慎、直接掉入',
        isUrgent:false,
        area:'四川省成都市成华区保和街道迎晖路辅路',
        lng:104.148661,
        lat:30.635476,
        level:'危险',
        status:'已接单', // 已保存 已接单
    }
]

export default [
    {
        url:'/mock/recordList',
        type:'get',
        response:()=>{
            return {
                code:200,
                msg:'success',
                data:recordList
            }
        }
    },
    {
        url:'/mock/wordOrder',
        type:'get',
        response:()=>{
            return {
                code:200,
                msg:'success',
                data:workOrderList
            }
        }
    }
]
