import { render, screen } from "@testing-library/react";
import { ASSET_LIST } from "../../consts/Machine";
import Wheel from "./Wheel";

test("Render Wheel component correctly", async () => {
  const asset = ASSET_LIST[0];
  render(<Wheel src={asset.src} name={asset.name} />);
  const wheel = await screen.findByTitle(asset.name);

  expect(wheel).toBeInTheDocument();
});
