
import { Route, Routes } from 'react-router-dom'
import './App.css'
import NavBar from './components/navbar/NavBar'
import CryptoDashboard from './pages/dashboard/CryptoDashboard'
import Portfolio from './pages/portfolio/Portfolio'
import WatchList from './pages/watchlist/WatchList'
import CompareCoins from './pages/comparator/CompareCoins'
import CoinStats from './pages/coin/CoinStats'
import PositionCalculator from './pages/posCalculator/PositionCalculator'
import { SearchProvider } from './context/SearchContext'

function App() {

  return (
    <>
      <SearchProvider>
        <nav className="border-b border-t border-gray-300/50 px-1">
          <NavBar/>
        </nav>
        <main className="lg:mx-auto lg:p-8 pt-4 px-1 lg:max-w-screen-2xl">
          <Routes>
            <Route path="/" element={<CryptoDashboard />} />
            <Route path="/portfolio" element={<Portfolio />} />
            <Route path="/watchlist" element={<WatchList />} />
            <Route path="/compare" element={<CompareCoins />} />
            <Route path="/coin/:name" element={<CoinStats />} />
            <Route path="/calculator" element={<PositionCalculator />} />
          </Routes>
        </main>
      </SearchProvider>
    </>
  )
}

export default App
