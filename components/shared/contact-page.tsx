import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"

export function ContactPage() {
  return (
    <div className="w-full max-w-5xl mx-auto py-24 md:py-28 lg:py-32 px-4 md:px-6">
      <div className="grid md:grid-cols-2 gap-12">
        <div>
          <h1 className="text-3xl font-bold mb-4">Get in Touch</h1>
          <p className="text-muted-foreground mb-8">
            Have a question or need assistance? Fill out the form and we&apos;ll get back to you as soon as possible.
          </p>
          <form className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="name">Name</Label>
                <Input id="name" placeholder="Enter your name" />
              </div>
              <div>
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" placeholder="Enter your email" />
              </div>
            </div>
            <div>
              <Label htmlFor="subject">Subject</Label>
              <Input id="subject" placeholder="Enter the subject" />
            </div>
            <div>
              <Label htmlFor="message">Message</Label>
              <Textarea id="message" placeholder="Enter your message" className="min-h-[150px]" />
            </div>
            <Button type="submit" className="w-full">
              Submit
            </Button>
          </form>
        </div>
        <div className="bg-muted rounded-lg p-8">
          <h2 className="text-2xl font-bold mb-4">Contact Information</h2>
          <div className="space-y-4">
            <div>
              <h3 className="font-medium mb-1">Address</h3>
              <p className="text-muted-foreground">
                Main Street
                <br />
                Kerala, India 760001 
              </p>
            </div>
            <div>
              <h3 className="font-medium mb-1">Phone</h3>
              <p className="text-muted-foreground">(+91) 9564-534535</p>
            </div>
            <div>
              <h3 className="font-medium mb-1">Email</h3>
              <p className="text-muted-foreground">VServ@gmail.com</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
