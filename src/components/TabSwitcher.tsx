type TabOption<T extends string> = {
  label: string
  value: T
}

type TabSwitcherProps<T extends string> = {
  options: TabOption<T>[]
  value: T
  onChange: (value: T) => void
}

export function TabSwitcher<T extends string>({ options, value, onChange }: TabSwitcherProps<T>) {
  return (
    <div className="tab-switcher" role="tablist" aria-label="Auth method">
      {options.map((option) => {
        const isActive = option.value === value
        return (
          <button
            key={option.value}
            className={`tab-switcher__tab ${isActive ? 'tab-switcher__tab--active' : ''}`}
            type="button"
            role="tab"
            aria-selected={isActive}
            onClick={() => onChange(option.value)}
          >
            {option.label}
          </button>
        )
      })}
    </div>
  )
}

