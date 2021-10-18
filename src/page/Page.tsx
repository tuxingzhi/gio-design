import React from 'react';
import classnames from 'classnames';
import { usePrefixCls } from '@gio-design/utils';
import { PageProps } from './interfaces';
import ForbiddenSVG from './ForbiddenSVG';
import NotFoundSVG from './NotFoundSVG';
import InternalServerErrorSVG from './InternalServerErrorSVG';
import Button from '../components/button';

const statusCodeMap = {
  403: ForbiddenSVG,
  404: NotFoundSVG,
  500: InternalServerErrorSVG,
};

function Page({ className, style, statusCode, description, cta }: PageProps) {
  const prefixCls = usePrefixCls('page');
  const cls = classnames(prefixCls, className);
  return (
    <div className={cls} style={style}>
      <div className={`${prefixCls}__image`}>{React.createElement(statusCodeMap[statusCode])}</div>
      <div className={`${prefixCls}__description`}>{description}</div>
      {cta && (
        <div className={`${prefixCls}__footer`}>
          <Button size="large" onClick={cta.onClick}>
            {cta.text}
          </Button>
        </div>
      )}
    </div>
  );
}

export default Page;