import { DatePicker, Radio, Space } from "antd";
import moment, { Moment } from "moment";
import { FunctionComponent } from "react";
import { useRecoilState } from "recoil";
import { rangeState, selectedRangeTemplateState } from "../../atoms/stat";

interface StatsRangePickerProps {

}

const rangeTemplates: [Moment, Moment][] = [
    [moment().subtract(6, "days").startOf('D'), moment()],
    [moment().subtract(29, "days").startOf('D'), moment()],
    [moment().startOf('month'), moment()],
    [moment().subtract(1, 'month').startOf('month'), moment().subtract(1, 'month').endOf('month')],
    [moment().startOf('year'), moment()],
]

const StatsRangePicker: FunctionComponent<StatsRangePickerProps> = () => {
    const [range, setRange] = useRecoilState(rangeState);
    const [selectedRangeTemplate, setSelectedRangeTemplate] = useRecoilState(selectedRangeTemplateState);

    return <Space className="w-full justify-between">
        <Radio.Group
            options={[{
                label: '7 ngày trước',
                value: 0,
            }, {
                label: '30 ngày trước',
                value: 1,
            }, {
                label: 'Tháng này',
                value: 2,
            }, {
                label: 'Tháng trước',
                value: 3,
            }, {
                label: 'Năm này',
                value: 4,
            }]}
            onChange={(e) => {
                setRange(rangeTemplates[e.target.value]);
                setSelectedRangeTemplate(e.target.value);
            }}
            value={selectedRangeTemplate}
            optionType="button"
            buttonStyle="solid"
        />
        <DatePicker.RangePicker
            placeholder={['Từ ngày', 'Đến ngày']}
            format="DD/MM/YYYY"
            value={range}
            onChange={values => {
                setRange(values as [Moment, Moment]);
                setSelectedRangeTemplate(null);
            }}
            allowClear={false}
        />
    </Space>;
}

export default StatsRangePicker;