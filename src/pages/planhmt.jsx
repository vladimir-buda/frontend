import { useState, useEffect } from 'react'
import axios from 'axios'
import {format} from 'date-fns';
import WeekDayPicker from "../components/WeekDayPicker";
import {API_URL, DEBUG} from "../../config/global";

const formatDate = (date) => format(date, "d.M.yyyy");

export default function HmtPlan() {
  const today = new Date().toISOString().split('T')[0];
  const [data, setData] = useState([])
  const [date, setDate] = useState(today)
  const [shift, setShift] = useState('1')
  const fajka = "✅"
  const notfajka = "𐄂"  

  useEffect(() => {
    axios.get(API_URL+'/api/planhmt', {
      params: { date,shift }
    })
    .then(res => setData(res.data))
  })

  return (
    <div className="bg-white dark:bg-gray-900 rounded-lg px-1 py-1 ring shadow-xl ring-gray-900/5">
        <div className="p-1 mt-2 text-black dark:bg-gray-700 rounded-lg dark:text-neutral-400">
        <h2 className=" text-black dark:text-neutral-400 font-bold">Plan HMT {formatDate(date)}</h2>
          <WeekDayPicker
            value={date}
            onChange={setDate}/>
            </div>
         <div className="pl-1 mt-2 text-black dark:bg-gray-700 rounded-lg dark:text-neutral-400">
          <select onChange={e => setShift(e.target.value)}>
            <option value="1">Smena 1</option>
            <option value="2">Smena 2</option>
            <option value="3">Smena 3</option>
          </select>
        
      </div>

      <div className="mt-2 bg-gray-100 dark:bg-gray-700 rounded-lg px-1 py-1 shadow-xl w-max">
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
            <tr className="dark:text-neutral-400 hover:bg-neutral-500 text-xs" key={u.id}>
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