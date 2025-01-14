import React from 'react';
import { concat, uniqueId } from 'lodash';
import { Option, OptionProps } from './interface';

interface group {
  groupLabel?: string;
  groupValue?: string | number;
}
const ungroupedOptionKeyPrefix = 'select_isungrouped_option_';
const ungroupedOptionKey = uniqueId(ungroupedOptionKeyPrefix);
const ungroupedOptionLabel = '未分组';
export const customOptionKeyPrefix = 'select_custom_option_';
export const customOptionKey = uniqueId(customOptionKeyPrefix);

// ReactNode To Options
export function convertNodeToOption(node: React.ReactElement, group: group): Option {
  const {
    props: { value, children, ...restProps },
  } = node as React.ReactElement & { props: OptionProps };
  const { groupValue, groupLabel } = group;
  if (groupLabel && groupLabel) {
    return { value, label: children !== undefined ? children : value, groupValue, groupLabel, ...restProps };
  }
  return { value, label: children !== undefined ? children : value, ...restProps };
}

export const getFlattenOptions = (data: Option[], hasGroup: boolean) => {
  const groupMap = new Map();
  if (!hasGroup) return data;
  data?.map((cur: Option) => {
    const gValue = groupMap.get(cur.groupValue);
    if (gValue) {
      const { options, ...rest } = gValue;
      return groupMap.set(cur.groupValue, {
        options: [...options, cur],
        ...rest,
      });
    }
    return groupMap.set(cur.groupValue, {
      label: cur.groupLabel,
      value: cur.groupValue,
      isSelectOptGroup: true,
      options: [cur],
    });
  });
  const flattenOption: Option[] = [];
  groupMap.forEach((value) => {
    flattenOption.push(value);
    flattenOption.push(...value.options);
  });
  return flattenOption;
};

export function convertChildrenToData(nodes: React.ReactNode, group = {}): Option[] {
  let nodeOptions: Option[] = [];
  React.Children.forEach(nodes, (node: React.ReactElement) => {
    if (!React.isValidElement(node)) {
      return;
    }
    const {
      type: { isSelectOptGroup },
      props: { children, label, value },
    } = node as React.ReactElement & { type: { isSelectOptGroup?: boolean }; props: OptionProps }; // 联合类型
    if (!isSelectOptGroup) {
      // option
      nodeOptions.push(convertNodeToOption(node, group));
    } else {
      // Group
      nodeOptions = concat(nodeOptions, convertChildrenToData(children, { groupLabel: label, groupValue: value }));
    }
  });
  return nodeOptions;
}
// optionsMap flattenOptions
export function handleOptions(
  mergedOptions: OptionProps[],
  setCacheOptions: (options: Option[]) => void,
  updateGroup: (value: boolean) => void
) {
  const isGroup = !!mergedOptions.find((v) => Object.prototype.hasOwnProperty.call(v, 'groupValue'));
  const flattenOptions: Option[] = [];

  mergedOptions.forEach((option: Option) => {
    const { groupLabel: optionGroupLabel, groupValue: optionGroupValue } = option;
    if (isGroup && !optionGroupValue && !optionGroupLabel) {
      const ungroupedOption = {
        ...option,
        groupLabel: ungroupedOptionLabel,
        groupValue: ungroupedOptionKey,
      };
      flattenOptions.push(ungroupedOption);
    } else {
      flattenOptions.push(option);
    }
  });
  updateGroup(isGroup);
  setCacheOptions(flattenOptions);
  return {
    flattenOptions,
    isGroup,
  };
}
// provide search matching hightlight;
export const defaultLabelRenderer =
  (input: string, prefix: string) =>
  (option: Option, isGroup: boolean): React.ReactNode => {
    const { title, label } = option;
    if (isGroup || typeof label !== 'string') return title || label;
    const index = label.indexOf(input);
    return (
      <div style={{ display: 'inline-block', lineHeight: '40px' }}>
        {label.slice(0, index)}
        <span className={`${prefix}-search-highlight`}>{label.slice(index, index + input.length)}</span>
        {label.slice(index + input.length)}
      </div>
    );
  };
export const defaultOptionLabelRenderer = (value: string | number, option?: Option) =>
  option?.title || option?.label || value;
export const defaultSearchPredicate = (input: string) => (o: Option) =>
  typeof o.label === 'string' ? o.label.includes(input) : true;
export const defaultMatchPredicate = (input: string) => (o: Option) => o.label === input;

export const CustomOption = (value: string | number, withGroup = false, id = customOptionKeyPrefix): Option =>
  withGroup
    ? {
        value,
        label: value.toString(),
        groupValue: id,
        groupLabel: '自由输入',
      }
    : {
        value,
        label: value.toString(),
      };
