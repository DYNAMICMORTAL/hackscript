import React, { useState } from "react";

const FAQItem = ({ question, answer, isOpen, onClick }) => {
  return (
    <div
      className="bg-gray-900 border-2 border-primary rounded-lg p-4 w-full max-w-2xl mx-auto my-4 transition duration-300 cursor-pointer hover:bg-gray-800"
      onClick={onClick}
    >
      <h4 className="text-red-500 text-lg md:text-xl font-semibold">{question}</h4>
      <div
        className={`transition-all duration-500 ease-in-out overflow-hidden ${
          isOpen ? "max-h-[500px] opacity-100 mt-2" : "max-h-0 opacity-0"
        }`}
      >
        <p className="text-gray-300 text-sm md:text-base overflow-auto">{answer}</p>
      </div>
    </div>
  );
};

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const faqs = [
    {
      question: "🏁 When do we hit the starting grid?",
      answer:
        "Registration opens at the crack of dawn – get set and rev your engines for Hackscript!",
    },
    {
      question: "🔧 How do pit stops work in this race?",
      answer:
        "Our pit stops are your mentorship sessions – a quick refuel to keep you on track during the race.",
    },
    {
      question: "🚀 Can I overtake challenges without prior experience?",
      answer:
        "Absolutely! Just like in an F1 race, every driver learns on the track. We welcome all skill levels.",
    },
    {
      question: "⛽ What technical fuel powers your team?",
      answer:
        "We run on open-source technology – use your favorite tools and accelerate your innovation!",
    },
    {
      question: "🚨 Is there a safety car to ease the pressure?",
      answer:
        "Our experienced mentors act as your safety car, guiding you through tricky curves and challenges.",
    },
    {
      question: "💥 What if I crash during the race?",
      answer:
        "Crashes are just part of the learning curve – get back on track faster and learn from every lap!",
    },
    {
      question: "⏳ How long is the race?",
      answer:
        "The Hackscript race lasts until the final project submission, so pace yourself for the full circuit.",
    },
    {
      question: "🏎️ Can I switch teams mid-race?",
      answer:
        "Team changes aren’t allowed mid-race – commit to your crew and strategize for that winning overtake!",
    },
  ];

  return (
    <section id="faq" className="bg-black text-white py-16 text-center px-4">
      <div className="container mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-primary mb-8 ">
          🏎️ <span className="underline underline-offset-4 text-2xl md:text-4xl md:underline-offset-8">Frequently Asked Questions</span>
        </h2>
        {faqs.map((faq, idx) => (
          <FAQItem
            key={idx}
            question={faq.question}
            answer={faq.answer}
            isOpen={openIndex === idx}
            onClick={() => setOpenIndex(openIndex === idx ? null : idx)}
          />
        ))}
      </div>
    </section>
  );
};

export default FAQ;
