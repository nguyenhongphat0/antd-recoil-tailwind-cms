import { Area } from "@ant-design/charts";
import { Card, Col, Row, Skeleton, Space } from "antd";
import { Suspense } from "react";
import { useRecoilValue } from "recoil";
import { useChartData } from ".";
import { pageViewStatsSelector } from "../../atoms/stat";
import RangeSelection from "../stats/range-selection";

function TheChart() {
  const pageViewStats = useRecoilValue(pageViewStatsSelector);

  const data = useChartData(pageViewStats, 'Time', 'Views');

  return <Area
    data={data}
    xField="Time"
    yField="Views"
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
        text: "Lượt xem"
      }
    }}
    color={['#FAA219']}
  />
}

function PageViews() {
  return <Card>
    <Row justify="space-between">
      <Col>
        <h4>Lượt xem trang</h4>
      </Col>
      <Col>
        <Space>
          <RangeSelection />
        </Space>
      </Col>
    </Row>
    <Suspense fallback={<Skeleton />}>
      <TheChart />
    </Suspense>
  </Card>
}

export default PageViews;