import dayjsGenerateConfig from 'rc-picker/lib/generate/dayjs';
import generatePicker from 'antd4/lib/date-picker/generatePicker';

const DatePicker = generatePicker(dayjsGenerateConfig);

export default DatePicker;
