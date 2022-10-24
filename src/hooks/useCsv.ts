import { useRef } from "react";

function useCsv() {
  const rows = useRef<(string | number)[][]>([]);

  const push = (row: (string | number)[]) => {
    rows.current.push(row);
  }

  const download = (fileName: string) => {
    const csvContent = "data:text/csv;charset=utf-8," + rows.current.map(e => e.join(",")).join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", fileName);
    document.body.appendChild(link);
    link.click();
  }

  return { push, download, rows };
}

export default useCsv;