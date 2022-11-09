import MeiliSearch from "meilisearch";
import { useState, useCallback, useEffect } from "react";

const config = {
  apiKey: import.meta.env.PUBLIC_MEILISEARCH_KEY,
  host: import.meta.env.PUBLIC_MEILISEARCH_HOST,
};

if (!config.apiKey || !config.host) {
  throw new Error(
    "Missing env vars: PUBLIC_MEILISEARCH_KEY or PUBLIC_MEILISEARCH_HOST"
  );
}

const client = new MeiliSearch({ host: config.host, apiKey: config.apiKey });

const index = client.getIndex("gerbode");

function SearchIcon(props: { className: string }) {
  return (
    <svg aria-hidden="true" viewBox="0 0 20 20" {...props}>
      <path d="M16.293 17.707a1 1 0 0 0 1.414-1.414l-1.414 1.414ZM9 14a5 5 0 0 1-5-5H2a7 7 0 0 0 7 7v-2ZM4 9a5 5 0 0 1 5-5V2a7 7 0 0 0-7 7h2Zm5-5a5 5 0 0 1 5 5h2a7 7 0 0 0-7-7v2Zm8.707 12.293-3.757-3.757-1.414 1.414 3.757 3.757 1.414-1.414ZM14 9a4.98 4.98 0 0 1-1.464 3.536l1.414 1.414A6.98 6.98 0 0 0 16 9h-2Zm-1.464 3.536A4.98 4.98 0 0 1 9 14v2a6.98 6.98 0 0 0 4.95-2.05l-1.414-1.414Z" />
    </svg>
  );
}

interface MeiliResult {}
export function LuteSearch() {
  const [searchQuery, setSearch] = useState<string>("");
  const [searchResult, setSearchResult] = useState<MeiliResult>();

  useEffect(() => {
    async function searchMeili() {
      index.then(async (i) => {
        const res = await i.search<MeiliResult>(searchQuery);
        console.log(res);
        setSearchResult(res);
      });
    }
    searchMeili();
  }, [searchQuery]);
  return (
    <>
      <div className="mt-5">
        <label htmlFor="search" className="sr-only">
          Search
        </label>
        <div className="relative mt-1 rounded-md shadow-sm">
          <div
            className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3"
            aria-hidden="true"
          >
            <SearchIcon className="h-5 w-5 flex-none fill-slate-400 group-hover:fill-slate-500 dark:fill-slate-500 md:group-hover:fill-slate-400" />
          </div>
          <input
            type="text"
            name="search"
            id="search"
            value={searchQuery}
            onChange={(e) => setSearch(e.target.value)}
            className="block w-full h-10 lg:h-14 rounded-lg pl-9 sm:text-sm lg:text-lg ring-1 ring-slate-200 hover:ring-slate-300 dark:bg-slate-800/75 dark:ring-inset dark:ring-white/5 dark:hover:bg-slate-700/40 dark:hover:ring-slate-500"
            placeholder="Search"
          />
        </div>
      </div>
      {/** TODO show results */}
    </>
  );
}
