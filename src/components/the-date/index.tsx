import moment from "moment";
import { FunctionComponent, useMemo } from "react";
import { Tooltip } from 'antd';

moment.locale('vi', {
  relativeTime: {
    future: '%s tới',
    past: '%s trước',
    s: 'vài giây',
    ss: '%d giây',
    m: 'một phút',
    mm: '%d phút',
    h: 'một giờ',
    hh: '%d giờ',
    d: 'một ngày',
    dd: '%d ngày',
    w: 'một tuần',
    ww: '%d tuần',
    M: 'một tháng',
    MM: '%d tháng',
    y: 'một năm',
    yy: '%d năm',
  },
})

interface TheDateProps {
  value: Date
  reverse?: boolean
  noTooltip?: boolean
  format?: string
}

const TheDate: FunctionComponent<TheDateProps> = ({ value, reverse, noTooltip, format }) => {
  const relativeTime = useMemo(() => {
    return moment(value).fromNow()
  }, [value])
  const text = useMemo(() => {
    return moment(value).format(format ?? 'HH:mm [ngày] DD/MM/YYYY');
  }, [value, format])
  return <Tooltip overlay={noTooltip ? null : <div className="text-center">{reverse ? relativeTime : text}</div>}>{reverse ? text : relativeTime}</Tooltip>;
}

export default TheDate;