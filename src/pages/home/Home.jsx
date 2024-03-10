import styled from "styled-components";
import {toast} from "react-toastify";
import {useNavigate} from "react-router-dom";


const Home = () => {
const navigate=useNavigate()
    const handleClearLocalStorage = () => {
        localStorage.clear();
        toast.success("Log out", { autoClose: 3000 });
        navigate('/login')
    };

    return (
        <Container>
            <div className="core_box">
                <h2>С возвращением!</h2>
                <p>Lorby - твой личный репетитор</p>
                <div className="box_img">
                    <img src="/assets/homeSvg.svg" alt="img"/>
                </div>

                <button onClick={handleClearLocalStorage}>
                    Выйти
                </button>
            </div>
        </Container>
    );
};
const Container = styled.div`
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 20px;
    display: flex;
    justify-content: center;
    
    h2{
        color:rgba(33, 33, 33, 1);
        font-weight: 500;
        font-size:36px;
        text-align: center;
    }
    p{
        text-align: center;
    }
    .core_box {
        height:100vh;
        display: flex;
        gap: 20px;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        .box_img{
            width: 320px;
            height: 346px;
            img{
                width: 100%;
            }
        }
        button{
            cursor: pointer;
            width: 100%;
            padding: 13px 16px;
            border-radius: 12px;
            border: 1px solid rgba(255, 255, 255, 1) ;
            background-color:rgba(255, 255, 255, 1);
            &:hover{
                border:1px solid red;
            }
        }
    }

`
export default Home;