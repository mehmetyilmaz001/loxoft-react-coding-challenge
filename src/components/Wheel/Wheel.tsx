

import { FunctionComponent } from "react";
import WheelContainer from "./Wheel.styled";

interface WheelProps {
    /**
     * The image to display in the wheel
     */
  src: string;
  name: string;
}


/**
 * 
 * This component is used to display the wheel
 */
const Wheel: FunctionComponent<WheelProps> = ({ src, name }) => {
  return (
    <WheelContainer className="wheel" title={name}>
      <img src={src} alt={"Wheel"} />
    </WheelContainer>
  );
};

export default Wheel;
