import { Input } from "antd";
import { TextAreaProps } from "antd/lib/input";
import { FunctionComponent, useRef, useState } from "react";
import { SmileOutlined } from '@ant-design/icons'
import Picker, { IEmojiData } from 'emoji-picker-react';
import { useClickAway } from "ahooks";
import { TextAreaRef } from "antd/lib/input/TextArea";

const { TextArea } = Input;

interface EmojiTextareaProps extends Omit<TextAreaProps, 'onChange'> {
  value: string
  onChange: (value: string) => any
}

const EmojiTextarea: FunctionComponent<EmojiTextareaProps> = ({ value, onChange, ...props }) => {
  const [visible, setVisible] = useState(false)
  const wrapper = useRef<HTMLDivElement | null>(null);
  const textarea = useRef<TextAreaRef | null>(null);
  useClickAway(() => {
    setVisible(false);
  }, wrapper);

  const handleEmojiClick = (event: React.MouseEvent<Element, MouseEvent>, data: IEmojiData) => {
    onChange(value + data.emoji)
    textarea.current?.focus()
  };

  return <div ref={wrapper} className="relative">
    <TextArea ref={textarea} {...props} value={value} onChange={e => onChange(e.target.value)} />
    <SmileOutlined onClick={() => setVisible(!visible)} style={{ position: 'absolute', right: 8, bottom: 12 }} />
    <div
      style={{
        display: visible ? 'block' : 'none',
        zIndex: 10,
        position: 'absolute',
        bottom: 0,
        right: -284
      }}>
      <Picker onEmojiClick={handleEmojiClick} />
    </div>
  </div>;
}

export default EmojiTextarea;