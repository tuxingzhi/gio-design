import React, { useState, useContext, useEffect } from 'react';
import { isFunction, isObject } from 'lodash';
import { useLocale } from '@gio-design/utils';
import Button from '../button';
import Popover from '../popover';
import FilterList from './FilterList';
import SearchBar from '../search-bar';
import { TableContext } from './Table';
import { FilterType, Key } from './interface';
import defaultLocale from './locales/zh-CN';

interface FilterPopoverProps {
  prefixCls: string;
  children: React.ReactElement;
  onClick: (newFilterState: Key[]) => void;
  filters?: FilterType[];
  values: Key[];
  /**
   * @default '搜索过滤条件'
   */
  placeholder?: string;
}

const FilterPopover = (props: FilterPopoverProps): React.ReactElement => {
  const locale = useLocale('Table');
  const { clearText, okText, searchText }: typeof defaultLocale = {
    ...defaultLocale,
    ...locale,
  };

  const { children, onClick, filters = [], values, prefixCls, placeholder = searchText } = props;
  const [searchValue, setSearchValue] = useState<string>('');
  const [selectFilterKeys, setSelectFilterKeys] = useState<Key[]>(values);
  const [visible, setVisible] = useState<boolean>(false);
  const { tableRef } = useContext(TableContext);

  useEffect(() => {
    if (visible) {
      setSelectFilterKeys(values);
    }
  }, [values, visible]);

  return (
    <Popover
      getContainer={(triggerNode) =>
        (!isFunction(tableRef) && tableRef?.current) || triggerNode?.parentElement || document.body
      }
      visible={visible}
      onVisibleChange={(_visible: boolean) => {
        setVisible(_visible);
        if (_visible === false) {
          setSearchValue('');
          setSelectFilterKeys(values);
        }
      }}
      placement="bottomLeft"
      trigger="click"
      overlayClassName={`${prefixCls}-filter-popover`}
      content={
        <>
          <SearchBar
            placeholder={placeholder}
            size="small"
            value={searchValue}
            onChange={(event) => setSearchValue(event.target.value)}
            className={`${prefixCls}-search-bar`}
          />
          <FilterList
            prefixCls={prefixCls}
            value={selectFilterKeys}
            onChange={(keys) => {
              setSelectFilterKeys(keys);
            }}
            dataSource={filters
              .filter((item) => {
                if (isObject(item)) {
                  return item.label.includes(searchValue);
                }
                return item.toString().includes(searchValue);
              })
              .map((item) => {
                if (isObject(item)) {
                  return { value: item.value, label: item.label };
                }
                return { value: item.toString(), label: item.toString() };
              })}
          />
          <div className={`${prefixCls}-filter-popover-footer`}>
            <Button
              style={{ color: '#c7cbd8' }}
              type="text"
              size="small"
              onClick={() => {
                setSearchValue('');
                setSelectFilterKeys([]);
              }}
            >
              {clearText}
            </Button>
            <Button
              style={{ float: 'right' }}
              size="small"
              onClick={() => {
                onClick(selectFilterKeys);
                setVisible(false);
              }}
            >
              {okText}
            </Button>
          </div>
        </>
      }
    >
      {children}
    </Popover>
  );
};

export default FilterPopover;
