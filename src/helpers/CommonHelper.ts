export const randomlyMoveItems = (items: any[]) => {
    const newItems = [...items];
    for (let i = 0; i < newItems.length; i++) {
        const randomIndex = Math.floor(Math.random() * newItems.length);
        const temp = newItems[i];
        newItems[i] = newItems[randomIndex];
        newItems[randomIndex] = temp;
    }
    return newItems;
}

export function getRandomNumberBetween(min: number, max: number) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }