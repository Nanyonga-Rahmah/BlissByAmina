import type { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

const AuthLayout = ({ children }: Props) => {
  return (
    <div className="relative w-screen h-screen">
      <img
        src="/images/hero.png"
        alt="Hero background"
        className="absolute top-0 left-0 w-full h-full object-cover"
      />

      <section className="relative z-10 bg-white rounded-2xl shadow-2xl w-[90%] md:w-[500px] p-6 flex flex-col justify-center h-auto top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
        {children}
      </section>
    </div>
  );
};

export default AuthLayout;
