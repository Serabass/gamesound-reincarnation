import React, {useState} from 'react';
import {Checkbox, Col, Divider, Input, Row, Table, Select, Button} from 'antd';
import AppLayout from "../Layout";
import {Inertia} from '@inertiajs/inertia'
import {debounce} from 'lodash';
import {ColumnsType} from 'antd/lib/table/interface';
import {AjaxInput, AjaxInputProps} from '../components/AjaxInput';
import {PauseOutlined, CaretRightOutlined} from '@ant-design/icons';
import {InputProps} from 'antd/lib/input/Input';
import {useLocalstorageState} from 'rooks';

function PlayBtn({gameId = 1, fileName}: any) {
  // http://gamesound.serabass.net/sounds/1/180.wav
  let [playing, setPlaying] = useState(false);
  let icon = !playing ? <CaretRightOutlined /> : <PauseOutlined />;
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
    render: (_, el) => <PlayBtn gameId={1} fileName={el.fileName} />
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
      return <SizedInput<{ id: number }>
        storageId={entry.id}
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

interface SoundsStats {
  doubtful: number;
}

interface IndexProps {
  sounds: SoundsResponse;
  stats: SoundsStats;
  page: number;
  pageSize: number;
  query?: string;
  onlyEmpty: number;
  groupNames: string[];
  groupName?: string;
  langs: string[];
}

interface SizedInputProps<D> extends AjaxInputProps<D> {
  storageId: string | number;
}

function SizedInput<D>(props: SizedInputProps<D>) {
  let [height, setHeight] = useLocalstorageState(`ajaxInputSize:${props.storageId}`, 60);
  return <AjaxInput<D> {...props} style={{height}} onResize={({height}) => {
    setHeight(height);
  }}/>;
}

export default function Index({
                                sounds,
                                stats,
                                page = 1,
                                pageSize,
                                query = '',
                                onlyEmpty = 0,
                                groupNames,
                                groupName = '',
                                langs,
                              }: IndexProps) {
  function search(data: any = {}) {
    Inertia.get(route('home'), {
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
              placeholder={`Groups (${groupNames.length})`}
              optionFilterProp="children"
              defaultValue={groupName}
              filterOption={(input, option) =>
                `${option?.value}`.toLowerCase().indexOf(`${input}`.toLowerCase()) >= 0
              }
              onChange={((e) => {
                search({
                  groupName: e
                });
              })}
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
            <Row>
              <Col md={4}>
                Total: <b>{sounds.total}</b>
              </Col>
              <Col md={4}>
                Doubtful: <b>{stats.doubtful}</b>
              </Col>
              <Col md={4}>
                Langs: <b>{langs.join(', ')}</b>
              </Col>
            </Row>
            <Table<SoundEntry> dataSource={sounds.data}
                               columns={columns}
                               rowKey="id"
                               pagination={{
                                 position: ['topCenter', 'bottomCenter'],
                                 pageSize,
                                 total: sounds.total,
                                 defaultCurrent: page,
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
