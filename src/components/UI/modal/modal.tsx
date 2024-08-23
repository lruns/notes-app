import styles from './modal.module.css'

export type ModalProps = {
    children: HTMLElement,
    active: boolean
    setModalVisible: (visible: boolean) => void
};

const Modal = (props: ModalProps) => {
    if (!props.active) {
        return null;
    }
    return (
        <div className={styles.modalContainer}>
            <div className={styles.modalContent}>
                <button className={styles.closeButton} aria-label="Close"
                        onClick={() => props.setModalVisible(false)}>×
                </button>
                {props.children}
            </div>
        </div>
    );
};

export default Modal;