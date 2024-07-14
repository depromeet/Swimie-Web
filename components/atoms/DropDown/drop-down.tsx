import { css, cva } from '@/styled-system/css';

interface DropDownProps {
  options: { value: number; label: string }[];
  value: number;
  addStyles?: object;
  addListStyles?: object;
  onSelect?: (value: number) => void;
}

export function DropDown({
  options,
  value,
  addStyles,
  addListStyles,
  onSelect,
}: DropDownProps) {
  const handleOptionClick = (value: number) => {
    onSelect && onSelect(value);
  };
  return (
    <ul className={css(dropDownStyles, addStyles)}>
      {options.map((option) => (
        <li
          key={option.value}
          className={css(
            value === option.value
              ? listStyles.raw({ selected: true })
              : listStyles.raw({ selected: false }),
            addListStyles,
          )}
          onClick={() => handleOptionClick(option.value)}
        >
          {option.label}
        </li>
      ))}
    </ul>
  );
}

const dropDownStyles = css.raw({
  width: '100%',
  backgroundColor: 'white',
  border: '1px solid',
  padding: '10px',
});

const listStyles = cva({
  base: {
    padding: '6px 10px',
  },
  variants: {
    selected: {
      true: { borderBottom: '1px solid red' },
      false: { borderBottom: '1px solid black' },
    },
  },
});
