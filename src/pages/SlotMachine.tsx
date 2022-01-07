import { FunctionComponent, useCallback, useEffect, useState } from "react";
import Wheel from "../components/Wheel/Wheel";
import assetList from '../consts/assetList';
import { getRandomNumberBetween } from "../helpers/common";
import { generateRandomAssetList } from "../helpers/wheel";
import Asset from "../types/Asset";
import { ButtonsContainer, MachineContainer, WheelContainer } from "./SlotMachine.styled";

interface SlotMachineProps {
    
}


const randomAssets = generateRandomAssetList();

const SlotMachine: FunctionComponent<SlotMachineProps> = () => {


    const [firstSelectedIndex, setFirstSelectedIndex] = useState<number>(0);
    const [secondSelectedIndex, setSecondSelectedIndex] = useState<number>(0);
    const [thirdSelectedIndex, setThirdSelectedIndex] = useState<number>(0);

    const _onStart = useCallback( () => {
        setFirstSelectedIndex(getRandomNumberBetween(0, randomAssets.length - 1));
        setSecondSelectedIndex(getRandomNumberBetween(0, randomAssets.length - 1));
        setThirdSelectedIndex(getRandomNumberBetween(0, randomAssets.length - 1));
        
    }, []);
    
    const _onStop = useCallback( () => {
        
    }, []);
    
    useEffect(()=> {
        _onStart();
    }, [_onStart]);


    return (
        <MachineContainer className="machine">
            <WheelContainer>
                <Wheel src={randomAssets[firstSelectedIndex].asset} />
                <Wheel src={randomAssets[secondSelectedIndex].asset} />
                <Wheel src={randomAssets[thirdSelectedIndex].asset} />
            </WheelContainer>


            <ButtonsContainer>
                    <button onClick={_onStart} className="primary">START</button>
                    <button onClick={_onStop} className="danger">STOP</button>
            </ButtonsContainer>

        </MachineContainer>
     );
}
 
export default SlotMachine;