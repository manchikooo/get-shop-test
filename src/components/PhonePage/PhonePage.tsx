import React, {useState} from 'react';
import NumberFormat from 'react-number-format'
import styles from './PhonePage.module.css'

const PhonePage = () => {

    const [phoneValue, setPhoneValue] = useState<string>('')
    console.log(phoneValue)

    const changePhoneNumber = (e: React.ChangeEvent<HTMLInputElement>) => {
        console.log(e.currentTarget.value)
        setPhoneValue(e.currentTarget.value)
    }

    const onClickHandler = (number: string) => {
        setPhoneValue(phoneValue => phoneValue + number)
    }
    const removeLastNumber = () => {
        setPhoneValue(phoneValue => phoneValue.slice(0, -1))
    }

    const buttons = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0']
    const mappedButtons = buttons.map(but => {
        return (
            <button key={but}
                    className={styles.phoneNumberButton}
                    onClick={() => onClickHandler(but)}>
                {but}
            </button>
        )
    })
    return (
        <div className={styles.phonePageContainer}>
            <div className={styles.phoneInputBlock}>
                <NumberFormat className={styles.phoneInput}
                              placeholder='+7 (___) ___-__-__'
                              format="+7 (###) ###-##-##"
                              allowEmptyFormatting
                              mask="_"
                              value={phoneValue}
                              onChange={changePhoneNumber}
                />
                <div className={styles.buttonsBlock}>
                    {mappedButtons}
                    <button className={styles.deleteButton}
                            onClick={removeLastNumber}>
                        стереть
                    </button>
                </div>
            </div>

        </div>
    );
};

export default PhonePage;