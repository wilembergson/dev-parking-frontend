import { toast } from "react-toastify"

export const errorToast = (msg:string) => toast.error(msg, {autoClose: 3000, position: toast.POSITION.TOP_CENTER})
export const sucessToast = (msg:string) => toast.success(msg, {autoClose: 3000, position: toast.POSITION.TOP_CENTER})
export const updateToast = (msg:string) => toast.info(msg, {autoClose: 3000, position: toast.POSITION.TOP_CENTER})