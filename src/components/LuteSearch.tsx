import React from 'react'
import { Disclosure, Transition } from '@headlessui/react'
import {
  InstantSearch,
  SearchBox,
  Hits,
  Highlight,
  Configure,
  Pagination,
  RangeInput,
  ClearRefinements,
  Stats,
  RefinementList,
  CurrentRefinements,
} from 'react-instantsearch'
import { instantMeiliSearch } from '@meilisearch/instant-meilisearch'
import clsx from 'clsx'
import { type ReactNode } from 'react'

const email = import.meta.env.PUBLIC_EMAIL

const searchClient = instantMeiliSearch(
  import.meta.env.PUBLIC_MEILISEARCH_HOST,
  import.meta.env.PUBLIC_MEILISEARCH_API_KEY,
  {
    finitePagination: true,
    primaryKey: 'id',
  },
)

const propertyList = [
  { value: 'subtitle', title: 'Subtitle' },
  { value: 'date', title: 'Date' },
  { value: 'key', title: 'Key' },
  { value: 'type_of_piece', title: 'Type of Piece' },
  { value: 'difficulty', title: 'Difficulty' },
  { value: 'document', title: 'Document' },
  { value: 'original_composer', title: 'Original Composer' },
  { value: 'source', title: 'Source' },
  { value: 'ensemble', title: 'Ensemble' },
  { value: 'part', title: 'Part' },
  { value: 'volume', title: 'Volume' },
  { value: 'concordances', title: 'Concordances' },
  { value: 'piece', title: 'Piece' },
  { value: 'remarks', title: 'Remarks' },
  { value: 'page', title: 'Page' },
]

const linkPropertyList = [
  { value: 'midi', title: 'MIDI' },
  { value: 'pdf', title: 'PDF' },
  { value: 'fronimo', title: 'Fronimo' },
  { value: 'facsimile', title: 'Facsimile' },
  { value: 'recording', title: 'Recording' },
]

const hitsPerPage = 24

function Prose({ className, ...props }: React.ComponentPropsWithoutRef<'div'>) {
  return (
    <div className={clsx(className, 'prose dark:prose-invert')} {...props} />
  )
}

const Hit = ({ hit }: { hit: any }) => (
  <div key={hit.id}>
    <h2 className="text-base font-semibold text-zinc-800 dark:text-zinc-100">
      <Highlight attribute="title" hit={hit} /> -{' '}
      <Highlight attribute="composer" hit={hit} />
    </h2>
    {propertyList.map(
      (prop) =>
        hit[prop.value] && (
          <p
            key={prop.value}
            className="text-sm text-zinc-600 dark:text-zinc-400"
          >
            {prop.title}: <Highlight attribute={prop.value} hit={hit} />
          </p>
        ),
    )}
    <div>
      {linkPropertyList.map(
        (prop) =>
          hit[prop.value] && (
            <a
              href={addSubdomainToUrl(hit[prop.value])}
              target="_blank"
              rel="noreferrer"
              key={prop.value}
              className="mr-2 text-sm font-semibold text-teal-500"
            >
              {prop.title}
            </a>
          ),
      )}
    </div>
  </div>
)

