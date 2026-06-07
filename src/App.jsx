import { Routes, Route, Link } from 'react-router-dom'
import { useState } from 'react'
import Users from './pages/users'
import Login from './pages/login'
import Products from './pages/products'
import PlanHmt from './pages/planhmt'
import PlanSmt from './pages/plansmt'

function App() {
  const [isAuth, setIsAuth] = useState(!!sessionStorage.getItem('user'))
  if (!isAuth) {
    return <Login onLogin={() => setIsAuth(true)} />
  }

  return (
    <div className="min-w-screen w-max min-h-screen max-h-max bg-green-200 dark:bg-neutral-900 flex flex-col justify-items-start gap-6 p-0">
      <div className=" p-2 bg-green-200 dark:bg-neutral-700 sticky top-0">
        <nav className="no-print text-black dark:text-neutral-400">
        <Link to="/">Users</Link> |{" "}
        <Link to="/products">Products</Link>|{" "}
        <Link to="/planhmt">Plan Hmt</Link>|{" "}
        <Link to="/plansmt">Plan Smt</Link>
      </nav>
      </div>

      <Routes>
        <Route path="/" element={<Users />} />
        <Route path="/products" element={<Products />} />
        <Route path="/planhmt" element={<PlanHmt />} />
        <Route path="/plansmt" element={<PlanSmt />} />
      </Routes>
    </div>
  )
}

export default App