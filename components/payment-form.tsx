'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import z from 'zod'
import { CreditCard, CheckCircle } from 'lucide-react'
import { useToast } from './ui/use-toast'
import prisma from '@/db'
import { title } from 'process'
import { updatePaymentStatus } from '@/app/actions/customer/service-action'

const cardformSchema = z.object({
  cardNumber: z.string().length(16, "Card number must be exactly 16 digits"),
  cvv: z.string().length(3, "CVV must be exactly 3 digits"),
  expiry: z
    .string()
    .regex(/^(0[1-9]|1[0-2])\/?([0-9]{2})$/, "Expiry date must be in MM/YY format"),
})

export function PaymentFormComponent({ cost, id }: { cost: number; id: number }) {
  const [isOpen, setIsOpen] = useState(false)
  const [isProcessing, setIsProcessing] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const { toast } = useToast()

  // Track validation errors for each field
  const [errors, setErrors] = useState<Record<string, string>>({})

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    const formData = new FormData(e.target as HTMLFormElement)
    const cardData = {
      cardNumber: formData.get('cardNumber') as string,
      expiry: formData.get('expiry') as string,
      cvv: formData.get('cvv') as string,
    }

    const safe = cardformSchema.safeParse(cardData)
    if (!safe.success) {
      // Map Zod errors to specific fields
      const fieldErrors: Record<string, string> = {}
      safe.error.errors.forEach((error) => {
        if (error.path[0]) {
          fieldErrors[error.path[0] as string] = error.message
        }
      })
      setErrors(fieldErrors)
      return
    }

    setErrors({}) // Clear errors if validation passes
    setIsProcessing(true)
    try {
      setTimeout(() => {
        setIsProcessing(false)
        setIsSuccess(true)
        setTimeout(() => {
          setIsOpen(false)
          setIsSuccess(false)
        }, 2000)
      }, 4000)
      const result = await updatePaymentStatus(id)
      toast({title:"Payment Successful"})
    } catch (err) {
      console.log(err)
      toast({
        title: "Payment Error",
        description: "An error occurred while processing the payment.",
      })
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button>Pay ${cost}</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Payment Details</DialogTitle>
          <DialogDescription>
            Enter your card details to process the payment.
          </DialogDescription>
        </DialogHeader>
        {!isProcessing && !isSuccess && (
          <form onSubmit={handleSubmit} className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="cardNumber" className="text-right">
                Card Number
              </Label>
              <div className="col-span-3">
                <Input
                  id="cardNumber"
                  name="cardNumber"
                  placeholder="1234 5678 9012 3456"
                  className="w-full"
                />
                {errors.cardNumber && (
                  <p className="text-red-500 text-sm">{errors.cardNumber}</p>
                )}
              </div>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="expiry" className="text-right">
                Expiry Date
              </Label>
              <div className="col-span-3">
                <Input
                  id="expiry"
                  name="expiry"
                  placeholder="MM/YY"
                  className="w-full"
                />
                {errors.expiry && (
                  <p className="text-red-500 text-sm">{errors.expiry}</p>
                )}
              </div>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="cvv" className="text-right">
                CVV
              </Label>
              <div className="col-span-3">
                <Input
                  id="cvv"
                  name="cvv"
                  placeholder="123"
                  className="w-full"
                />
                {errors.cvv && (
                  <p className="text-red-500 text-sm">{errors.cvv}</p>
                )}
              </div>
            </div>
            <Button type="submit" className="ml-auto">
              Proceed Payment
            </Button>
          </form>
        )}
        {isProcessing && (
          <div className="flex flex-col items-center justify-center py-8">
            <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-primary"></div>
            <p className="mt-4 text-lg font-semibold">Processing Payment...</p>
          </div>
        )}
        {isSuccess && (
          <div className="flex flex-col items-center justify-center py-8">
            <CheckCircle className="h-16 w-16 text-green-500" />
            <p className="mt-4 text-lg font-semibold">Payment Successful!</p>
          </div>
        )}
      </DialogContent>
    </Dialog>
  )
}
