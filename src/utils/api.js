import {request} from './axios.js'
import User from "@/store/User.js";


export const login = (phone,password)=>request.post('/user/login',{
    phone,
    password
})

export const updateUser = (id,values)=>request.post(`/user/update/${id}`,{
    status:1,
    ...values,
})

export const loginById = (id)=>request.get(`/user/getById/${id}`)

export const logout = ()=>request.post('/user/logout')

export const blockUser = (id)=>request.post(`/user/logicalDelete/${id}`)

export const recordHistory = ()=>request.get(`/WorkSheet/historyInfo/${User.id}`)
export const uploadPic = (form)=>request.post('/picture/upload', form)

export const uploadRepairPic = (form,picId)=>request.post(`/picture/upload?picId=${picId}`, form)

export const uploadKnowledgePic = (form)=>request.post('/KBase/uploadPic',form)

export const analyzedPic = (id)=>request.post(`/picture/analyze/${id}`)


export const generateWorkSheet = (id,pos)=>request.post(`/WorkSheet/generate/${id}?userId=${User.id}&address=${pos.loc}&longitude=${pos.lng}&latitude=${pos.lat}`)

export const getWorkSheet = (status)=>request.get('/WorkSheet/worker/page',{
    params:{
        page:1,
        pageSize:1000,
        status,
        workerId:User.id
    }
})

// 获取所有工单
export const workSheetExpert = (status)=>request.get(`/WorkSheet/expert/page?page=1&pageSize=1000&status=${status}&expertId=${User.id}`);

//获取所有用户信息
export const getUser = (name,job)=>request.get('/user/page',{
    params:{
        page:1,
        pageSize:1000,
        name,
        job
    }
})

export const deleteUser = (id)=>request.post(`/user/logicalDelete/${id}`)

export const getReasons = ()=>request.get(`/KBase/display?type=隐患寻因`)

export const addReason = (data)=>request.post('/KBase/save',{
    type:'隐患寻因',
    ...data
})

export const getNews = ()=>request.get(`/KBase/display?type=新闻速递`)

export const addNews = (data)=>request.post('/KBase/save',{
    type:'新闻速递',
    ...data
})


export const getMatters = ()=>request.get(`/KBase/display?type=维检事项`)

export const addMatter = (data)=>request.post('/KBase/save',{
    type:'维检事项',
    ...data,
    userInfo:User.nickName
})

export const getFeatures = ()=>request.get(`/KBase/display?type=隐患特征`)

export const addFeatures = (data)=>request.post('/KBase/save',{
    type:'隐患特征',
    ...data
})

export const getProcess = ()=>request.get(`/KBase/display?type=作业流程`)

export const addProcess = (data)=>request.post('/KBase/save',{
    type:'作业流程',
    ...data
})

export const updateKnowledge = (id,data)=>request.post('/KBase/update',{
    id,
    ...data,
})

export const updateMatterKnowledge = (id,data)=>request.post('/KBase/update',{
    id,
    ...data,
    userInfo:User.nickName
})

export const deleteKnowledge = (id)=>request.post(`/KBase/delete/${id}`)

// 会审专家确认
export const confirmWorkSheet = (id)=>request.post(`/WorkSheet/confirm?userId=${User.id}`,{
    id,
    status:'待专家审核',
    ifConfirm:0,
    ifReview: 0,
    ifRepaired: 0,
})

// 会审专家审核
export const auditWorkSheet = (data)=>request.post(`/WorkSheet/update?userId=${User.id}`,{
    id:data.id,
    expectTime:data.date,
    status:'待专家审核',
    advice:data.advice,
    riskLevel:data.riskLevel,
    ifUrgent:data.ifUrgent?0:1,
    workerId:data.workerId,
    defectType:data.defectType
})

// 维修人员接单
export const receiveWorkSheet = (id)=>request.post(`/WorkSheet/update?userId=${User.id}`,{
    id,
    workerId:User.id,
    status:'待维修人员接单',
    ifReview:1,
    ifRepaired:0
})

//维修人员维修完成
export const disposeWorkSheet = (id,repairedUrl)=>request.post(`/WorkSheet/update?userId=${User.id}`,{
    id,
    repairedUrl,
    workerId:User.id,
    status:'维修人员已接单，待维修',
    ifReview:1,
    ifRepair:0
})

//会审专家复审
export const reAuditWorkSheet = (id,msg,advice)=>request.post(`/WorkSheet/update?msg=${msg}&userId=${User.id}`,{
    id,
    expertId:User.id,
    ifReview:1,
    ifRepair:1,
    status:'维修完成，待专家复审',
    advice
})

//会审专家误报删除
export const deleteWorkSheet =  (id)=>request.post(`/WorkSheet/delete/${id}`)


// 用户反馈列表查询
export const getFeedback = ()=>request.get('/feedback/page?page=1&pageSize=1000&userid=')

//用户反馈置顶
export const topFeedback = (id,ifUrgent)=>request.post('/feedback/urgent',{
    id,ifUrgent
})

//意见回复
export const replyFeedback = (id,suggestion)=>request.post('/feedback/solve',{
    id,suggestion
})

// 删除反馈记录
export const deleteFeedback = (id)=>request.post(`/feedback/delete/${id}`)

// 近7天访问量
export const getViews = ()=>request.get('/DataVis/VisitsNum')

// 查询各种缺陷数量
export const getDefectNum = ()=>request.get('/DataVis/defectNum')

// 查询各种风险等级数量
export const getRiskNum = ()=>request.get('/DataVis/riskNum')

// 工单各类型数量
export const getWorkSheetNum = ()=>request.get('/DataVis/workSheet')


// 查询系统状态
export const getSystemStatus = ()=>request.get('/WorkSheet/queryStatus')

// 修改系统状态
export const setSystemStatus = (status)=>request.post('/WorkSheet/systemStatus',{
    id:1,
    status:status?1:0
})






