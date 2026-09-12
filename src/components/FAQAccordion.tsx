import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ChevronDown } from "lucide-react";

const faqs = [
  {
    question: "What services does Janah Studio provide?",
    answer:
      "We provide professional website development, bespoke desktop applications, high-quality graphic design, voice-synthesized AI video services, and high-speed data entry. Everything is built efficiently and delivered instantly.",
  },
  {
    question: "How long does it take to deliver a project?",
    answer:
      "Delivery times depend on the scope of the project. Simple websites or graphic designs can be delivered within a few days, while complex desktop apps or full-stack platforms may take a couple of weeks. We always prioritize rapid, high-quality delivery.",
  },
  {
    question: "Are your prices really affordable?",
    answer:
      "Yes! Our primary mission is to offer modern, practical digital solutions at prices that won't break the bank. We use the latest AI and modern development tools to streamline our workflow, passing the cost savings directly to you.",
  },
  {
    question: "Do you offer revisions for design work?",
    answer:
      "Absolutely. We want you to be 100% satisfied with the final product. We include a standard number of revisions in our packages to ensure the design matches your exact vision.",
  },
];

export default function FAQAccordion() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-24 px-4 bg-transparent border-t border-slate-200">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-black text-slate-900 mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-slate-600 text-sm md:text-base">
            Common questions about Janah Studio services and our process.
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={index}
                className="border border-slate-200 rounded-2xl bg-slate-1000 overflow-hidden transition-all duration-300"
              >
                <button
                  onClick={() => toggleFAQ(index)}
                  className="w-full flex items-center justify-between p-5 md:p-6 text-left focus:outline-none cursor-pointer"
                >
                  <span className="text-slate-900 font-semibold text-base md:text-lg">
                    {faq.question}
                  </span>
                  <ChevronDown
                    className={`w-5 h-5 text-[#39a7ff] transition-transform duration-300 shrink-0 ${
                      isOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>
                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                    >
                      <div className="p-5 md:p-6 pt-0 text-slate-600 text-sm md:text-base leading-relaxed">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
