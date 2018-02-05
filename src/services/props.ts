export interface IProps {
  className?: string;
}

export interface IActionProps extends IProps {
  disabled?: boolean;
  iconName?: string;
  onClick?: (event: React.MouseEvent<HTMLElement>) => void;
  text?: string;
}

export interface ILinkProps {
  href?: string;
  target?: string;
}

export interface IControlledProps {
  defaultValue?: string;
  onChange?: React.FormEventHandler<HTMLElement>;
  value?: string;
}

export interface IOptionProps extends IProps {
  disabled?: boolean;
  label: string;
  value: string;
}
