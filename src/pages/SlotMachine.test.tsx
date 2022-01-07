import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import SlotMachine from "./SlotMachine";

test("snapshot of the base state", () => {
  jest.isolateModules(() => {
    const { asFragment } = render(<SlotMachine />);

    expect(asFragment()).toMatchSnapshot();
  });
});

test("renders is playing box after start click", () => {
  jest.isolateModules(async() => {
    render(<SlotMachine />);

    const startBtn = screen.getByTestId("StartBtn");
    
    fireEvent.click(startBtn);
    await waitFor(() => {
        expect(screen.getByTestId("IsPlayingSpn")).toHaveTextContent(/Yes/)
    })
   
    // eslint-disable-next-line testing-library/no-debugging-utils
    screen.debug();
    
  });
});