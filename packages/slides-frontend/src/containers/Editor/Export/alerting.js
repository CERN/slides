import Swal from 'sweetalert2';
import './index.css';

export default function exportPDFinfo() {
  Swal.fire({
    icon: 'info',
    title: 'Export to PDF instructions',
    confirmButtonText: 'I am ready!',
    html:
      "<ol><li>Use <b>ctrl or cmd + P</b> to open browser's Print dialog</li>" +
      '<li>Change destination to <b>Save as PDF</b></li>' +
      '<li>Make sure you select the <b>Background graphics</b> option</li>' +
      "<li>Click <b>Save</b>, to download your slides' as a PDF file</li></ol>",
  });
}
