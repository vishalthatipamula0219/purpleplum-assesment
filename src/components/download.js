import { saveAs } from "file-saver";
import XLSX from "xlsx";

function s2ab(s) {
  const buf = new ArrayBuffer(s.length);
  const view = new Uint8Array(buf);
  for (let i = 0; i !== s.length; ++i) view[i] = s.charCodeAt(i) & 0xff;
  return buf;
}

const jsonToXlsx = (data, name, type) => {
  // eslint-disable-next-line no-useless-catch
  try {
    const ws = XLSX.utils.json_to_sheet(data);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, type);
    const wbout = XLSX.write(wb, { bookType: "xlsx", type: "binary" });

    saveAs(new Blob([s2ab(wbout)], { type: "application/octet-stream" }), name);
  } catch (error) {
    throw error;
  }
};

export default jsonToXlsx;