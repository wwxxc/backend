export default function formatDateTime(dateTimeString: string) {
    const date = new Date(dateTimeString);
  
    const padZero = (num:number) => num.toString().padStart(2, '0');
  
    const day = padZero(date.getDate());
    const month = padZero(date.getMonth() + 1); // getMonth() returns 0-11
    const year = date.getFullYear();
  
    const hours = padZero(date.getHours());
    const minutes = padZero(date.getMinutes());
    const seconds = padZero(date.getSeconds());
  
    return `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`;
  }