import { Data, createClient } from "./server-client";
import { england_2020 } from "./default-data";
import { standard_deviations } from "./default-data";

export type Score = {
    "life_satisfaction": number | null
    "healthy_eating": number | null
    "physical_activity": number | null
    "green_space": number | null
    "gp_distance": number | null
    "pharmacy_distance": number | null
    "sport_facility_distance": number | null
    "air_pollution": number | null
    "noise_complaints": number | null
    "road_safety": number | null,
    "final_score": number | null
}

async function score(lad: string): Promise<Score | null> {
    const supabase = createClient();

    const { data, error }: {
        data: Data | null,
        error: any
    } = await supabase
        .from("data")
        .select("area_name, area_type, life_satisfaction, healthy_eating, physical_activity, green_space, gp_distance, pharmacy_distance, sport_facility_distance, air_pollution, noise_complaints, road_safety")
        .eq("LAD", lad)
        .single();

    if (error !== null) {
        console.log(error);
        // Handle error
    }

    if (data === null) {
        return null;
    }

    let scores: Score = {
        "life_satisfaction": null,
        "healthy_eating": null,
        "physical_activity": null,
        "green_space": null,
        "gp_distance": null,
        "pharmacy_distance": null,
        "sport_facility_distance": null,
        "air_pollution": null,
        "noise_complaints": null,
        "road_safety": null,
        "final_score": null
    };
    let final_score = 0;
    let n = 0;
    for (const key_t in Object.keys(england_2020)) {
        const key: keyof typeof england_2020 = key_t as keyof typeof england_2020;
        let score = 4;
        if (data[key] === null) {
            continue;
        }

        // @ts-ignore
        const z = (data[key] - england_2020[key]) / standard_deviations[key];
        if (key in ["life_satisfaction", "healthy_eating", "physical_activity", "green_space"]) {
            score += z;
        } else {
            score -= z;
        }

        scores[key] = score;
        final_score += score;
        n += 1;
    }

    // @ts-ignore
    if (n !== 0) {
        scores["final_score"] = (final_score / n) * (10 / 8);
    }


    // @ts-ignore
    return scores;
}