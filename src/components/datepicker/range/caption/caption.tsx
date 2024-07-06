import { DatepickerTabEnum } from '@/blocks/date-pickers-search';
import { CaptionProps } from './caption.type';

export default function Caption({}: CaptionProps) {
  const date = new Date();

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    const newDate = new Date(date);

    if (name === DatepickerTabEnum.Month) {
      newDate.setMonth(value);
    } else {
      newDate.setFullYear(value);
    }
  };

  return (
    <div className="caption">
      <select name="month" onChange={handleChange} value={date.getMonth()}>
        {[0, 1, 2, 3].map((month: any, i: number) => (
          <option key={i} value={i}>
            {month}
          </option>
        ))}
      </select>
      <select name="year" onChange={handleChange} value={date.getFullYear()}>
        {Array.from(new Array(4), (_, i) => i + date.getFullYear()).map(
          (year) => (
            <option key={year} value={year}>
              {year}
            </option>
          ),
        )}
      </select>
    </div>
  );
}
