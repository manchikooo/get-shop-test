import React, {useState} from 'react';
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'
import styles from './PhonePage.module.css'

const PhonePage = () => {

    const [phoneValue, setPhoneValue] = useState<string>('+7')
    const [agreement, setAgreement] = useState<boolean>(false)

    console.log(phoneValue)

    const changePhoneNumber = (e: string) => {
        console.log(e)
        if (phoneValue.length < 12) {
            return setPhoneValue(e)
        }
    }

    const onClickHandler = (number: string) => {
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
                <PhoneInput onlyCountries={['ru']}
                            placeholder='+7(___)___-__-__'
                            searchPlaceholder={'+7(___)___-__-__'}
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
            </div>
        </div>
    );
};

export default PhonePage;