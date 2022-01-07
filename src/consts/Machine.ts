import strawberry from '../assets/strawberry.svg';
import orange from '../assets/orange.svg';
import banana from '../assets/banana.svg';
import monkey from '../assets/monkey.svg';
import Asset from '../types/Asset';

 export const ASSET_LIST: Asset[] = [
    {id: 1, name: 'Strawberry', src: strawberry},
    {id: 2, name: 'Banana', src: orange },
    {id: 3, name: 'Orange', src: banana },
    {id: 4, name: 'Monkey', src: monkey },
]


export const WHEEL_SIZE = 3;
