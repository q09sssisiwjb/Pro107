import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Mail, MessageSquare, Send } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";

export default function ContactUs() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await apiRequest("POST", "/api/contact", formData);
      
      toast({
        title: "Message Sent",
        description: "Thank you for contacting us. We'll get back to you soon!",
      });

      setFormData({
        name: "",
        email: "",
        subject: "",
        message: "",
      });
    } catch (error) {
      console.error("Error submitting contact form:", error);
      toast({
        title: "Error",
        description: "Failed to send message. Please try again later.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <div className="container mx-auto max-w-4xl px-4 py-8">
      <div className="mb-12">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-3 bg-primary/10 rounded-lg">
            <Mail className="w-8 h-8 text-primary" />
          </div>
          <div>
            <h1 className="text-4xl md:text-5xl font-bold" data-testid="contact-page-title">
              Contact Us
            </h1>
          </div>
        </div>
        <p className="text-muted-foreground text-lg" data-testid="contact-page-description">
          Have questions or feedback? We'd love to hear from you
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <Card className="p-6" data-testid="contact-support-card">
          <div className="flex items-start gap-4">
            <div className="p-2 bg-primary/10 rounded-lg">
              <MessageSquare className="w-6 h-6 text-primary" />
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-2" data-testid="contact-support-title">
                AI Support Chat
              </h3>
              <p className="text-muted-foreground text-sm mb-3" data-testid="contact-support-description">
                Get instant help from our AI-powered support assistant
              </p>
              <Button asChild variant="outline" size="sm" data-testid="button-support-chat">
                <a href="/support">Open Support Chat</a>
              </Button>
            </div>
          </div>
        </Card>

        <Card className="p-6" data-testid="contact-email-card">
          <div className="flex items-start gap-4">
            <div className="p-2 bg-primary/10 rounded-lg">
              <Mail className="w-6 h-6 text-primary" />
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-2" data-testid="contact-email-title">
                Email Support
              </h3>
              <p className="text-muted-foreground text-sm mb-3" data-testid="contact-email-description">
                Send us a detailed message using the form below
              </p>
            </div>
          </div>
        </Card>
      </div>

      <Card className="p-8" data-testid="contact-form-card">
        <h2 className="text-2xl font-bold mb-6" data-testid="contact-form-title">
          Send us a Message
        </h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="name" data-testid="label-name">
                Name
              </Label>
              <Input
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                placeholder="Your name"
                data-testid="input-name"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email" data-testid="label-email">
                Email
              </Label>
              <Input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                required
                placeholder="your.email@example.com"
                data-testid="input-email"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="subject" data-testid="label-subject">
              Subject
            </Label>
            <Input
              id="subject"
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              required
              placeholder="What is this about?"
              data-testid="input-subject"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="message" data-testid="label-message">
              Message
            </Label>
            <Textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              required
              placeholder="Tell us more about your inquiry..."
              rows={6}
              data-testid="input-message"
            />
          </div>

          <Button
            type="submit"
            disabled={isSubmitting}
            className="w-full md:w-auto"
            data-testid="button-submit-contact"
          >
            {isSubmitting ? (
              "Sending..."
            ) : (
              <>
                <Send className="w-4 h-4 mr-2" />
                Send Message
              </>
            )}
          </Button>
        </form>
      </Card>
    </div>
  );
}
