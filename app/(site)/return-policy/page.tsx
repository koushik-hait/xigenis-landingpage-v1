import React from "react"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Return Policy | Megaabyte",
  description: "Return Policy for Megaabyte services.",
}

export default function ReturnPolicyPage() {
  return (
    <div className="container mx-auto max-w-4xl px-4 py-12">
      <h1 className="mb-8 text-4xl font-bold">Return Policy</h1>

      <div className="text-muted-foreground space-y-6 text-lg leading-relaxed">
        <p>
          We offer refund / exchange within first 4 days from the date of your purchase. If 4 days have passed since
          your purchase, you will not be offered a return, exchange or refund of any kind. In order to become eligible
          for a return or an exchange, (i) the purchased item should be unused and in the same condition as you received
          it, (ii) the item must have original packaging, (iii) if the item that you purchased on a sale, then the item
          may not be eligible for a return / exchange. Further, only such items are replaced by us (based on an exchange
          request), if such items are found defective or damaged.
        </p>
        <p>
          You agree that there may be a certain category of products / items that are exempted from returns or refunds.
          Such categories of the products would be identified to you at the item of purchase. For exchange / return
          accepted request(s) (as applicable), once your returned product / item is received and inspected by us, we
          will send you an email to notify you about receipt of the returned / exchanged product. Further. If the same
          has been approved after the quality check at our end, your request (i.e. return / exchange) will be processed
          in accordance with our policies.
        </p>
      </div>
    </div>
  )
}
