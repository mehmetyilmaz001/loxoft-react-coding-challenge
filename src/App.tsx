import styled from "styled-components";
import SlotMachine from "./pages/SlotMachine";

const Header = styled.header`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #282c34;
  height: 50px;
  color: white;
`

function App() {
  return (
    <div className="App" style={{display: 'flex', flexDirection: 'column', gap: 8}}>
      <Header className="App-header">
        Mehmet Yılmaz - Luxoft Slot Machine Coding Challenge
      </Header>

      <SlotMachine />
    </div>
  );
}

export default App;
