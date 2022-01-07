import {
  FunctionComponent,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import Wheel from "../components/Wheel/Wheel";
import { AUTO_START_TIMEOUT, AUTO_STOP_TIMEOUT, WHEEL_INTERVAL } from "../consts/Machine";
import { getRandomNumberBetween } from "../helpers/CommonHelper";
import { calcResult, generateRandomAssetList } from "../helpers/WheelHelper";
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
  const [spinTick, setSpinTick] = useState<number>(0);

  const [firstSelectedIndex, setFirstSelectedIndex] = useState<number>(0);
  const [secondSelectedIndex, setSecondSelectedIndex] = useState<number>(0);
  const [thirdSelectedIndex, setThirdSelectedIndex] = useState<number>(0);

  const [elapsedTime, setElapsedTime] = useState<number>(0);
  const [prize, setPrize] = useState<number | null>(null);

  let firstAsset = firstList[firstSelectedIndex];
  let secondAsset = secondList[secondSelectedIndex];
  let thirdAsset = thirdList[thirdSelectedIndex];

  const _onStart = useCallback(() => {
    if (spinTick === 0) {
      console.log("Start called");
      setElapsedTime(0);
      setPrize(null);

      engineInterval.current = setInterval(() => {
        setSpinTick((prev) => prev + 1);

        setFirstSelectedIndex(getRandomNumberBetween(0, firstList.length - 1));
        setSecondSelectedIndex(
          getRandomNumberBetween(0, secondList.length - 1)
        );
        setThirdSelectedIndex(getRandomNumberBetween(0, thirdList.length - 1));
      }, WHEEL_INTERVAL);

      elapsedTimeInterval.current = setInterval(() => {
        setElapsedTime((_elapsedTime) => _elapsedTime + 1);
      }, 1000);
    }
  }, [spinTick]);

  const _onStop = useCallback(() => {
    console.log("Stop called");

    clearInterval(engineInterval.current);
    clearInterval(elapsedTimeInterval.current);
    clearTimeout(autoStartInterval.current);

    engineInterval.current = null;
    setSpinTick(0)

    const _prize = calcResult(firstAsset, secondAsset, thirdAsset);
    setPrize(_prize);

    //eslint-disable-next-line
  }, [firstAsset, secondAsset, thirdAsset]);

  // Auto stop after 10 seconds
  useEffect(() => {
    if (elapsedTime === AUTO_STOP_TIMEOUT) {
      _onStop();
    }
  }, [elapsedTime, _onStop]);

  // Schedule auto start after 5 seconds
  useEffect(() => {
    console.log("AUTO START SCHEDULED");
    autoStartInterval.current = setTimeout(() => {
      _onStart();
    }, AUTO_START_TIMEOUT);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);


  const isSpining = spinTick > 0;

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
          <button data-testid='StartBtn' onClick={_onStart} className="primary" disabled={isSpining}>
            START
          </button>
          <button data-testid='StopBtn' onClick={_onStop} className="danger" disabled={!isSpining}>
            STOP
          </button>
        </ButtonsContainer>

        <InfoContainer>
          <b>Elapsed Time:</b> <span data-testid='ElapsedTimeSpn'>{elapsedTime}</span> <br />
          <b>Is Playing:</b> <span data-testid='IsPlayingSpn'> {isSpining ? "Yes" : "No"} </span><br />
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
