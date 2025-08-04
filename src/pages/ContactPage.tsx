import React, { useState } from 'react';
import { Mail, MessageCircle, Phone, MapPin, Send, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { TrolleyPopup } from '@/components/ui/TrolleyPopup';

export const ContactPage: React.FC = () => {
  const [isTrolleyOpen, setIsTrolleyOpen] = useState(false);
  const [contactForm, setContactForm] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Submitting contact form:', contactForm);
    // Handle form submission
    setContactForm({ name: '', email: '', subject: '', message: '' });
  };

  const contactMethods = [
    {
      icon: Mail,
      title: 'Email Support',
      description: 'Get help within 24 hours',
      action: 'support@vast.app',
      color: 'bg-blue-100'
    },
    {
      icon: MessageCircle,
      title: 'Live Chat',
      description: 'Available 9 AM - 6 PM',
      action: 'Start Chat',
      color: 'bg-green-100'
    },
    {
      icon: Phone,
      title: 'Phone Support',
      description: 'Emergency support only',
      action: '+1 (555) 123-4567',
      color: 'bg-purple-100'
    }
  ];

  return (
    <div className="space-y-6 pb-32">
      {/* Header */}
      <div className="sticky top-0 bg-background/80 backdrop-blur-lg z-10 py-6 px-6 border-b border-card-border">
        <h1 className="text-2xl font-bold text-foreground text-center">Contact & Support</h1>
        <p className="text-muted-foreground text-center mt-1">We're here to help you</p>
      </div>

      {/* Quick Contact Methods */}
      <div className="px-6">
        <h3 className="text-lg font-semibold text-foreground mb-4">Get in Touch</h3>
        <div className="space-y-3">
          {contactMethods.map((method) => (
            <div
              key={method.title}
              className="card-soft p-4 flex items-center justify-between spring-tap cursor-pointer hover:shadow-card transition-all duration-200"
            >
              <div className="flex items-center space-x-3">
                <div className={`p-3 rounded-xl ${method.color}`}>
                  <method.icon size={20} className="text-gray-700" />
                </div>
                <div>
                  <div className="font-medium text-foreground">{method.title}</div>
                  <div className="text-sm text-muted-foreground">{method.description}</div>
                </div>
              </div>
              <div className="text-sm text-primary font-medium">{method.action}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Contact Form */}
      <div className="px-6">
        <div className="card-elevated p-6">
          <h3 className="text-lg font-semibold text-foreground mb-4">Send us a Message</h3>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="name" className="text-sm font-medium text-foreground">Name</Label>
                <Input
                  id="name"
                  value={contactForm.name}
                  onChange={(e) => setContactForm(prev => ({ ...prev, name: e.target.value }))}
                  className="mt-1 bg-white/50 border-card-border"
                  required
                />
              </div>
              <div>
                <Label htmlFor="email" className="text-sm font-medium text-foreground">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={contactForm.email}
                  onChange={(e) => setContactForm(prev => ({ ...prev, email: e.target.value }))}
                  className="mt-1 bg-white/50 border-card-border"
                  required
                />
              </div>
            </div>
            
            <div>
              <Label htmlFor="subject" className="text-sm font-medium text-foreground">Subject</Label>
              <Input
                id="subject"
                value={contactForm.subject}
                onChange={(e) => setContactForm(prev => ({ ...prev, subject: e.target.value }))}
                className="mt-1 bg-white/50 border-card-border"
                required
              />
            </div>

            <div>
              <Label htmlFor="message" className="text-sm font-medium text-foreground">Message</Label>
              <Textarea
                id="message"
                value={contactForm.message}
                onChange={(e) => setContactForm(prev => ({ ...prev, message: e.target.value }))}
                className="mt-1 bg-white/50 border-card-border min-h-[120px]"
                required
              />
            </div>

            <Button
              type="submit"
              className="w-full bg-primary hover:bg-primary/90 text-primary-foreground rounded-xl spring-tap"
            >
              <Send size={16} className="mr-2" />
              Send Message
            </Button>
          </form>
        </div>
      </div>

      {/* Shopping & Resources */}
      <div className="px-6">
        <h3 className="text-lg font-semibold text-foreground mb-4">Shopping & Resources</h3>
        <div className="space-y-3">
          <Button
            onClick={() => setIsTrolleyOpen(true)}
            className="w-full btn-soft justify-between"
          >
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-primary-muted rounded-lg">
                🛒
              </div>
              <div className="text-left">
                <div className="font-medium">Shop Menstrual Products</div>
                <div className="text-sm text-muted-foreground">Tokopedia, Shopee & local stores</div>
              </div>
            </div>
            <ExternalLink size={16} />
          </Button>

          <div className="card-soft p-4">
            <div className="flex items-center space-x-3 mb-3">
              <MapPin size={20} className="text-primary" />
              <h4 className="font-medium text-foreground">Find Local Support</h4>
            </div>
            <div className="text-sm text-muted-foreground space-y-1">
              <p>• Women's health clinics near you</p>
              <p>• Community support groups</p>
              <p>• Educational workshops and events</p>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="px-6">
        <h3 className="text-lg font-semibold text-foreground mb-4">Frequently Asked Questions</h3>
        <div className="space-y-3">
          {[
            {
              question: 'How do I track my period?',
              answer: 'Use the Calendar page to mark your period days and track symptoms.'
            },
            {
              question: 'Is my data private?',
              answer: 'Yes, all your health data is encrypted and stored securely on your device.'
            },
            {
              question: 'Can I export my data?',
              answer: 'Yes, you can export your cycle data from the Profile settings.'
            }
          ].map((faq, index) => (
            <div key={index} className="card-soft p-4">
              <h5 className="font-medium text-foreground mb-2">{faq.question}</h5>
              <p className="text-sm text-muted-foreground">{faq.answer}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Trolley Popup */}
      <TrolleyPopup
        isOpen={isTrolleyOpen}
        onClose={() => setIsTrolleyOpen(false)}
      />
    </div>
  );
};