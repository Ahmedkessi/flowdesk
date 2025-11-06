export function capitalize(str) {
  return str.toLowerCase().trim().split(' ').map(word => word[0].toUpperCase() + word.slice(1)).join(' ')
}

export function currentDate() {
  const date = new Date();
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();
  return `${day}-${month}-${year}`
}

<<<<<<< HEAD
export function formatDate(date){
    return date.split('-').reverse().join(',');
=======
export function formatDate(data){
    return data.split('-').reverse().join(',');
>>>>>>> 144ca4d08e73240328207d27e485f59cdfea5b65
  }  