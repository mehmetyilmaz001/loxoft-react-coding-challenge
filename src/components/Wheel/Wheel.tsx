import { FunctionComponent } from "react";
import styled from "styled-components";

interface WheelProps {
    src: string
}

const WheelContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 300px;
    border: solid 1px black;

    img{
        height: 70px;
    }
`
 
const Wheel: FunctionComponent<WheelProps> = ({src}) => {
  return (  
            <WheelContainer className="wheel" >
                <img src={src} alt={"Wheel"} />
            </WheelContainer>   
    );
}
 
export default Wheel;