import { toast } from "react-toastify";

export default function toastNotify( type ) {
  const toastId = "customID";

  if (type === "success")
    return toast.success("Événement ajouté!", {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
      theme: "colored",
      toastId,
    });
  else
    return toast.error("Erreur API, Veuillez réessayer...", {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
      theme: "colored",
      toastId,
    });
}
