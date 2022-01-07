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

  let firstAsset = firstList[firstSelectedIndex];
  let secondAsset = secondList[secondSelectedIndex];
  let thirdAsset = thirdList[thirdSelectedIndex];

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



  const _calcResult = useCallback(() => {
    if(firstAsset && secondAsset && thirdAsset){
        const resultArray = [firstAsset, secondAsset, thirdAsset];

        console.log("_calcResult", resultArray);
        
        const isAllAssetsSame = resultArray.every(asset => asset === resultArray[0]);
        
        const hasTwoNonConsecutiveAssets = firstAsset.name === thirdAsset.name;
        
        const hasTwoConsecutiveAssets = resultArray.some((asset, index) => {
              return index + 1 <= resultArray.length - 1 ? asset.name === resultArray[index + 1].name : false;
        });

        if(isAllAssetsSame){
            return 100;
        }else if(hasTwoConsecutiveAssets){
            return 20;
        }else if(hasTwoNonConsecutiveAssets){
              return 10;
        }else{
            return 0;
        }
    }
} , [firstAsset, secondAsset, thirdAsset]);

  const _onStop = useCallback(() => {
    clearInterval(engineInterval.current);
    engineInterval.current = null;
    clearInterval(elapsedTimeInterval.current); 
    spinTick.current = 0;
    setElapsedTime(0);

    // Calculate the results 
    // Two non-consecutive asset: 10
    // Two consecutive asset: 20
    // Same asset in all wheels: 100 dollars

    console.log("stop called result ==> ", _calcResult());

  }, [_calcResult]);



  useEffect(() => {
      if(elapsedTime === 10){
            _onStop();
      }
  }, [elapsedTime, _onStop]);

  useEffect(() => {
    console.log("auto start");
    //TODO: Check wheter stop button is clicked
    setTimeout(() => {
      _onStart();
    }, 10 * 1000);
    return () => {
        // _onStop();
    };
  }, [_onStart]);

  return (
    <MachineContainer className="machine">
      <WheelContainer>
        <Wheel src={firstAsset.src} />
        <Wheel src={secondAsset.src} />
        <Wheel src={thirdAsset.src} />
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
