import { useState, useEffect } from 'react';
import axios from 'axios';
import {format} from 'date-fns';
import WeekDayPicker from "../components/WeekDayPicker";
import {API_URL, DEBUG} from "../../config/global";

const formatDate = (date) => format(date, "d.M.yyyy");


function TdEdit({u, collumn}) {
  const [editing, setEditing] = useState(null);
  const saveField = () => {setEditing(null)}
  return (
    <td onClick={() => setEditing({ id: u.id })}>
      {editing?.id === u.id ? (
        <input className="size-full"
          autoFocus
          defaultValue={u[collumn]}
          onBlur={(e) => saveField()}
        />
      ) : ( u[collumn])}
    </td>
  );
}

function Tabulka({ date,shift }) {  
  const [data, setData] = useState([])  
  const fajka = "✅"
  const notfajka = "𐄂"  
  useEffect(() => {
    if (!date || !shift) return;
      axios.get(API_URL+'/api/plansmt', {
      params: { date, shift },
      withCredentials: true
    })
    .then(res => setData(res.data));
    }, [date, shift]); // 🔥 dôležité
  
return(
      <div>
        <p className="text-black dark:text-neutral-400 font-semibold">Smena {shift}</p>
        <div className="bg-gray-100 dark:bg-gray-700 rounded-lg px-1 py-1 shadow-xl w-max">
      <table className="w-5xl max-w-6xl table-fixed">
        <thead className="text-slate-900 dark:text-slate-50 text-left text-sm font-semibold border-b border-slate-300 dark:border-neutral-600 whitespace-nowrap">
          <tr>
            <th className="w-10 text-center">First</th>
            <th className="w-12 text-center">Linka</th>
            <th className="w-30">Code</th>
            <th className="w-10 text-center">FLX</th>
            <th className="w-10 text-center">CGS</th>
            <th className="w-30">Order</th>
            <th className="w-14">Plán</th>
            <th className="w-50">Pasta/lepidlo</th>
            <th className="w-45">Setup</th>
            <th className="">Poznámka</th>
        </tr>
  </thead>
        <tbody>
          {data.map(u => (
            <tr className="dark:text-neutral-400 hover:bg-neutral-500 text-xs" key={u.id}>
              <td className="text-center">{u.First_production ? fajka : notfajka}</td>
              <td className="text-center">{u.Line}</td>              
              <td>{u.CodeSMT}</td>
              <td className="text-center">{u.Aegis ? fajka : notfajka}</td>    
              <td className="text-center">{u.Cogiscan}</td>
              <td>{u.Order}</td>
              <td>{u.Plan}</td>   
              <td className="truncate">{u.PastaGlue}</td>
              <td className="truncate">{u.Setup}</td>
              <TdEdit u={u} collumn="Note"/>
            </tr>
          ))}
        </tbody>
      </table>
      </div>
      </div>
      )
}

export default function f() {
  const today = new Date().toISOString().split('T')[0];
  const [date, setDate] = useState(today)
  

  return (
    <div className="bg-white dark:bg-gray-900 rounded-lg px-1 py-1 ring shadow-xl ring-gray-900/5">
        <div className=" mt-2 text-black dark:bg-gray-700 rounded-lg dark:text-neutral-400">
        <h2 className="text-black dark:text-neutral-400 font-bold">Plan SMT {formatDate(date)}</h2>
       </div>
       <div className="no-print p-1 text-black dark:bg-gray-700 rounded-lg dark:text-neutral-400">
           <WeekDayPicker
           value={date}
           onChange={setDate}/>
       </div>

      <div className="flex flex-row">
      
      <div>
        <Tabulka date={date} shift={1} />
        <Tabulka date={date} shift={2} />
        <Tabulka date={date} shift={3} />
        </div>
        <div className="no-print size-full bg-gray-600 m-6 p-2 rounded-lg">
          
        </div>
     </div>
     </div>
     
  )
}


