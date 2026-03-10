import { BetaAnalyticsDataClient } from "@google-analytics/data";
import { NextResponse } from "next/server";

export const revalidate = 60; // cache for 60 seconds

export async function GET() {
  try {
    const credentials = JSON.parse(process.env.GOOGLE_SERVICE_ACCOUNT_JSON!);
    const propertyId = process.env.GA4_PROPERTY_ID!;

    const client = new BetaAnalyticsDataClient({ credentials });

    const [response] = await client.runRealtimeReport({
      property: `properties/${propertyId}`,
      metrics: [{ name: "activeUsers" }],
    });

    const activeUsers = Number(response.rows?.[0]?.metricValues?.[0]?.value ?? 0);

    return NextResponse.json({ activeUsers });
  } catch (error) {
    console.error("GA4 active users error:", error);
    return NextResponse.json({ activeUsers: 0 });
  }
}
