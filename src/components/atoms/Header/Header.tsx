import React from 'react'
import { Link } from '../../atoms/Link/Link'
import styles from './Header.module.css'

export const Header: React.FC = () => (
  <header className={styles.header}>
    <Link
      href="https://github.com/yansudeansu/pomodoro"
      external
      showIcon
      aria-label="View source on GitHub"
    >
      GitHub
    </Link>
  </header>
)
