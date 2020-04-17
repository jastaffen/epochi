export const formatIngredient = (ing) => {
    let ingStr = '';
    const { measurement: {$numberDecimal}, unit, name, additionalInfo } = ing;
    if ($numberDecimal !== "0") ingStr += $numberDecimal
    if (unit.toUpperCase() !== 'quantity'.toUpperCase() &&
    unit !== 'to taste') ingStr += ` ${unit}`
    ingStr += ` ${name}`;
    if (additionalInfo) ingStr += ` ${additionalInfo}`;
    if (unit === 'to taste') ingStr +=  ` ${unit}`
    return ingStr;
}