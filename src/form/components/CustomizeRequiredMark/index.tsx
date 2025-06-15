import { Space } from 'antd';
import './styles.scss';

const CustomizeRequiredMark = (label: React.ReactNode, { required }: { required: boolean }) => {
  return (
    <Space size={[4, 4]} className='customize-required-mark'>
      {label}
      {required && <div className='mark'>*</div>}
    </Space>
  );
};
export default CustomizeRequiredMark;
