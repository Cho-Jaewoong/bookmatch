import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Contact",
  description: "Contact information",
}

export default function ContactPage() {
  return (
    <section className="container mx-auto px-4 py-12 text-center">
      <h1 className="text-4xl font-bold mb-8">Contact Information</h1>
      <div className="text-lg">
        <p className="mb-2">School: 한국에너지공과대학교</p>
        <p className="mb-2">Email: w00ngjae@kentech.ac.kr</p>
        <p>Address: 전라남도 나주시 켄텍길 21(빛가람동)</p>
      </div>
    </section>
  )
} 