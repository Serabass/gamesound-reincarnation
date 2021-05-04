import React from 'react';
import {Col, Input, Row, Table} from 'antd';
import AppLayout from "../Layout";
import {Inertia} from '@inertiajs/inertia'
import {debounce} from 'lodash';

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
  page: number;
  query?: string;
}

export default function Index({sounds, page, query = ''}: IndexProps) {
  return <AppLayout title="Home page">
    <Row>
      <Col md={24}>
        <Row>
          <Col md={24}>
            <Input.Search defaultValue={query}
                          onSearch={(query) => {
                            Inertia.get((window as any).route('home'), {
                              page: 1,
                              query
                            });
                          }} />
          </Col>
        </Row>

        <Row>
          <Col md={24}>

            <Table dataSource={sounds.data} columns={columns} pagination={{
              position: ['topCenter'],
              pageSize: 10,
              total: sounds.total,
              current: page,
              onChange(page) {
                Inertia.get((window as any).route('home'), {
                  page
                });
              }
            }} />
          </Col>
        </Row>
      </Col>
    </Row>
  </AppLayout>;
}
