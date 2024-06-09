import { AnimatedText } from '@/components/AnimatedText'
import { SearchBar } from '@/components/SearchBar'
import clsx from 'clsx'
import React, { useEffect, useState } from 'react'
import { SearchFilter } from '../SearchFilter'
import { SearchResult, SearchResultProps } from '../SearchResult'

export type SearchProps = {
  query?: string
  onQueryChange?: (query: string) => void

  searching?: boolean
  results?: SearchResultProps['files']
  onSearch?: (query: string) => void

  selectedFiles?: SearchResultProps['selected']
  onSelect?: SearchResultProps['onSelect']

  compact?: boolean
}

export const Search: React.FC<SearchProps> = ({
  query,
  onQueryChange,
  searching,
  results,
  onSearch,
  selectedFiles,
  onSelect,
  compact,
}) => {
  const [filteredFiles, setFilteredFiles] = useState(results)

  const handleFilterChange = (type: string) => {
    type === 'all'
      ? setFilteredFiles(results)
      : setFilteredFiles(results?.filter((item) => item.type === type))
  }

  useEffect(() => {
    setFilteredFiles(results)
  }, [results])

  return (
    <div className="flex flex-col">
      <SearchBar
        className={clsx(
          'transition',
          'mb-10',
          compact && ['opacity-0', 'invisible', 'h-0', 'mb-0'],
        )}
        value={query}
        pending={searching}
        onChange={(e) => onQueryChange && onQueryChange(e.target.value)}
        onSubmit={() => {
          onSearch && onSearch(query || '')
        }}
      />
      {typeof results !== 'undefined' && (
        <div className="flex flex-col">
          {filteredFiles && filteredFiles?.length > 0 && !compact && (
            <SearchFilter files={results} onTypeChange={handleFilterChange} />
          )}
          <SearchResult
            title={
              <div className="flex flex-row items-center gap-2">
                <AnimatedText
                  maxTime={500}
                  text={compact ? query! : 'Search results'}
                />
              </div>
            }
            description={
              <AnimatedText
                maxTime={500}
                text={
                  compact
                    ? `Ask me anything to help with your studies!`
                    : `Select at least one file to start a new conversation.`
                }
              />
            }
            selected={selectedFiles}
            onSelect={onSelect}
            files={filteredFiles}
            hideList={compact}
            compactOverview={compact}
          />
        </div>
      )}
    </div>
  )
}
