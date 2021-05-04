import React, {useState} from 'react';
import {Input} from 'antd';
import {InputProps} from 'antd/lib/input/Input';
import {
  CheckOutlined,
  LoadingOutlined,
} from '@ant-design/icons';

export interface AjaxInputProps<D> extends InputProps {
  data: D;
}

export function AjaxInput<D>({...props}: AjaxInputProps<D>) {
  let [defaultValue, setDefaultValue] = useState(props.defaultValue);
  let [saving, setSaving] = useState(false);
  let [changed, setChanged] = useState(false);

  function save() {
    setSaving(true);
    setTimeout(() => {
      setSaving(false);
      setChanged(false);
    }, 2000);
  }

  return <Input {...props}
                defaultValue={defaultValue}
                prefix={saving ? <LoadingOutlined /> : <CheckOutlined />}
                onChange={(e) => {
                  setDefaultValue(e.target.value);
                  setChanged(true);
                }}
                onBlur={() => {
                  if (!changed) {
                    return;
                  }
                  save();
                }}
  />
}
