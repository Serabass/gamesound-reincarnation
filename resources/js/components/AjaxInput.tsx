import React, {useState} from 'react';
import axios from 'axios';
import {Col, Input, Row, Spin} from 'antd';
import {TextAreaProps} from 'antd/lib/input/TextArea';
import {EditOutlined} from '@ant-design/icons';

export interface AjaxInputProps<D> extends TextAreaProps {
  data: D;
}

export function AjaxInput<D>({...props}: AjaxInputProps<D>) {
  let [originalText, setOriginalText] = useState(props.defaultValue);
  let [saving, setSaving] = useState(false);
  let [changed, setChanged] = useState(false);

  function save() {
    setSaving(true);
    axios.post(route('save-correction'), {
      ...props.data,
      originalText
    }).then((res) => {
      setSaving(false);
      setChanged(false);
    }).catch((res) => {
      setSaving(false);
      setChanged(false);
    });
  }

  return <Spin spinning={saving}>
    <Row>
      <Col md={20}>
        <Input.TextArea {...props}
                        disabled={saving}
                        defaultValue={originalText}
                        onChange={(e) => {
                          setOriginalText(e.target.value);
                          setChanged(true);
                        }}
                        onBlur={() => {
                          if (!changed) {
                            return;
                          }
                          save();
                        }}

        />
      </Col>
      <Col md={4}>
        {changed ? <EditOutlined /> : null}
      </Col>
    </Row>
  </Spin>
}
