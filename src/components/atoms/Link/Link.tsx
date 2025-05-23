import React from 'react';
import styles from './Link.module.css';
import { AppIcons } from '../Icons/Icons';

interface LinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  children: React.ReactNode;
  href: string;
  external?: boolean;
  showIcon?: boolean;
}

export const Link: React.FC<LinkProps> = ({
  children,
  href,
  external = false,
  showIcon = false,
  className,
  title,
  ...rest
}) => {
  const LinkIcon = AppIcons.link;

  return (
    <a
      href={href}
      className={`${styles.link} ${className ?? ''}`}
      target={external ? '_blank' : undefined}
      rel={external ? 'noopener noreferrer' : undefined}
      title={title ?? (typeof children === 'string' ? children : undefined)}
      {...rest}
    >
      {children}
      {external && showIcon && <LinkIcon size={14} className={styles.icon} />}
    </a>
  );
};
