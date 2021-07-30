export default function makeInstance(firstname, lastname, email, hashed, role, subscriptionType) {
  return ({
    firstname,
    lastname,
    email,
    password: hashed,
    role,
    subscriptionType
  })
}