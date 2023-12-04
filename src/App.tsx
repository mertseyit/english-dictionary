import React from 'react'
import SearchInput from './components/SearchInput'
import Container from './components/layout/Container'
import WordMeaningPart from './components/WordMeaningPart'
import { SearchProvider } from './contexts/SearchContext'
import Footer from './components/layout/Footer'

const App = () => {
  return (
    <SearchProvider>
      <Container>
        <SearchInput />
        <WordMeaningPart />
      </Container>
      <Footer />
    </SearchProvider>
  )
}

export default App