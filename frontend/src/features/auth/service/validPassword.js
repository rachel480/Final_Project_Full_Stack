const validPassword = (password) => {
  let capitalLetter = false
  let smallLetter = false
  let special = false

  for (let i = 0; i < password.length; i++) {
    if (password[i] >= 'A' && password[i] <= 'Z') capitalLetter = true
    if (password[i] >= 'a' && password[i] <= 'z') smallLetter = true
    if ("!@#$%^&*(),.?:{}|<>".includes(password[i])) special = true
  }

  return capitalLetter && smallLetter && special
}

export default validPassword