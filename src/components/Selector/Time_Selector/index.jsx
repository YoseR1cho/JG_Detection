import React, { useState } from 'react';
import { Select, Space } from 'antd';
const timeSelection = ['按年筛选', '按月筛选','按日筛选'];
const timeDetail = {
  按年筛选: ['2020', '2021', '2022','2023','2024'],
  按月筛选: ['近一个月', '近三个月', '近六个月','近九个月'],
  按日筛选: ['近一天', '近三天', '近七天'],
};
const App = () => {
  const [cities, setCities] = useState(timeDetail[timeSelection[0]]);
  const [secondCity, setSecondCity] = useState(timeDetail[timeSelection[0]][0]);
  const handleProvinceChange = (value) => {
    setCities(timeDetail[value]);
    setSecondCity(timeDetail[value][0]);
  };
  const onSecondCityChange = (value) => {
    setSecondCity(value);
  };
  return (
    <Space wrap>
      <Select
        defaultValue={timeSelection[0]}
        style={{
          width: 120,
        }}
        onChange={handleProvinceChange}
        options={timeSelection.map((province) => ({
          label: province,
          value: province,
        }))}
      />
      <Select
        style={{
          width: 120,
        }}
        value={secondCity}
        onChange={onSecondCityChange}
        options={cities.map((city) => ({
          label: city,
          value: city,
        }))}
      />
    </Space>
  );
};
export default App;