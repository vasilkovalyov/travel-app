export function formatNumber(n: string) {
  return n.replace(/\D/g, '').replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

export function convertToNumericValue(value: string) {
  return value.replace(/\D/g, '');
}

export function getFormattedCurrency(inputText: number, currency: string) {
  let inputValue = inputText.toString();

  if (inputValue === '') {
    return '';
  }

  if (inputValue.indexOf('.') >= 0) {
    let decimal_pos = inputValue.indexOf('.');

    let leftSide = inputValue.substring(0, decimal_pos);
    let rightSide = inputValue.substring(decimal_pos);

    leftSide = formatNumber(leftSide);

    rightSide = formatNumber(rightSide);

    rightSide = rightSide.substring(0, 2);

    inputValue = currency + leftSide + '.' + rightSide;
  } else {
    inputValue = formatNumber(inputValue);
    inputValue = currency + inputValue;
  }

  return inputValue;
}
