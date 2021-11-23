import React from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';
import { PlusOutlined, FilterOutlined } from '@gio-design/icons';
import { CascaderProps } from '../interfance';
import Cascader from '../Cascader';
import '../style';
import './style.less';
import CascaderItem from '../../list/inner/CascaderItem';
import { List } from '../../list';
import Docs from './CascaderPage';

export default {
  title: 'Upgraded/Cascader',
  component: Cascader,
  subcomponents: { CascaderItem },
  parameters: {
    docs: {
      page: Docs,
    },
  },
} as Meta;

const defaultOptions = [
  {
    label: '苹果',
    value: 'apple',
    childrens: [
      {
        label: '切',
        value: 'cut',
        childrens: [
          {
            label: '坏了',
            value: 'bad',
          },
          {
            label: '没坏',
            value: 'good',
          },
        ],
      },
      {
        label: '掰开',
        value: 'bye',
        childrens: [
          {
            label: '坏了',
            value: 'bad',
          },
          {
            label: '没坏',
            value: 'good',
          },
        ],
      },
    ],
  },
];
const options = [...new Array(12)].map((_, index) => ({
  label: `第${index}条咸鱼`,
  value: index,
  childrens: [
    { label: '要', value: 'yes' },
    { label: '不要', value: 'no' },
  ],
}));
const demoTemplate: Story<CascaderProps> = (props) => (
  <>
    <h3>default传option</h3>
    <div className="demo-box">
      <Cascader options={defaultOptions} triggerProps={{ placeholder: '请选择' }} size="normal" {...props} />
    </div>
    <h3>default传jsx</h3>
    <div className="demo-box">
      <Cascader triggerProps={{ placeholder: '请选择', allowClear: false }} size="normal" {...props}>
        <CascaderItem label="苹果" value="apple">
          <List model="cascader">
            <CascaderItem label="切" value="cat">
              <List model="cascader">
                <CascaderItem label="坏了" value="bad" />
                <CascaderItem label="没坏" value="good" />
              </List>
            </CascaderItem>
            <CascaderItem label="掰开" value="bye" />
          </List>
        </CascaderItem>
      </Cascader>
    </div>
    <h3>自定义list,trigger宽度</h3>
    <div className="demo-box">
      <Cascader
        options={options}
        contentStyle={{ width: 240 }}
        triggerProps={{ placeholder: '请选择', allowClear: false, style: { width: 240, textAlign: 'left' } }}
        size="small"
        {...props}
      />
    </div>
    <h3>hide trigger Prefix</h3>
    <div className="demo-box">
      <Cascader
        options={options}
        overlayStyle={{ width: 240 }}
        triggerProps={{ placeholder: '请选择', style: { width: 240, textAlign: 'left' } }}
        size="small"
        {...props}
      />
    </div>
    <h3>prefix,suffix(如果设置prefix、suffix trigger在有值时会render Select的prefix、suffix)</h3>
    <div className="demo-box">
      <Cascader
        options={options}
        prefix={() => <PlusOutlined size="14px" />}
        suffix={() => <FilterOutlined size="14px" />}
        overlayStyle={{ width: 240 }}
        triggerProps={{
          placeholder: '请选择',
          style: { width: 240, textAlign: 'left' },
        }}
        size="small"
        {...props}
      />
    </div>
  </>
);

export const Demo = demoTemplate.bind({
  triggerProps: {
    placeholder: '请选择',
    allowClear: false,
  },
});
export const Default: Story<CascaderProps> = (args) => (
  <Cascader {...args} options={defaultOptions} triggerProps={{ placeholder: '请选择' }} size="normal" />
);
Default.args = {};