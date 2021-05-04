import React, {useState} from 'react';
import {Input,  Spin} from 'antd';
import {TextAreaProps} from 'antd/lib/input/TextArea';

export interface AjaxInputProps<D> extends TextAreaProps {
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
    }, 1000);
  }

  return <Spin spinning={saving}>
    <Input.TextArea {...props}
                    disabled={saving}
                    defaultValue={defaultValue}
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
    /></Spin>
}
