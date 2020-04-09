const isCallable = (ref, fn, msg) => {
  if (!ref) {
      throw new Error('implementation not found.');
  }
  if (!ref[fn] || typeof ref[fn] !== 'function') {    
    throw new Error(msg || 'method is not callable.');
  }  
}

export default class DbAdapter {
  constructor(impl) {
    this.impl = impl;
  }

  /**
   * Create a document in the collection
   * @param data
   * @param id
   */
  async create(data, id = null) {
    isCallable(this.impl, 'create', 'Missing create method.');
    return await this.impl['create'](data, id);
  }

  /**
   * Read a document in the collection
   * @param id
   */
  async read(id) {
    isCallable(this.impl, 'read', 'Missing read method.');
    return await this.impl['read'](id);
  }

  /**
   * Read all documents in the collection following constraints
   * @param constraints
   */
  async readAll(constraints = null) {
    isCallable(this.impl, 'readAll', 'Missing readAll method.');
    return await this.impl['readAll'](contraints);
  }

  /**
   * Update a document in the collection
   * @param data
   */
  async update(data) {
    isCallable(this.impl, 'update', 'Missing update method.');
    return await this.impl['update'](data);
  }

  /**
   * Delete a document in the collection
   * @param id
   */
  async delete(id) {
    isCallable(this.impl, 'delete', 'Missing delete method.');
    return await this.impl['delete'](id);
  }
}
