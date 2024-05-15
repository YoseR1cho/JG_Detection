import React, { useState } from 'react';
import { DownOutlined } from '@ant-design/icons';
import { Dropdown, Space } from 'antd';
import { observer } from 'mobx-react-lite';
import {NavLink} from "react-router-dom";
const items = [
    {
        label: <NavLink to={'/knowledge/danger/reason'}>隐患知识</NavLink>,
        key: '0',
    },
    {
        label: <NavLink to={'/knowledge/newsDelivery'}>新闻速递</NavLink>,
        key: '1',
    },
    {
        label: <NavLink to={'/knowledge/matters'}>维检事项</NavLink>,
        key: '1',
    },
];
const App = observer(() => (
  <Dropdown
    menu={{
      items,
    }}
    trigger={['click']}
  >


      <Space>
        <DownOutlined />
      </Space>
  </Dropdown>
));
export default App;
