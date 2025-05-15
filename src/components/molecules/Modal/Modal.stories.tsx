import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Modal } from './Modal';
import { Button } from '../../atoms/Button/Button';
import styles from './Modal.module.css';

const meta: Meta<typeof Modal> = {
  title: 'Molecules/Modal',
  component: Modal,
  args: {
    children: <p>This is the modal content.</p>,
  },
};

export default meta;
type Story = StoryObj<typeof Modal>;

export const Default: Story = {
  render: (args) => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [isOpen, setIsOpen] = useState(false);

    return (
      <>
        <Button onClick={() => setIsOpen(true)}>Open Modal</Button>
        <Modal
          {...args}
          isOpen={isOpen}
          onClose={() => {
            setIsOpen(false);
          }}
        >
          <div className={styles.modalContent}>
            <h2 style={{ margin: 0 }}>Example Modal</h2>
            <p>This is a modal rendered in Storybook.</p>
            <Button onClick={() => setIsOpen(false)}>Close</Button>
          </div>
        </Modal>
      </>
    );
  },
};
