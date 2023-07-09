import Swal from "sweetalert2";
import axiosClient from "../axios-client.js";
import {useState} from "react";

const useDelete = (url) => {
  const [data, setData] = useState([])
  const swalWithBootstrapButtons = Swal.mixin({
    customClass: {
      confirmButton: 'btn btn-success',
      cancelButton: 'btn btn-danger mr-3'
    },
    buttonsStyling: false
  })

  swalWithBootstrapButtons.fire({
    title: 'Are you sure?',
    text: "You won't be able to revert this!",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: 'Yes, delete it!',
    cancelButtonText: 'No, cancel!',
    reverseButtons: true
  }).then((result) => {
    if (result.isConfirmed) {
      axiosClient.delete(url).then(res => {
        swalWithBootstrapButtons.fire(
          'Deleted!',
          res.message,
          'success'
        )
        setTimeout(() => {
          window.location.reload()
        }, 1000)
      }).catch(err => {
        console.log(err)
      })
    } else if (
      /* Read more about handling dismissals below */
      result.dismiss === Swal.DismissReason.cancel
    ) {
      swalWithBootstrapButtons.fire(
        'Cancelled',
        'Your record is safe :)',
        'error'
      )
    }
  })
}

export default useDelete
