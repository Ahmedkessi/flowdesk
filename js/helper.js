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

export function formatDate(data){
    return data.split('-').reverse().join(',');
  }  