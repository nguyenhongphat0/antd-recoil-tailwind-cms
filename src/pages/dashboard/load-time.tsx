import { Area } from "@ant-design/charts";
import { Card, Col, Row, Skeleton, Space } from "antd";
import { Suspense } from "react";
import { useRecoilValue } from "recoil";
import { useChartData } from ".";
import { loadTimeStatsSelector } from "../../atoms/stat";
import RangeSelection from "../stats/range-selection";

function TheChart() {
  const loadTimeStats = useRecoilValue(loadTimeStatsSelector);

  const data = useChartData(loadTimeStats, 'Time', 'Miliseconds');

  return <Area
    data={data}
    xField="Time"
    yField="Miliseconds"
    xAxis={{
      title: {
        text: "Thời gian"
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
        text: "Miliseconds (ms)"
      }
    }}
    color={['#1979C9']}
  />
}

function LoadTime() {
  return <Card>
    <Row justify="space-between">
      <Col>
        <h4>Thời gian tải trang</h4>
      </Col>
      <Col>
        <Space>
          <RangeSelection />
        </Space>
      </Col>
    </Row>
    <Suspense fallback={<Skeleton active style={{ height: 400 }} />}>
      <TheChart />
    </Suspense>
  </Card>
}

export default LoadTime;