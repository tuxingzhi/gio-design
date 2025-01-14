import React from 'react';
import { Canvas, Title, Heading, Story, Subheading, ArgsTable } from '@storybook/addon-docs';
import { useIntl } from 'react-intl';
import Tag from '../Tag';

export default function EmptyPage() {
  const { formatMessage } = useIntl();

  return (
    <>
      <Title>{formatMessage({ defaultMessage: 'Tag 标签' })}</Title>
      <p>{formatMessage({ defaultMessage: '进行标记和分类的标签，作为已选内容的标签。' })}</p>
      <p>
        <a href="https://www.figma.com/file/lLYusioN7e9ifkQnIXeT4G/GIO-Design-(Running-File)?node-id=4092%3A41171">
          Figma
        </a>
      </p>
      <p>Upgrading Guide</p>
      <ul>
        <li>样式更新：颜色更新</li>
        <li> 移除了color接口，移除了hover时closeicon</li>
        <li> status 有6种状态default, draft, info, success, warning, error,</li>
        <li>type=prorupt变成了type=highlight变成高亮状态</li>
      </ul>
      <Heading>{formatMessage({ defaultMessage: '代码演示' })}</Heading>
      <Subheading>{formatMessage({ defaultMessage: '样例展示' })}</Subheading>
      <Canvas>
        <Story id="upgraded-tag--demo" />
      </Canvas>
      <Subheading>{formatMessage({ defaultMessage: 'default' })}</Subheading>
      <Canvas>
        <Story id="upgraded-tag--default" />
      </Canvas>
      <Subheading>{formatMessage({ defaultMessage: '可关闭' })}</Subheading>
      <Canvas>
        <Story id="upgraded-tag--closable" />
      </Canvas>
      <Subheading>{formatMessage({ defaultMessage: 'disabled' })}</Subheading>
      <Canvas>
        <Story id="upgraded-tag--disable" />
      </Canvas>

      <Heading>{formatMessage({ defaultMessage: '参数说明' })}</Heading>
      <ArgsTable of={Tag} />
    </>
  );
}
