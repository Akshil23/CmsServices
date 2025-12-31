import React, { useMemo, useState } from "react";
import "../../styles/pages/faq.css";

interface FAQItem {
  question: string;
  answer: string;
}
const faqs: FAQItem[] = [
  {
    question: "What services does CMS Services provide?",
    answer:
      "CMS Services provides professional tax filing, bookkeeping, payroll, and immigration-related administrative support services across Canada. We assist individuals, students, self-employed professionals, and small businesses."
  },
  {
    question: "When is the Deadline for Tax filing?",
    answer:
      "The deadline to file personal income tax returns in Canada is April 30 each year. For self-employed individuals, the filing deadline is June 15, but any taxes owed must still be paid by April 30 to avoid interest."
  },
  {
    question: "Do you handle self-employed and gig worker taxes?",
    answer:
      "Yes. We specialize in tax filing for self-employed individuals and gig workers such as Uber, Lyft, SkipTheDishes, Instacart, freelancers, and contractors."
  },
  {
    question: "Can CMS Services help with CRA My Account setup?",
    answer:
      "Yes. We assist with CRA My Account registration, login recovery, direct deposit setup, and CRA correspondence when properly authorized."
  },
  {
    question: "Do you offer bookkeeping and payroll services?",
    answer:
      "Yes. We provide monthly bookkeeping, payroll processing, T4/T4A preparation, and CRA remittances for small businesses and corporations."
  },
  {
    question: "Do you provide immigration services?",
    answer:
      "We provide immigration-related administrative and documentation support, including form preparation and document review. We do not provide legal advice unless working with a licensed professional."
  },
  {
    question: "Is it mandatory to file taxes if I had no income?",
    answer:
"While not mandatory, filing is highly recommended because it allows you to:Receive GST/HST credits, Maintain eligibility for government benefits and Carry forward tuition credits"  
},
  {
    question: "Do you offer online and in-person services?",
    answer:
      "Yes. We offer both online and in-person services across Canada for maximum convenience."
  }, 
  {
    question: "What is the Welcome Tax Benefit for Newcomers?",
    answer:"The Welcome Tax Benefit is a program designed to help newcomers to Canada with their tax filing. It provides a refund of up to $1,000 for eligible individuals who file their taxes for the first time in Canada."
  },
  {
    question: "How much do I get back as a newcomer?",
    answer:  "You can get back up to $2,000 through the Welcome Tax Benefit if you are a newcomer to Canada and file your taxes for the first time."  },

{
    question: "how long does it take to file my taxes?",
    answer: "It typically takes 2-3 business days to file your taxes with CMS Services, depending on the complexity of your tax situation and the volume of submissions we are handling at the time."
},
{
    question: "Can I visit back home while on applied status PGWP?",
    answer: "Yes, you can visit back home while on applied status PGWP, but it is important to ensure that you have the necessary documentation to re-enter Canada. This may include a valid passport, a copy of your PGWP application receipt, and a TRV Visa stamp. Let us know if you want to check if you are eligible"
},
{
    question: "Can I apply for PGWP after my study permit expires?",
    answer: "No, you will need to restore your status first as a Student and then you can apply for a PGWP within 180 days of completing your program."
},
{
    question: " Can i apply for a Trv Stamp and return to Canada while my PGWP is being processed?",
    answer: "Yes, you can apply for a TRV stamp and return to Canada while your PGWP application is being processed. However, it is important to ensure that you have all the necessary documentation and meet the requirements for re-entry into Canada."
},
{
    question: " Am i eligible. for CWB as a newcomer?",
    answer: "Yes, as a newcomer to Canada, you may be eligible for the Canada Workers Benefit (CWB) if you meet the income and other eligibility criteria set by the government."

    },
    {
        question: "What documents are required for tax filing as a newcomer?",
        answer: "As a newcomer to Canada, you will typically need the following documents for tax filing: Social Insurance Number (SIN, Passport or PR card, T4 slips from employers, Receipts for any expenses or credits you plan to claim, Bank statements showing income and expenses"
    },
    {
        question: "What is the processing time to get my tax refund?",
        answer: "Federal Tax refunds are typically processed within 2 weeks of Filing, However, the benefits payment may take upto 3-4 months to start after the world income is declared by the client"
    },
    { 
        question: "What is my TFSA contribution limit?",
        answer: "The TFSA contribution limit for 2024 is $6,500. If you have never contributed to a TFSA before, your total contribution room would be $88,000 as of 2024, which includes all previous years since the TFSA was introduced in 2009."
    },
    {
        question: "What is my RRSP contribution limit?",
        answer: "Your RRSP contribution limit for 2024 is 18% of your earned income from the previous year, up to a maximum of $31,560. You can find your exact contribution limit on your latest Notice of Assessment from the CRA."
    },
    {
        question: "What is my Fhsa contribution limit?",
        answer: "The FHSA contribution limit for 2024 is $8,000 per year, with a lifetime contribution limit of $40,000. Contributions can be made until the end of the year in which you turn 71."
    },
    {
        question: "Can I file taxes for previous years as a newcomer?",
        answer: "Yes, you can file taxes for previous years as a newcomer to Canada. It is recommended to file for at least the past three years to ensure you receive any benefits or credits you may be eligible for."
    },
    {
        question: "Do you offer tax filing services for international students?",
        answer: "Yes, we offer tax filing services specifically tailored for international students in Canada. We help you navigate the tax system and ensure you claim all eligible credits and benefits.",
    
    },
    {
    
        question: "Can I claim moving expenses as a newcomer?",
        answer: "Yes, as a newcomer to Canada, you may be able to claim moving expenses if you moved at least 40 kilometers closer to your new job or educational institution. Eligible expenses include transportation, storage, and temporary living costs."
    
    },
    {
        question: "How can I contact CMS Services for tax filing assistance?",
        answer: "You can contact CMS Services for tax filing assistance by visiting our website and filling out the contact form, calling our customer service hotline, or visiting one of our office locations in person." 
    },
    {
        question: "What payment methods do you accept for tax filing services?",
        answer: "We accept various payment methods for our tax filing services, including credit/debit cards, e-transfers, and cash payments at our office locations."   
    },
    {
        question: "Do you offer any discounts or promotions for tax filing services?",
        answer: "Yes, we occasionally offer discounts and promotions for our tax filing services. Please check our website or contact us directly for information on current offers."   
    },
    {
        question: "How to claim newcomer bonus?",
        answer: "To claim the newcomer bonus, you need to file your tax return and ensure that you indicate your newcomer status. You may be eligible for various credits and benefits, so it's important to provide accurate information on your tax return."},

    {
        question: "What is the carbon tax rebate for newcomers?",
        answer: "The carbon tax rebate, also known as the Climate Action Incentive, is a payment provided to residents of provinces where the federal carbon pricing system applies. Newcomers who file their taxes may be eligible to receive this rebate based on their income and family size."
    },
    {question: "Can I get GST/HST credit as a newcomer?",
    answer: "Yes, as a newcomer to Canada, you may be eligible for the GST/HST credit if you meet the income and residency requirements. This credit is designed to help offset the cost of GST/HST paid on goods and services."
    },
    {
        question: "How do I track my tax refund status?",
        answer: "You can track your tax refund status by logging into your CRA My Account online. This platform provides real-time updates on the status of your tax return and refund."
    },
    {
        question: "Did government stop Canada Carbon Rebate?",
        answer: "Yes, Starting from 2024, the federal government has discontinued the Climate Action Incentive payments, commonly known as the carbon tax rebate. However, some provinces may have their own programs in place."
    },
    {
        question: "What is the Ontario Trillium Benefit (OTB)?",
        answer: "The Ontario Trillium Benefit (OTB) is a payment that combines the Ontario Energy and Property Tax Credit, the Northern Ontario Energy Credit, and the Ontario Sales Tax Credit. It is designed to help low-to-moderate income individuals and families with energy costs and property taxes."

    },
    {
        question: "How can I maximize my tax refund as a newcomer?",    
        answer: "To maximize your tax refund as a newcomer, ensure you claim all eligible credits and deductions, keep accurate records of your income and expenses, and consider consulting with a tax professional who specializes in newcomer tax situations."
    },
    {
        question: "How can i create a CRA My Account?",
        answer: "To create a CRA My Account, visit the CRA website and follow the registration process. You will need to provide personal information, including your Social Insurance Number (SIN), date of birth, and postal code. You may also need to verify your identity using information from your tax return."
    },
    {
        question: "Do you get 15% of tuition back in Canada?",
        answer: "Yes, in Canada, you can claim a non-refundable tax credit of 15% on eligible tuition fees paid for post-secondary education. This credit can help reduce the amount of income tax you owe."
    },

    {
        question: "Apply for Spouse open Work permit eligibility?",
        answer: "To be eligible for a Spousal Open Work Permit in Canada, your spouse must be a Canadian citizen or permanent resident, and you must be legally married or in a common-law relationship. You will also need to meet certain health and character requirements."}
  ,
  {
    question: "Completed One Course from a College, and completed 1 year program from a University, What is the Language Proficiency requirement for PGWP?",
    answer: "You will need to demonstrate language proficiency in English/ french by CLB 7 or more through approved language tests like IELTS, CELPIP for English, or TEF for French."
  },
  {
    question: "Can I apply for PGWP if my study program was less than 8 months?",
    answer: "No, to be eligible for a Post-Graduation Work Permit (PGWP) in Canada, your study program must be at least 8 months long and completed at a designated learning institution (DLI)."        

  },
  {
    question: "Do i need a medical exam for PGWP application to work in medical field?",
    answer:"If you intend to work in the medical field after obtaining your pgwp, and you are applying from within Canada, you generally do not need a medical exam specifically for the PGWP application. However, certain healthcare positions may require a medical exam as part of the employment process or licensing requirements."

  },
  {
    question: "Can I extend my PGWP?",
    answer: "No, the Post-Graduation Work Permit (PGWP) cannot be extended. It is issued for a specific duration based on the length of your study program, up to a maximum of three years. Once your PGWP expires, you will need to explore other immigration options if you wish to remain in Canada."

  },
  {
    question: "Can I apply for permanent residency while on a PGWP?",
    answer: "Yes, you can apply for permanent residency while on a Post-Graduation Work Permit (PGWP). Many international graduates use their PGWP experience to qualify for permanent residency through programs like the Canadian Experience Class (CEC) under the Express Entry system."
  },
  {
    question: "What happens if my PGWP application is refused?",
    answer: "If your Post-Graduation Work Permit (PGWP) application is refused, you will receive a letter from Immigration, Refugees and Citizenship Canada (IRCC) explaining the reasons for the refusal."
  },
  {
    question: "Can I switch employers while on a PGWP?",
    answer: "Yes, you can switch employers while on a Post-Graduation Work Permit (PGWP). The PGWP allows you to work for any employer in Canada without the need for a Labour Market Impact Assessment (LMIA) or a job-specific work permit."  
  },
  {
    question: "Can I apply for a study permit while on a PGWP?",
    answer: "Yes, you can apply for a study permit while on a Post-Graduation Work Permit (PGWP). If you decide to pursue further studies in Canada, you will need to meet the eligibility requirements for a study permit and submit a new application."
  },
  {
    question: "Is rescheduling Us Visa appointment legal?",
    answer: "Yes, rescheduling a US visa appointment is legal and can be done through the official US Department of State website or the US embassy/consulate where you scheduled your appointment. It is important to follow the proper procedures and guidelines provided by the embassy or consulate."
  },
  {
    question: "Can I apply for a US visa from Canada as a temporary resident?",
    answer: "Yes, as a temporary resident in Canada, you can apply for a US visa at a US embassy or consulate in Canada. You will need to meet the eligibility requirements for the specific type of visa you are applying for and provide the necessary documentation."
  },
  {
    question: "Funds requirement to extend study permit in Canada?",
    answer: "To extend your study permit in Canada, you need to demonstrate that you have sufficient funds to cover your tuition fees, living expenses, and return transportation. The general guideline is to show at least CAD 10,000 per year for living expenses, in addition to your tuition fees."
  },
{
    question: "Can I work while my study permit extension is being processed?",
    answer: "Yes, if you have applied to extend your study permit before it expires, you can continue to work under the same conditions as your original study permit while your extension application is being processed. This is known as implied status."
  },
{
    question:" Can I work after 6 month completed of applying for my pgwp?",
    answer: "Yes, once you have applied for your Post-Graduation Work Permit (PGWP) and have completed six months since the application date, you are eligible to work full-time in Canada while waiting for your PGWP to be processed."
},
];
const getCategory = (question: string): string => {
  const q = question.toLowerCase();

  if (q.includes("pgwp") || q.includes("study") || q.includes("permit"))
    return "PGWP & Study Permit";

  if (q.includes("visa") || q.includes("trv") || q.includes("immigration"))
    return "Immigration & Visas";

  if (
    q.includes("tfsa") ||
    q.includes("rrsp") ||
    q.includes("fhsa") ||
    q.includes("credit")
  )
    return "Credits & Savings";

  if (
    q.includes("gst") ||
    q.includes("refund") ||
    q.includes("rebate") ||
    q.includes("benefit")
  )
    return "Refunds & Benefits";

  if (
    q.includes("tax") ||
    q.includes("cra") ||
    q.includes("file") ||
    q.includes("income")
  )
    return "Tax Filing";

  return "General";
};

