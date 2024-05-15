import React from 'react';
import { Breadcrumb } from 'antd';
import {Link, useLocation} from 'react-router-dom';
import {menuKeyAndLaber} from "@/utils/index.js";
import styles from './style.module.less'

const breadcrumbNameMap = {
    "/admin/defect":"缺陷事件处理",
    "/admin/defect/inspect":"巡检工单",
    "/admin/defect/inspect/detail":"事件详情",
    "/admin/defect/inspect/audit":"缺陷审核",
    "/admin/defect/inspect/reAudit":"缺陷复审",
    "/admin/defect/inspect/delivery":"缺陷派送",
    "/admin/defect/inspect/output":"闭环销项",
    "/admin/defect/citizen":"居民反馈",
    "/admin/defect/citizen/detail":"事件详情",
    "/admin/defect/citizen/audit":"缺陷审核",
    "/admin/defect/citizen/reAudit":"缺陷复审",
    "/admin/defect/citizen/delivery":"缺陷派送",
    "/admin/defect/citizen/output":"闭环销项",

    "/admin/user":"系统管理",
    "/admin/user/index":"系统设置",
    "/admin/user/manager":"管理员设置",
    "/admin/user/personal":"人员管理",

    "/admin/citizen":"居民信息管理",
    "/admin/citizen/manage":"用户管理",
    "/admin/citizen/feedback":"用户反馈",

    "/admin/visualization":"数据可视化",

    "/admin/knowledge":"知识库管理",
    "/admin/knowledge/news":"新闻速递",
    "/admin/knowledge/matters":"维检事项",
    "/admin/knowledge/danger":"隐患知识",
}

const MyBreadcrumb = () => {
    const location = useLocation();
    const pathSnippets = location.pathname.split("/").filter((i) => i);
    const breadcrumbItems = pathSnippets.map((_, index) => {
        const url = `/${pathSnippets.slice(0, index + 1).join("/")}`;
        return (
            <Breadcrumb.Item key={url}>
                <Link to={url}>{breadcrumbNameMap[url]}</Link>
            </Breadcrumb.Item>
        );
    });
    return (
        <div className="demo">
            <Breadcrumb style={{ margin: "20px 0 16px 0" }}>
                {breadcrumbItems}
            </Breadcrumb>
        </div>
    );
};
export default MyBreadcrumb;
