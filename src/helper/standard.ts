export let currency:Function = (price?:number, type?:string, position?:number) => {
  let pos = position || 0, unit:string;
  switch(type){
    case 'usd':
      unit = '$';
      break;
    case 'rmb':
      unit = '￥';
      break;
    case 'eur':
      unit = '€';
      break;
    case 'gbp':
      unit = '£';
      break;
    default:
      unit = '￥';
      break;
  }
  return `${pos === 0 && `<span name="unit">${unit}</span>`}<span>${price}</span>${pos === 1 && `<span name="unit">${unit}</span>`}`
};