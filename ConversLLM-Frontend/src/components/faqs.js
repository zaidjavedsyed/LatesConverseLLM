"use client";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import "@/styles/globals.css";

const faqs = [
  {
    question:
      "Is there a demo available for testing the chatbot on the ConverseLLM website?",
    answer:
      "Yes, you can try out the demo. The demo bot is trained on various website content, allowing you to ask questions related to websites for accurate answers.",
  },
  {
    question: "How can I effectively train the chatbot using a website link?",
    answer:
      "Train the chatbot by providing a website link . Simply input a URL, and the chatbot will learn from all the content on that page.",
  },
  {
    question:
      "What is the typical duration for training the chatbot based on the number of pages being trained?",
    answer:
      "The training time varies based on the number of pages being trained, but usually completes within a few minutes.",
  },
  {
    question:
      "What kinds of content are suitable for training the chatbot to enhance its ability to respond to queries?",
    answer:
      "Any type of content can be used to train the chatbot. The more diverse the content, the better the chatbot's ability to respond to queries.",
  },
  {
    question:
      "Can the chatbot be integrated across multiple websites to engage visitors effectively?",
    answer:
      "Yes, you can embed the chatbot on numerous websites to engage visitors across various platforms.",
  },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function FAQ_E() {
  return (
    <section className="pt-28 pb-16 bg-white dark:bg-slate-900">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h2 className="text-5xl text-center text-gray-900 dark:text-white leading-[3.25rem]">
            Frequently Asked Questions
          </h2>
          <div className="text-lg mb-4 py-4 text-center text-gray-600 dark:text-gray-300">
            <p className="text-lg text-gray-500 dark:text-gray-400 max-w-md md:max-w-2xl mx-auto">
              Here are a few of the questions we get the most. If you don't see
              what's on your mind, reach out to us anytime on email.
            </p>
          </div>
        </div>
        <div className="accordion-group" data-accordion="default-accordion">
          <div className="accordion" id="basic-heading-one-with-icon">
            <Accordion>
              {faqs.map((faq, index) => (
                <AccordionItem
                  key={index}
                  value={`item-${index}`}
                  className="border border-solid border-gray-300 dark:border-gray-600 px-5 py-2 rounded-xl transition duration-500 accordion-active:bg-indigo-50 dark:accordion-active:bg-slate-800 accordion-active:border-indigo-600 dark:accordion-active:border-indigo-400 mb-6 bg-white dark:bg-slate-800"
                >
                  <AccordionTrigger className="text-lg hover:text-indigo-600 dark:hover:text-indigo-400 text-gray-900 dark:text-white">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-lg text-gray-500 dark:text-gray-300">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </div>
    </section>
  );
}

{
  /* // <div class="bg-white">
// <div class="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:py-20 lg:px-8">
//   <div class="lg:grid lg:grid-cols-3 lg:gap-8">
//     <div>
//     <h2 */
}
{
  /* //       class="text-4xl font-manrope text-center font-bold text-gray-900 leading-[3.25rem]"
//     >
//       Frequently asked questions
//     </h2> */
}
//       <p class="mt-4 text-lg text-gray-500">
//         Can’t find the answer you’re looking for? Reach out to our{" "}
//         <a
//           href="#"
//           class="font-medium text-indigo-600 hover:text-indigo-500"
//         >
//           customer support
//         </a>{" "}
//         team.
//       </p>
//     </div>
//     <div class="mt-12 lg:mt-0 lg:col-span-2">
//       <dl class="space-y-12">
//         <Accordion>
//           {faqs.map((faq, index) => (
//             <AccordionItem key={index} value={`item-${index}`}>
//               <AccordionTrigger>{faq.question}</AccordionTrigger>
//               <AccordionContent>{faq.answer}</AccordionContent>
//             </AccordionItem>
//           ))}
//         </Accordion>
//       </dl>
//     </div>
//   </div>
// </div>
// </div>

// <svg
//                 class="w-6 h-6 text-gray-900 transition duration-500 block accordion-active:text-indigo-600 accordion-active:hidden group-hover:text-indigo-600 origin-center"
//                 viewBox="0 0 24 24"
//                 fill="none"
//                 xmlns="http://www.w3.org/2000/svg"
//               >
//                 <path
//                   d="M6 12H18M12 18V6"
//                   stroke="currentColor"
//                   stroke-width="1.6"
//                   stroke-linecap="round"
//                   stroke-linejoin="round"
//                 ></path>
//               </svg>
//               <svg
//                 class="w-6 h-6 text-gray-900 transition duration-500 hidden accordion-active:text-indigo-600 accordion-active:block group-hover:text-indigo-600"
//                 viewBox="0 0 24 24"
//                 fill="none"
//                 xmlns="http://www.w3.org/2000/svg"
//               >
//                 <path
//                   d="M6 12H18"
//                   stroke="currentColor"
//                   stroke-width="1.6"
//                   stroke-linecap="round"
//                   stroke-linejoin="round"
//                 ></path>
//               </svg>
//             </button>
