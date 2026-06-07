import { useState } from "react";

const initialData = [
  { id: 1, name: "Jana Kováčová",  email: "jana@pixel.sk",     company: "Pixel Studio",    plan: "Pro",      mrr: 149 },
  { id: 2, name: "Martin Horváth", email: "m.horvath@flow.io", company: "FlowTech s.r.o.", plan: "Business", mrr: 499 },
  { id: 3, name: "Petra Novák",    email: "petra@designco.eu", company: "DesignCo",        plan: "Starter",  mrr: 49  },
];

export default function EditableTable() {
  const [data, setData] = useState(initialData);

  // Sledujeme, ktorá bunka je aktívna: { rowId, key }
  const [editingCell, setEditingCell] = useState(null);

  // Dočasná hodnota počas písania
  const [tempValue, setTempValue] = useState("");

  const startEdit = (rowId, key, currentValue) => {
    setEditingCell({ rowId, key });
    setTempValue(currentValue);
  };

  const commitEdit = () => {
    if (!editingCell) return;
    setData(prev =>
      prev.map(row =>
        row.id === editingCell.rowId
          ? { ...row, [editingCell.key]: tempValue }
          : row
      )
    );
    setEditingCell(null);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") commitEdit();
    if (e.key === "Escape") setEditingCell(null);
  };

  const isEditing = (rowId, key) =>
    editingCell?.rowId === rowId && editingCell?.key === key;

  const columns = ["name", "email", "company", "plan", "mrr"];

  return (
    <table border="1" cellPadding="8">
      <thead>
        <tr>
          <th>#</th>
          {columns.map(col => <th key={col}>{col}</th>)}
        </tr>
      </thead>
      <tbody>
        {data.map(row => (
          <tr key={row.id}>
            <td>{row.id}</td>
            {columns.map(key => (
              <td
                key={key}
                onClick={() => startEdit(row.id, key, String(row[key]))}
                style={{ cursor: "pointer", minWidth: 120 }}
              >
                {isEditing(row.id, key) ? (
                  <input
                    autoFocus
                    value={tempValue}
                    onChange={e => setTempValue(e.target.value)}
                    onBlur={commitEdit}
                    onKeyDown={handleKeyDown}
                    style={{ width: "100%" }}
                  />
                ) : (
                  row[key]
                )}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}