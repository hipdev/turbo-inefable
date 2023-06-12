import { headers } from "next/headers"
import { NextResponse } from "next/server"
import bcrypt from "bcrypt"

export async function POST(request: Request) {
  const req = await request.json()
  const headersList = headers()
  console.log(req, "res here")

  console.log(headersList, "headers list")
  /* `const salt = await bcrypt.genSalt(5)` is generating a salt value to be used in the process of
      hashing a password. The `genSalt()` function is provided by the `bcrypt` library and generates
      a random salt value with a specified number of rounds. The higher the number of rounds, the
      more secure the salt value will be. The salt value is combined with the password before
      hashing to make it more difficult for attackers to crack the password. */
  const salt = await bcrypt.genSalt(5)
  const hashedPassword = await bcrypt.hash(req?.inputCode, salt)

  return NextResponse.json({ req })
}
