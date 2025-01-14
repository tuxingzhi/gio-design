import React from 'react';
import { WarningCircleFilled } from '@gio-design/icons';
import { usePrefixCls } from '@gio-design/utils';
import Tooltip from '../tooltip';
import Button from '../../button';
import { PopconfirmProps } from './interface';
import useControlledState from '../../utils/hooks/useControlledState';
import getPlacements from '../tooltip/placements';

const Popconfirm: React.FC<PopconfirmProps> = (props: PopconfirmProps) => {
  const {
    title,
    desc,
    onCancel,
    onConfirm,
    okText = '确认',
    cancelText = '取消',
    children,
    prefixCls: customizePrefixCls,
    subPrefixCls = 'popconfirm-legacy',
    visible,
    arrowPointAtCenter,
    autoAdjustOverflow,
    // defaultVisible,
    onVisibleChange,
    icon,
    ...rest
  } = props;
  const [controlledVisible, setControlledVisible] = useControlledState<boolean>(visible, false);
  const prefixCls = usePrefixCls(subPrefixCls, customizePrefixCls);

  const popConfirmOnVisibleChange = (value: boolean) => {
    setControlledVisible(value);
    onVisibleChange?.(value);
  };

  const popConfirmOverlay = () => (
    <>
      {icon || <WarningCircleFilled size="16px" color="#F7AF48" style={{ position: 'absolute', top: '22px' }} />}
      <div className={`${prefixCls}-inner-title`}>{title}</div>
      {desc && <div className={`${prefixCls}-inner-desc`}>{desc}</div>}
      <div className={`${prefixCls}-inner-btns`}>
        <Button
          size="small"
          type="secondary"
          onClick={(e) => {
            popConfirmOnVisibleChange(false);
            onCancel?.(e);
          }}
        >
          {cancelText}
        </Button>
        <Button
          size="small"
          onClick={(e) => {
            popConfirmOnVisibleChange(false);
            onConfirm?.(e);
          }}
        >
          {okText}
        </Button>
      </div>
    </>
  );

  return (
    <Tooltip
      prefixCls={customizePrefixCls}
      subPrefixCls="popconfirm"
      visible={controlledVisible}
      onVisibleChange={popConfirmOnVisibleChange}
      overlayInnerStyle={{ width: desc ? 400 : 260 }}
      overlay={popConfirmOverlay()}
      trigger="click"
      builtinPlacements={getPlacements({ arrowPointAtCenter, autoAdjustOverflow, arrowWidth: 12 })}
      {...rest}
    >
      {children}
    </Tooltip>
  );
};

export default Popconfirm;
