import { FileData } from '@/types/data.types'
import { FC, memo, useState } from 'react'
import { SearchFilterButton } from './SearchFilterButton'

type ItemType =
  | 'all'
  | 'document'
  | 'video'
  | 'image'
  | 'audio'
  | 'pdf'
  | 'folder'
interface Props {
  files?: FileData[]
  onTypeChange?: (type: ItemType) => void
}

export const SearchFilter: FC<Props> = memo(({ files = [], onTypeChange }) => {
  const [selectedType, setSelectedType] = useState<ItemType | 'all'>('all')

  const handleTypeChange = (type: ItemType | 'all') => {
    setSelectedType(type)
    onTypeChange?.(type)
  }

  // const filteredItems =
  //   selectedType === 'all' ? files : filterItemsByType(files, selectedType)

  const countByType = (type: ItemType): number => {
    return files.filter((item) => item.type === type).length
  }

  return (
    <div className="flex items-center gap-4 mb-5 justify-center">
      <SearchFilterButton
        type="All"
        count={files.length}
        selected={selectedType === 'all'}
        onClick={() => handleTypeChange('all')}
      />
      {countByType('document') > 0 && (
        <SearchFilterButton
          type="Docs"
          count={countByType('document')}
          selected={selectedType === 'document'}
          onClick={() => handleTypeChange('document')}
        />
      )}
      {countByType('video') > 0 && (
        <SearchFilterButton
          type="Video"
          count={countByType('video')}
          selected={selectedType === 'video'}
          onClick={() => handleTypeChange('video')}
        />
      )}
      {countByType('image') > 0 && (
        <SearchFilterButton
          type="Image"
          count={countByType('image')}
          selected={selectedType === 'image'}
          onClick={() => handleTypeChange('image')}
        />
      )}
      {countByType('audio') > 0 && (
        <SearchFilterButton
          type="audio"
          count={countByType('audio')}
          selected={selectedType === 'audio'}
          onClick={() => handleTypeChange('audio')}
        />
      )}
      {countByType('pdf') > 0 && (
        <SearchFilterButton
          type="pdf"
          count={countByType('pdf')}
          selected={selectedType === 'pdf'}
          onClick={() => handleTypeChange('pdf')}
        />
      )}
      {countByType('folder') > 0 && (
        <SearchFilterButton
          type="folder"
          count={countByType('folder')}
          selected={selectedType === 'folder'}
          onClick={() => handleTypeChange('folder')}
        />
      )}
    </div>
  )
})

SearchFilter.displayName = 'SearchFilter'
