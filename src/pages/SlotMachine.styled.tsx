import styled from "styled-components"

const MachineContainer = styled.div`
    display: flex;
    flex-direction: column;
`

const WheelContainer = styled.div`
    display: flex;
    justify-content: center;
    border: solid 1px black;
    
    width: 500px;
    margin: auto;

    .wheel {
        flex: 1;
    }
    
`

const ButtonsContainer = styled.div`
    display: flex;
    justify-content: space-evenly;


    button {
        height: 50px;
        border-radius: 20px;
        background-color: white;

        &.primary{
            background-color: #a9fba9;
        }

        &.danger{
            background-color: #ffb5b5;
        }
    }

`
export {
    MachineContainer,
    WheelContainer,
    ButtonsContainer
}