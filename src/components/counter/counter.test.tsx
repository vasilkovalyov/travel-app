import { render, screen } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';

import { dataAttributes } from './counter.test-attributes';
import Counter from './counter';

async function clickButton(button: HTMLElement, count: number) {
  for (let i = 0; i < count; i++) {
    await userEvent.click(button);
  }
}

describe('Counter', () => {
  it('Check on disable', async () => {
    const countClicks = 3;
    render(<Counter minValue={0} />);
    const buttonInc = screen.getByTestId(dataAttributes.buttonIncrease);
    const buttonDec = screen.getByTestId(dataAttributes.buttonDecrease);
    const counterInput = screen.getByTestId(
      dataAttributes.input,
    ) as HTMLInputElement;

    // click on button increase 3 times
    await clickButton(buttonInc, countClicks);
    counterInput.getAttribute('value');
    expect(counterInput.value).toBe('3');

    // click on button decrease 3 times
    await clickButton(buttonDec, countClicks);
    expect(counterInput.value).toBe('0');
    expect(buttonDec).toBeDisabled();
  });

  it('Default value counter', async () => {
    render(<Counter minValue={0} value={4} />);
    // check if input equal 4
    const counterInput = screen.getByTestId(
      dataAttributes.input,
    ) as HTMLInputElement;
    expect(counterInput.value).toBe('4');
  });

  it('Input hide, show title with value', async () => {
    const titleText = 'Counter text';
    render(<Counter minValue={0} value={4} input={false} title={titleText} />);

    // check if input does not exist in document
    const counterInput = screen.queryByTestId(
      dataAttributes.input,
    ) as HTMLInputElement;
    expect(counterInput).not.toBeInTheDocument();

    // check if title equal 'Counter text'
    const counterTitle = screen.getByTestId(dataAttributes.title);
    expect(counterTitle).toHaveTextContent(titleText);

    // check if value equal 4
    const valueTitle = screen.getByTestId(dataAttributes.value);
    expect(valueTitle).toHaveTextContent('4');
  });
});
