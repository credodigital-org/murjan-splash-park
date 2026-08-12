import React from 'react';
import ScrollReveal from '../components/ScrollReveal';

// Hero Assets
import herobg from '../assets/ParkRuleImages/herobg.png';

// Swimwear Guidelines Images (Bottom Section)
import allowedSwimwearImg from '../assets/ParkRuleImages/allowed.png';
import notAllowedSwimwearImg from '../assets/ParkRuleImages/notallowed.png';

export default function ParkRules() {
  return (
    <div className="w-full font-sans pb-0 overflow-x-hidden bg-white">

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

      {/* SECTION 2: EXACT RULES & REGULATIONS FROM IMAGE */}
      <section className="relative w-full px-4 sm:px-8 py-10 sm:py-16 bg-[#F4FCFE] flex flex-col items-center">
        <div className="max-w-5xl w-full bg-[#F4FCFE] sm:bg-white rounded-3xl p-6 sm:p-12 shadow-sm border border-cyan-100/60">
          
          <ScrollReveal animation="fade-up" delay={100}>
            {/* Main Section Title */}
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#00BCDE] tracking-tight mb-4">
              Park Rules & Regulations
            </h2>
            
            {/* Sub-heading intro */}
            <p className="text-base sm:text-lg font-medium text-gray-800 mb-6">
              Parents and guardians, please read the sign boards and explain them to your children.
            </p>

            {/* Condition warning banner line */}
            <p className="text-[#FF4D8D] font-medium text-base sm:text-lg mb-6">
              The following rules are a condition of entry:
            </p>
          </ScrollReveal>

          {/* ENGLISH RULES LIST */}
          <ScrollReveal animation="fade-up" delay={150}>
            <ul className="list-disc pl-6 space-y-3 text-gray-800 text-sm sm:text-base leading-relaxed font-normal mb-16">
              <li>
                Entrance fee for ADULTS is 40 and CHILDREN is AED 85.
              </li>
              <li>
                Children below 2 years old or 0.75 cm and below are FREE.
              </li>
              <li>
                Children under 13 years of age must be accompanied by an adult. NO ADULT NO ENTRY.
              </li>
              <li>
                Appropriate swimwear must be worn at all times (no street clothing, underwear, all adults need to wear a rash guard or T-Shirt and ladies need to wear swim shorts or leggings,men without T-shirt not allowed also women with Bikini not allowed).
              </li>
              <li>
                Children of Diaper age need to wear Waterproof Diapers, regular diapers are not permitted in any of our pools or attractions. Waterproof Diapers are available in our retail outlet.
              </li>
              <li>
                Locker rental is available for your convenience; please do not leave valuables unattended.
              </li>
              <li>
                Murjan Splash Park accepts no responsibility for any loss or damage of personal items.
              </li>
              <li>
                Strictly No Outside Food & Beverages or any glass items are allowed to be brought inside the park. You can deposit your food at the Murjan entrance and can only collect it when go home.
              </li>
              <li>
                No Smoking inside Murjan Splash Park.
              </li>
              <li>
                No Fighting or Abusive language.
              </li>
              <li>
                No Running or Diving.
              </li>
              <li>
                No unruly behaviour or Horseplay.
              </li>
              <li>
                No Queue Jumping.
              </li>
            </ul>
          </ScrollReveal>

          {/* ARABIC RULES LIST (RIGHT-ALIGNED) */}
          <ScrollReveal animation="fade-up" delay={200} className="text-right" dir="rtl">
            <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2">
              قواعد وأنشطة الحديقة
            </h3>

            <p className="text-sm sm:text-base font-medium text-gray-800 mb-4">
              يرجى من أولياء الأمور والمرافقين قراءة اللوحات الإرشادية وشرحها لأطفالهم.
            </p>

            <p className="text-[#FF4D8D] font-medium text-sm sm:text-base mb-4">
              القواعد التالية هي شروط أساسية للدخول:
            </p>

            <ul className="list-none pr-0 space-y-3 text-gray-800 text-sm sm:text-base leading-relaxed font-normal">
  <li>
    رسوم الدخول للبالغين 40 درهماً إماراتياً، وللأطفال 85 درهماً إماراتياً.
  </li>
  <li>
    الدخول مجاني للأطفال دون عمر سنتين أو بطول 75 سم أو أقل.
  </li>
  <li>
    يجب أن يكون الأطفال دون سن 13 عاماً برفقة شخص بالغ، لا يُسمح بدخول البالغين دون أطفال.
  </li>
  <li>
    يجب ارتداء ملابس سباحة مناسبة في جميع الأوقات. لا يُسمح بارتداء ملابس الشارع أو الملابس الداخلية. يجب على جميع البالغين ارتداء واقي سباحة (Rash Guard) أو قميص سباحة، كما يُسمح للسيدات بارتداء ملابس سباحة محتشمة أو ليجنز بطول ثلاثة أرباع. لا يُسمح بارتداء ملابس السباحة ذات طراز البيكيني.
  </li>
  <li>
    يجب على الأطفال في سن الحفاض ارتداء حفاضات سباحة مقاومة للماء. لا يُسمح باستخدام الحفاضات العادية في أي من المسباح أو الألعاب المائية. تتوفر حفاضات السباحة المقاومة للماء للشراء من منفذ البيع لدينا.
  </li>
  <li>
    تتوفر خزائن لحفظ الأغراض لراحتكم. يرجى عدم ترك الأغراض الثمينة دون مراقبة.
  </li>
  <li>
    لا تتحمل حديقة مرجان المائية (Murjan Splash Park) أي مسؤولية عن فقدان أو تلف الأغراض الشخصية.
  </li>
  <li>
    يُمنع منعاً باتاً إدخال الأطعمة والمشروبات من الخارج أو أي مواد زجاجية إلى داخل الحديقة. يمكن إيداع الأطعمة عند مدخل حديقة مرجان واستلامها عند المغادرة.
  </li>
  <li>
    يُمنع التدخين داخل حديقة مرجان المائية.
  </li>
  <li>
    يُمنع الشجار أو استخدام الألفاظ المسيئة.
  </li>
  <li>
    يُمنع الركض أو الغوص.
  </li>
  <li>
    يُمنع السلوك غير اللائق أو اللعب العنيف.
  </li>
  <li>
    يُمنع تجاوز دورك في طوابير الانتظار.
  </li>
</ul>

            <p className="text-xs sm:text-sm text-gray-500 mt-8">
              العبارة الموجودة أسفل القواعد
            </p>
          </ScrollReveal>

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