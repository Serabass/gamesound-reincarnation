import React, {useState} from 'react';
import {Checkbox, Col, Divider, Input, Row, Table, Select, Button} from 'antd';
import AppLayout from "../Layout";
import {Inertia} from '@inertiajs/inertia'
import {debounce} from 'lodash';
import {ColumnsType} from 'antd/lib/table/interface';
import {AjaxInput} from '../components/AjaxInput';
import {PauseOutlined, PlayCircleFilled} from '@ant-design/icons';
import {Simulate} from 'react-dom/test-utils';
import play = Simulate.play;

function PlayBtn({gameId = 1, fileName}: any) {
  // http://gamesound.serabass.net/sounds/1/180.wav
  let [playing, setPlaying] = useState(false);
  let icon = !playing ? <PlayCircleFilled /> : <PauseOutlined />;
  return <Button icon={icon}
                 type="text"
                 onClick={() => {
                   setPlaying(true);
                    let audio = new Audio();
                    audio.src = `http://gamesound.serabass.net/sounds/${gameId}/${fileName}`;
                    audio.onended = () => {
                      setPlaying(false);
                    };
                    audio.play();
                 }} />;
}

interface SoundEntry {
  id: number;
  fileName: string;
}

let columns: ColumnsType<SoundEntry> = [
  {
    title: '',
    key: 'player',
    dataIndex: 'player',
    render(_, el) {
      return <PlayBtn gameId={1} fileName={el.fileName} />
    }
  },
  {
    title: "#",
    key: 'id',
    dataIndex: 'id',
  },
  {
    title: "Original Text",
    key: 'originalText',
    dataIndex: 'originalText',
    render(value, entry) {
      return <AjaxInput<{ id: number }>
        defaultValue={value}
        data={{
          id: entry.id
        }}
      />
    }
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

interface SoundsResponse {
  total: number;
  data: SoundEntry[];
}

interface IndexProps {
  sounds: SoundsResponse;
  page: number;
  pageSize: number;
  query?: string;
  onlyEmpty: number;
  groupNames: string[];
  groupName?: string;
}

export default function Index({
                                sounds,
                                page = 1,
                                pageSize,
                                query = '',
                                onlyEmpty = 0,
                                groupNames,
                                groupName = ''
                              }: IndexProps) {
  function search(data: any = {}) {
    Inertia.get((window as any).route('home'), {
      page,
      query,
      onlyEmpty,
      groupName,
      ...data
    });
  }

  return <AppLayout title="Home page">
    <Row>
      <Col md={24}>
        <Row>
          <Col md={12}>
            <Input autoFocus
                   allowClear
                   defaultValue={query}
                   onChange={debounce((e) => {
                     search({
                       query: e.target.value,
                     });
                   }, 1000)}
            />
          </Col>
          <Col md={6}>
            <Select
              showSearch
              style={{width: '100%'}}
              placeholder="Select a person"
              optionFilterProp="children"
              filterOption={(input, option) =>
                `${option?.value}`.toLowerCase().indexOf(`${input}`.toLowerCase()) >= 0
              }
              onChange={debounce((e) => {
                search({
                  groupName: e
                });
              }, 1000)}
            >
              {groupNames.map((name, index) => <Select.Option value={name} key={index}>{name}</Select.Option>)}
            </Select>,
          </Col>
          <Col md={6}>
            <Checkbox
              defaultChecked={onlyEmpty == 1}
              onChange={debounce((e) => {
                search({
                  onlyEmpty: +e.target.checked,
                });
              }, 200)}>
              Show only empty entries
            </Checkbox>
          </Col>
        </Row>

        <Divider />

        <Row>
          <Col md={24}>
            Total: <b>{sounds.total}</b>
            <Table<SoundEntry> dataSource={sounds.data}
                               columns={columns}
                               pagination={{
                                 position: ['topCenter', 'bottomCenter'],
                                 pageSize,
                                 total: sounds.total,
                                 current: page,
                                 onChange(page) {
                                   search({
                                     page
                                   });
                                 }
                               }}
            />
          </Col>
        </Row>
      </Col>
    </Row>
  </AppLayout>;
}
