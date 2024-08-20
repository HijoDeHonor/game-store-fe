import swal from 'sweetalert2';
import { HOME, LOCAL_USERNAME, LOG_IN, STAY_OUT, LOGIN, MODAL_TITLE_401, MODAL_MESSAGE_401 } from './textConstants';

function errorModal () {
  localStorage.removeItem(LOCAL_USERNAME);
  swal.fire({
    title: MODAL_TITLE_401,
    text: MODAL_MESSAGE_401,
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
