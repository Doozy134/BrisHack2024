"use client";

import { getPostcode } from "@/app/lib/actions";
import { useFormState } from "react-dom";
import { Montserrat } from "next/font/google";
import { ArrowRightCircleIcon } from "@heroicons/react/24/outline";
const montserrat = Montserrat({ subsets: ["latin"] });


export default function Input(){
    const [state, dispatch] = useFormState(getPostcode, {});

    return (
            <>
                <form action={dispatch}>
                    <i className={`flex justify-left text-2xl font-semi-bold text-white mx-8 pt-3 ${montserrat.className}`}>Find out about another area:</i>
                    <input type="text" name="postcode" className="mx-8 my-2 pl-1 py-5 text-black border border-dark-green rounded-xl" placeholder="  Enter postcode" />
                    <button type="submit" className="text-black"><ArrowRightCircleIcon className="h-12 w-12 mz-3 text-green-300 hover:text-green-900" /></button>
                </form>

            <div className="flex flex-col items-left">
                {
                    state.error && <div className="flex justify-center pt-0 align-right text-sm text-red-300">{state.error}</div>
                }
            </div>
            </>
    );
}