import clsx from 'clsx'

interface FilterButtonProps {
  type: string
  count: number
  selected: boolean
  onClick: () => void
}

export const SearchFilterButton: React.FC<FilterButtonProps> = ({
  type,
  count,
  selected,
  onClick,
}) => {
  return (
    <button
      className={clsx(
        'flex items-center justify-center py-2 px-4 rounded-full bg-white shadow-md gap-1',
        selected && '!bg-green-500 text-white',
      )}
      onClick={onClick}
    >
      <span>{type}</span>
      <span className="text-sm">({count})</span>
    </button>
  )
}
