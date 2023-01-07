import { openDB } from 'idb';

const initdb = async () =>
  openDB('jate', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('jate')) {
        console.log('jate database already exists');
        return;
      }
      db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
      console.log('jate database created');
    },
  });

export const putDb = async (content) => {

  const jateDb = await openDB('jate', 1);
  const dbRead = jateDb.transaction('jate', 'readwrite');
  const store = dbRead.objectStore('jate');
  const request = store.put({id: 1, value: content});

  const result = await request;
  console.log ('data has been saved to DB', result);
  return request;
}


export const getDb = async () => {

  const jateDb = await openDB('jate', 1);
  const dbRead = jateDb.transaction('jate', 'readonly');
  const store = dbRead.objectStore('jate');
  const request = store.getAll();
  
  const result = await request;
  console.log ('result.value', result);
  return request?.value;
}
initdb();
