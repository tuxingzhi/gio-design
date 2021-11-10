import React, { useRef, useState, useEffect, useMemo } from 'react';
import classNames from 'classnames';
import Popover from '../popover';
import PropertyPicker from './PropertyPicker';
import { PropertyValue, PropertySelectorProps } from './interfaces';
import Selector from '../selector';
import IconRender from './PropertyValueIconRender';
import PropertyCard from './PropertyCard';
import { promisify } from './util';
import usePrefixCls from '../utils/hooks/use-prefix-cls';

const PropertySelector: React.FC<PropertySelectorProps> = (props) => {
  const {
    borderless = true,
    size,
    disabled,
    placeholder = '选择属性',
    dropdownVisible,
    onDropdownVisibleChange,
    className,
    value,
    dataSource,
    onSelect,
    onChange,
    ...pickerRestProps
  } = props;
  const [dropdownVisibleInner, setDropdownVisibleInner] = useState(dropdownVisible);
  const [currentValue, setCurrentValue] = useState<PropertyValue | undefined>(value);
  useEffect(() => {
    setCurrentValue(value);
  }, [value]);
  const inputText = useMemo(() => currentValue?.name || currentValue?.label, [currentValue]);
  const inputValueRef = useRef<HTMLSpanElement | null>(null);

  const prefixCls = usePrefixCls('property-selector');
  const selectorCls = classNames(prefixCls, className);

  function handleDropDownVisibleChange(show: boolean) {
    onDropdownVisibleChange?.(show);
    setDropdownVisibleInner(show);
  }

  function handleValueChange(newValue: PropertyValue) {
    onChange?.(newValue);
  }

  function handleSelect(item: PropertyValue) {
    setCurrentValue(item);
    onSelect?.(item);
    setDropdownVisibleInner(false);
  }

  const dropdownRender = () => (
    <PropertyPicker
      className={`${prefixCls}-dropdown`}
      {...pickerRestProps}
      shouldUpdateRecentlyUsed={dropdownVisibleInner}
      value={currentValue}
      dataSource={dataSource}
      onChange={handleValueChange}
      onSelect={handleSelect}
    />
  );

  const fetchDetail = pickerRestProps.fetchDetailData ?? (async (data: unknown) => data);
  const inputRender = () => {
    const content = () => currentValue && <PropertyCard nodeData={currentValue} fetchData={promisify(fetchDetail)} />;
    return (
      currentValue && (
        <>
          <Popover
            overlayClassName="property-card-overlay"
            placement="bottomLeft"
            content={content()}
            arrowPointAtCenter={false}
          >
            <span className="inner-input-wrap" ref={inputValueRef}>
              <span className="icon">
                <IconRender group={currentValue?.subGroupId} />
              </span>
              <span>{inputText}</span>
            </span>
          </Popover>
        </>
      )
    );
  };
  return (
    <>
      <Selector
        size={size}
        className={selectorCls}
        borderless={borderless}
        disabled={disabled}
        placeholder={placeholder}
        visible={dropdownVisibleInner}
        overlay={dropdownRender}
        onVisibleChange={handleDropDownVisibleChange}
        itemRender={inputRender}
      />
    </>
  );
};
export default PropertySelector;
