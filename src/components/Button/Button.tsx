import { ButtonHTMLAttributes, FC } from 'react';
import classNames from 'classnames';

import styles from './Button.module.scss';

const Button: FC<ButtonHTMLAttributes<HTMLButtonElement>> = ({
  title,
  type = 'button',
  className,
  children,
  ...props
}) => (
  <button type={type} className={classNames(styles.button, className)} {...props}>
    {title}
    {children}
  </button>
);

export { Button };
