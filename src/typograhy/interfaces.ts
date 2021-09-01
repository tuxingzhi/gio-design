import { CommonProps, SizeType } from '@gio-design/utils';
import { TooltipProps } from '../components/tooltip';

export interface TextProps extends Pick<CommonProps, 'className'> {
  /**
   * The text you want to clamp.
   */
  children: string;
  /**
   * The color of text
   */
  color?: 'black' | 'gray';
  /**
   * Max count of lines allowed.
   */
  lines?: number;
  /**
   * The font size of text
   */
  size?: SizeType;
  /**
   * Show tooltip when clamp text
   */
  tooltip?: Pick<TooltipProps, 'disabled' | 'placement'>;
  /**
   * Trim right the clamped text to avoid putting the ellipsis on an empty line.
   */
  trimRight?: boolean;
}
