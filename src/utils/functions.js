export const capitalizeName = (name) => {
  return name.replace(/\b\w/g, char => char.toUpperCase());
};

export const isUsername = (username) => {
  if (!username) return "Username is required";
  if (username.length < 4) return "Minimum 4 characters required";
  if (username.length > 50) return "Maximum 50 characters allowed";
  if (!/^[a-zA-Z0-9]*$/.test(username)) return "Username must be alphanumeric";
  return "";
};

export const isPassword = (password) => {
  if (!password) return "Password is required";
  if (password.length < 5) return "Minimum 5 characters required";
  return "";
};



