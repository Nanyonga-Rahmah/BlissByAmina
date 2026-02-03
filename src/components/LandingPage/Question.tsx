import { Button } from "../ui/button"

function Question() {
  return (
    <div className="flex my-20  md:mx-16 mx-5 rounded-[40px] md:h-[500px] flex-col items-center justify-center gap-6 text-white bg-[#FFF8F0] bg-[url(/images/question.webp)] bg-center bg-cover py-20 px-4 text-center">
        <h3 className="font-bold md:text-[50px] text-xl">Ready for your new look?</h3>
        <p className="text-[15px] md:text-lg">Book your appointment or shop accessories now.</p>
      <div className="flex md:flex-row flex-col items-center gap-5 
      ">
        <Button className="uppercase rounded-full font-medium text-lg py-6 px-5 bg-white text-black">Book Now</Button>
        <Button variant={"outline"} className="uppercase rounded-full px-5 py-6 border bg-transparent font-medium text-lg border-[#FFFFFF] text-white">Shop Today</Button>
      </div>
    </div>
  )
}

export default Question