export function LuteSearch() {
  return (
    <>
      <p className="mb-2 text-right">
        <a
          href="https://www.lutemusic.org/"
          rel="noopener noreferrer"
          target="_blank"
          className="text-sm font-semibold text-teal-500"
        >
          Source
        </a>
      </p>
      <InstantSearch indexName="lute" searchClient={searchClient}>
        <SearchBox
          placeholder="Search by composer, title or subtitle"
          classNames={{
            input: clsx(['w-full', 'search-input']),
          }}
        />
        <Stats className="mt-1" />
        <div className="grid grid-cols-1 gap-3 pt-4 md:grid-cols-3">
          <div id="filters" className="col-span-1 space-y-2">
            <h2 className="text-color text-lg font-semibold">Filters</h2>
            <Collapsible title="Composers">
              <p className="text-color text-xs">
                Limitation: searching for &quot;John&quot; will return
                &quot;John Dowland&quot;, but searching for &quot;Dowland&quot;
                will not return &quot;John Dowland&quot;.
              </p>
              <Refinement placeholder="Filter composers" attribute="composer" />
            </Collapsible>
            <Collapsible title="Type of Piece">
              <Refinement
                placeholder="Filter type of piece"
                attribute="type_of_piece"
              />
            </Collapsible>
            <Collapsible title="Key">
              <Refinement placeholder="Filter Key" attribute="key" />
            </Collapsible>
            <div>
              <div>
                <label className="text-color text-sm">Difficulty</label>
                <RangeInput attribute="difficulty" />
              </div>
              <div>
                <label className="text-color text-sm">Date</label>
                <RangeInput attribute="date" />
              </div>
            </div>
            <div className="space-y-1">
              <h3 className="text-color font-semibold">Active Filters</h3>
              <CurrentRefinements
                classNames={{
                  item: 'w-max space-x-1 bg-teal-400 dark:bg-teal-600 rounded px-2 py-1',
                  category: 'space-x-1 block',
                  list: 'space-y-1',
                }}
              />
              <ClearRefinements
                translations={{
                  resetButtonText: 'Clear All',
                }}
              />
            </div>
            <Configure hitsPerPage={hitsPerPage} />
          </div>
          <Hits
            classNames={{
              root: 'col-span-2',
              list: 'grid grid-cols-1 gap-8 md:grid-cols-2 xl:grid-cols-3',
            }}
            hitComponent={Hit}
          />
          <Configure hitsPerPage={hitsPerPage} />
        </div>
        <Pagination showLast={true} />
      </InstantSearch>
      <Prose className="mt-8">
        Having problems with search? Reach out to me:{' '}
        <a href={`mailto:${email}`}>{email}</a>
      </Prose>
    </>
  )
}

function ChevronUpIcon({
  className,
  ...props
}: React.ComponentPropsWithoutRef<'svg'>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 20 20"
      fill="currentColor"
      className={clsx('h-5 w-5', className)}
      {...props}
    >
      <path
        fillRule="evenodd"
        d="M14.77 12.79a.75.75 0 01-1.06-.02L10 8.832 6.29 12.77a.75.75 0 11-1.08-1.04l4.25-4.5a.75.75 0 011.08 0l4.25 4.5a.75.75 0 01-.02 1.06z"
        clipRule="evenodd"
      />
    </svg>
  )
}

const Collapsible = ({
  title,
  children,
}: {
  title: string
  children: ReactNode
}) => {
  return (
    <Disclosure>
      {({ open }) => (
        <>
          <Disclosure.Button className="text-color btn-primary flex w-full justify-between text-left">
            <span>{title}</span>
            <ChevronUpIcon
              className={`${open ? 'rotate-180 transform' : ''}  text-zinc-500`}
            />
          </Disclosure.Button>
          <Transition
            enter="transition duration-100 ease-out"
            enterFrom="transform scale-95 opacity-0"
            enterTo="transform scale-100 opacity-100"
            leave="transition duration-75 ease-out"
            leaveFrom="transform scale-100 opacity-100"
            leaveTo="transform scale-95 opacity-0"
          >
            <Disclosure.Panel>{children}</Disclosure.Panel>
          </Transition>
        </>
      )}
    </Disclosure>
  )
}

const Refinement = ({
  attribute,
  placeholder,
}: {
  attribute: string
  placeholder: string
}) => {
  return (
    <RefinementList
      id="refinement-list"
      attribute={attribute}
      searchable
      operator="or"
      searchablePlaceholder={placeholder}
      classNames={{
        searchBox: 'pb-2',
        checkbox:
          'h-4 w-4 rounded border-zinc-900/10 text-teal-600 focus:ring-teal-600 dark:bg-zinc-700 dark:checked:bg-teal-600 dark:focus:border-teal-400 dark:focus:ring-teal-400/10',
        labelText: 'ml-1 text-color',
        count: 'ml-1 text-color font-semibold',
      }}
    />
  )
}

/**
 * The spreadsheet links are out of date.
 * This is a temporary solution to add the `browse` subdomain to the URL.
 */
function addSubdomainToUrl(url: string): string {
  const urlObj = new URL(url)
  urlObj.hostname = `browse.${urlObj.hostname}`
  return urlObj.toString()
}
