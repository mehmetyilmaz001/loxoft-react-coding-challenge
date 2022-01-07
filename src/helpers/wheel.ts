import { ASSET_LIST } from './../consts/Machine';
import { randomlyMoveItems } from './common';
import Asset from "../types/Asset";

export const generateRandomAssetList = (): Asset[] => {
    const tripleList = [...ASSET_LIST, ...ASSET_LIST, ...ASSET_LIST];
    return randomlyMoveItems(tripleList);
}