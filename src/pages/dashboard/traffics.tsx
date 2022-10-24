import { Area } from "@ant-design/charts";
import { Button, Card, Col, Divider, Form, Input, Row, Select, Skeleton, Space, Spin, Tag, Typography } from "antd";
import { DownloadOutlined, PlusOutlined } from '@ant-design/icons';
import moment from "moment";
import { Suspense, useEffect, useMemo, useState } from "react";
import { useRecoilState, useRecoilValue, useRecoilValueLoadable } from "recoil";
import { onlineUsersSelector, platformState, rangeState, trafficsSelector, utmCampaignState, utmSourceState } from "../../atoms/stat";
import useCsv from "../../hooks/useCsv";
import StatsRangePicker from "../stats/stats-range-picker";
import { EXPORT_FILE_NAME } from "../../utils/constants";
import { useDebounceEffect } from "ahooks";

const formatTime = (time: number) => moment(time).format('DD/MM/YYYY')

function TheChart() {
  const traffics = useRecoilValue(trafficsSelector);
  const data = useMemo(() => {
    const res: { Time: string, Count: Number, type: 'Lượng người dùng mới' | 'Tổng số lượng người dùng' | 'Tổng số lượt truy cập' }[] = []
    if (traffics.stats && traffics.stats.datatables) {
      traffics.stats.datatables[0].data.forEach(stat => {
        res.push({
          Time: formatTime(stat.time),
          Count: stat["MiniApp.A1_newUser"],
          type: 'Lượng người dùng mới'
        })
        res.push({
          Time: formatTime(stat.time),
          Count: stat["MiniApp.A1_uid"],
          type: 'Tổng số lượng người dùng'
        })
        res.push({
          Time: formatTime(stat.time),
          Count: stat["MiniApp.TotalA1_req"],
          type: 'Tổng số lượt truy cập'
        })
      })
    }
    return res;
  }, [traffics])

  return <Area
    isStack={false}
    data={data}
    xField="Time"
    yField="Count"
    seriesField="type"
    xAxis={{
      title: {
        text: "Ngày"
      }
    }}
    yAxis={{
      label: {
        formatter: function formatter(v: string) {
          return ''.concat(v).replace(/\d{1,3}(?=(\d{3})+$)/g, function (s) {
            return ''.concat(s, ',');
          })
        }
      },
      title: {
        text: "Lượng người dùng"
      }
    }}
    color={['#1979C9', '#D62A0D', '#FAA219']}
  />
}

function ExportButton() {
  const { push, download, rows } = useCsv();
  const traffics = useRecoilValueLoadable(trafficsSelector);
  const range = useRecoilValue(rangeState);
  const from = useMemo(() => formatTime(range[0].unix() * 1000), [range]);
  const to = useMemo(() => formatTime(range[1].unix() * 1000), [range]);
  const utmSource = useRecoilValue(utmSourceState);
  const utmCampaign = useRecoilValue(utmCampaignState);
  const platform = useRecoilValue(platformState);

  useEffect(() => {
    if (traffics.state === 'hasValue') {
      rows.current = [
        ['Ngày bắt đầu', '', 'Ngày kết thúc', '', 'Nền tảng', '', 'UTM Source', '', 'UTM Campaign'],
        [from, '', to, '', platform, '', utmSource || 'all', '', utmCampaign],
        [''],
        ['Ngày', 'Lượng người dùng mới', 'Tổng số lượng người dùng', 'Tổng số lượt truy cập'],
      ];
      if (traffics.contents.stats && traffics.contents.stats.datatables) {
        traffics.contents.stats.datatables[0].data.forEach(stat => {
          push([
            formatTime(stat.time),
            stat["MiniApp.A1_newUser"],
            stat["MiniApp.A1_uid"],
            stat["MiniApp.TotalA1_req"]
          ]);
        });
      }
    }

  }, [traffics, from, to, platform, utmSource, utmCampaign, push, rows]);

  return <Button loading={traffics.state === 'loading'} icon={<DownloadOutlined />} onClick={() => download(EXPORT_FILE_NAME.TRAFFICS(from, to))}>Xuất báo cáo</Button>
}

function OnlineUsers() {
  const online = useRecoilValue(onlineUsersSelector);
  return <Tag color="green">{online} nguời dùng online</Tag>;
}

function UtmSourceSelector() {
  const traffics = useRecoilValueLoadable(trafficsSelector);
  const [utmSource, setUtmSource] = useRecoilState(utmSourceState);
  const [customUtmSource, setCustomUtmSource] = useState<string[]>([]);
  const [searchUtm, setSearchUtm] = useState('');

  return <Select
    showSearch
    searchValue={searchUtm}
    onSearch={setSearchUtm}
    loading={traffics.state === 'loading'}
    defaultValue=""
    style={{ width: 150 }}
    value={utmSource}
    onChange={u => setUtmSource(u)}
    dropdownRender={menu => (
      <>
        {menu}
        {searchUtm && !customUtmSource.includes(searchUtm.trim()) && <>
          <Divider style={{ margin: '8px 0' }} />
          <Space align="center" style={{ padding: '0 8px 4px' }}>
            <Typography.Link onClick={() => setCustomUtmSource(cus => cus.concat(searchUtm.trim()))} style={{ whiteSpace: 'nowrap' }}>
              <PlusOutlined /> Thêm "{searchUtm.length > 5 ? searchUtm.slice(0, 5) + '...' : searchUtm}"
            </Typography.Link>
          </Space>
        </>}
      </>
    )}
  >
    <Select.Option value="">Tất cả</Select.Option>
    {traffics.state === 'hasValue' && traffics.contents && traffics.contents.utmSources.map(source => <Select.Option key={source.value} value={source.value}>{source.label}</Select.Option>)}
    {customUtmSource.map(source => <Select.Option key={source} value={source}>{source}</Select.Option>)}
  </Select>
}

function Inquiry() {
  const [platform, setPlatform] = useRecoilState(platformState);
  const [utmCampaign, setUtmCampaign] = useRecoilState(utmCampaignState);
  const [localUtmCampaign, setLocalUtmCampaign] = useState(utmCampaign);
  useDebounceEffect(() => {
    setUtmCampaign(localUtmCampaign);
  }, [localUtmCampaign], { wait: 500 });

  return <Row justify="space-between">
    <Col>
      <h4>
        <Space>
          Thống kê lưu lượng truy cập
          <Suspense fallback={<Spin size="small" />}>
            <OnlineUsers />
          </Suspense>
        </Space>
      </h4>
    </Col>
    <Col>
      <Space align="start">
        <Form.Item label="Nền tảng">
          <Select defaultValue="all" value={platform} onChange={p => setPlatform(p as any)}>
            <Select.Option value="all">Tất cả</Select.Option>
            <Select.Option value="1">Android</Select.Option>
            <Select.Option value="2">iOS</Select.Option>
          </Select>
        </Form.Item>
        <Form.Item label="UTM Source">
          <UtmSourceSelector />
        </Form.Item>
        <Form.Item label="UTM Campaign">
          <Input value={localUtmCampaign} onChange={e => setLocalUtmCampaign(e.target.value)} placeholder="Tất cả" style={{ width: 150 }} />
        </Form.Item>
        <ExportButton />
      </Space>
    </Col>
    <Col span={24}>
      <StatsRangePicker />
    </Col>
  </Row>
}

function Traffics() {

  return <Card>
    <Space direction="vertical" className="w-full">
      <Inquiry />
      <Suspense fallback={<Skeleton active style={{ height: 400 }} />}>
        <TheChart />
      </Suspense>
    </Space>
  </Card>;
}

export default Traffics;