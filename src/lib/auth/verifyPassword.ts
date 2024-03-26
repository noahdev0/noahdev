import bcrypt from "bcrypt";

async function verifyPassword({
  password,
  dataBasePassword,
}: {
  password: string;
  dataBasePassword: string;
}): Promise<boolean> {
  try {
    const match = await bcrypt.compare(password, dataBasePassword);
    return match;
  } catch (error) {
    // Handle error
    console.error("Error verifying password:", error);
    return false;
  }
}

export { verifyPassword };
