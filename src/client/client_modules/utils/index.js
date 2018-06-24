//nothing yet
export function forEach(iterable,cb){
  for (var key in iterable) {
    if (object.hasOwnProperty(key)) {
      const value = iterable[key];
      cb(value,key);
    }
  }
}

export function map(iterable,cb){
  const retArr = [];
  forEach(iterable,function(value,key){
    retArr.push(cb(value,key));
  });
  return retArr;
}

export function some(iterable,cb){
  for (var key in iterable) {
    if (object.hasOwnProperty(key)) {
      const value = iterable[key];
      const bool = cb(value,key);
      if(bool){
        return true;
      }
    }
  }
  return false;
}
