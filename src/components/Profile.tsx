import React from 'react';
import { Select, Space } from 'antd';

type ProfileProps = {
  onSelectProfile: (value: string) => void;
};

export const Profile: React.FC<ProfileProps> = ({ onSelectProfile }) => {
  const handleChange = (value: string) => {
    onSelectProfile(value);
  };

  return (
    <Space wrap>
      <Select
        defaultValue='lucy'
        style={{ width: 120 }}
        onChange={handleChange}
        options={[
          { value: 'jack', label: 'Jack' },
          { value: 'lucy', label: 'Lucy' },
        ]}
      />
    </Space>
  );
};
