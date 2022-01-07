import { randomlyMoveItems } from './common';
import Asset from "../types/Asset";
import assetList from '../consts/assetList';

export const generateRandomAssetList = (): Asset[] => {
    return randomlyMoveItems(assetList);
}