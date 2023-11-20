import { Resend } from 'resend'
import dotenv from 'dotenv'

dotenv.config()

const apiKey = process.env.RESEND_API_KEY
if (!apiKey) throw new Error('RESEND_API_KEY is not defined')

const resend = new Resend(apiKey)

const sendEmail = async (payload: any) => {
  try {
    await resend.emails.send({
      from: process.env.RESEND_FROM_EMAIL as string,
      ...payload,
    })
  }
  catch (error) {
    console.error(error)
  }
}

export default sendEmail