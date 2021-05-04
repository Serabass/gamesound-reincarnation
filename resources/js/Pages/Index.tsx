import React from 'react';
import { Table } from 'antd';
import AppLayout from "../Layout";

let columns = [
  {
    title: "#",
    key: 'id',
    dataIndex: 'id',
  },
  {
    title: "Original Text",
    key: 'originalText',
    dataIndex: 'originalText',
  },
  {
    title: "Translation",
    key: 'translation',
    dataIndex: 'translation',
  },
  {
    title: "Lang",
    key: 'lang',
    dataIndex: 'lang',
  },
  {
    title: "Group Name",
    key: 'groupName',
    dataIndex: 'groupName',
  },
  {
    title: "Gender",
    key: 'gender',
    dataIndex: 'gender',
  },
];

interface IndexProps {
  sounds: any;
}

export default function Index({sounds}: IndexProps) {
  return <AppLayout title="Home page">
    <Table dataSource={sounds.data} columns={columns} />
  </AppLayout>;
}
