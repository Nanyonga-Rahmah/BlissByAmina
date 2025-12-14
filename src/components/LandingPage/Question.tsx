import { Button } from "../ui/button"

function Question() {
  return (
    <div className="flex  flex-col items-center justify-center gap-6 bg-[#FFF8F0] bg-[url(/images/question.webp)] bg-cover py-20 px-4 text-center">
        <h3 className="font-bold text-[50px] text-white">Ready for your new look?</h3>
        <p>Book your appointment or shop accessories now.</p>
      <div className="flex items-center 
      ">
        <Button className="uppercase">Book Now</Button>
        <Button className="uppercase">Shop Today</Button>
      </div>
    </div>
  )
}

export default Question
