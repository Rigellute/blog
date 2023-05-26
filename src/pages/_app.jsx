import { useEffect, useRef } from 'react'
import { Analytics } from '@vercel/analytics/react'

import { Footer } from '@/components/Footer'
import { Header } from '@/components/Header'

import '@/styles/tailwind.css'
import 'focus-visible'
import { DefaultSeo } from 'next-seo'

function usePrevious(value) {
  let ref = useRef()

  useEffect(() => {
    ref.current = value
  }, [value])

  return ref.current
}

export default function App({ Component, pageProps, router }) {
  let previousPathname = usePrevious(router.pathname)

  return (
    <>
      <Analytics />
      <DefaultSeo
        title="Alexander Keliris"
        description="UK based software engineer and consultant."
        canonical={`${process.env.NEXT_PUBLIC_SITE_URL}${router.pathname}`}
        openGraph={{
          url: `${process.env.NEXT_PUBLIC_SITE_URL}${router.pathname}`,
          title: 'Alexander Keliris',
          description: 'UK based software engineer and consultant.',
          images: [{ url: `${process.env.NEXT_PUBLIC_SITE_URL}/helmet.png` }],
          siteName: 'SiteName',
        }}
        twitter={{
          handle: '@handle',
          site: '@site',
          cardType: 'summary_large_image',
        }}
      />
      <div className="fixed inset-0 flex justify-center sm:px-8">
        <div className="flex w-full max-w-7xl lg:px-8">
          <div className="w-full bg-white ring-1 ring-zinc-100 dark:bg-zinc-900 dark:ring-zinc-300/20" />
        </div>
      </div>
      <div className="relative">
        <Header />
        <main>
          <Component
            slug={router.pathname}
            previousPathname={previousPathname}
            {...pageProps}
          />
        </main>
        <Footer />
      </div>
    </>
  )
}
