import { LeftDoubleOutlined, LeftOutlined, RightDoubleOutlined, RightOutlined } from '@gio-design/icons';
import React, { useContext } from 'react';
import { IconButton } from '../index';
import { PaginationItemProps, PaginationItemType } from './interface';
import { PaginationContext } from './Pagination';

const PaginationItem: React.FC<PaginationItemProps> = (props) => {
  // prettier-ignore
  const {
    'aria-current': ariaCurrent,
    'aria-label': ariaLabel,
    disabled,
    onClick,
    page,
    type,
    active
  } = props;

  const { prefixCls } = useContext(PaginationContext);

  const icon = {
    [PaginationItemType.First]: <LeftDoubleOutlined />,
    [PaginationItemType.Previous]: <LeftOutlined />,
    [PaginationItemType.Next]: <RightOutlined />,
    [PaginationItemType.Last]: <RightDoubleOutlined />,
  };

  return (
    <IconButton
      disabled={disabled}
      type="secondary"
      size="small"
      active={active}
      onClick={onClick}
      aria-label={ariaLabel}
      aria-current={ariaCurrent}
    >
      {type === PaginationItemType.Page ? (
        <span className={`${prefixCls}__page__button-text`}>{page}</span>
      ) : (
        icon[type]
      )}
    </IconButton>
  );
};

export default PaginationItem;
