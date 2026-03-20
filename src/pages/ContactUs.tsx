import React, { useState } from "react";
import { Footer } from "../components/Footer";
import { Button } from "../components/ui/button";
import { Mail, Phone, MapPin, Send, Clock, CheckCircle2 } from "lucide-react";

export const ContactPage: React.FC = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const TELEGRAM_BOT_TOKEN = "8624532493:AAF19kxc9Yvuax41QlZA2cg7ogbi7is3vxU"; // Replace with your bot token
    const CHAT_ID = "1384205752"; // Replace with your chat ID

    const text = `
📩 New Contact Form Submission

Name: ${formData.name}
Email: ${formData.email}
Subject: ${formData.subject}
Phone: ${formData.phone}
Message: ${formData.message}
    `;

    try {
      await fetch(
        `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            chat_id: CHAT_ID,
            text,
          }),
        },
      );

      setSubmitted(true);
      setTimeout(() => {
        setSubmitted(false);
        setFormData({
          name: "",
          email: "",
          subject: "",
          message: "",
          phone: "",
        });
      }, 3000);
    } catch (error) {
      console.error("Failed to send message:", error);
      alert("Failed to send message. Try again.");
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      {/* Hero Section */}
      <div className="bg-white border-b border-border/50">
        <div className="max-w-350 mx-auto px-8 lg:px-12 py-16 md:py-20">
          <div className="max-w-4xl mx-auto text-center space-y-6">
            <h1 className="text-5xl md:text-6xl font-bold tracking-tighter leading-tight">
              Get in touch
            </h1>
            <p className="text-xl text-muted-foreground font-light tracking-tight">
              We'd love to hear from you. Send us a message and we'll respond as
              soon as possible.
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1">
        <div className="max-w-350 mx-auto px-8 lg:px-12 py-16 md:py-24">
          <div className="grid lg:grid-cols-3 gap-12">
            {/* Contact Information */}
            <div className="lg:col-span-1 space-y-8">
              {/* Contact Cards */}
              <div className="bg-white rounded-3xl p-8 border border-border/50 shadow-sm hover:shadow-lg transition-all duration-300">
                <div className="w-14 h-14 rounded-2xl bg-secondary/10 flex items-center justify-center mb-6">
                  <Mail className="h-7 w-7 text-secondary" />
                </div>
                <h3 className="font-semibold text-lg tracking-tight mb-2">
                  Email Us
                </h3>
                <p className="text-sm text-muted-foreground mb-4 font-light">
                  Our team is here to help
                </p>
                <a
                  href="mailto:support@techstore.com"
                  className="text-secondary hover:text-secondary/80 transition-colors font-medium text-sm"
                >
                  support@techstore.com
                </a>
              </div>

              <div className="bg-white rounded-3xl p-8 border border-border/50 shadow-sm hover:shadow-lg transition-all duration-300">
                <div className="w-14 h-14 rounded-2xl bg-secondary/10 flex items-center justify-center mb-6">
                  <Phone className="h-7 w-7 text-secondary" />
                </div>
                <h3 className="font-semibold text-lg tracking-tight mb-2">
                  Call Us
                </h3>
                <p className="text-sm text-muted-foreground mb-4 font-light">
                  Mon-Fri from 8am to 6pm
                </p>
                <a
                  href="tel:+1234567890"
                  className="text-secondary hover:text-secondary/80 transition-colors font-medium text-sm"
                >
                  +1 (234) 567-890
                </a>
              </div>

              <div className="bg-white rounded-3xl p-8 border border-border/50 shadow-sm hover:shadow-lg transition-all duration-300">
                <div className="w-14 h-14 rounded-2xl bg-secondary/10 flex items-center justify-center mb-6">
                  <MapPin className="h-7 w-7 text-secondary" />
                </div>
                <h3 className="font-semibold text-lg tracking-tight mb-2">
                  Visit Us
                </h3>
                <p className="text-sm text-muted-foreground mb-4 font-light">
                  Come say hello at our office
                </p>
                <p className="text-sm">
                  123 Tech Avenue
                  <br />
                  San Francisco, CA 94103
                  <br />
                  United States
                </p>
              </div>

              <div className="bg-white rounded-3xl p-8 border border-border/50 shadow-sm hover:shadow-lg transition-all duration-300">
                <div className="w-14 h-14 rounded-2xl bg-secondary/10 flex items-center justify-center mb-6">
                  <Clock className="h-7 w-7 text-secondary" />
                </div>
                <h3 className="font-semibold text-lg tracking-tight mb-2">
                  Business Hours
                </h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground font-light">
                      Monday - Friday
                    </span>
                    <span className="font-medium">8:00 AM - 6:00 PM</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground font-light">
                      Saturday
                    </span>
                    <span className="font-medium">9:00 AM - 4:00 PM</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground font-light">
                      Sunday
                    </span>
                    <span className="font-medium">Closed</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-3xl p-8 md:p-12 border border-border/50 shadow-sm">
                {submitted ? (
                  <div className="text-center py-16 space-y-6">
                    <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center mx-auto">
                      <CheckCircle2 className="h-10 w-10 text-green-600" />
                    </div>
                    <h3 className="text-3xl font-bold tracking-tight">
                      Message Sent!
                    </h3>
                    <p className="text-muted-foreground font-light max-w-md mx-auto">
                      Thank you for contacting us. We'll get back to you as soon
                      as possible.
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-8">
                    <div>
                      <h2 className="text-3xl font-bold tracking-tight mb-2">
                        Send us a message
                      </h2>
                      <p className="text-muted-foreground font-light">
                        Fill out the form below and we'll get back to you within
                        24 hours.
                      </p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="space-y-3">
                        <label
                          htmlFor="name"
                          className="text-sm font-medium tracking-tight"
                        >
                          Your Name
                        </label>
                        <input
                          type="text"
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          required
                          className="w-full px-4 py-3.5 bg-accent/50 border border-border/50 rounded-2xl focus:outline-none focus:ring-2 focus:ring-secondary/20 focus:border-secondary transition-all duration-300"
                          placeholder="John Doe"
                        />
                      </div>

                      <div className="space-y-3">
                        <label
                          htmlFor="email"
                          className="text-sm font-medium tracking-tight"
                        >
                          Email Address
                        </label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          required
                          className="w-full px-4 py-3.5 bg-accent/50 border border-border/50 rounded-2xl focus:outline-none focus:ring-2 focus:ring-secondary/20 focus:border-secondary transition-all duration-300"
                          placeholder="john@example.com"
                        />
                      </div>
                    </div>
                    <div className="space-y-3">
                      <label className="text-sm font-medium tracking-tight mb-1">
                        Phone Number
                      </label>
                      <input
                        type="number"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3.5 bg-accent/50 border border-border/50 rounded-2xl focus:outline-none focus:ring-2 focus:ring-secondary/20 focus:border-secondary transition-all duration-300"
                        placeholder="012345678"
                      />
                    </div>

                    <div className="space-y-3">
                      <label
                        htmlFor="subject"
                        className="text-sm font-medium tracking-tight"
                      >
                        Subject
                      </label>
                      <input
                        type="text"
                        id="subject"
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3.5 bg-accent/50 border border-border/50 rounded-2xl focus:outline-none focus:ring-2 focus:ring-secondary/20 focus:border-secondary transition-all duration-300"
                        placeholder="How can we help?"
                      />
                    </div>

                    <div className="space-y-3">
                      <label
                        htmlFor="message"
                        className="text-sm font-medium tracking-tight"
                      >
                        Message
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        required
                        rows={6}
                        className="w-full px-4 py-3.5 bg-accent/50 border border-border/50 rounded-2xl focus:outline-none focus:ring-2 focus:ring-secondary/20 focus:border-secondary transition-all duration-300 resize-none"
                        placeholder="Tell us what's on your mind..."
                      />
                    </div>

                    <Button
                      type="submit"
                      className="w-full md:w-auto bg-secondary hover:bg-secondary/90 rounded-full h-14 px-12 text-base font-medium shadow-lg shadow-secondary/20 hover:shadow-xl transition-all duration-300"
                    >
                      <Send className="h-5 w-5 mr-2" />
                      Send Message
                    </Button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};
