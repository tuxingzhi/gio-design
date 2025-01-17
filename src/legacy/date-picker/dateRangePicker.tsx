import React from 'react';
import zhCN from 'rc-calendar/lib/locale/zh_CN';
import RcDatePicker from 'rc-calendar/lib/Picker';
import RcRangeCalendar from 'rc-calendar/lib/RangeCalendar';
import classNames from 'classnames';
import { Moment } from 'moment';
import usePrefixCls from '../../utils/hooks/use-prefix-cls';
import Button from '../../legacy/button';
import Input from '../../legacy/input';
import useDateRangePicker from './hook/useDateRangePicker';
import { DateRangePickerProps } from './interface';

export const DateRangePicker: React.FC<DateRangePickerProps> = (props: DateRangePickerProps) => {
  const {
    prefixCls: customizePrefixCls,
    format = 'YYYY/MM/DD',
    defaultValue,
    showFooter,
    disabledDate,
    disabled,
  } = props;
  const prefixCls = usePrefixCls('date-picker-legacy', customizePrefixCls);

  const { footerField, inputField, panelField, ref } = useDateRangePicker(props);

  const CalendarCls = classNames(classNames, {
    [`${prefixCls}-no-footer`]: !showFooter,
  });

  const renderFooter = () => (
    <>
      {props.renderExtraFooter && (
        <div className={classNames(`${prefixCls}-extra-footer`)}>{props.renderExtraFooter()}</div>
      )}
      <Button onClick={footerField.onCancel} type="secondary" size="middle" style={{ margin: ' 0 12px 0 0 ' }}>
        取消
      </Button>
      <Button onClick={footerField.onConfirm} size="middle">
        确定
      </Button>
    </>
  );

  const formatDate = (v: Moment) => v.format(format);

  const calendar = (
    <RcRangeCalendar
      locale={zhCN}
      format={format}
      defaultValue={defaultValue}
      disabledDate={disabledDate}
      // value={timeRange}
      onSelect={panelField.localSelect}
      onPanelChange={panelField.localPanelChange}
      showToday={false}
      showOk={false}
      showDateInput={false}
      prefixCls={prefixCls}
      className={CalendarCls}
      renderFooter={renderFooter}
    />
  );

  return (
    <div className={classNames(`${prefixCls}-wrap-range`)} onBlur={panelField.onBlur} ref={ref.selectPanelRef}>
      <RcDatePicker
        animation={showFooter ? 'slide-up' : ''}
        calendar={calendar}
        value={panelField.timeRange}
        onChange={panelField.localChange}
        prefixCls={`${prefixCls}-dropdown`}
        getCalendarContainer={() => ref.calendarContainerRef.current}
        open={panelField.open}
      >
        {({ value: _value }: { value: Array<Moment> }) => (
          <div className={classNames(`${prefixCls}-range-input`, { disabled })}>
            <Input
              placeholder="please select"
              onChange={inputField.handleLeftInputChange}
              value={inputField.leftInputTimeRange || `${formatDate(_value[0])}`}
              onClick={inputField.handleInputClick}
              disabled={disabled ?? false}
            />
            <span className={`${prefixCls}-split`}>—</span>
            <Input
              placeholder="please select"
              onChange={inputField.handleRightInputChange}
              value={inputField.rightInputTimeRange || `${formatDate(_value[1])}`}
              onClick={inputField.handleInputClick}
              disabled={disabled ?? false}
            />
            <div ref={ref.calendarContainerRef} className={classNames(`${prefixCls}-wrapper`)} />
          </div>
        )}
      </RcDatePicker>
    </div>
  );
};

export default DateRangePicker;
