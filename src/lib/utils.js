export function random(min = 0, max = 1){
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function jsonParseSafe(str){
  try {
    return JSON.parse(str);
  } catch(e) {
    return false;
  }
}

export function pick(arr, keys) {
  const obj = {};

  keys.forEach(key => {
    obj[key] = arr[key];
  });

  return obj;
}

export function remove(arr, keys) {
  keys.forEach(key => {
    delete(arr[key]);
  });
}

export function extend(target, source) {
  for (let i in source) {
    if (source.hasOwnProperty(i)) {
      target[i] = source[i];
    }
  }
}

export function debounce(func, wait) {
  let timeout = setTimeout(func, wait);

  return () => {
    if (timeout) {
      clearTimeout(timeout);
      timeout = setTimeout(func, wait);
    }
  };
}

export function once(fn, context) {
  let result;

  return function() {
    if(fn) {
      result = fn.apply(context || this, arguments);
      fn = null;
    }

    return result;
  };
}

export function getAbsoluteUrl() {
  let a;

  return url =>  {
    if (!a) {
      a = document.createElement('a')
    }

    a.href = url;

    return a.href;
  };
}

export function matchesSelector(el, selector) {
  var p = Element.prototype;
  var f = p.matches || p.webkitMatchesSelector || p.mozMatchesSelector || p.msMatchesSelector || function(s) {
    return [].indexOf.call(document.querySelectorAll(s), this) !== -1;
  };
  return f.call(el, selector);
}