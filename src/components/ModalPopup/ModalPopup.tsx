import React, {Dispatch, SetStateAction} from 'react';
import styles from './ModalPopup.module.css'

type ModalPopupPropsType = {
    modalActive: boolean
    setModalActive: Dispatch<SetStateAction<boolean>>
    children: JSX.Element
}

export const ModalPopup = (props: ModalPopupPropsType) => {

    const stylesForModalPopup = props.modalActive ? `${styles.modalPopup} ${styles.active}` : 'styles.modalPopup'
    const stylesForModalContent = props.modalActive ? `${styles.modalContent} ${styles.active}` : 'styles.modalContent'

    return (
        <div className={stylesForModalPopup} onClick={() => props.setModalActive(false)}>
            <div className={styles.modalContent} onClick={e => e.stopPropagation()}>
                {props.children}
            </div>
        </div>
    );
};
