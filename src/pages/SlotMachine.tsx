import { FunctionComponent } from "react";
import styled from "styled-components";
import Wheel from "../components/Wheel/Wheel";
import assetList from '../consts/assetList';

interface SlotMachineProps {
    
}

const MachineContainer = styled.div`

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
 
const SlotMachine: FunctionComponent<SlotMachineProps> = () => {
    return (
        <MachineContainer>
            <WheelContainer>
                <Wheel src={assetList[0].asset} />
                <Wheel src={assetList[1].asset} />
                <Wheel src={assetList[2].asset} />
            </WheelContainer>
        </MachineContainer>
     );
}
 
export default SlotMachine;