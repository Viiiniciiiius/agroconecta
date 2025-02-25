const { default: mongoose } = require('mongoose');

/**
 * @type {import('../../src/models/User').IUser[]}
 */


/**
 * 
 * export interface IUser extends Document {
  username: string;
  email: string;
  image?: string;
  passwordHash?: string;
  firstName: string;
  lastName?: string;
  phone?: string;
  profession?: string;
  accounts: [
    {
      provider: string;
      providerAccountId: string;
    },
  ];
  resetTokenHash?: string; // Add resetToken field to IUser interface
  resetTokenExpires?: Date; // Add resetTokenExpires field to IUser interface
}
 */
const users = [
  {
    _id: new mongoose.Types.ObjectId(),
    username: "joao.mendes",
    email: "joao@example.com",
    firstName: "Joao",
    lastName: "Mendes",
    phone: "(12) 94567-8999",
    profession: "Developer",
    image: "path/to/image.jpg",
    passwordHash: "$2a$10$6CA.b7CN7IMQJD5/LEJw0.FgExCcF84MXe8ma4ChC0d94lbeTkkie",
    accounts: [
      {
        provider: "credentials",
        providerAccountId: "joao@example.com"
      }
    ]
  },
  {
    _id: new mongoose.Types.ObjectId(),
    username: "jane.smith",
    email: "jane@example.com",
    firstName: "Jane",
    lastName: "Smith",
    phone: "987-654-3210",
    profession: "Designer",
    image: "path/to/image.jpg",
    passwordHash: "$2a$10$6CA.b7CN7IMQJD5/LEJw0.FgExCcF84MXe8ma4ChC0d94lbeTkkie",  
    accounts: [
      {
        provider: "credentials",
        providerAccountId: "jane@example.com"
      }
    ]
  }
];

module.exports = {
  users,
  async up(db, client) {
    db.collection('users').insertMany(users);
  },

  async down(db, client) {
    await db.collection('users').deleteMany({
      _id: { $in: users.map(user => user._id) }
    });
  },
};
