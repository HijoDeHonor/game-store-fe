import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import ReactDOM from 'react-dom/client';
import ListForModal from '../components/listForModal/listForModal.jsx';
import { CANCEL, CONFIRM } from './textConstants.js';
import '../components/listForModal/listForModal.css';

const MySwal = withReactContent(Swal);

export const confirmTradeModal = (confirmTrade, offer, request) => {
  MySwal.fire({
    html: (
      <div id="swal-modal-content"></div>
    ),
    didOpen: () => {
      const container = document.getElementById('swal-modal-content');
      const root = ReactDOM.createRoot(container);
      root.render(<ListForModal request={request} offer={offer} />);
    },
    customClass: {
      confirmButton: 'custom-button-success',
      cancelButton: 'custom-button-error'
    },
    showCancelButton: true,
    cancelButtonText: CANCEL,
    cancelButtonColor: '#B21E4C',
    showConfirmButton: true,
    confirmButtonText: CONFIRM,
    confirmButtonColor: '#7749f8',
    reverseButtons: true,
  }).then((response) => {
    if (response.isConfirmed) {
      confirmTrade();
    }
  });
};
