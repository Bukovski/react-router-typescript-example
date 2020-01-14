function nextKey(obj: object, currentKey: string): string {
  const keys: string[] = Object.keys(obj);
  const nextIndex: number = keys.indexOf(currentKey) + 1;
  
  return keys[ nextIndex ];
}

function prevKey(obj: object, currentKey: string): string {
  const keys: string[] = Object.keys(obj);
  const prevIndex: number = keys.indexOf(currentKey) - 1;
  
  return keys[ prevIndex ];
}

function firstKey(obj: object): string {
  const keys: string[] = Object.keys(obj);
  
  return keys[ 0 ];
}


export {
  nextKey,
  prevKey,
  firstKey
}
