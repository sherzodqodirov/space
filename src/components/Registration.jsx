import {useState} from "react";
import styled from "styled-components";
import {toast} from "react-toastify";
import {useNavigate} from "react-router-dom";
import axios from "axios";
import {REGISTER} from "../utils/services.js";
import * as Yup from 'yup';

const Registration = () => {
    const [visiblePassword, setVisiblePassword] = useState(false);
    const [visiblePassword2, setVisiblePassword2] = useState(false);
    const [emailVal, setEmailVal] = useState('')
    const [loginVal, setLoginVal] = useState('')
    const [passwordVal, setPasswordVal] = useState('')
    const [passwordVal2, setPasswordVal2] = useState('')
    const navigate = useNavigate()

    const handleChangeEye = () => {
        setVisiblePassword(prevState => !prevState);
    };
    const handleChangeEye2 = () => {
        setVisiblePassword2(prevState => !prevState);
    };
    const handleChangeLogin = (event) => {
        setLoginVal(event.target.value)
    }
    const handleChangeEmail = (event) => {
        setEmailVal(event.target.value)
    }
    const handleChangePassword = (event) => {
        setPasswordVal(event.target.value)
    }
    const handleChangePassword2 = (event) => {
        setPasswordVal2(event.target.value)
    }

    const handleSave = async (event) => {
        event.preventDefault();

        const schema = Yup.object().shape({
            email: Yup.string().email('Invalid email').required('Email is required'),
            userName: Yup.string().required('Username is required'),
            password: Yup.string()
                .min(8, 'Password must be at least 8 characters')
                .max(15, 'Password must be at most 15 characters')
                .matches(
                    /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_+}{:;'\[\]])[0-9a-zA-Z!@#$%^&*()_+}{:;'\[\]]{8,15}$/,
                    'Password must contain at least one uppercase letter, one lowercase letter, one digit, and one special character'
                )
                .required('Password is required'),
            confirmPassword: Yup.string()
                .oneOf([Yup.ref('password'), null], 'Passwords must match')
                .required('Confirm Password is required')
        });

        try {
            await schema.validate({
                email: emailVal,
                userName: loginVal,
                password: passwordVal,
                confirmPassword: passwordVal2
            });

            const body = {
                email: emailVal,
                password: passwordVal,
                userName: loginVal
            };

            axios.post(REGISTER, body)
                .then(res => {
                    console.log(res.data);
                    localStorage.setItem("user",(body.email));
                    localStorage.setItem("userData",JSON.stringify(body));
                    toast.success(res.data.message, { autoClose: 3000 });
                    navigate('check');
                })
                .catch(er => {
                    console.log(er);
                });
        } catch (error) {
            toast.error(error.message, { autoClose: 5000 });
        }
    };
    return (
        <>
            <div className="back_box" onClick={() => navigate(-1)}>
                <button><img src={'/assets/backIcon.svg'} alt={'icon'}/></button>
                <p>Назад</p>
            </div>
            <Form className="login_box" onSubmit={handleSave}>
                <h2>Создать аккаунт Lorby</h2>
                <div>
                    <input
                        value={emailVal}
                        onChange={handleChangeEmail}
                        type={'email'}
                        placeholder={"Введи адрес почты"}
                    />
                    <input
                        value={loginVal}
                        onChange={handleChangeLogin}
                        type={'text'}
                        placeholder={"Придумай логин"}
                    />
                    <div className={'password_box'}>
                        <input
                            value={passwordVal}
                            onChange={handleChangePassword}
                            type={!visiblePassword ? "password" : 'text'}
                            placeholder={"Создай пароль"}
                        />

                        <div className={'icon_eyes'} onClick={handleChangeEye}>
                            {!visiblePassword ? <img src={'/assets/eyes.svg'} alt={'icon'}/> :
                                <img src={'/assets/eyes2.svg'} alt={'icon'}/>}

                        </div>
                    </div>
                    <ul>
                        <li className="listData"><p>От 8 до 15 символов</p></li>
                        <li className="listData"><p>Строчные и прописные буквы</p></li>
                        <li className="listData"><p>Минимум 1 цифра</p></li>
                        <li className="listData"><p>Минимум 1 спецсимвол (!, #, $...)</p></li>
                    </ul>
                    <div className={'password_box'}>
                        <input
                            value={passwordVal2}
                            onChange={handleChangePassword2}
                            type={!visiblePassword2 ? "password" : 'text'}
                            placeholder={"Повтори пароль"}
                        />

                        <div className={'icon_eyes'} onClick={handleChangeEye2}>
                            {!visiblePassword2 ? <img src={'/assets/eyes.svg'} alt={'icon'}/> :
                                <img src={'/assets/eyes2.svg'} alt={'icon'}/>}

                        </div>
                    </div>
                </div>
                <button type={'submit'} className={'sub_btn '}>
                    Далее
                </button>
            </Form>
        </>
    );
};

const Form = styled.form`

    width: 343px;
    display: grid;
    grid-template-columns: 1fr;
    gap: 48px;

    h2 {
        text-align: center;
        font-size: 32px;
        font-weight: 500;
        color: rgba(33, 33, 33, 1);
        line-height: 47.52px;
    }

    ul {
        margin: 10px 0;
        list-style-position: outside;
        padding-left: 30px;

        .listData {
            color: red;

            p {
                margin: 0;
            }
        }
    }


    input {
        margin-bottom: 8px;
        width: 100%;
        box-sizing: border-box;
        background-color: rgba(248, 248, 248, 1);
        border-radius: 12px;
        padding: 13px 40px 13px 16px;
        border: none;
        outline: none;

        &:focus {
            outline: 1px solid #d5d4d4;
        }

        &::placeholder {
            color: rgba(118, 118, 118, 1);
            font-size: 16px;
            font-weight: 500;
        }
    }

    .password_box {
        position: relative;


        .icon_eyes {
            position: absolute;
            top: 50%;
            transform: translateY(-50%);
            right: 12px;
            cursor: pointer;
        }
    }

    .sub_btn,
    .btn_2 {
        width: 100%;
        padding: 13px 16px;
        border-radius: 12px;
        cursor: pointer;
        font-size: 16px;
        font-weight: 500;
        border: none;
        outline: none;
        transition: background-color 0.3s;
    }

    .sub_btn {
        color: #fff;
        background-color: rgba(41, 41, 41, 1);
    }

    .sub_btn:hover {
        background-color: rgba(0, 0, 0, 0.8);
    }

    .disabled_btn {
        background-color: rgba(215, 215, 215, 1) !important;
        cursor: not-allowed !important;
        color: rgba(118, 118, 118, 1) !important;
    }
`;

export default Registration;
