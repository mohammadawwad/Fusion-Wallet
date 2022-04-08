import { Navbar, Footer, Welcome, Transactions, Services} from './components'


const App = () => {

  return (
    <div className="min-h-screen">
        <div className="gradient-bg">
          <Navbar/>
          <Welcome/>
        </div>
        <services/>
        <Transactions/>
        <Footer/>
    </div>
  )
}

export default App
