import React, {createRef, Dispatch, RefObject, SetStateAction, useEffect, useState} from 'react';
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'
import styles from './PhonePage.module.css'
import {NavLink, useNavigate} from "react-router-dom";
import {ModalPopup} from "../ModalPopup/ModalPopup";

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
    {id: 100, name: 'Согласен на обработку ПД'},
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
    setSelected: Dispatch<SetStateAction<string | undefined>>,
    setHovered: Dispatch<SetStateAction<ItemType | undefined>>,
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

    const [phoneValue, setPhoneValue] = useState<string>('')
    const [agreement, setAgreement] = useState<boolean>(false)
    const [modalActive, setModalActive] = useState<boolean>(false)

    const searchBox = createRef<HTMLInputElement>()
    const [selected, setSelected] = useState<string | undefined>('')
    const [cursor, setCursor] = useState<number>(0);
    const [hovered, setHovered] = useState<ItemType | undefined>(undefined);
    const downPress = useKeyPress('ArrowDown', searchBox);
    const upPress = useKeyPress('ArrowUp', searchBox);
    const leftPress = useKeyPress('ArrowLeft', searchBox);
    const rightPress = useKeyPress('ArrowRight', searchBox);
    const enterPress = useKeyPress('Enter', searchBox);
    const navigationBack = useNavigate()

    console.log(phoneValue)

    const ButtonNumber = ({item, active, setHovered}: ButtonNumberType) => (
        <button className={`item ${active ? styles.activePhoneNumberButton : styles.phoneNumberButton}`}
                onClick={() => onNumberButtonClickHandler(item.id.toString())}
                onMouseEnter={() => setHovered(item)}
                onMouseLeave={() => setHovered(undefined)}
        >
            {item.name}
        </button>)

    const DeleteButton = ({item, active}: DeleteButtonType) => (
        <button className={`item ${active ? styles.activeDeleteButton : styles.deleteButton}`}
                onClick={removeLastNumber}
                onMouseEnter={() => setHovered(item)}
                onMouseLeave={() => setHovered(undefined)}
        >
            {item.name}
        </button>
    )

    const PersonalDataCheckBox = ({item, active}: PersonalDataCheckboxType) => (
        <div className={`item ${active ? styles.activeCheckboxContainerStyle : styles.checkboxContainerStyle}`}
             onMouseEnter={() => setHovered(item)}
             onMouseLeave={() => setHovered(undefined)}
        >
            <input
                type='checkbox'
                checked={agreement}
                onChange={onPersonalDataCheckboxClick}
            />{item.name}
        </div>
    )

    const PersonalOffer = ({item, active, disable}: PersonalOfferType) => (
        <button className={`item ${active ? styles.activeOfferButton : styles.offerButton}`}
                onClick={() => setModalActive(true)}
                onMouseEnter={() => setHovered(item)}
                onMouseLeave={() => setHovered(undefined)}
                disabled={disable}
        >
            {item.name}
        </button>
    )
    const BackButton = ({item, active}: BackButtonType) => (
        <button className={`item ${active ? styles.activeOfferButton : styles.offerButton}`}
                onClick={() => navigationBack(-1)}
                onMouseEnter={() => setHovered(item)}
                onMouseLeave={() => setHovered(undefined)}
        >
            {item.name}
        </button>
    )

    console.log(cursor)
    useEffect(() => {
        if (items.length && downPress) {
            setCursor(prevState => {
                    let shift = prevState + 3;
                    if (cursor < 11) shift = prevState + 3;
                    if (cursor === 8) shift = prevState + 2;
                    if (cursor >= 10) shift = prevState + 1
                    if (cursor === 13) shift = 0;
                    return shift;
                }
            );
        }
    }, [downPress]);
    useEffect(() => {
        if (items.length && upPress) {
            setCursor(prevState => {
                let shift = prevState - 3
                if (cursor > 2) shift = prevState - 3
                if (cursor <= 2) shift = 13
                if (cursor >= 11) shift = prevState - 1
                // (prevState > 2 ? prevState - 3 : prevState)
                return shift
            });
        }
    }, [upPress]);
    useEffect(() => {
        if (items.length && rightPress) {
            setCursor(prevState =>
                prevState < 13 ? prevState + 1 : 0
            );
        }
    }, [rightPress]);
    useEffect(() => {
        if (items.length && leftPress) {
            setCursor(prevState => (prevState > 0 ? prevState - 1 : 13));
        }
    }, [leftPress]);
    useEffect(() => {
        if (items[cursor].id === 10 && enterPress) {
            removeLastNumber()
        } else if (items[cursor].id === 100 && enterPress) {
            setAgreement(!agreement)
        } else if (items[cursor].id === 200 && enterPress && agreement) {
            setModalActive(true)
        } else if (items[cursor].id === 300 && enterPress) {
            navigationBack(-1)
        } else if (items.length && enterPress && phoneValue.length === 0 && agreement) {
            setPhoneValue((phoneValue) => '7' + phoneValue + items[cursor].name);
        } else if (items.length && enterPress && phoneValue.length < 11 && agreement) {
            setPhoneValue((phoneValue) => phoneValue + items[cursor].name);
        }
    }, [cursor, enterPress]);
    useEffect(() => {
        if (items.length && hovered) {
            setCursor(items.indexOf(hovered));
        }
    }, [hovered]);


    const changePhoneNumber = (e: string) => {
        console.log(e)
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
    const removeLastNumber = () => {
        if (phoneValue === '7') {
            return
        } else {
            return setPhoneValue(phoneValue => phoneValue.slice(0, -1))
        }
    }

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
        }
    )

    console.log(selected)
    return (
        <div className={styles.phonePageContainer}>
            <div className={styles.phoneInputBlock} ref={searchBox}>
                <PhoneInput
                    onlyCountries={['ru']}
                    inputStyle={{
                        padding: '25px',
                        width: '350px',
                        marginLeft: '30px',
                        fontSize: '25px',
                        textAlign: 'center'
                    }}
                    value={phoneValue}
                    placeholder={'+7(___)___-__-__'}
                    onChange={e => changePhoneNumber(e)}
                    masks={{ru: '(...) ...-..-..'}}
                    inputProps={{
                        autoFocus: true
                    }}

                />
                <div className={styles.buttonsBlock}>
                    {mappedButtonsNumbers}
                </div>
                {modalActive && <ModalPopup modalActive={modalActive}
                                            setModalActive={setModalActive}
                >
                    <div>
                        <NavLink to={'/get-shop-test/'}>
                            <button>OK</button>
                        </NavLink>
                    </div>
                </ModalPopup>}
            </div>
        </div>
    );
};
