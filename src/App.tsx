import MainCard from './components/MainCard'

const App = () => {
  return (
    <div
      data-testid='main-app'
      className='w-full h-screen bg-dark text-white font-sourceCode flex items-center justify-center'
    >
      <MainCard />
    </div>
  )
}

export default App
