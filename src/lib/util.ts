export function sumPercentages(array: any) {
  let sumFirst = 0;
  let sumSecond = 0;
  let sumThird = 0;

  array.forEach((item: { percentages: number[]; }) => {
    if (item.percentages[0] !== undefined) {
      sumFirst += item.percentages[0];
    }
    if (item.percentages[1] !== undefined) {
      sumSecond += item.percentages[1];
    }
    if (item.percentages[2] !== undefined) {
      sumThird += item.percentages[2];
    }
  });

  return [sumFirst, sumSecond, sumThird];
}