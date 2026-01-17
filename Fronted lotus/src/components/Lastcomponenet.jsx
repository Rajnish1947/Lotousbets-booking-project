

import React, { useState } from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";

const Lastcomponenet = () => {
  const [showGuide, setShowGuide] = useState(false);
  const [showFAQ, setShowFAQ] = useState(false);

  const toggleGuide = () => setShowGuide((prev) => !prev);
  const toggleFAQ = () => setShowFAQ((prev) => !prev);

  const faqs = [
    {
      question: "Is it okay to bet online in India?",
      answer:
        "In India, it's not always clear if it's allowed to bet on sports online. It depends on the state. Some kinds of betting are regulated, while others exist in a legal grey area. Understanding and following the local laws is very important.",
    },
    {
      question: "What do I need to do to get the Lotus Bets betting app?",
      answer:
        "You can get our gaming app, specially made for India, directly from our website. Just go to the Lotus Bets homepage and follow the instructions to download and install the app.",
    },
    {
      question: "What payment methods are available on Lotus Bets?",
      answer:
        "Lotus Bets supports several payment options including UPI, net banking, credit/debit cards, and popular e-wallets, making it easy and secure for Indian users to manage their funds.",
    },
    {
      question: "How long does it take for Lotus Bets to handle withdrawals?",
      answer:
        "We aim to process all withdrawals within 24 to 48 hours. However, the exact time may vary depending on the payment method chosen.",
    },
    {
      question: "Will my personal information be safe if I store it on Lotus Bets?",
      answer:
        "Absolutely. We use the latest encryption technologies to ensure that your personal and financial information is fully protected.",
    },
    {
      question: "Can I set limits on how much I can bet on my account?",
      answer:
        "Yes, as part of our commitment to responsible gaming, Lotus Bets allows users to set limits on deposits, betting amounts, and losses.",
    },
    {
      question: "Do you think you might have a problem with gambling? If so, what should you do?",
      answer:
        "If you're concerned about your gambling habits, we encourage you to reach out to professional support groups for gambling addiction. You can also contact our customer support team for help with responsible gaming tools on our platform.",
    },
  ];

  return (
    <div className="text-gray-800 text-sm leading-relaxed">
      {/* Guide Section */}
      <div className="bg-slate-50 px-6 py-2 mb-1 rounded shadow">
        <div
          className="flex justify-between items-center mb-3 cursor-pointer"
          onClick={toggleGuide}
        >
          <h2 className=" text-lg">
            Lotus Bets - Best Online Betting App in India
          </h2>
          {showGuide ? (
            <FaChevronUp className="text-gray-600" />
          ) : (
            <FaChevronDown className="text-gray-600" />
          )}
        </div>

        {showGuide && (
          <div className="space-y-6">
            {/* Guide Section */}
            <section>
              <h3 className="font-semibold text-base mb-1">Guide to Online Betting in India</h3>
              <p>
                Welcome to Lotus Bets, your trusted source for everything related to online betting in India!
                Whether you're new or experienced, our detailed guide will help you find the best betting apps,
                understand different types of bets, and gamble responsibly.
              </p>
            </section>

            {/* Responsible Gambling */}
            <section>
              <h3 className="font-semibold text-base mb-1">How to Play Gambling Games Advisably</h3>
              <ul className="list-decimal list-inside space-y-1">
                <li>Set a budget and stick to it.</li>
                <li>Know your limits and never bet more than you can afford to lose.</li>
                <li>Don’t chase losses—accept them and move on.</li>
                <li>Stay informed—research before betting.</li>
                <li>Take regular breaks to maintain perspective.</li>
                <li>Seek professional help if needed.</li>
              </ul>
            </section>

            {/* Benefits */}
            <section>
              <h3 className="font-semibold text-base mb-1">Why Using Lotus Bets is a Good Idea</h3>
              <ul className="list-disc list-inside space-y-1">
                <li>User-friendly interface for beginners and pros.</li>
                <li>Wide variety of betting options, including Indian card games and global sports.</li>
                <li>Competitive odds offering better returns.</li>
                <li>Secure and fast transactions via trusted methods.</li>
                <li>24/7 customer support to assist anytime.</li>
                <li>Ongoing promotions and special offers.</li>
                <li>Fully mobile-compatible for Android and iOS devices.</li>
              </ul>
            </section>

            {/* Conclusion */}
            <section>
              <h3 className="font-semibold text-base mb-1">Conclusion</h3>
              <p>
                Online betting can be fun and rewarding with the right mindset. Lotus Bets ensures a safe, honest,
                and exciting platform for everyone. From Indian classics to international games, there's something
                for all.
              </p>
              <p className="mt-2 font-semibold">
                Download the Lotus Bets India app today and start your journey!
              </p>
            </section>
          </div>
        )}
      </div>

      {/* FAQs Section */}
      <div className="bg-slate-50 px-6 py-2 rounded shadow mb-6">
        <div
          className="flex justify-between items-center mb-4 cursor-pointer"
          onClick={toggleFAQ}
        >
          <h2 className="text-lg">FAQs About Betting Online in India</h2>
          {showFAQ ? (
            <FaChevronUp className="text-gray-600" />
          ) : (
            <FaChevronDown className="text-gray-600" />
          )}
        </div>

        {showFAQ && (
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div key={index}>
                <p className="font-semibold">{faq.question}</p>
                <p className="text-gray-700">{faq.answer}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Lastcomponenet;

