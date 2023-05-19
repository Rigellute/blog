import Head from 'next/head'
import Link from 'next/link'

import { SimpleLayout } from '@/components/SimpleLayout'
import {
  InstantSearch,
  SearchBox,
  Hits,
  Highlight,
  Configure,
  Pagination,
} from 'react-instantsearch-dom'
import { instantMeiliSearch } from '@meilisearch/instant-meilisearch'

const searchClient = instantMeiliSearch(
  process.env.NEXT_PUBLIC_MEILISEARCH_HOST,
  process.env.NEXT_PUBLIC_MEILISEARCH_API_KEY,
  {
    finitePagination: true,
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

const Hit = ({ hit }) => (
  <div key={hit.id}>
    <h2 className="mt-6 text-base font-semibold text-zinc-800 dark:text-zinc-100">
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
            <Link
              href={hit[prop.value]}
              target="_blank"
              key={prop.value}
              className="mr-2 text-sm font-semibold text-teal-500"
            >
              {prop.title}
            </Link>
          )
      )}
    </div>
  </div>
)

export default function LuteSearch() {
  return (
    <>
      <Head>
        <title>Search Lute Music - Alexander Keliris</title>
        <meta name="description" content="Search over 16,000 lute pieces." />
      </Head>
      <SimpleLayout
        title="Search Lute Music"
        intro="This index contains more than 16,000 lute music documents in French tablature compiled by Sarge Gerbode. Start typing to see results e.g. 'Dowland'."
      >
        <p className="mb-2 text-right">
          <Link
            href="https://www.lutemusic.org/"
            rel="noopener noreferrer"
            target="_blank"
            className="text-sm font-semibold text-teal-500"
          >
            Source
          </Link>
        </p>
        <InstantSearch indexName="lute" searchClient={searchClient}>
          <SearchBox placeholder="Search by composer, title or subtitle" />
          <Hits hitComponent={Hit} />
          <Configure hitsPerPage={6} />
          <Pagination showLast={true} />
        </InstantSearch>
      </SimpleLayout>
    </>
  )
}
