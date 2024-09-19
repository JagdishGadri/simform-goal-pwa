export const users = [
  {
    _id: '60d21b4667d0d8992e610c85',
    username: 'johndoe',
    fullName: 'John Doe',
    email: 'john.doe@example.com',
    avatar: 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD...',
    createdAt: new Date('2023-01-01T10:00:00Z'),
    updatedAt: new Date('2023-01-01T10:00:00Z')
  },
  {
    _id: '60d21b4667d0d8992e610c86',
    username: 'janedoe',
    fullName: 'Jane Doe',
    email: 'jane.doe@example.com',
    avatar: 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD...',
    createdAt: new Date('2023-02-01T10:00:00Z'),
    updatedAt: new Date('2023-02-01T10:00:00Z')
  },
  {
    _id: '60d21b4667d0d8992e610c87',
    username: 'alice',
    fullName: 'Alice Smith',
    email: 'alice.smith@example.com',
    avatar: 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD...',
    createdAt: new Date('2023-03-01T10:00:00Z'),
    updatedAt: new Date('2023-03-01T10:00:00Z')
  },
  {
    _id: '60d21b4667d0d8992e610c88',
    username: 'bob',
    fullName: 'Bob Johnson',
    email: 'bob.johnson@example.com',
    avatar: 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD...',
    createdAt: new Date('2023-04-01T10:00:00Z'),
    updatedAt: new Date('2023-04-01T10:00:00Z')
  },
  {
    _id: '60d21b4667d0d8992e610c89',
    username: 'charlie',
    fullName: 'Charlie Brown',
    email: 'charlie.brown@example.com',
    avatar: 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD...',
    createdAt: new Date('2023-05-01T10:00:00Z'),
    updatedAt: new Date('2023-05-01T10:00:00Z')
  }
];

export const messages = [
  {
    _id: '60d21b4667d0d8992e610c90',
    sender: '60d21b4667d0d8992e610c85', // John Doe
    receiver: '60d21b4667d0d8992e610c86', // Jane Doe
    content: 'Hey Jane, how are you?',
    messageType: 'text',
    isOpened: true,
    createdAt: new Date('2023-06-01T10:00:00Z'),
    updatedAt: new Date('2023-06-01T10:00:00Z')
  },
  {
    _id: '60d21b4667d0d8992e610c91',
    sender: '60d21b4667d0d8992e610c86', // Jane Doe
    receiver: '60d21b4667d0d8992e610c85', // John Doe
    content: "Hi John! I'm good, how about you?",
    messageType: 'text',
    isOpened: true,
    createdAt: new Date('2023-06-01T10:05:00Z'),
    updatedAt: new Date('2023-06-01T10:05:00Z')
  },
  {
    _id: '60d21b4667d0d8992e610c92',
    sender: '60d21b4667d0d8992e610c87', // Alice Smith
    receiver: '60d21b4667d0d8992e610c88', // Bob Johnson
    content: 'Check out this picture!',
    messageType: 'text',
    isOpened: false,
    createdAt: new Date('2023-06-02T11:00:00Z'),
    updatedAt: new Date('2023-06-02T11:00:00Z')
  },
  {
    _id: '60d21b4667d0d8992e610c93',
    sender: '60d21b4667d0d8992e610c87', // Alice Smith
    receiver: '60d21b4667d0d8992e610c88', // Bob Johnson
    content: 'data:image/jpeg;image1.jpg',
    messageType: 'image',
    isOpened: false,
    createdAt: new Date('2023-06-02T11:01:00Z'),
    updatedAt: new Date('2023-06-02T11:01:00Z')
  },
  {
    _id: '60d21b4667d0d8992e610c94',
    sender: '60d21b4667d0d8992e610c88', // Bob Johnson
    receiver: '60d21b4667d0d8992e610c89', // Charlie Brown
    content: "Hey Charlie, what's up?",
    messageType: 'text',
    isOpened: true,
    createdAt: new Date('2023-06-03T09:00:00Z'),
    updatedAt: new Date('2023-06-03T09:00:00Z')
  },
  {
    _id: '60d21b4667d0d8992e610c95',
    sender: '60d21b4667d0d8992e610c89', // Charlie Brown
    receiver: '60d21b4667d0d8992e610c88', // Bob Johnson
    content: 'Not much, just working on some stuff.',
    messageType: 'text',
    isOpened: true,
    createdAt: new Date('2023-06-03T09:05:00Z'),
    updatedAt: new Date('2023-06-03T09:05:00Z')
  }
];

