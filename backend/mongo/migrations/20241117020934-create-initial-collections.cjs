module.exports = {
  async up(db, client) {
    await db.createCollection('users');
    await db.createCollection('supplytypes');
  },

  async down(db, client) {
    await db.collection('supplytypes').drop();
    await db.collection('users').drop();
  },
};
