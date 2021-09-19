    const bookCreator = {
        fullDetails: {
        firstname: "Dummy",
        lastname: "User",
        email: "dummyuser@user.com",
        password: "dummyuser123",
        confirmPassword: "dummyuser123",
    },
    admin: {
        title: "Spy",
        author: "John",
        category: "6147c31b50f7b9d62623acad",
        description: "Investigative story",
        year: "2021",
    },
    incompleteDetails: {
        Author: "John",
        category: "6147c31b50f7b9d62623acad",
        description: "Investigative story",
        year: "2021"
    },
    notAdmin: {
        title: "Spy",
        Author: "John",
        category: "6147c31b50f7b9d62623acad",
        description: "Investigative story",
        year: "2021",
        role: "normal"
    },
    getBookById: {
        _id: "6106aa9f1139375a68cfb3b7",
        role: "admin",
        title: "Tony goes school",
        author: "john",
        description: "story about auto mobiles",
        category: "6147c31b50f7b9d62623acad",
        year: 2021,
    },
    wrongID: {
        role: "admin",
        title: "Tony goes school",
        author: "john",
        description: "story about auto mobiles",
        category: "6147c31b50f7b9d62623acad",
        year: 2021,
    }
    }

    export default bookCreator;