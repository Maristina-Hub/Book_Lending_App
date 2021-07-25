const userHandler = {
  fullDetails: {
    firstname: "Dummy",
    lastname: "User",
    email: "dummyuser@user.com",
    password: "dummyuser123",
    confirmPassword: "dummyuser123"
  },
  incompleteInfo: {
    firstname: "Dummy",
    email: "dummyuser@user.com",
    password: "dummyuser123",
    confirmPassword: "dummyuser123"
  },
  diffPasswords: {
    firstname: "Dummy",
    lastname: "User",
    email: "dummyuser@user.com",
    password: "dummyuser123",
    confirmPassword: "dummyuser023"
  },
  loginDetails: {
    email: 'dummyuser@user.com',
    password: 'dummyuser123'
  },
  incompleteLoginInfo: {
    email: 'dummyuser@user.com'
  },
  fakeLoginPassword: {
    email: 'dummyuser@user.com',
    password: 'fakePassword'
  }
}

export default userHandler;