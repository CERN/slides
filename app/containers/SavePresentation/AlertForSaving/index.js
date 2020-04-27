import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

const MySwal = withReactContent(Swal);

export default async function AlertForSaving(filename) {
  const { value: newFileName } = await MySwal.fire({
    titleText: 'Save as...',
    input: 'text',
    inputAttributes: {
      autocapitalize: 'off',
    },
    showCancelButton: true,
    confirmButtonText: 'Save',
    inputValue: filename,
    inputValidator: value => {
      if (!value) {
        return 'You need to provide a filename!';
      }
    },
  });
  return newFileName;
}

/*
even for uploading files consider 
*/
/* beautiful toast success
const Toast = Swal.mixin({
  toast: true,
  position: 'top-end',
  showConfirmButton: false,
  timer: 3000,
  timerProgressBar: true,
  onOpen: (toast) => {
    toast.addEventListener('mouseenter', Swal.stopTimer)
    toast.addEventListener('mouseleave', Swal.resumeTimer)
  }
})

Toast.fire({
  icon: 'success',
  title: 'Signed in successfully'
})
*/
