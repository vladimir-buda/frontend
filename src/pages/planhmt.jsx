import { useState, useEffect } from 'react'
import axios from 'axios'

export default function HmtPlan() {
  const today = new Date().toISOString().split('T')[0];
  const [data, setData] = useState([])
  const [date, setDate] = useState(today)
  const [shift, setShift] = useState('1')
  const fajka = "✅"
  const notfajka = "𐄂"  

  useEffect(() => {
    axios.get('http://localhost:3000/api/planhmt', {
      params: { date,shift }
    })
    .then(res => setData(res.data))
  })

  return (
    <div id="print-area">
      <h2>Plan HMT</h2>
      <div style={{ marginBottom: 10 }}>
        Dátum / smena:
        <input type="date" value={date} onChange={e => setDate(e.target.value)} />
         <select onChange={e => setShift(e.target.value)}>
          <option>1</option>
          <option>2</option>
          <option>3</option>
        </select>
        <button className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-colors">OK</button>
      </div>

      <div className="bg-gray-100 dark:bg-gray-700 rounded-lg px-1 py-1 shadow-xl w-max">
      <table className="w-full max-w-7xl table-fixed">
        <thead className="text-slate-900 dark:text-slate-50 text-left text-sm font-semibold border-b border-slate-300 dark:border-neutral-600 whitespace-nowrap">
          <tr>
            <th className="w-8 text-center">First</th>
            <th className="w-10 text-center">FLX</th>
            <th className="w-11 text-center">Mek-M</th>
            <th className="w-13 text-center">Linka</th>
            <th className="w-50">Code</th>
            <th className="w-31">Order</th>
            <th className="w-10">Plán</th>
            <th className="w-11 text-center">100%</th>
            <th>Poznámka</th>
          </tr>
          </thead>
          <tbody>
            {data.map(u => (
            <tr className="dark:text-neutral-400 transition delay-150 duration-300 ease-in-out hover:bg-neutral-500 text-s" key={u.ID}>
              <td className="text-center">{u.First_production ? fajka : notfajka}</td>
              <td className="text-center">{u.Aegis ? fajka : notfajka}</td> 
              <td className="text-center">{u.SmartVision ? fajka : notfajka}</td>  
              <td className="text-center">{u.LineNumber}</td>              
              <td>{u.Code}</td>
                
                   
              <td>{u.HmtOrder}</td>
              <td>{u.Plan}</td>   
              <td className="text-center">{u.check100perc ? fajka : notfajka}</td>
              <td>{u.Note}</td>
            </tr>
          ))}
        </tbody>
      </table>
      </div>
    </div>
  )
}