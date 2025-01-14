import React from 'react';
import { Canvas, Title, Heading, Story, Subheading, ArgsTable } from '@storybook/addon-docs';
import { useIntl } from 'react-intl';
import Input from '../Input';

export default function ListPage() {
  const { formatMessage } = useIntl();

  return (
    <>
      <Title>{formatMessage({ defaultMessage: 'Input 输入框' })}</Title>
      <p>
        {formatMessage({
          defaultMessage:
            '通过鼠标或键盘输入内容，是最基础的表单域的包装。区别于Select/选择器，Input允许用户直接在框内输入字符。:',
        })}
      </p>
      <p>
        <a href="https://www.figma.com/file/lLYusioN7e9ifkQnIXeT4G/GIO-Design-(Running-File)?node-id=4078%3A37260">
          Figma
        </a>
      </p>
      <p>Upgrading Guide</p>
      <ul>
        <li>样式变化：边框，圆角，字体颜色，</li>
        <li>APi变动：Input，InputNumber,Password,TextArea,InputButton,提供了4种input需求</li>
        <li>改动较多，删除了非必须api</li>
      </ul>
      <Heading>{formatMessage({ defaultMessage: '代码演示' })}</Heading>
      <Subheading>{formatMessage({ defaultMessage: 'Input样例展示' })}</Subheading>
      <Canvas>
        <Story id="upgraded-input--demo" />
      </Canvas>
      <Subheading>{formatMessage({ defaultMessage: '文本输入框' })}</Subheading>
      <Canvas>
        <Story id="upgraded-input--text" />
      </Canvas>
      <Subheading>{formatMessage({ defaultMessage: '数字输入框' })}</Subheading>
      <Canvas>
        <Story id="upgraded-input--input-number-demo" />
      </Canvas>
      <Subheading>{formatMessage({ defaultMessage: '密码输入框' })}</Subheading>
      <Canvas>
        <Story id="upgraded-input--password-demo" />
      </Canvas>
      <Subheading>{formatMessage({ defaultMessage: '文本区域' })}</Subheading>
      <Canvas>
        <Story id="upgraded-input--textarea-demo" />
      </Canvas>
      <Subheading>{formatMessage({ defaultMessage: 'Input.Button样例展示' })}</Subheading>
      <Canvas>
        <Story id="upgraded-input--input-button-demo" />
      </Canvas>
      <Subheading>{formatMessage({ defaultMessage: 'default' })}</Subheading>
      <Canvas>
        <Story id="upgraded-input--input-button-default" />
      </Canvas>
      <Subheading>{formatMessage({ defaultMessage: '自定义前后缀icon' })}</Subheading>
      <Canvas>
        <Story id="upgraded-input--input-button-custom-icon" />
      </Canvas>
      <Heading>{formatMessage({ defaultMessage: '参数说明' })}</Heading>
      <ArgsTable of={Input} />
    </>
  );
}
