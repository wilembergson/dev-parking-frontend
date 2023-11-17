export default  function formatedDate(date: Date) {
    const checkIn = new Date(date)
    const day = (checkIn.getDate() < 10) ? `0${checkIn.getDate()}` : `${checkIn.getDate()}`
    const month = (checkIn.getMonth() + 1 < 10) ? `0${checkIn.getMonth() + 1}` : `${checkIn.getMonth() + 1}`
    const hour = (checkIn.getHours() < 10) ? `0${checkIn.getHours()}` : `${checkIn.getHours()}`
    const minutes = checkIn.getUTCMinutes()
    return `${day}/${month}/${checkIn.getFullYear()} às ${hour}:${minutes < 10 ? `0${minutes}` : minutes}h`
}
