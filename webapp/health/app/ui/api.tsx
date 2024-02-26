import { Montserrat } from "next/font/google";
import { fetchNames } from "../lib/apiInteface";
import { getAirQualityIndex } from "../lib/apiInteface";

const montserrat = Montserrat({ subsets: ["latin"] });

async function FacilityList({ postcode, search, title }: { postcode: string, search: string, title: string }) {
    const facilities = await fetchNames(search, postcode, 500);
    if (facilities == "nothing") {
        return (<div>No results.</div>)
    }

    return (
        <div className="text-black">
            <h1 className="text-gray-800 font-semibold text-[17px]">{title} ({facilities.length})</h1>
            {facilities.map((x: any, i: number) => {
                return <div key={i}><a className="text-gray-700 hover:text-gray-800 hover:underline" href={x["websiteUri"]}>{x["displayName"]["text"]}</a></div>
            })}
        </div>
    );
}

export default async function Location({ postcode }: { postcode: string }) {
    const airPolData = await getAirQualityIndex("BS14HJ");
    let index = (airPolData["indexes"])[1]["aqi"];
    console.log(index);
    return (
        <>
            <div className="bg-white w-full flex justify-around">
                <h1 className={`text-dark-green font-semibold text-xl ${montserrat.className}`}>Local health facilities</h1>
            </div>
            <div className="bg-white grid grid-cols-4 p-5">
                <FacilityList postcode={postcode} search="gym" title="Gyms" />
                <FacilityList postcode={postcode} search="hospital" title="Hospitals" />
                <FacilityList postcode={postcode} search="pharmacy" title="Pharmacies" />
                <FacilityList postcode={postcode} search="gp" title="GPs" />
            </div>
        </>
    );
}
