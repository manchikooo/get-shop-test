import React, {createRef, Dispatch, RefObject, SetStateAction, useEffect, useRef, useState} from 'react';
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'
import styles from './PhonePage.module.css'
import {NavLink, useNavigate} from "react-router-dom";
import {ModalPopup} from "../ModalPopup/ModalPopup";
import navImg from '../../common/navigation.png'

const useKeyPress = function (targetKey: string, ref: RefObject<HTMLInputElement>) {
    const [keyPressed, setKeyPressed] = useState<boolean>(false)

    function downHandler({key}: { key: string }) {
        if (key === targetKey) {
            setKeyPressed(true)
        }
    }

    const upHandler = ({key}: { key: string }) => {
        if (key === targetKey) {
            setKeyPressed(false);
        }
    };

    React.useEffect(() => {
        window.addEventListener('keydown', downHandler)
        window.addEventListener('keyup', upHandler)
        return () => {
            window.removeEventListener('keydown', downHandler)
            window.removeEventListener('keyup', upHandler)
        }
    })
    return keyPressed
}

const items = [
    {id: 1, name: '1'},
    {id: 2, name: '2'},
    {id: 3, name: '3'},
    {id: 4, name: '4'},
    {id: 5, name: '5'},
    {id: 6, name: '6'},
    {id: 7, name: '7'},
    {id: 8, name: '8'},
    {id: 9, name: '9'},
    {id: 0, name: '0'},
    {id: 10, name: 'Delete'},
    {id: 100, name: 'Согласен на обработку персональных данных'},
    {id: 200, name: 'Получить персональное предложение'},
    {id: 300, name: 'Отмена'},
]

type ItemType = {
    id: number,
    name: string
}

type ButtonNumberType = {
    item: ItemType,
    active: boolean,
    setSelected: Dispatch<SetStateAction<string | null>>,
    setHovered: Dispatch<SetStateAction<ItemType | null>>,
    setPhoneValue: Dispatch<SetStateAction<string>>
}
type DeleteButtonType = {
    item: ItemType,
    active: boolean,
}
type PersonalDataCheckboxType = DeleteButtonType

type PersonalOfferType = {
    item: ItemType,
    active: boolean,
    disable: boolean
}

type BackButtonType = DeleteButtonType

