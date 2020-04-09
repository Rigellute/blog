import React from 'react';
import MeiliSearch from 'meilisearch';
import Layout from '../components/layout';
import SEO from '../components/seo';
import SearchIcon from '../images/search.inline.svg';

const meili = new MeiliSearch({
  host: 'http://gerbode.rigellute.com',
  apiKey: '06aea15cdfe8e997d057bf3a38f1663189b352026cebed8e0aae0767d89632be',
});

const index = meili.getIndex('gerbode');

export default function Gerbode() {
  const [inputValue, updateInput] = React.useState('');
  const [searchResults, updateSearchResults] = React.useState({ hits: [] });

  React.useEffect(() => {
    async function query() {
      try {
        const result = await index.search(inputValue);
        console.log(result);
        updateSearchResults(result);
      } catch (e) {
        /* handle error */
        console.log(e);
      }
    }

    query();
  }, [inputValue]);

  return (
    <Layout>
      <SEO title="Gerbode Lute Music Search" />
      <h1>Search Lute Music</h1>
      <p>
        This index contains more than 8000 lute pieces compiled by{' '}
        <a href="http://www.gerbode.net/">Sarge Gerbode</a>. Start typing the
        composer or title to get results e.g. "Flow my".
      </p>
      <div className="mb-5 relative">
        <input
          type="text"
          placeholder="Search Gerbode..."
          className="transition-colors duration-100 ease-in-out focus:outline-0 border border-transparent focus:bg-white focus:border-gray-300 placeholder-gray-600 rounded-lg bg-gray-200 py-2 pr-4 pl-10 block w-full appearance-none leading-normal ds-input"
          value={inputValue}
          onChange={e => updateInput(e.target.value)}
        />
        <div className="pointer-events-none absolute inset-y-0 left-0 pl-4 flex items-center">
          <SearchIcon className="fill-none pointer-events-none text-gray-600 w-4 h-4" />
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {searchResults.hits.map(result => (
          <div
            key={result.id}
            className="flex flex-col justify-between w-full bg-white rounded shadow-lg mb-4"
          >
            <div className="px-6 py-4">
              <h3>
                {result.composer} - {result.title}
              </h3>
              {result.subtitle ? (
                <div>
                  Subtitle:{' '}
                  <span className="font-semibold">{result.subtitle}</span>
                </div>
              ) : null}
              <div>
                Date: <span className="font-semibold">{result.date}</span>
              </div>
            </div>
            <div className="px-6 py-4">
              <span className="inline-block py-1 text-sm font-semibold mr-5">
                <a href={result.pdf}>PDF</a>
              </span>
              <span className="inline-block py-1 text-sm font-semibold mr-5">
                <a href={result.midi}>MIDI</a>
              </span>
              <span className="inline-block py-1 text-sm font-semibold mr-5">
                <a href={result.fromino}>fromino</a>
              </span>
            </div>
          </div>
        ))}
      </div>
    </Layout>
  );
}
