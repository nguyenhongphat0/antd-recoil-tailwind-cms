import { Card, Skeleton, Space, Table } from "antd";
import { Suspense } from "react";
import { useRecoilValue } from "recoil";
import { retentionsState } from "../../atoms/stat";
import TheDate from "../../components/the-date";
import StatsRangePicker from "../stats/stats-range-picker";

function RetentionTable() {
  const retentions = useRecoilValue(retentionsState);
  return <Table columns={[
    {
      title: "Time",
      render: (_, record) => <TheDate format="DD/MM/YYYY" reverse value={new Date(record.time)} />,
      sorter: (a, b) => a.time - b.time,
    },
    {
      title: "A1",
      dataIndex: "MiniAppActive.A1",
      sorter: (a, b) => a['MiniAppActive.A1'] - b['MiniAppActive.A1']
    },
    {
      title: "RRD1",
      dataIndex: "MiniAppActive.RRD1_uid",
      sorter: (a, b) => a['MiniAppActive.RRD1_uid'] - b['MiniAppActive.RRD1_uid']
    },
    {
      title: "RRD2",
      dataIndex: "MiniAppActive.RRD2_uid",
      sorter: (a, b) => a['MiniAppActive.RRD2_uid'] - b['MiniAppActive.RRD2_uid']
    },
    {
      title: "RRD3",
      dataIndex: "MiniAppActive.RRD3_uid",
      sorter: (a, b) => a['MiniAppActive.RRD3_uid'] - b['MiniAppActive.RRD3_uid']
    },
    {
      title: "RRD4",
      dataIndex: "MiniAppActive.RRD4_uid",
      sorter: (a, b) => a['MiniAppActive.RRD4_uid'] - b['MiniAppActive.RRD4_uid']
    },
    {
      title: "RRD5",
      dataIndex: "MiniAppActive.RRD5_uid",
      sorter: (a, b) => a['MiniAppActive.RRD5_uid'] - b['MiniAppActive.RRD5_uid']
    },
    {
      title: "RRD6",
      dataIndex: "MiniAppActive.RRD6_uid",
      sorter: (a, b) => a['MiniAppActive.RRD6_uid'] - b['MiniAppActive.RRD6_uid']
    },
    {
      title: "RRD7",
      dataIndex: "MiniAppActive.RRD7_uid",
      sorter: (a, b) => a['MiniAppActive.RRD7_uid'] - b['MiniAppActive.RRD7_uid']
    },
    {
      title: "RRD14",
      dataIndex: "MiniAppActive.RRD14_uid",
      sorter: (a, b) => a['MiniAppActive.RRD14_uid'] - b['MiniAppActive.RRD14_uid']
    },
    {
      title: "RRD30",
      dataIndex: "MiniAppActive.RRD30_uid",
      sorter: (a, b) => a['MiniAppActive.RRD30_uid'] - b['MiniAppActive.RRD30_uid']
    },
  ]}
    dataSource={retentions.stats.datatables?.[0]?.data ?? []}
    pagination={{
      showQuickJumper: true,
      showSizeChanger: true,
      showTotal: (total, range) => `${range[0]}-${range[1]} trên ${total} kết quả`,
    }} />;
}

function Retention() {
  return <Card>
    <Space direction="vertical" className="w-full">
      <h4>Tỷ lệ duy trì</h4>
      <StatsRangePicker />
      <Suspense fallback={<Skeleton active />}>
        <RetentionTable />
      </Suspense>
    </Space>
  </Card>;
}

export default Retention;