import {
  FunctionComponent,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import Wheel from "../components/Wheel/Wheel";
import { getRandomNumberBetween } from "../helpers/common";
import { generateRandomAssetList } from "../helpers/wheel";
import {
  ButtonsContainer,
  MachineContainer,
  WheelContainer,
} from "./SlotMachine.styled";

interface SlotMachineProps {}

const firstList = generateRandomAssetList();
const secondList = generateRandomAssetList();
const thirdList = generateRandomAssetList();

const SlotMachine: FunctionComponent<SlotMachineProps> = () => {
  console.log("re render");

  const engineInterval = useRef<any>(null);
  const elapsedTimeInterval = useRef<any>(null);
  const spinTick = useRef<number>(0);

  const [firstSelectedIndex, setFirstSelectedIndex] = useState<number>(0);
  const [secondSelectedIndex, setSecondSelectedIndex] = useState<number>(0);
  const [thirdSelectedIndex, setThirdSelectedIndex] = useState<number>(0);

  const [elapsedTime, setElapsedTime] = useState<number>(0);

  const _onStart = useCallback(() => {
    if (spinTick.current === 0) {
      console.log("start called");

      engineInterval.current = setInterval(() => {
        spinTick.current = spinTick.current + 1;

        setFirstSelectedIndex(getRandomNumberBetween(0, firstList.length - 1));
        setSecondSelectedIndex(
          getRandomNumberBetween(0, secondList.length - 1)
        );
        setThirdSelectedIndex(getRandomNumberBetween(0, thirdList.length - 1));
      }, 50);

      elapsedTimeInterval.current = setInterval(() => {
        setElapsedTime(_elapsedTime => _elapsedTime + 1);
      }, 1000);
    }
  }, []);

  const _onStop = useCallback(() => {
    clearInterval(engineInterval.current);
    engineInterval.current = null;
    clearInterval(elapsedTimeInterval.current); 
    spinTick.current = 0;
    setElapsedTime(0);
  }, []);

  useEffect(() => {
      if(elapsedTime === 10){
            _onStop();
      }
  }, [elapsedTime, _onStop]);

  useEffect(() => {
    console.log("auto start");
    // Check wheter stop button is clicked
    setTimeout(() => {
      _onStart();
    }, 10 * 1000);
    return () => {
        _onStop();
    };
  }, [_onStart, _onStop]);

  return (
    <MachineContainer className="machine">
      <WheelContainer>
        <Wheel src={firstList[firstSelectedIndex].asset} />
        <Wheel src={secondList[secondSelectedIndex].asset} />
        <Wheel src={thirdList[thirdSelectedIndex].asset} />
      </WheelContainer>
      {spinTick.current} <br />
      {elapsedTime}
      <ButtonsContainer>
        <button onClick={_onStart} className="primary">
          START
        </button>
        <button onClick={_onStop} className="danger">
          STOP
        </button>
      </ButtonsContainer>
    </MachineContainer>
  );
};

export default SlotMachine;
