import styles from './modal.module.css'

export type ModalProps = {
    children: HTMLElement,
    modalVisible: boolean
    hideModal: () => void
};

const Modal = (props: ModalProps) => {
    if (!props.modalVisible) {
        return null;
    }
    return (
        <div className={styles.modalContainer}>
            <div className={styles.modalContent}>
                <button className={styles.closeButton} aria-label="Close"
                        onClick={() => props.hideModal()}>×
                </button>
                {props.children}
            </div>
        </div>
    );
};

export default Modal;