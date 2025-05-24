import styles from './Modal.module.css';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  position?: 'top' | 'bottom';
}

export const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children, position = 'top' }) => {
  if (!isOpen) return null;

  return (
    <div
      data-testid="modal-backdrop"
      className={`${styles.backdrop} ${styles[`position-${position}`]}`}
      onClick={onClose}
    >
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        {children}
      </div>
    </div>
  );
};
