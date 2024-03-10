import { useState, useEffect } from 'react';
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import {CHECK, REGISTER} from "../../utils/services.js"; // Import the CHECK function directly

const CheckCodeEmail = () => {
    const [email, setEmail] = useState('');
    const storedUserLocal = JSON.parse(localStorage.getItem('userData'));
    const navigate = useNavigate();
    const [valCode, setValCode] = useState({
        val1: '',
        val2: '',
        val3: '',
        val4: '',
    });

    useEffect(() => {
        const storedEmail = localStorage.getItem("user");
        if (storedEmail) {
            setEmail(storedEmail);
        }
    }, []);

    const handleChange = (index, value) => {
        if (value.length > 1) return; // Limit the input length to one character
        setValCode(prevState => ({
            ...prevState,
            [`val${index}`]: value
        }));
    }

    const handleBack = () => {
        navigate(-1);
        localStorage.clear();
    }

    const handleCheckCode = () => {
        const code = valCode.val1 + valCode.val2 + valCode.val3 + valCode.val4;
        if (code.length !== 4) {
            return toast.warning('Empty field');
        }

        axios.get(CHECK(email, code))
            .then(res => {
                const data = res.data?.data
                if (data){
                    toast.success('Success')
                    navigate('/login')
                }
                else {
                    toast.warning(res.data.message)
                }

            })
            .catch(err => {
                toast.error('Error');
            });
    }
const handleRefreshDataSend = () => {
        const body=storedUserLocal
    axios.post(REGISTER, body)
        .then(res => {
            toast.success(res.data.message, { autoClose: 3000 });

        })
        .catch(er => {
            console.log(er);
        });
}
    return (
        <>
            <div className="back_box" onClick={handleBack}>
                <button><img src={'/assets/backIcon.svg'} alt={'icon'} /></button>
                <p>Назад</p>
            </div>
            <Container>
                <h2 style={{ textAlign: 'center' }}>
                    Введи 4-значный код, высланный на {email}
                </h2>
                <div className={'inputs_all'}>
                    {Array.from({ length: 4 }).map((_, index) => (
                        <input
                            key={index}
                            type="number"
                            value={valCode[`val${index + 1}`]}
                            onChange={(e) => handleChange(index + 1, e.target.value)}
                            maxLength="1"
                        />
                    ))}
                </div>
                <div>
                    <button className={'btn1'} onClick={handleCheckCode}>
                        Подтвердить
                    </button>
                    <button onClick={handleRefreshDataSend} className={'btn2'}>
                        Выслать код повторно
                    </button>
                </div>
            </Container>
        </>
    );
};

const Container = styled.div`
    width: 343px;

    .inputs_all {
        margin-top: 40px;
        display: grid;
        gap: 12px;
        grid-template-columns: repeat(4, 1fr);

        input {
            font-size: 24px;
            font-weight: 500;
            width: 56px;
            height: 64px;
            border-radius: 12px;
            border: none;
            background-color: rgba(244, 244, 244, 1);
            padding: 13px 16px;
            outline-color: #a8a8a8;

            &::-webkit-inner-spin-button,
            &::-webkit-outer-spin-button {
                -webkit-appearance: none;
                margin: 0;
            }
        }
    }

    .btn1 {
        margin-top: 40px;
        cursor: pointer;
        border-radius: 12px;
        width: 100%;
        color: #fff;
        padding: 13px 16px;
        border: 1px solid #fff;
        background-color: rgba(41, 41, 41, 1);

        &:hover {
            background-color: rgba(41, 41, 41, 0.8);
        }
    }

    .btn2 {

        cursor: pointer;
        border-radius: 12px;
        margin-top: 20px;
        width: 100%;
        padding: 13px 16px;
        border: none;
        background-color: transparent;

        &:hover {
            background-color: rgba(215, 215, 215, 1);
        }
    }
`;

export default CheckCodeEmail;
