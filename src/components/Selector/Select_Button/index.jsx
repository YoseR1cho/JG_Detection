import React from 'react';
import { SearchOutlined } from '@ant-design/icons';
import { Button, Flex, Tooltip } from 'antd';
const App = () => (
  <Flex gap="small" vertical>
    <Flex wrap="wrap" gap="small">
      <Tooltip title="筛选">
        <Button type="primary" shape="circle" icon={<SearchOutlined />} />
      </Tooltip>
    </Flex>
  </Flex>
);
export default App;