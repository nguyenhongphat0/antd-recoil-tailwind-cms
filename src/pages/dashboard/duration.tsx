import { Area } from "@ant-design/charts";
import { Card, Col, Row, Skeleton, Space } from "antd";
import { Suspense, useMemo } from "react";
import { useRecoilValue } from "recoil";
import { useChartData } from ".";
import { durationByUserStatsSelector, durationStatsSelector } from "../../atoms/stat";
import RangeSelection from "../stats/range-selection";

function TheChart() {
  const durationStats = useRecoilValue(durationStatsSelector);
  const durationByUserStats = useRecoilValue(durationByUserStatsSelector);

  const dataPerSession = useChartData(durationStats, "Time", "Seconds");
  const dataPerUser = useChartData(durationByUserStats, "Time", "Seconds");
  const data = useMemo(() => {
    return [
      ...dataPerSession.map(s => ({ ...s, per: 'Thời gian trung bình trên trang/Session' })),
      ...dataPerUser.map(s => ({ ...s, per: 'Thời gian trung bình trên trang/Người dùng' })),
    ]
  }, [dataPerSession, dataPerUser]);

  return <Area
    isStack={false}
    data={data}
    xField="Time"
    yField="Seconds"
    seriesField="per"
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
        text: "Giây (s)"
      }
    }}
    color={['#1979C9', '#D62A0D', '#FAA219']}
  />
}

function Duration() {
  return <Card>
    <Row justify="space-between">
      <Col>
        <h4>Thời gian hoạt động</h4>
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

export default Duration;