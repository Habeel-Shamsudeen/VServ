import { CarouselPlugin } from "./carousel-plugin";

export default function Quote(){
    return (<div className="bg-slate-100 h-screen">
      <div className="flex  flex-col justify-center items-center align-middle">
        <div className="p-4 max-w-xl">
            <CarouselPlugin/>
        </div>
        <div>
        <div className="max-w-lg p-2 text-xl font-bold">
        &quot;The customer service i receiced was exceptional. The support team
          went adove and beyond to address my concerns.&quot;
        </div>
        <div className="max-w-md text-lg text-start font-semibold mt-2">
          John Doe
        </div>
        <div className="max-w-md text-sm font-light text-slate-500">
          CEO | VSMS
        </div>
        </div>
      </div>
    </div>)
}

