import Asset from '../types/Asset';
import {calcResult} from './WheelHelper';


describe('calculate result function', () => {

    test('returns correctly for the two identical non-consecutive result', () => {
        const firstAsset: Asset = {id: 1, name: 'apple', src: ''}; 
        const secondAsset: Asset = {id: 2, name: 'orange', src: ''}; 
        const thirdAsset: Asset = {id: 3, name: 'apple', src: ''}; 
         expect(calcResult(firstAsset, secondAsset, thirdAsset)).toBe(10);
    });
    
    test('returns correctly for the two identical consecutive result', () => {
        const firstAsset: Asset = {id: 1, name: 'apple', src: ''}; 
        const secondAsset: Asset = {id: 2, name: 'apple', src: ''}; 
        const thirdAsset: Asset = {id: 3, name: 'orange', src: ''}; 
         expect(calcResult(firstAsset, secondAsset, thirdAsset)).toBe(20);
    });
    
    test('returns correctly for same symbol  in all the wheels', () => {
        const firstAsset: Asset = {id: 1, name: 'apple', src: ''}; 
        const secondAsset: Asset = {id: 2, name: 'apple', src: ''}; 
        const thirdAsset: Asset = {id: 3, name: 'apple', src: ''}; 
         expect(calcResult(firstAsset, secondAsset, thirdAsset)).toBe(100);
    });

})

