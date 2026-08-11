import React from 'react';
import ScrollReveal from '../components/ScrollReveal';
import SEO from '../components/SEO';

// Hero Assets
import herobg from '../assets/ParkRuleImages/herobg.png';

// Swimwear Guidelines Images (Bottom Section)
import allowedSwimwearImg from '../assets/ParkRuleImages/allowed.png';
import notAllowedSwimwearImg from '../assets/ParkRuleImages/notallowed.png';

export default function ParkRules() {
  return (
    <div className="w-full font-sans pb-0 overflow-x-hidden bg-white">
      <SEO pageSlug="park-rules" defaultTitle="Park Rules | Murjan Splash Park" defaultDescription="Please review our park rules before your visit." />

      {/* SECTION 1: HERO AREA */}
      <section className="relative w-full flex justify-center items-center bg-[#F4FCFE] min-h-[280px] sm:min-h-[340px]">
        <img
          src={herobg}
          alt="Park Rules Hero Background"
          className="absolute inset-0 w-full h-full object-cover block"
        />

        {/* Text Overlay centered over hero image */}
        <div className="relative z-10 w-full max-w-4xl px-4 py-12 flex flex-col items-center text-center">
          <ScrollReveal animation="zoom-in" delay={100} className="flex flex-col items-center">
            
            {/* Search/Info Circular Icon */}
            <div className="w-12 h-12 rounded-full bg-[#D5F5FA] flex items-center justify-center mb-3 shadow-md">
              <svg className="w-6 h-6 text-[#00BCDE]" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>

            <h1 className="text-7xl sm:text-8xl lg:text-9xl font-black text-[#00BCDE] tracking-tight mb-3 drop-shadow-[0_2px_4px_rgba(255,255,255,0.9)]">
              Park Rules & Regulations
            </h1>

            {/* Subtitle Paragraph */}
            <p className="text-xs sm:text-sm md:text-base text-gray-700 max-w-2xl font-medium leading-relaxed drop-shadow-[0_1px_2px_rgba(255,255,255,0.8)]">
              Parents and guardians, please read the signboards and explain them to your children. 
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* SECTION 2: EXACT RULES & REGULATIONS FROM SIGNBOARD (BILINGUAL) */}
      <section className="relative w-full px-4 sm:px-8 py-10 sm:py-16 bg-[#F4FCFE] flex flex-col items-center">
        <div className="max-w-5xl w-full bg-white rounded-3xl p-6 sm:p-10 shadow-sm border border-cyan-100/60">
          
          <ScrollReveal animation="fade-up" delay={100}>
            <h2 className="text-2xl sm:text-3xl font-bold text-[#00BCDE] mb-2">
              Park Rules & Regulations
            </h2>
            <p className="text-sm sm:text-base text-gray-700 font-medium mb-6">
Your safety and enjoyment are our top priorities.            </p>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 text-sm sm:text-base leading-relaxed">
            
            {/* ENGLISH COLUMN */}
            <ScrollReveal animation="fade-right" delay={150} className="flex flex-col text-left">
              <p className="text-[#FF4D8D] font-bold mb-4">
                The following rules are a condition of entry:
              </p>
              <ul className="list-disc pl-5 space-y-2.5 text-gray-800">
                <li>Entrance fee for ADULTS is 40 and CHILDREN is AED 85.</li>
                <li>Children below 2 years old or 0.75 cm and below are FREE.</li>
                <li>Children under 13 years of age must be accompanied by an adult. NO ADULT NO ENTRY.</li>
                <li>Appropriate swimwear must be worn at all times (no street clothing, underwear, all adults need to wear a rash guard or T-Shirt and ladies need to wear swim shorts or leggings, men without T-shirt not allowed also women with Bikini not allowed).</li>
                <li>Children of Diaper age need to wear Waterproof Diapers, regular diapers are not permitted in any of our pools or attractions. Waterproof Diapers are available in our retail outlet.</li>
                <li>Locker rental is available for your convenience; please do not leave valuables unattended.</li>
                <li>Murjan Splash Park accepts no responsibility for any loss or damage of personal items.</li>
                <li>Strictly No Outside Food & Beverages or any glass items are allowed to be brought inside the park. You can deposit your food at the Murjan entrance and can only collect it when go home.</li>
                <li>No Smoking inside Murjan Splash Park.</li>
                <li>No Fighting or Abusive language.</li>
                <li>No Running or Diving.</li>
                <li>No unruly behaviour or Horseplay.</li>
                <li>No Queue Jumping.</li>
              </ul>
            </ScrollReveal>

            {/* ARABIC COLUMN (RTL) */}
            <ScrollReveal animation="fade-left" delay={200} className="flex flex-col text-right dir-rtl" dir="rtl">
              <p className="text-[#FF4D8D] font-bold mb-4">
                من أجل الاستمتاع بأجمل الأوقات وبإتباعك للقواعد العامة للمنتزه, سوف تساعدنا في جهودنا في الحفاظ على حديقة نظيفة، وصحية، وممتعة.
              </p>
              <p className="font-semibold text-gray-800 mb-2">لذلك يرجى اتباع القواعد الاتيه :</p>
              
              <ul className="list-none space-y-2 text-gray-800 pr-0">
                <li>رسوم الدخول للبالغين 40 درهم, وللأطفال 85 درهم.</li>
                <li>الأطفال الذين يقل طولهم عن 0.75 متر الدخول مجاني.</li>
                <li>الأطفال دون عمر (13) عاما يجب أن يكونوا برفقة شخص بالغ .</li>
                <li className="font-bold text-[#FF4D8D]">تقع مسؤولية الاطفال علي عاتق ذويهم.</li>
                <li>إدارة الحديقة غير مسؤولة عن أي مفقودات أو أضرار او اصابات ناتجه عن عدم اتباع تعليمات الامن والسلامة الخاصة بالحديقة.</li>
                <li>يتوفر خزائن بالإيجار لوضع الاغراض والممتلكات الشخصية.</li>
                <li>يتوفر حفاظات خاصه للماء داخل الحديقة عند منفذ البيع .</li>
                <li>الملابس الواجب ارتداؤها : كما هو موضح بالصورة .</li>
              </ul>

              <p className="font-semibold text-gray-800 mt-5 mb-2">
                نود اعلامكم بأنه يحظر الاتي في الحديقة الالعاب المائية:
              </p>
              
              <ul className="list-none space-y-1.5 text-gray-800 pr-0">
                <li>الأغذية والمشروبات الخارجية أو أي مواد زجاجية</li>
                <li>يمنع ارتداء الأطفال للحفاظات العادية داخل المياه</li>
                <li>التدخين بأنواعه .</li>
                <li>الجري أو الغوص او القفز.</li>
                <li>اي سلوك غير مناسب للعادات والتقاليد.</li>
                <li>ممنوع منعا باتا التقاط اي صور أو فيديوهات داخل حديقه مرجان للألعاب المائيه في اليوم المخصص للنساء .</li>
              </ul>

              <p className="font-bold text-[#00BCDE] mt-6 text-center">
                شاكرين لكم حسن تعاونكم
              </p>
            </ScrollReveal>

          </div>
        </div>
      </section>

      {/* SECTION 3: FULL-WIDTH SOLID CYAN WARNING BANNER */}
      <section className="w-full bg-[#00BCDE] py-6 px-4 text-center text-white flex flex-col items-center justify-center">
        <ScrollReveal animation="fade-up" delay={100} className="flex flex-col items-center max-w-3xl">
          <div className="w-6 h-6 rounded-full border-2 border-white flex items-center justify-center text-white font-bold text-xs mb-2">
            i
          </div>
          <p className="text-xs sm:text-sm font-semibold leading-relaxed">
            For the enjoyment of all our Guests, if any guest fails to adhere to the park rules, the guest may be asked to leave the park.
          </p>
        </ScrollReveal>
      </section>

      {/* SECTION 4: SWIMWEAR ALLOWED / NOT ALLOWED VISUAL GUIDE */}
      <section className="relative w-full px-4 sm:px-8 py-12 sm:py-16 bg-white flex justify-center">
        <div className="max-w-5xl w-full grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          
          {/* ALLOWED SWIMWEAR IMAGE */}
          <ScrollReveal animation="fade-up" delay={100} className="flex justify-center">
            <div className="w-full max-w-md bg-white rounded-xl overflow-hidden p-2">
              <img
                src={allowedSwimwearImg}
                alt="Allowed Adult Swimwear in the Pool"
                className="w-full h-auto object-contain"
              />
            </div>
          </ScrollReveal>

          {/* NOT ALLOWED SWIMWEAR IMAGE */}
          <ScrollReveal animation="fade-up" delay={200} className="flex justify-center">
            <div className="w-full max-w-md bg-white rounded-xl overflow-hidden p-2">
              <img
                src={notAllowedSwimwearImg}
                alt="Not Allowed Adult Swimwear in the Pool"
                className="w-full h-auto object-contain"
              />
            </div>
          </ScrollReveal>

        </div>
      </section>

    </div>
  );
}