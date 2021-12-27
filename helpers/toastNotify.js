import { toast } from "react-toastify";

export default function toastNotify(type) {
  const toastId = "customID";

  if (type === "success")
    return toast.success("Ajouté avec succès!", {
      position: "bottom-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
      theme: "colored",
      toastId,
    });
  else
    return toast.error("Erreur API, Veuillez réessayer...", {
      position: "bottom-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
      theme: "colored",
      toastId,
    });
}
