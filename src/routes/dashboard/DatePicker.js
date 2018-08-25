import React from 'react';
import { SelectPicker } from 'rsuite';

export default ({ selectedValue, data = [], onSelect }) => {
  return (
    <SelectPicker
      data={data}
      searchable={false}
      cleanable={false}
      appearance="subtle"
      value={selectedValue}
      onSelect={onSelect}
    />
  );
};