export const chatData = [
  {
    participants: ['60d21b4667d0d8992e610c85', '60d21b4667d0d8992e610c86'], // John Doe and Jane Doe
    messages: [
      {
        _id: '60d21b4667d0d8992e610c90',
        sender: '60d21b4667d0d8992e610c85', // John Doe
        receiver: '60d21b4667d0d8992e610c86', // Jane Doe
        content: 'Hey Jane, how are you?',
        messageType: 'text',
        isOpened: true,
        createdAt: new Date('2023-06-01T10:00:00Z'),
        updatedAt: new Date('2023-06-01T10:00:00Z')
      },
      {
        _id: '60d21b4667d0d8992e610c91',
        sender: '60d21b4667d0d8992e610c86', // Jane Doe
        receiver: '60d21b4667d0d8992e610c85', // John Doe
        content: "Hi John! I'm good, how about you?",
        messageType: 'text',
        isOpened: true,
        createdAt: new Date('2023-06-01T10:05:00Z'),
        updatedAt: new Date('2023-06-01T10:05:00Z')
      }
    ]
  },
  {
    participants: ['60d21b4667d0d8992e610c87', '60d21b4667d0d8992e610c88'], // Alice Smith and Bob Johnson
    messages: [
      {
        _id: '60d21b4667d0d8992e610c92',
        sender: '60d21b4667d0d8992e610c87', // Alice Smith
        receiver: '60d21b4667d0d8992e610c88', // Bob Johnson
        content: 'Check out this picture!',
        messageType: 'text',
        isOpened: false,
        createdAt: new Date('2023-06-02T11:00:00Z'),
        updatedAt: new Date('2023-06-02T11:00:00Z')
      },
      {
        _id: '60d21b4667d0d8992e610c93',
        sender: '60d21b4667d0d8992e610c87', // Alice Smith
        receiver: '60d21b4667d0d8992e610c88', // Bob Johnson
        content: 'data:image/jpeg;image1.jpg',
        messageType: 'image',
        isOpened: false,
        createdAt: new Date('2023-06-02T11:01:00Z'),
        updatedAt: new Date('2023-06-02T11:01:00Z')
      }
    ]
  },
  {
    participants: ['60d21b4667d0d8992e610c88', '60d21b4667d0d8992e610c89'], // Bob Johnson and Charlie Brown
    messages: [
      {
        _id: '60d21b4667d0d8992e610c94',
        sender: '60d21b4667d0d8992e610c88', // Bob Johnson
        receiver: '60d21b4667d0d8992e610c89', // Charlie Brown
        content: "Hey Charlie, what's up?",
        messageType: 'text',
        isOpened: true,
        createdAt: new Date('2023-06-03T09:00:00Z'),
        updatedAt: new Date('2023-06-03T09:00:00Z')
      },
      {
        _id: '60d21b4667d0d8992e610c95',
        sender: '60d21b4667d0d8992e610c89', // Charlie Brown
        receiver: '60d21b4667d0d8992e610c88', // Bob Johnson
        content: 'Not much, just working on some stuff.',
        messageType: 'text',
        isOpened: true,
        createdAt: new Date('2023-06-03T09:05:00Z'),
        updatedAt: new Date('2023-06-03T09:05:00Z')
      }
    ]
  }
];
