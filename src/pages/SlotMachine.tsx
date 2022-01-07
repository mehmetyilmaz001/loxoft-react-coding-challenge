import {
  FunctionComponent,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import Wheel from "../components/Wheel/Wheel";
import { getRandomNumberBetween } from "../helpers/Common";
import { calcResult, generateRandomAssetList } from "../helpers/Wheel";
import {
  ButtonsContainer,
  InfoContainer,
  WheelContainer,
} from "./SlotMachine.styled";

interface SlotMachineProps {}

const firstList = generateRandomAssetList();
const secondList = generateRandomAssetList();
const thirdList = generateRandomAssetList();

const SlotMachine: FunctionComponent<SlotMachineProps> = () => {
  const engineInterval = useRef<any>(null);
  const elapsedTimeInterval = useRef<any>(null);
  const autoStartInterval = useRef<any>(null);
  const spinTick = useRef<number>(0);

  const [firstSelectedIndex, setFirstSelectedIndex] = useState<number>(0);
  const [secondSelectedIndex, setSecondSelectedIndex] = useState<number>(0);
  const [thirdSelectedIndex, setThirdSelectedIndex] = useState<number>(0);

  const [elapsedTime, setElapsedTime] = useState<number>(0);
  const [prize, setPrize] = useState<number | null>(null);

  let firstAsset = firstList[firstSelectedIndex];
  let secondAsset = secondList[secondSelectedIndex];
  let thirdAsset = thirdList[thirdSelectedIndex];

  const _onStart = useCallback(() => {
    if (spinTick.current === 0) {
      console.log("Start called");
      setElapsedTime(0);
      setPrize(null);

      engineInterval.current = setInterval(() => {
        spinTick.current = spinTick.current + 1;

        setFirstSelectedIndex(getRandomNumberBetween(0, firstList.length - 1));
        setSecondSelectedIndex(
          getRandomNumberBetween(0, secondList.length - 1)
        );
        setThirdSelectedIndex(getRandomNumberBetween(0, thirdList.length - 1));
      }, 50);

      elapsedTimeInterval.current = setInterval(() => {
        setElapsedTime((_elapsedTime) => _elapsedTime + 1);
      }, 1000);
    }
  }, []);

  const _onStop = useCallback(() => {
    console.log("Stop called");

    clearInterval(engineInterval.current);
    clearInterval(elapsedTimeInterval.current);
    clearTimeout(autoStartInterval.current);

    engineInterval.current = null;
    spinTick.current = 0;

    const _prize = calcResult(firstAsset, secondAsset, thirdAsset);
    setPrize(_prize);

    //eslint-disable-next-line
  }, [firstAsset, secondAsset, thirdAsset]);

  // Auto stop after 10 seconds
  useEffect(() => {
    if (elapsedTime === 10) {
      _onStop();
    }
  }, [elapsedTime, _onStop]);

  // Schedule auto start after 10 seconds
  useEffect(() => {
    console.log("AUTO START SCHEDULED");
    autoStartInterval.current = setTimeout(() => {
      _onStart();
    }, 10 * 1000);
  }, [_onStart]);

  return (
    <>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "20px",
        }}
      >
        <WheelContainer>
          <Wheel src={firstAsset.src} name={firstAsset.name}  />
          <Wheel src={secondAsset.src} name={secondAsset.name} />
          <Wheel src={thirdAsset.src} name={thirdAsset.name}/>
        </WheelContainer>
        <ButtonsContainer>
          <button onClick={_onStart} className="primary">
            START
          </button>
          <button onClick={_onStop} className="danger">
            STOP
          </button>
        </ButtonsContainer>

        <InfoContainer>
          <b>Elapsed Time:</b> {elapsedTime} <br />
          <b>Is Playing:</b> {spinTick.current > 0 ? "Yes" : "No"} <br />
        </InfoContainer>
        {prize !== null && (
          <InfoContainer>
            {prize === 0 ? (
              <span style={{color: "red"}}>You lost!</span>
            ) : (
              <span
                style={{ fontSize: prize === 0 || prize === 10 ? 18 : prize! }}
              >
                Prize: {prize} USD
              </span>
            )}
          </InfoContainer>
        )}
      </div>
    </>
  );
};

export default SlotMachine;
