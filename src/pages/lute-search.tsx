import React from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import MeiliSearch from 'meilisearch';
import { SearchResponse } from 'meilisearch/types/types';
import Layout from '../components/layout';
import SEO from '../components/seo';
// @ts-ignore
import SearchIcon from '../images/search.inline.svg';

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
  host: 'https://xryq065nrc.execute-api.eu-west-1.amazonaws.com',
  apiKey: '06aea15cdfe8e997d057bf3a38f1663189b352026cebed8e0aae0767d89632be',
});

const index = meili.getIndex('gerbode');

const propertyList = [
  { value: 'subtitle', title: 'Subtitle' },
  { value: 'date', title: 'Date' },
  { value: 'key', title: 'Key' },
  { value: 'type_of_piece', title: 'Type of Piece' },
];

export default function Gerbode() {
  const [inputValue, updateInput] = React.useState('');
  const [errorMessage, setErrorMessage] = React.useState('');
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
        if (inputValue) {
          const result = await index.search(inputValue, {
            attributesToHighlight: ['*'],
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
  }, [inputValue, errorMessage]);

  return (
    <Layout>
      <SEO
        title="Search Lute Music"
        imagePath={data.lute.childImageSharp.sizes.src}
        description="Search over 16,000 lute pieces"
      />
      <h1>Search Lute Music</h1>
      <p>
        This index contains more than {(16000).toLocaleString()} lute music
        documents in French tablature compiled by{' '}
        <a href="http://www.gerbode.net/">Sarge Gerbode</a>. Start typing the
        composer or title to get results e.g. "Flow my".
      </p>
      <div className="mb-5 relative">
        <input
          type="text"
          placeholder="Search Gerbode..."
          className="transition-colors duration-100 ease-in-out focus:outline-0 border border-transparent focus:bg-white focus:border-gray-300 placeholder-gray-600 rounded-lg bg-gray-200 py-2 pr-4 pl-10 block w-full appearance-none leading-normal ds-input"
          value={inputValue}
          onChange={(e) => updateInput(e.target.value)}
        />
        <div className="pointer-events-none absolute inset-y-0 left-0 pl-4 flex items-center">
          <SearchIcon className="fill-none pointer-events-none text-gray-600 w-4 h-4" />
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
              className="gerbode-card-highlight-em flex flex-col justify-between w-full bg-white rounded-lg border mb-4"
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
              <div className="px-4 py-4">
                <span className="inline-block py-1 text-sm font-semibold mr-5">
                  <a href={result.pdf}>PDF</a>
                </span>
                <span className="inline-block py-1 text-sm font-semibold mr-5">
                  <a href={result.midi}>MIDI</a>
                </span>
                <span className="inline-block py-1 text-sm font-semibold mr-5">
                  <a href={result.fronimo}>Fronimo</a>
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </Layout>
  );
}