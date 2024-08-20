import swal from 'sweetalert2';
import { HOME, LOCAL_USERNAME, LOG_IN, STAY_OUT, LOGIN } from './textConstants';

function errorModal () {
  localStorage.removeItem(LOCAL_USERNAME);
  swal.fire({
    title: 'You need to login again, your session ran out.',
    text: 'Your session just expired',
    icon: 'info',
    showConfirmButton: true,
    confirmButtonText: LOG_IN,
    confirmButtonColor: '#7749f8',
    showDenyButton: true,
    denyButtonText: STAY_OUT,
    denyButtonColor: '#B21E4C'
  }).then((response) => {
    if (response.isConfirmed) {
      window.location.href = LOGIN;
    } else if (response.isDenied) {
      window.location.href = HOME;
    }
  });
}

export default errorModal;
