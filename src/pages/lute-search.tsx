import React from 'react';
import { useStaticQuery, graphql, PageProps } from 'gatsby';
import MeiliSearch from 'meilisearch';
import { SearchResponse } from 'meilisearch/types/types';
import Layout from '../components/layout';
import { Modal } from '../components/modal';
import SEO from '../components/seo';
import { Input } from '../components/input';

type SearchResult = {
  pdf: string;
  id: string;
  difficulty: string;
  fronimo: string;
  subtitle: string;
  date: string;
  key: string;
  title: string;
  midi: string;
  type_of_piece: string;
  composer: string;
  document: string;
};

type SearchResultWithFormatted = SearchResult & { _formatted: SearchResult };

const meili = new MeiliSearch({
  host: 'https://0jwklbmb31.execute-api.eu-west-1.amazonaws.com',
  apiKey: '06aea15cdfe8e997d057bf3a38f1663189b352026cebed8e0aae0767d89632be',
});

const index = meili.getIndex('gerbode');

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
  { value: 'section', title: 'Section' },
  { value: 'remarks', title: 'Remarks' },
  { value: 'editor', title: 'Editor' },
  { value: 'encoder', title: 'Encoder' },
  { value: 'arranger', title: 'Arranger' },
  { value: 'intabulator', title: 'Intabulator' },
  { value: 'contributor', title: 'Contributor' },
  { value: 'page', title: 'Page' },
];

const linkPropertyList = [
  { value: 'midi', title: 'MIDI' },
  { value: 'pdf', title: 'PDF' },
  { value: 'fronimo', title: 'Fronimo' },
  { value: 'facsimile', title: 'Facsimile' },
  { value: 'recording', title: 'Recording' },
];

const searchableAttributes = [
  'Composer',
  'Title',
  'Subtitle',
  'Date',
  'Type of piece',
  'Document',
  'Original composer',
  'Source',
  'Difficulty',
  'Key',
  'Ensemble',
  'Part',
  'Volume',
  'Concordances',
  'Piece',
  'Section',
  'Remarks',
  'Editor',
  'Encoder',
  'Arranger',
  'Intabulator',
  'Contributor',
  'Page',
];

const exampleSearch = {
  searchTermValue: 'Dowland 6 course gm',
  dateRangeValue: '1600-1610',
  difficultyRangeValue: '1-3',
};

