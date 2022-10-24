import { Radio } from "antd";
import { FunctionComponent } from "react";
import { useRecoilState } from "recoil";
import { rangeOptionState } from "../../atoms/stat";

interface RangeSelectionProps {

}

const RangeSelection: FunctionComponent<RangeSelectionProps> = () => {
  const [value, setValue] = useRecoilState(rangeOptionState);
  return <Radio.Group
    options={[{
      label: '24h',
      value: 1,
    }, {
      label: '30 ngày',
      value: 30,
    }]}
    value={value}
    onChange={(e) => setValue(e.target.value)}
    optionType="button"
    buttonStyle="solid"
  />
}

export default RangeSelection;