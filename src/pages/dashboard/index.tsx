import { Col, Row, Space } from "antd";
import moment from "moment";
import { useMemo } from "react";
import { useRecoilValue } from "recoil";
import { rangeOptionState } from "../../atoms/stat";
import { Stat } from "../../models/stat";
import Duration from "./duration";
import PageViews from "./page-views";
import Retention from "./retention";
import Traffics from "./traffics";

export const useChartData = (stats: Stat[], x: string, y: string) => {
  const selectedTimeRange = useRecoilValue(rangeOptionState);

  const data = useMemo(() => {
    if (selectedTimeRange === 1) {
      return stats.map((stat) => {
        const timestamp = Number(stat.time) * 1000;
        const date = moment(timestamp).format("HH:mm");
        return {
          [x]: date,
          [y]: stat.count
        }
      });
    } else {
      return stats.map((stat) => {
        const timestamp = Number(stat.time) * 1000;
        const date = moment(timestamp).format("DD/MM/YYYY");
        return {
          [x]: date,
          [y]: stat.count
        }
      });
    }
  }, [selectedTimeRange, stats, x, y]);
  return data;
}

function Dashboard() {

  return <Space className="w-full p-2 pb-0" direction="vertical">
    <Traffics />
    <Retention />
    <Row gutter={8}>
      <Col span={24} xxl={12} className="mb-2">
        <PageViews />
      </Col>
      <Col span={24} xxl={12} className="mb-2">
        <Duration />
      </Col>
    </Row>
  </Space>
}

export default Dashboard;