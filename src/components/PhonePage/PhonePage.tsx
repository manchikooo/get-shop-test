import React, {useState} from 'react';
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'
import styles from './PhonePage.module.css'
import {useNavigate} from "react-router-dom";

const PhonePage = () => {

    const [phoneValue, setPhoneValue] = useState<string>('+7')
    const [agreement, setAgreement] = useState<boolean>(false)
    const navigationBack = useNavigate()

    console.log(phoneValue)

    const changePhoneNumber = (e: string) => {
        console.log(e)
        if (phoneValue.length < 12) {
            return setPhoneValue(e)
        }
    }

    const onNumberButtonClickHandler = (number: string) => {
        if (phoneValue.length < 12) {
            return setPhoneValue(phoneValue => phoneValue + number)
        }
    }
    const removeLastNumber = () => {
        if (phoneValue === '+7') {
            return
        } else {
            return setPhoneValue(phoneValue => phoneValue.slice(0, -1))
        }
    }

    const onPersonalDataCheckboxClick = (e: React.ChangeEvent<HTMLInputElement>) => {
        setAgreement(e.currentTarget.checked)
    }

    const buttons = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0']
    const mappedButtons = buttons.map(but => {
        return (
            <button key={but}
                    className={styles.phoneNumberButton}
                    onClick={() => onNumberButtonClickHandler(but)}>
                {but}
            </button>
        )
    })
    const parameterForDisablePersonalOfferButton = !(phoneValue.length === 12 && agreement)

    return (
        <div className={styles.phonePageContainer}>
            <div className={styles.phoneInputBlock}>
                <PhoneInput onlyCountries={['ru']}
                            inputStyle={{
                                padding: '25px',
                                width: '350px',
                                marginLeft: '30px',
                                fontSize: '25px',
                                textAlign: 'center'
                            }}
                            country={'ru'}
                            value={phoneValue}
                            onChange={e => changePhoneNumber(e)}
                            masks={{ru: '(...) ...-..-..'}}
                />
                <div className={styles.buttonsBlock}>
                    {mappedButtons}
                    <button className={styles.deleteButton}
                            onClick={removeLastNumber}>
                        Удалить
                    </button>
                </div>
                <div className={styles.personalDataBlock}>
                    <input type='checkbox'
                           checked={agreement}
                           onChange={onPersonalDataCheckboxClick}
                    /> Персональные данные
                </div>
                <button disabled={parameterForDisablePersonalOfferButton}>ПОЛУЧИТЬ ПЕРСОНАЛЬНОЕ ПРЕДЛОЖЕНИЕ</button>
                <button onClick={() => navigationBack(-1)}>ОТМЕНА</button>
            </div>
        </div>
    );
};

export default PhonePage;