/* ===================== COMPONENT ===================== */
const FaqSection: React.FC = () => {
  const [search, setSearch] = useState("");

  /* SEARCH FILTER */
  const filteredFaqs = useMemo(() => {
    if (!search.trim()) return faqs;
    return faqs.filter(
      (faq) =>
        faq.question.toLowerCase().includes(search.toLowerCase()) ||
        faq.answer.toLowerCase().includes(search.toLowerCase())
    );
  }, [search]);

  /* GROUPED FAQS */
  const groupedFaqs = useMemo(() => {
    return filteredFaqs.reduce<Record<string, FAQItem[]>>((acc, faq) => {
      const category = getCategory(faq.question);
      acc[category] = acc[category] || [];
      acc[category].push(faq);
      return acc;
    }, {});
  }, [filteredFaqs]);

  return (
    <section id="faq" className="faq-wrapper">
      <h2 className="faq-title">
        Tax Filing FAQ – Canada | CMS Services
      </h2>

      {/* SEARCH */}
      <div className="faq-search">
        <input
          type="text"
          placeholder="Search tax, refund, PGWP, CRA, newcomer..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* QUICK NAVIGATION */}
      {!search && (
        <nav className="faq-toc">
          <h3>Quick Navigation</h3>
          {Object.keys(groupedFaqs).map((category) => (
            <div key={category} className="faq-toc-group">
              <h4>{category}</h4>
              <ul>
                {groupedFaqs[category].map((faq, index) => (
                  <li key={index}>
                    <a href={`#faq-${category}-${index}`}>
                      {faq.question}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </nav>
      )}

      {/* FAQ CONTENT */}
      {Object.entries(groupedFaqs).map(([category, items]) => (
        <div key={category} className="faq-category">
          <h3 className="faq-category-title">{category}</h3>

          {items.map((faq, index) => (
            <details
              key={index}
              id={`faq-${category}-${index}`}
              className="faq-item"
            >
              <summary>{faq.question}</summary>
              <p>{faq.answer}</p>
            </details>
          ))}
        </div>
      ))}

      {/* NO RESULTS */}
      {filteredFaqs.length === 0 && (
        <p className="faq-no-results">
          No matching questions found.
        </p>
      )}

      {/* SEO FAQ SCHEMA */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: faqs.map((faq) => ({
              "@type": "Question",
              name: faq.question,
              acceptedAnswer: {
                "@type": "Answer",
                text: faq.answer
              }
            }))
          })
        }}
      />
    </section>
  );
};

export default FaqSection;