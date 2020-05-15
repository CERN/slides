import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

const MySwal = withReactContent(Swal);

export default function fail(errorMessage) {
  const Toast = MySwal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    onOpen: toast => {
      toast.addEventListener('mouseenter', MySwal.stopTimer);
      toast.addEventListener('mouseleave', MySwal.resumeTimer);
    },
  });
  Toast.fire({
    icon: 'error',
    title: errorMessage,
  });
}
