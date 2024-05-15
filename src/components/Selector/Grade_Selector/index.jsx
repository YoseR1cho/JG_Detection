import React,{useState}from 'react';
import { Select } from 'antd';
// const handleChange = (value) => {
//   console.log(`selected ${value}`);
// };
const App = ({level,setLevel}) => (
    <Select
    onChange={(value)=>setLevel(value)}
    value={level}
    defaultValue="请选择风险"
    style={{
      width: 200,
    }}
    // onChange={handleChange}
    options={[
      {
        label:'全部',
        value:'',
      },
      {
        label:'一级风险',
        value:'一级风险',
      },
      {
        label:'二级风险',
        value:'二级风险'
      },
      {
        label:'三级风险',
        value:'三级风险'
      }
    ]}
  />
);
export default App;
