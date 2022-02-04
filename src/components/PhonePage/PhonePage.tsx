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
const i = items[0]
type ItemType = {
    id: number,
    name: string
}

type ListItemType = {
    item: ItemType,
    active: boolean,
    // setSelected: Dispatch<SetStateAction<SetStateAction<ItemType | undefined>>>,
    setSelected: Dispatch<SetStateAction<string | undefined>>,
    setHovered: Dispatch<SetStateAction<ItemType | undefined>>,
    setPhoneValue: Dispatch<SetStateAction<string>>
}
type DeleteButtonType = {
    item: ItemType,
    active: boolean,
}


// <div className={`item ${active ? styles.activeItem : ''}`}
//      onClick={() => setSelected(item)}
//      onMouseEnter={() => setHovered(item)}
//      onMouseLeave={() => setHovered(undefined)}
// >
//     {item.name}
// </div>


const PhonePage = () => {

    const [phoneValue, setPhoneValue] = useState<string>('')
    const [agreement, setAgreement] = useState<boolean>(false)
    const [modalActive, setModalActive] = useState<boolean>(false)

    const searchBox = createRef<HTMLInputElement>()
    // const [selected, setSelected] = useState<React.SetStateAction<ItemType | undefined>>(undefined);
    const [selected, setSelected] = useState<string | undefined>('')
    const [cursor, setCursor] = useState<number>(0);
    const [hovered, setHovered] = useState<ItemType | undefined>(undefined);
    const downPress = useKeyPress('ArrowDown', searchBox);
    const upPress = useKeyPress('ArrowUp', searchBox);
    const leftPress = useKeyPress('ArrowLeft', searchBox);
    const rightPress = useKeyPress('ArrowRight', searchBox);
    const enterPress = useKeyPress('Enter', searchBox);
    const [searchItem, setSearchItem] = useState<string>("")

    const ListItem = ({item, active, setSelected, setHovered, setPhoneValue}: ListItemType) => (
        <button className={`item ${active ? styles.activeItem : styles.phoneNumberButton}`}
                onClick={() => onNumberButtonClickHandler(item.id.toString())}
                onMouseEnter={() => setHovered(item)}
                onMouseLeave={() => setHovered(undefined)}
        >
            {item.name}
        </button>)

    const DeleteButton = ({item, active}: DeleteButtonType) => (
        <button className={`item ${active ? styles.activeItem : styles.phoneNumberButton}`}
                onClick={removeLastNumber}
                onMouseEnter={() => setHovered(item)}
                onMouseLeave={() => setHovered(undefined)}
        >
            {item.name}
        </button>)

    const handelChange = (e: React.SyntheticEvent<HTMLInputElement>) => {
        setSelected(undefined)
        setSearchItem(e.currentTarget.value)
    }
    console.log(cursor)
    useEffect(() => {
        if (items.length && downPress) {
            setCursor(prevState =>
                prevState < 11 ? prevState + 3 : 1
            );
        }
    }, [downPress]);
    useEffect(() => {
        if (items.length && upPress) {
            setCursor(prevState => (prevState > 2 ? prevState - 3 : prevState));
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
        if (items[cursor].name === 'Delete' && enterPress) {
            removeLastNumber()
        } else if (items.length && enterPress && phoneValue.length === 0) {
            setPhoneValue((phoneValue) => '7' + phoneValue + items[cursor].name);
        } else if (items.length && enterPress) {
            setPhoneValue((phoneValue) => phoneValue + items[cursor].name);
        }
    }, [cursor, enterPress]);
    useEffect(() => {
        if (items.length && hovered) {
            setCursor(items.indexOf(hovered));
        }
    }, [hovered]);


    const navigationBack = useNavigate()

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


    // const buttons = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0']
    // const mappedButtons = buttons.map(but => {
    //     return (
    //         <button key={but}
    //                 tabIndex={+but}
    //                 className={styles.phoneNumberButton}
    //                 onClick={() => onNumberButtonClickHandler(but)}>
    //             {but}
    //         </button>
    //     )
    // })
    const parameterForDisablePersonalOfferButton = !(phoneValue.length === 11 && agreement)

    const mappedButtonsNumbers = items.map((item, i) => {
            if (items[i].id === 100) {
                return <div key={item.id}>
                    <input className={styles.checkboxStyle}
                           type='checkbox'
                           checked={agreement}
                           onChange={onPersonalDataCheckboxClick}
                    />{item.name}</div>
            }
            if (items[i].id === 300) {
                return <div key={item.id}>
                    <button onClick={() => navigationBack(-1)}
                            className={styles.navigationBackButton}
                    >
                        {item.name}
                    </button>
                </div>
            }
            if (items[i].id < 10) {
                return <ListItem key={item.id}
                                 active={i === cursor}
                                 item={item}
                                 setSelected={setSelected}
                                 setHovered={setHovered}
                                 setPhoneValue={setPhoneValue}
                    // onClick={}
                />
            }
            if (items[i].id === 10) {
                return <DeleteButton key={item.id} active={i === cursor} item={item}/>
                // return <div key={item.id}
                //             className={{active ? styles.activeItem : styles.phoneNumberButton}}
                //             onClick={removeLastNumber}>
                //     <button>{item.name}</button>
                // </div>

            }
            if (items[i].id === 200) {
                return <div key={item.id}>
                    <button onClick={() => {
                    }}>{item.name}</button>
                </div>
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
                        <NavLink to={'/'}>
                            <button>OK</button>
                        </NavLink>

                    </div>
                </ModalPopup>}
            </div>
        </div>
    );
};

export default PhonePage;