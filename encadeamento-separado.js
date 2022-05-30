/*
Hash table será usado para armazenar os dados, nesse caso, o número de pacientes em cada hospital
 ou clínica espalhados pela cidade.
Além disso, esse método poderá ser utilizado em outros serviços, como bombeiros, polícia e transporte,
 cada um com seus dados próprios sendo importante para um bom gerenciamento dentro da cidade jogada.
*/

function defaultToString(item) {
  if (item === null) {
    return 'NULL';
  } else if (item === undefined) {
    return 'UNDEFINED';
  } else if (typeof item === 'string' || item instanceof String) {
    return `${item}`;
  }
  return item.toString();
}
class ValuePair {
  constructor(key, value) {
    this.key = key;
    this.value = value;
  }
  toString() {
    return `[#${this.key}: ${this.value}]`;
  }
}
class Node {
  constructor(element, next) {
    this.element = element;
    this.next = next;
  }
}
function defaultEquals(a, b) {
  return a === b;
}

class LinkedList {
constructor(equalsFn = defaultEquals) {
  this.equalsFn = equalsFn;
  this.count = 0;
  this.head = undefined;
}
push(element) {
  const node = new Node(element);
  let current;
  if (this.head == null) {
    this.head = node;
  } else {
    current = this.head;
    while (current.next != null) {
      current = current.next;
    }
    current.next = node;
  }
  this.count++;
}
}

class HashTableSeparateChaining {
  constructor(toStrFn = defaultToString) {
    this.toStrFn = toStrFn;
    this.table = {};
  }
  loseloseHashCode(key) {
    if (typeof key === 'number') {
      return key;
    }
    const tableKey = this.toStrFn(key);
    let hash = 0;
    for (let i = 0; i < tableKey.length; i++) {
      hash += tableKey.charCodeAt(i);
    }
    return hash % 37;
  }
  hashCode(key) {
    return this.loseloseHashCode(key);
  }
  put(key, value) {
    if (key != null && value != null) {
      const position = this.hashCode(key);
      if (this.table[position] == null) {
        this.table[position] = new LinkedList();
      }
      this.table[position].push(new ValuePair(key, value));
      return true;
    }
    return false;
  }
  get(key) {
    const position = this.hashCode(key);
    const LinkedList = this.table[position];
    if (LinkedList != null && !LinkedList.isEmpty()) {
      let current = LinkedList.getHead();
      while (current != null) {
        if (current.element.key === key) {
          return current.element.value;
        }
        current = current.next;
      }
    }
    return undefined;
  }
  remove(key) {
    const position = this.hashCode(key);
    const linkedList = this.table[position];
    if (linkedList != null && !linkedList.isEmpty()) {
      let current = linkedList.getHead();
      while (current != null) {
        if (current.element.key === key) {
          linkedList.remove(current.element);
          if (linkedList.isEmpty()) {
            delete this.table[position];
          }
          return true;
        }
        current = current.next;
      }
    }
    return false;
  }
  isEmpty() {
    return this.size() === 0;
  }
  size() {
    let count = 0;
    Object.values(this.table).forEach(linkedList => {
      count += linkedList.size();
    });
    return count;
  }
  clear() {
    this.table = {};
  }
  getTable() {
    return this.table;
  }
  toString() {
    if (this.isEmpty()) {
      return '';
    }
    const keys = Object.keys(this.table);
    let objString = `{${keys[0]} => ${this.table[keys[0]].toString()}}`;
    for (let i = 1; i < keys.length; i++) {
      objString = `${objString},{${keys[i]} => ${this.table[
        keys[i]
      ].toString()}}`;
    }
    return objString;
  }
}


//put 

const x = new HashTableSeparateChaining();
    x.put("Hospital Hanguk", "102 pacientes")
    x.put("Hospital Chicago", "72 pacientes");
    x.put("Hospital Wang", "38 pacientes");
    x.put("Hospital Ilsan ", "15 pacientes");
    x.put("Hospital Gyeongju", "22 pacientes")
    x.put("Hospital Nagano", "28 pacientes")
    x.put("Hospital Myshuno", "28 pacientes")
    x.put("Hospital Nanjun", "55 pacientes")
console.log(x);

//get

console.log(x.get("Hospital Hanguk"));

//remove
x.remove("Hospital Wang");
console.log(x);
