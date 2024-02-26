import { Suspense } from "react";
import { Score, getScores } from "../lib/score";
import { Montserrat } from "next/font/google";
const montserrat = Montserrat({ subsets: ["latin"] });
import { england_data } from "../lib/default-data";

import { useState } from "react";
import { Keys } from "../lib/default-data";
const Plot = dynamic(() => import("react-plotly.js"), { ssr: false, })
import dynamic from "next/dynamic";
import { yearlyEngValues, yearlyLADValues } from "../lib/graphs";

export default function Page({ params }: { params: { lad: string } }) {
    return (
        <Suspense fallback={<p>Loading...</p>}>
            <Score1 lad={params.lad} />
        </Suspense>
    );
}

async function Score1({ lad }: { lad: string }) {
    const scores = await getScores(lad);
    const ladVals = await yearlyLADValues(lad);
    const engVals = await yearlyEngValues();
    const plots = ladVals && engVals && PlotGraphs({ladVals, engVals});

    return (
        <div>   
            <div className={`flex justify-left text-3xl font-semi-bold text-lilac py-2 my-2 ml-4 ${montserrat.className}`}> 
                Summary</div>

                <div className="flex space-x-5 items-start">
                <div className={`flex justify-left text-xl font-semi-bold text-dark-green py-2 ml-4 ${montserrat.className}`}>
                    <i>Life Satisfaction</i>
                </div>
                <div className="text-black">
                <p>The life satisfaction rating for [LAD code here] is [score]/10 based on data from an Annual Population Survey in 2020. 
                    This is [not good, below average, average, above average, very good] compared to the rest of England. </p>
                    </div>
                <div className="border border-black scale-75">{plots && plots[0]}</div>
                </div>
            

                <div className={`flex justify-left text-xl font-semi-bold text-dark-green gap-8  columns-3 py-2 ml-4 ${montserrat.className}`}>
                <i>Healthy Eating</i>
                Based on the 2020 data from the public health data collection Fingertips for the percentage of adults in [LAD code here] 
                classified as overweight, we have calculated your area as [score]/10 for healthy eating. 
                This is [not good, below average, average, above average, very good] compared to the rest of England.
                <div className="border border-blue-600 scale-75">{plots && plots[1]}</div>
                </div>

                <div className={`flex justify-left text-xl font-semi-bold text-dark-green py-2 ml-4 ${montserrat.className}`}>
                <i className = "object-left-top">Air Pollution</i>
                <p className = "object-top">The air pollution rating for [LAD code here] is [score]/10 based Defra’s recordings of annual mean PM2.5 in µg m-3 
                weighted by the population.</p>
                <div className="object-right-top border border-blue-600 scale-75">{plots && plots[4]}</div>
                </div>

                <div className={`flex justify-left text-xl font-semi-bold text-dark-green py-2 ml-4 ${montserrat.className}`}>
                <i>Noise Complaints</i>
                Based on the 2020 data from the public health data collection Fingertips for the rate of noise complaints in 
                [LAD code here], we have calculated your area as [score]/10 for noise complaints. This is [not good, below average, 
                average, above average, very good] compared to the rest of England.
                <div className="border border-blue-600 scale-75">{plots && plots[5]}</div>
                </div>

                <div className={`flex justify-left text-xl font-semi-bold text-dark-green py-2 ml-4 ${montserrat.className}`}>
                <i>Green Spaces</i>
                The green space rating is [score]/10 based on the number of addresses in [LAD code here] with private outdoor space. 
                This data is from the Office of National Statistics and Ordnance Survey data.
                <div className="border border-blue-600 scale-75">{plots && plots[3]}</div>
                </div>

                <div className={`flex justify-left text-xl font-semi-bold text-dark-green py-2 ml-4 ${montserrat.className}`}>
                <i>Physical Activity</i>
                <div className="border border-blue-600 scale-75">{plots && plots[2]}</div>
                </div>

                <div className={`flex justify-left text-xl font-semi-bold text-dark-green py-2 ml-4 ${montserrat.className}`}>
                <i>Road Safety</i>
                The road safety rating for [LAD code here] is [score]/10 based on the gov.uk Department for Transport records. 
                This is [not good, below average, average, above average, very good] compared to the rest of England.
                <div className="border border-blue-600 scale-75">{plots && plots[6]}</div>
                </div>

                <div className={`flex justify-left text-xl font-semi-bold text-dark-green py-2 ml-4 ${montserrat.className}`}>
                <i>Distance to GP services </i>
                The median km distance from your local GP practice is [distance here if Parthiv finds it] based on NHS records of 
                addresses. This gives your area a score of [score]/10 which is [not good, below average, average, above average, 
                very good] compared to the rest of England.
                </div>

                <div className={`flex justify-left text-xl font-semi-bold text-dark-green py-2 ml-4 ${montserrat.className}`}>
                <i>Distance to Pharmacies</i>
                The median km distance from your local pharmacy is [distance here if Parthiv finds it] based on NHS records of 
                addresses. This gives your area a score of [score]/10 which is [not good, below average, average, above average, 
                very good] compared to the rest of England.
                </div>

                <div className={`flex justify-left text-xl font-semi-bold text-dark-green py-2 ml-4 ${montserrat.className}`}>
                <i>Distance to Sports</i>
                The median km distance from your local pharmacy is [distance here if Parthiv finds it] based on NHS records of 
                addresses. This gives your area a score of [score]/10 which is [not good, below average, average, above average, 
                very good] compared to the rest of England.
                </div>

            
        </div>

        
    
    );
}

function PlotGraphs({ ladVals, engVals  } : { ladVals : (number | null)[][], engVals : (number | null)[][]}) {
    return ladVals?.map((r, i) => {
            return <Plot
            data={[
            {
                x: [2015, 2016, 2017, 2018, 2019, 2020],
                y: r,
                type: 'scatter',
                mode: 'lines',
                marker: {color: 'purple'},
            },
            {
                x: [2015, 2016, 2017, 2018, 2019, 2020],
                y: engVals[i],
                type: 'scatter',
                mode: 'lines',
                marker: {color: 'blue'},
            }
            ]}
            layout={ {title: Keys[i]} }
            config={ {'staticPlot': true} }
            />
    });
}
