export default function HeroBanner() {
  const items = [
    "1000+ Stunning Styles ✨",
    "18 cities across Sweden ✨",
    "4.9★ Reviews ✨",
    "Styled With Love ✨",
  ];

  return (
    <div className="w-full bg-[#F4F4F5D9] py-6 my-4 overflow-hidden">
      <div className="flex whitespace-nowrap animate-marquee">
        {/* Original items */}
        {items.map((item, index) => (
          <span key={index} className="font-medium text-lg mr-10">
            {item}
          </span>
        ))}
        {/* Duplicate items for seamless scroll */}
        {items.map((item, index) => (
          <span key={index + items.length} className="font-medium text-lg mr-10">
            {item}
          </span>
        ))}
         {items.map((item, index) => (
          <span key={index + items.length} className="font-medium text-lg mr-10">
            {item}
          </span>
        ))}
         {items.map((item, index) => (
          <span key={index + items.length} className="font-medium text-lg mr-10">
            {item}
          </span>
        ))}
      </div>

      <style>
        {`
          .animate-marquee {
            display: flex;
            animation: marquee 8s linear infinite;
          }

          @keyframes marquee {
            0% { transform: translateX(0); }
            100% { transform: translateX(-100%); } 
          }
        `}
      </style>
    </div>
  );
}
