import { Store, set, get, del, keys } from 'idb-keyval';

export default class LocalDb {
  constructor(collectionPath) {
    this.collectionPath = collectionPath;

    this.store = new Store(`${this.collectionPath}-db`, this.collectionPath);
  }

  /**
   * Create a document in the collection
   * @param data
   * @param id
   */
   async create(data, id = null) {

        if (!id) {
            throw new Error('local db requires and id to be passed to create.');
        }
        await set(data, id, this.store);

        return {
            id: id,
            ...data,
            createTimestamp: new Date(),
            updateTimestamp: new Date(),
        }
  }

  /**
   * Read a document in the collection
   * @param id
   */
  async read(id) {

    let obj = await get(id, this.store);
    
    return { id, ...obj }
  }

  /**
   * Read all documents in the collection following constraints
   * @param constraints
   */
  async readAll(constraints = null) {  

        let items = await keys(this.store);

        return items.reduce(async (prev, next) => {
            let val = await get(next, this.store);
            if (val) {
                prev.push(val);
            }
            return prev;
        }, []);    
  }

  /**
   * Update a document in the collection
   * @param data
   */
  async update(data) {
    const { id } = data;
    if (!data) {
        throw new Error('Missing id for update.');
    }

    await set(id, data, this.store);
      
    return id;
    
  }

  /**
   * Delete a document in the collection
   * @param id
   */
  async delete(id) {
      await del(id, this.store);
  }
}
