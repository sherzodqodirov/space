import {Outlet} from "react-router-dom";
import styled from "styled-components";

const LayoutLogin = () => {
    return (
        <Container>
            <div className={'core_box'}>
                <div className={'left_box'}>
                    <div className="img_box">
                        <img src={'/assets/loginPhoto.svg'} alt={'login photo'}/>
                    </div>
                </div>
                <div className={'right_box'}>
                    <Outlet/>
                </div>
            </div>
        </Container>
    );
};

const Container = styled.div`
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 20px;
   
    .core_box {
        display: grid;
        grid-template-columns: 1fr 1fr;
        height: 100vh;

        .left_box {
            display: flex;
            justify-content: center;
            align-items: center;

            .img_box {
                width: 380px;
                height: 572px;

                img {
                    width: 100%;
                }
            }
        }

        .right_box {
            position: relative;
            display: flex;
            justify-content: center;
            align-items: center;
            .back_box{
                position: absolute;
                display: flex;
                gap: 12px;
                padding: 4px;
                font-size: 16px;
                font-weight: 400;
                top: 20px;
                left: 20px;
                align-items: center;
                cursor: pointer;
                
                button {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    width: 28px;
                    height: 28px;
                    border-radius: 50px;
                    background-color:rgba(192, 192, 192, 0.2);
                    border: none;
                   cursor: pointer;
                }
            }
        }
    }
`;
export default LayoutLogin;