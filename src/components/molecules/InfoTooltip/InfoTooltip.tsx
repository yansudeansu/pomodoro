import React, { useState } from 'react';
import styles from './InfoTooltip.module.css';
import { AppIcons } from '../../atoms/Icons/Icons';

export const InfoTooltip: React.FC = () => {
  const [open, setOpen] = useState(false);
  const InfoIcon = AppIcons.info;
  const CheckIcon = AppIcons.sparkle;
  const CutIcon = AppIcons.trash;
  const CalendarIcon = AppIcons.add;
  const BrainIcon = AppIcons.sparkles;

  const toggleOpen = () => setOpen((prev) => !prev);
  const closeTooltip = () => setOpen(false);

  return (
    <>
      <div className={styles.container} tabIndex={0} onBlur={closeTooltip}>
        <button onClick={toggleOpen} className={styles.iconButton} aria-label="Toggle info">
          <InfoIcon size={18} />
        </button>

        {open && (
          <>
            <div className={styles.tooltip}>
              <strong className={styles.header}>Pomodoro Planning Tips</strong>
              <ul className={styles.list}>
                <li>
                  <CheckIcon size={16} /> Work in focused 25-minute blocks
                </li>
                <li>
                  <CheckIcon size={16} /> Max 4 pomodoros per task
                </li>
                <li>
                  <CutIcon size={16} /> Break big tasks into smaller ones
                </li>
                <li>
                  <CalendarIcon size={16} /> Consider meetings & distractions
                </li>
                <li>
                  <BrainIcon size={16} /> Take regular breaks
                </li>
              </ul>
            </div>
          </>
        )}
      </div>

      {open && (
        <div className={styles.backdrop} onClick={closeTooltip} data-testid="tooltip-backdrop" />
      )}
    </>
  );
};
