import { useState } from 'react';
import { ChevronDown } from 'lucide-react';

const faqs = [
  {
    question: 'How long does development take?',
    answer: 'Most projects are completed within 1–7 days depending on the complexity and scope. Simple websites can be done in 1-2 days, while full management software may take up to 7 days. We use AI-assisted development to speed up the process significantly.',
  },
  {
    question: 'Do you provide hosting?',
    answer: 'Yes! We provide complete hosting solutions. Your website/app will be deployed on fast, reliable servers with SSL certificates included. We handle all the technical setup so you don\'t have to worry about anything.',
  },
  {
    question: 'Can you build custom software for my specific business?',
    answer: 'Absolutely! Every business is unique, and we specialize in building custom solutions tailored to your specific workflow. Whether you run a print shop, restaurant, salon, or coaching class — we design software around YOUR operations.',
  },
  {
    question: 'Will my app work on mobile phones?',
    answer: 'Yes! Every application we build is mobile-first. This means it\'s designed for smartphone users first and works perfectly on all devices — phones, tablets, and desktops. PWAs can even be installed like native apps.',
  },
  {
    question: 'Do you provide support after delivery?',
    answer: 'Yes, we provide free support depending on the plan (1-3 months). After that, we offer affordable maintenance plans. We\'re always available on WhatsApp for quick questions and bug fixes.',
  },
  {
    question: 'What technologies do you use?',
    answer: 'We use modern, battle-tested technologies including React, React Native, Firebase, Node.js, and AI/ML tools. This ensures your software is fast, scalable, and future-proof.',
  },
  {
    question: 'How do payments work?',
    answer: 'We typically work with 50% advance and 50% on delivery. For larger projects, we can arrange milestone-based payments. We accept UPI, bank transfer, and all major payment methods.',
  },
  {
    question: 'Can I see a demo before starting?',
    answer: 'Yes! We can show you demos of similar projects we\'ve built. We also provide mockups/wireframes before starting development so you know exactly what you\'re getting.',
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="faq" className="py-20 md:py-28 relative bg-navy-800/30">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-1.5 rounded-full glass-light text-electric text-sm font-semibold mb-4">
            FAQ
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-[Poppins] text-white mb-4">
            Frequently Asked <span className="gradient-text">Questions</span>
          </h2>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">
            Got questions? We've got answers. If you don't find what you're looking for, WhatsApp us!
          </p>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="glass rounded-2xl overflow-hidden"
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full flex items-center justify-between p-5 md:p-6 text-left"
              >
                <span className="font-semibold text-white text-sm md:text-base pr-4">
                  {faq.question}
                </span>
                <ChevronDown
                  className={`w-5 h-5 text-electric flex-shrink-0 transition-transform duration-300 ${
                    openIndex === index ? 'rotate-180' : ''
                  }`}
                />
              </button>
              <div
                className={`overflow-hidden transition-all duration-300 ${
                  openIndex === index ? 'max-h-96 pb-5 md:pb-6' : 'max-h-0'
                }`}
              >
                <div className="px-5 md:px-6 text-slate-400 text-sm md:text-base leading-relaxed">
                  {faq.answer}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
