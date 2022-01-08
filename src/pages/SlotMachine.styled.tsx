import styled from "styled-components"

const MachineContainer = styled.div`
    display: flex;
    flex-direction: column;
`

const WheelContainer = styled.div`
    display: flex;
    justify-content: center;
    gap: 2px;
    /* border: solid 1px black; */
    border-radius: 20px;
    width: 500px;
    margin: auto;

    @media screen and (max-width: 600px) {
        width: 90%;
    }

    .wheel {
        flex: 1;
    }
    
`

const ButtonsContainer = styled.div`
    display: flex;
    justify-content: space-evenly;
    gap: 8px;
    width: 300px;


    button {
        height: 50px;
        min-width: 100px;
        border-radius: 20px;
        background-color: white;
        border: none;
    cursor: pointer;

        &.primary{
            background-color: #a9fba9;

            :active{
                background-color: #59fd59;
            }
        }

        &.danger{
            background-color: #ffb5b5;

            :active{
                background-color: #ff8c8c;
            }
        }
    }

`

const InfoContainer = styled.div`
    /* border: solid 1px #c3c3c3; */
    padding: 20px;
    border-radius: 20px;
    box-shadow: 1px 1px 4px #c3c3c3;
`;
export {
    MachineContainer,
    WheelContainer,
    ButtonsContainer,
    InfoContainer
}