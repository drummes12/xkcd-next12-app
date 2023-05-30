import { useRouter } from "next/router"
import { useRef, useState } from "react"


export function useHeader() {
  const [results, setResults] = useState([])
  const searchRef = useRef()
  const router = useRouter()

  const resetResults = () => setResults([])

  const getValue = () => searchRef.current?.value

  const handleChange = () => {
    const query = getValue()
    if (!query) return
    fetch(`/api/search?q=${query}`)
      .then((res) => res.json())
      .then(({ results: searchResults }) => {
        setResults(searchResults)
      })
  }

  const { pathname, query, asPath } = router
  const handleSelectionLanguage = (selected) =>
    router.push(
      {
        pathname,
        query
      },
      asPath,
      { locale: selected.currentKey }
    )

  const { locale, locales } = router
  const restOfLocales = locales.filter((l) => l !== locale)

  return {
    results,
    resetResults,
    searchRef,
    getValue,
    handleChange,
    handleSelectionLanguage,
    locale,
    restOfLocales
  }
}