export default function Gerbode({ location }: PageProps) {
  const [searchTermValue, updateSearchTermValue] = React.useState('');
  const [dateRangeValue, updateDateRangeValue] = React.useState('');
  const [difficultyRangeValue, updateDifficultyRangeValue] = React.useState('');
  const [errorMessage, setErrorMessage] = React.useState('');
  const [isModalOpen, updateModalOpen] = React.useState(false);
  const [searchResults, updateSearchResults] = React.useState(
    {} as SearchResponse | undefined
  );

  const data = useStaticQuery(graphql`
    query {
      lute: file(relativePath: { eq: "lute-1.jpeg" }) {
        childImageSharp {
          sizes(maxWidth: 600) {
            ...GatsbyImageSharpSizes
          }
        }
      }
    }
  `);

  React.useEffect(() => {
    async function query() {
      try {
        if (searchTermValue) {
          const result = await index.search(searchTermValue, {
            attributesToHighlight: ['*'],
            filters: parseFilters(dateRangeValue, difficultyRangeValue),
          });
          updateSearchResults(result);

          if (errorMessage) {
            setErrorMessage('');
          }
        }
      } catch (e) {
        setErrorMessage(e.message);
      }
    }

    query();
  }, [searchTermValue, dateRangeValue, difficultyRangeValue, errorMessage]);

  return (
    <Layout>
      <Modal
        isOpen={isModalOpen}
        title="Attributes"
        onClose={() => updateModalOpen(!isModalOpen)}
      >
        <p>Listed in order of importance.</p>
        <ol>
          {searchableAttributes.map((attr) => (
            <li key={attr}>{attr}</li>
          ))}
        </ol>
      </Modal>
      <SEO
        path={location.pathname}
        title="Search Lute Music"
        imagePath={data.lute.childImageSharp.sizes.src}
        description="Search over 16,000 lute pieces"
      />
      <h1>Search Lute Music</h1>
      <p>
        This index contains more than {(16000).toLocaleString()} lute music
        documents in French tablature compiled by{' '}
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="http://www.gerbode.net/"
        >
          Sarge Gerbode
        </a>
        . Start typing to see results e.g. "Dowland". Searches are matched
        against these{' '}
        <button
          onClick={() => updateModalOpen(true)}
          className="text-gray-800 link"
        >
          attributes
        </button>
        .
      </p>
      <p>
        <button
          onClick={() => {
            updateSearchTermValue(exampleSearch.searchTermValue);
            updateDateRangeValue(exampleSearch.dateRangeValue);
            updateDifficultyRangeValue(exampleSearch.difficultyRangeValue);
          }}
          className="text-gray-800 link"
        >
          Click here
        </button>{' '}
        to see a more advanced search example.
      </p>
      <div className="mb-5 grid grid-cols-1 md:grid-cols-5 gap-4">
        <div className="col-span-1 md:col-span-3">
          <label className="label">
            Search
            <Input
              isSearch
              type="text"
              placeholder="Search Gerbode..."
              className="mt-2"
              value={searchTermValue}
              onChange={(e) => updateSearchTermValue(e.target.value)}
            />
          </label>
        </div>
        <div className="col-span-1 md:col-span-1">
          <label className="label">
            Date range
            <Input
              type="text"
              className="mt-2"
              placeholder="1500-1650"
              value={dateRangeValue}
              onChange={(e) => updateDateRangeValue(e.target.value)}
            />
          </label>
        </div>
        <div className="col-span-1 md:col-span-1">
          <label className="label">
            Difficulty range
            <Input
              type="text"
              className="mt-2"
              placeholder="1-6"
              value={difficultyRangeValue}
              onChange={(e) => updateDifficultyRangeValue(e.target.value)}
            />
          </label>
        </div>
      </div>

      {errorMessage ? (
        <div className="w-full p-4 bg-red-400 rounded-lg">
          <div className="text-2xl">Error</div>
          {errorMessage}
        </div>
      ) : null}

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-3">
        {searchResults?.hits?.map((res) => {
          const result = res as SearchResultWithFormatted;
          return (
            <div
              key={result.id}
              className="flex flex-col justify-between w-full mb-4 bg-white border rounded-lg gerbode-card-highlight-em"
            >
              <div className="px-4 py-4">
                <h3
                  dangerouslySetInnerHTML={{
                    __html: `${result._formatted.composer} - ${result._formatted.title}`,
                  }}
                />
                {propertyList.map((property) => {
                  const item = result[property.value as keyof SearchResult];
                  const formatted =
                    result._formatted[property.value as keyof SearchResult];
                  return item ? (
                    <div key={property.value}>
                      {property.title}:{' '}
                      <span
                        className="font-semibold"
                        dangerouslySetInnerHTML={{ __html: formatted }}
                      />
                    </div>
                  ) : null;
                })}
              </div>
              <div className="px-4 py-4 flex flex-wrap">
                {linkPropertyList.map((property) => {
                  const link = result[property.value as keyof SearchResult];
                  return link ? (
                    <span
                      key={property.value}
                      className="mr-4 text-sm font-semibold"
                    >
                      <a href={link}>{property.title}</a>
                    </span>
                  ) : null;
                })}
              </div>
            </div>
          );
        })}
      </div>
    </Layout>
  );
}

function parseFilters(dateRange: string, difficultyRange: string) {
  if (!dateRange && !difficultyRange) {
    return '';
  }
  const [minDate, maxDate] = dateRange.split('-');

  const dateRangeFilter = !maxDate
    ? `date = ${minDate}`
    : `date >= ${minDate} AND date <= ${maxDate}`;
  const [minDiff, maxDiff] = difficultyRange.split('-');

  const difficultyRangeFilter = !maxDiff
    ? `difficulty = ${minDiff}`
    : `difficulty >= ${minDiff} AND difficulty <= ${maxDiff}`;

  if (!dateRange && difficultyRange) {
    return difficultyRangeFilter;
  }

  if (!difficultyRange && dateRange) {
    return dateRangeFilter;
  }

  return `${dateRangeFilter} AND ${difficultyRangeFilter}`;
}
