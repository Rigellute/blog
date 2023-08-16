import { SimpleLayout } from '@/components/SimpleLayout'
import { Prose } from '@/components/Prose'
import { Disclosure, Transition } from '@headlessui/react'
import { ChevronUpIcon } from '@heroicons/react/20/solid'
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
import { NextSeo } from 'next-seo'
import clsx from 'clsx'
import { ReactNode } from 'react'

const searchClient = instantMeiliSearch(
  process.env.NEXT_PUBLIC_MEILISEARCH_HOST,
  process.env.NEXT_PUBLIC_MEILISEARCH_API_KEY,
  {
    finitePagination: true,
    primaryKey: 'id',
  }
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

const Hit = ({ hit }) => (
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
        )
    )}
    <div>
      {linkPropertyList.map(
        (prop) =>
          hit[prop.value] && (
            <a
              href={hit[prop.value]}
              target="_blank"
              rel="noreferrer"
              key={prop.value}
              className="mr-2 text-sm font-semibold text-teal-500"
            >
              {prop.title}
            </a>
          )
      )}
    </div>
  </div>
)

export default function LuteSearch() {
  return (
    <>
      <NextSeo
        title="Search Lute Music - Alexander Keliris"
        description="Search over 16,000 lute pieces."
        openGraph={{
          images: [{ url: `${process.env.NEXT_PUBLIC_SITE_URL}/lute-1.jpg` }],
        }}
      />
      <SimpleLayout
        title="Search Lute Music"
        intro="This index contains more than 20,000 lute music documents in French tablature compiled by Sarge Gerbode. Start typing to see results e.g. 'Dowland'."
      >
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
                <Refinement
                  placeholder="Filter composers"
                  attribute="composer"
                />
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
                    item: 'w-max space-x-1 bg-teal-500 rounded px-2 py-1',
                    category: 'space-x-1',
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
          <a href={`mailto:${process.env.NEXT_PUBLIC_EMAIL}`}>
            {process.env.NEXT_PUBLIC_EMAIL}
          </a>
        </Prose>
      </SimpleLayout>
    </>
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
              className={`${
                open ? 'rotate-180 transform' : ''
              } h-5 w-5 text-zinc-500`}
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
