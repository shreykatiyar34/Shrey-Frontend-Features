import { useState, useRef, useEffect } from 'react';

type SelectOption = {
  value: string;
  label: string;
};

type SelectProps = {
  label: string;
  placeholder?: string;
  value: string;
  options: SelectOption[];
  onChange: (value: string) => void;
  disabled?: boolean;
};

export function Select({ label, placeholder = 'Select an option', value, options, onChange, disabled = false }: SelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const selectRef = useRef<HTMLDivElement>(null);

  const selectedOption = options.find((opt) => opt.value === value);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (selectRef.current && !selectRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  const handleSelect = (optionValue: string) => {
    onChange(optionValue);
    setIsOpen(false);
  };

  return (
    <div className="field" ref={selectRef}>
      <span className="field__label">{label}</span>
      <div className="select">
        <button
          className={`select__button ${isOpen ? 'select__button--open' : ''} ${disabled ? 'select__button--disabled' : ''}`}
          type="button"
          onClick={() => !disabled && setIsOpen(!isOpen)}
          disabled={disabled}
        >
          <span className={selectedOption ? 'select__value' : 'select__placeholder'}>
            {selectedOption ? selectedOption.label : placeholder}
          </span>
          <span className="select__arrow">▼</span>
        </button>

        {isOpen && !disabled && (
          <div className="select__dropdown">
            {options.length === 0 ? (
              <div className="select__option select__option--empty">No options available</div>
            ) : (
              options.map((option) => (
                <button
                  key={option.value}
                  className={`select__option ${option.value === value ? 'select__option--active' : ''}`}
                  type="button"
                  onClick={() => handleSelect(option.value)}
                >
                  {option.label}
                </button>
              ))
            )}
          </div>
        )}
      </div>
    </div>
  );
}

