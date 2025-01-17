import React from 'react';
import { Canvas, Title, Heading, Story, Subheading, ArgsTable } from '@storybook/addon-docs';
import { useIntl } from 'react-intl';
import Form from '../index';

export default function FormPage() {
  const { formatMessage } = useIntl();

  return (
    <>
      <Title>{formatMessage({ defaultMessage: 'Form 表单' })}</Title>
      <p>{formatMessage({ defaultMessage: '高性能表单控件，自带数据域管理。包含数据录入、校验以及对应样式。' })}</p>
      <Heading>{formatMessage({ defaultMessage: '代码演示' })}</Heading>

      <Subheading>{formatMessage({ defaultMessage: '基础用法' })}</Subheading>
      <Canvas>
        <Story id="legacy-form--default" />
      </Canvas>

      <Subheading>{formatMessage({ defaultMessage: 'Item' })}</Subheading>
      <Canvas>
        <Story id="legacy-form--default" />
      </Canvas>

      <Subheading>{formatMessage({ defaultMessage: '弹窗表单' })}</Subheading>
      <Canvas>
        <Story id="legacy-form--form-with-modal" />
      </Canvas>

      <Subheading>{formatMessage({ defaultMessage: '多行表单' })}</Subheading>
      <Canvas>
        <Story id="legacy-form--multiple-form" />
      </Canvas>

      <Heading>{formatMessage({ defaultMessage: '参数说明' })}</Heading>
      <ArgsTable of={Form} />
    </>
  );
}
