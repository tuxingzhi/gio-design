export interface TogglesProps {
  /**
   `toggle` 选中时的后缀节点
   */
  checkedChildren?: React.ReactNode;
  /**
   `toggle` 未选中时的后缀节点
   */
  uncheckedChildren?: React.ReactNode;
  /**
   初始是否选中
   */
  defaultOn?: boolean;
  /**
   失效状态
   */
  disabled?: boolean;
  /**
   尺寸
   */
  size?: string;
  /**
   变化时回调函数
   */
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  /**
  /**
   自定义 `className`
   */
  className?: string;
  /**
    Toggles控制字段
  */
  on?: boolean;

  style?: React.CSSProperties;
}
