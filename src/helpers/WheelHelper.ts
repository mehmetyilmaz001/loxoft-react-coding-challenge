import { ASSET_LIST } from "../consts/Machine";
import { randomlyMoveItems } from "./CommonHelper";
import Asset from "../types/Asset";

export const generateRandomAssetList = (): Asset[] => {
  const tripleList = [...ASSET_LIST, ...ASSET_LIST, ...ASSET_LIST];
  return randomlyMoveItems(tripleList);
};

export const calcResult = (
  firstAsset: Asset,
  secondAsset: Asset,
  thirdAsset: Asset
): number => {
  if (firstAsset && secondAsset && thirdAsset) {
    const isAllAssetsSame =
      firstAsset.name === secondAsset.name &&
      firstAsset.name === thirdAsset.name;

    const hasTwoNonConsecutiveAssets = firstAsset.name === thirdAsset.name;

    const hasTwoConsecutiveAssets =
      firstAsset.name === secondAsset.name ||
      secondAsset.name === thirdAsset.name;

    if (isAllAssetsSame) {
      return 100;
    } else if (hasTwoConsecutiveAssets) {
      return 20;
    } else if (hasTwoNonConsecutiveAssets) {
      return 10;
    } else {
      return 0;
    }
  } else {
    return 0;
  }
};
