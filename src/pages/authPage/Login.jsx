import {useEffect, useState} from "react";
import styled from "styled-components";
import {toast} from "react-toastify";
import {useNavigate} from "react-router-dom";
import axios from "axios";
import {LOGIN} from "../../utils/services.js";


const Login = () => {
    const [isLogin, setIsLogin] = useState(false)
    const [visiblePassword, setVisiblePassword] = useState(false);
    const [loginVal, setLoginVal] = useState('')
    const [passwordVal, setPasswordVal] = useState('')
    const navigate = useNavigate()

    const handleChangeEye = () => {
        setVisiblePassword(prevState => !prevState);
    };
    const handleChangeLogin = (event) => {
        setLoginVal(event.target.value)
    }
    const handleChangePassword = (event) => {
        setPasswordVal(event.target.value)
    }

    const handleSave = (event) => {
        event.preventDefault();
        if (passwordVal.trim() === '' || loginVal.trim() === '') {
            return toast.warning('Empty fields', {autoClose: 3000});
        }
        const body={
            userName:loginVal,
            password:passwordVal
        }
        axios.post(LOGIN,body)
            .then(res => {
                console.log(res.data.data.token)
                localStorage.setItem("token", res.data?.data?.token);
                setIsLogin(true)
                navigate('/home')
                toast.success("Login Successful", {autoClose: 3000})
            })
            .catch(err => {
                console.log(err)
                toast.error('user name or password incorrect', {autoClose: 3000})
            })
        ;

    };

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            navigate('/home');
        }
    }, []);

    return (
        <Form className="login_box" onSubmit={handleSave}>
            <h2>Вэлком бэк!</h2>
            <div>
                <input
                    value={loginVal}
                    onChange={handleChangeLogin}
                    type={'text'}
                    placeholder={"Введи логин"}
                />
                <div className={'password_box'}>
                    <input
                        value={passwordVal}
                        onChange={handleChangePassword}
                        type={!visiblePassword ? "password" : 'text'}
                        placeholder={"Введи пароль"}
                    />

                    <div className={'icon_eyes'} onClick={handleChangeEye}>
                        {!visiblePassword ? <img src={'/assets/eyes.svg'} alt={'icon'}/> :
                            <img src={'/assets/eyes2.svg'} alt={'icon'}/>}

                    </div>
                </div>
            </div>
            <button type={'submit'} className={'sub_btn'}>
                Войти
            </button>
            <button type={"button"} className={'btn_2'} onClick={() => navigate('/registration')}>
                У меня еще нет аккаунта
            </button>
        </Form>
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

            .btn_2 {
                color: rgba(41, 41, 41, 1);
                background-color: rgba(255, 255, 255, 1);
            }

            .btn_2:hover {
                background-color: rgba(220, 220, 220, 1);
            }
        
`;

export default Login;