export const PhonePage = () => {

    const ref = useRef<HTMLInputElement>()

    const [phoneValue, setPhoneValue] = useState<string>('')
    const [agreement, setAgreement] = useState<boolean>(false)
    const [modalActive, setModalActive] = useState<boolean>(false)

    const searchBox = createRef<HTMLInputElement>()
    const [selected, setSelected] = useState<string | null>(null)
    const [cursor, setCursor] = useState<number>(14);
    const [hovered, setHovered] = useState<ItemType | null>(null);
    const downPress = useKeyPress('ArrowDown', searchBox);
    const upPress = useKeyPress('ArrowUp', searchBox);
    const leftPress = useKeyPress('ArrowLeft', searchBox);
    const rightPress = useKeyPress('ArrowRight', searchBox);
    const enterPress = useKeyPress('Enter', searchBox);
    const backspacePress = useKeyPress('Backspace', searchBox);
    const navigationBack = useNavigate()

    const ButtonNumber = ({item, active, setHovered}: ButtonNumberType) => (
        <button className={`item ${active ? styles.activePhoneNumberButton : styles.phoneNumberButton}`}
                onClick={() => onNumberButtonClickHandler(item.id.toString())}
                onMouseEnter={() => setHovered(item)}
                onMouseLeave={() => setHovered(null)}
        >
            {item.name}
        </button>)

    const DeleteButton = ({item, active}: DeleteButtonType) => (
        <button className={`item ${active ? styles.activeDeleteButton : styles.deleteButton}`}
                onClick={removeLastNumber}
                onMouseEnter={() => setHovered(item)}
                onMouseLeave={() => setHovered(null)}
        >
            {item.name}
        </button>
    )

    const PersonalDataCheckBox = ({item, active}: PersonalDataCheckboxType) => (
        <div className={`item ${active ? styles.activeCheckboxContainerStyle : styles.checkboxContainerStyle}`}
             onMouseEnter={() => setHovered(item)}
             onMouseLeave={() => setHovered(null)}
        >
            <input
                type='checkbox'
                checked={agreement}
                onChange={onPersonalDataCheckboxClick}
            /><span onClick={() => setAgreement(!agreement)}>{item.name}</span>
        </div>
    )

    const PersonalOffer = ({item, active, disable}: PersonalOfferType) => (
        <button className={`item ${active ? styles.activeOfferButton : styles.offerButton}`}
                onClick={() => setModalActive(true)}
                onMouseEnter={() => setHovered(item)}
                onMouseLeave={() => setHovered(null)}
                disabled={disable}
        >
            {item.name}
        </button>
    )
    const BackButton = ({item, active}: BackButtonType) => (
        <button className={`item ${active ? styles.activeBackButton : styles.backButton}`}
                onClick={() => navigationBack(-1)}
                onMouseEnter={() => setHovered(item)}
                onMouseLeave={() => setHovered(null)}
        >
            {item.name}
        </button>
    )
    console.log(cursor)
    useEffect(() => {
        if (cursor === 14) {
            ref?.current?.focus()
        } else ref?.current?.blur()
    }, [cursor])

    useEffect(() => {
        if (upPress) {
            setCursor(prevState => {
                let shift = prevState - 3
                if (cursor > 2) shift = prevState - 3
                // if (cursor <= 2) shift = 13
                if (cursor >= 11) shift = prevState - 1
                if (cursor < 3) shift = 14
                if (cursor === 14) shift = 13
                return shift
            });
        }
        if (items.length && downPress) {
            setCursor(prevState => {
                    let shift = prevState + 3;
                    if (cursor < 11) shift = prevState + 3;
                    if (cursor === 8) shift = prevState + 2
                    if (cursor === 9) shift = prevState + 2;
                    if (cursor >= 10) shift = prevState + 1
                    if (cursor === 13) shift = 14;
                    if (cursor === 14) shift = 0;
                    return shift;
                }
            );
        }
        if (items.length && rightPress) {
            setCursor(prevState => {
                    let shift = prevState + 1
                    if (cursor === 2 || cursor === 5 || cursor === 8 || cursor === 10) shift = 12
                    if (cursor === 13) shift = 0
                    return shift
                }
            );
        }
        if (items.length && leftPress) {
            setCursor(prevState => {
                    let shift = prevState - 1
                    if (cursor === 12) shift = 2
                    if (cursor === 0) shift = 13
                    return shift
                }
            );
        }
        if (items.length && hovered) {
            setCursor(items.indexOf(hovered));
        }
    }, [upPress, downPress, rightPress, leftPress, hovered]);


    useEffect(() => {
        if (items[cursor]?.id === 10 && enterPress) {
            removeLastNumber()
        } else if (items[cursor]?.id === 100 && enterPress) {
            setAgreement(!agreement)
        } else if (items[cursor]?.id === 200 && enterPress && agreement && phoneValue.length === 11) {
            setModalActive(true)
        } else if (items[cursor]?.id === 300 && enterPress) {
            navigationBack(-1)
        } else if (enterPress && phoneValue.length === 0 && items[cursor]?.id !== 200) {
            setPhoneValue((phoneValue) => '7' + phoneValue + items[cursor]?.name);
        } else if (enterPress && phoneValue.length < 11 && items[cursor]?.id !== 200) {
            setPhoneValue((phoneValue) => phoneValue + items[cursor]?.name);
        } else if (backspacePress) {
            removeLastNumber()
        }
    }, [cursor, enterPress, backspacePress]);

    // console.log(cursor)
    const changePhoneNumber = (e: string) => {
        if (phoneValue.length === 0) {
            return setPhoneValue('7' + e)
        }
        if (phoneValue.length <= 10) {
            return setPhoneValue(e)
        }
        if (phoneValue.length === 11) {
            return
        }
    }

    const onNumberButtonClickHandler = (number: string) => {
        if (phoneValue.length === 0) {
            return setPhoneValue('7' + number)
        }
        if (phoneValue.length <= 10) {
            return setPhoneValue(phoneValue => phoneValue + number)
        }
        if (phoneValue.length === 11) {
            return
        }
    }

    const removeLastNumber = () => setPhoneValue(phoneValue => phoneValue.slice(0, -1))

    const onPersonalDataCheckboxClick = (e: React.ChangeEvent<HTMLInputElement>) => {
        setAgreement(e.currentTarget.checked)
    }

    const parameterForDisablePersonalOfferButton = !(phoneValue.length === 11 && agreement)

    const mappedButtonsNumbers = items.map((item, i) => {
            if (items[i].id < 10) {
                return <ButtonNumber key={item.id}
                                     active={i === cursor}
                                     item={item}
                                     setSelected={setSelected}
                                     setHovered={setHovered}
                                     setPhoneValue={setPhoneValue}
                />
            }
            if (items[i].id === 10) {
                return <DeleteButton key={item.id}
                                     active={i === cursor}
                                     item={item}
                />
            }
            if (items[i].id === 100) {
                return <PersonalDataCheckBox key={item.id}
                                             active={i === cursor}
                                             item={item}
                />
            }
        }
    )
    const mapped = items.map((item, i) => {
        if (items[i].id === 200) {
            return <PersonalOffer key={item.id}
                                  active={i === cursor}
                                  item={item}
                                  disable={parameterForDisablePersonalOfferButton}
            />
        }
        if (items[i].id === 300) {
            return <BackButton key={item.id}
                               active={i === cursor}
                               item={item}
            />
        }
    })
    console.log(phoneValue)
    return (
        <div className={styles.phonePageContainer} ref={searchBox}>
            <div className={styles.phoneInputBlockContainer}>
                <div className={styles.phoneInputBlock}>
                    <h2>Пожалуйста, введите номер телефона. Мы свяжемся с Вами в ближайшее время.</h2>
                    <div>
                        <PhoneInput
                            onlyCountries={['ru']}
                            inputStyle={{
                                padding: '25px',
                                width: '350px',
                                marginLeft: '30px',
                                fontSize: '25px',
                                textAlign: 'center',
                                color: '#01355F',
                                fontWeight: 'bold',
                            }}
                            value={phoneValue}
                            placeholder={'+7(___)___-__-__'}
                            onChange={e => changePhoneNumber(e)}
                            masks={{ru: '(...) ...-..-..'}}
                            inputProps={{
                                // focus: (cursor === 14) + '',
                                autoFocus: true,
                                ref: ref
                            }}
                        />
                    </div>
                    <div className={styles.buttonsBlock}>
                        {mappedButtonsNumbers}
                    </div>
                    {modalActive &&
                        <ModalPopup modalActive={modalActive}
                                    setModalActive={setModalActive}
                        >
                            <div className={styles.modalContentInfoBlock}>
                                <div>Мы свяжемся с Вами в ближайшее время</div>
                                <div>
                                    <NavLink to={'/get-shop-test/'}>
                                        <button onMouseEnter={() => setHovered(items[0])}
                                                onMouseLeave={() => setHovered(null)}
                                                className={styles.submitPopupButton}>OK
                                        </button>
                                    </NavLink>
                                </div>
                            </div>
                        </ModalPopup>}
                </div>
            </div>
            <div className={styles.offerAndCanselBlock}>
                <div className={styles.offerAndCanselButtonsContainer}>{mapped}</div>
                <div className={styles.imgContainer}>
                    <img alt='navigation image' src={navImg}/>
                </div>
            </div>
        </div>
    );
};
