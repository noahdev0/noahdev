"use client";
import React, { useState } from "react";
import {
  MailIcon,
  PhoneIcon,
  MapPinIcon,
  SendIcon,
  Loader2,
} from "lucide-react";
import { motion } from "framer-motion";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
// import { useToast } from "@/components/ui/use-toast";
import { useToast } from "@/hooks/use-toast";

const ContactPage = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));

      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        toast({
          title: "Message sent!",
          description: "I'll get back to you as soon as possible.",
          variant: "default",
        });
        setFormData({
          name: "",
          email: "",
          subject: "",
          message: "",
        });
      } else {
        throw new Error("Failed to send message");
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const contactMethods = [
    {
      icon: <MailIcon className="h-6 w-6 text-blue-600" />,
      title: "Email",
      value: "nouhbenzina@gmail.com",
      link: "mailto:nouhbenzina@gmail.com",
    },
    {
      icon: <PhoneIcon className="h-6 w-6 text-green-600" />,
      title: "Phone",
      value: "+213 XX XX XX XX",
      link: "tel:+213783370524",
    },
    {
      icon: <MapPinIcon className="h-6 w-6 text-red-600" />,
      title: "Location",
      value: "Algeria, Blida , Chiffa",
      link: "https://maps.google.com/?q=Algeria,Blida,Chiffa",
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background  py-16">
      <motion.div
        className="container mx-auto px-4 max-w-6xl"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        <motion.h1
          className="text-4xl font-bold text-center mb-4 text-primary"
          variants={itemVariants}
        >
          Contact Me
        </motion.h1>
        <motion.p
          className="text-center text-text-secondary-foreground mb-16 max-w-2xl mx-auto"
          variants={itemVariants}
        >
          {`Let's create something amazing together. Feel free to reach out for
          collaborations, questions, or just to say hello!`}
        </motion.p>

        <div className="grid md:grid-cols-2 gap-12">
          {/* Contact Information */}
          <motion.div variants={itemVariants}>
            <Card>
              <CardHeader>
                <CardTitle>Get in Touch</CardTitle>
                <CardDescription>
                  Choose your preferred method of communication
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {contactMethods.map((method) => (
                    <motion.div
                      key={method.title}
                      variants={itemVariants}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="flex items-center space-x-4 p-4 rounded-lg hover:bg-accent transition-colors"
                    >
                      <div className="p-2 rounded-lg bg-accent">
                        {method.icon}
                      </div>
                      <div>
                        <h3 className="font-semibold dark:text-gray-400 text-gray-800">
                          {method.title}
                        </h3>
                        <a
                          href={method.link}
                          className="text-gray-600 hover:text-blue-600 transition-colors"
                          target={
                            method.title === "Location" ? "_blank" : undefined
                          }
                          rel={
                            method.title === "Location"
                              ? "noopener noreferrer"
                              : undefined
                          }
                        >
                          {method.value}
                        </a>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Contact Form */}
          <motion.div variants={itemVariants}>
            <Card>
              <CardHeader>
                <CardTitle>Send a Message</CardTitle>
                <CardDescription>
                  {`Fill out the form below and I'll get back to you as soon as
                  possible.`}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name</Label>
                    <Input
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      placeholder="Your Name"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address</Label>
                    <Input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      placeholder="you@example.com"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="subject">Subject</Label>
                    <Input
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      required
                      placeholder="Project Inquiry"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="message">Message</Label>
                    <Textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      placeholder="Tell me about your project or inquiry..."
                      rows={4}
                    />
                  </div>

                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Sending...
                      </>
                    ) : (
                      <>
                        <SendIcon className="mr-2 h-4 w-4" />
                        Send Message
                      </>
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default ContactPage;
