import { supabase } from "../lib/supabase";

export type CreateSignalInput = {
  category: string;
  title: string;
  description?: string;
  motto?: string;
  icon: string;
  priority: "LOW" | "MEDIUM" | "HIGH";
  latitude: number;
  longitude: number;
  durationMinutes: number;
};

export async function createSignal(input: CreateSignalInput) {
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    throw new Error("Anonymous user not found");
  }

  const expiresAt = new Date(
    Date.now() + input.durationMinutes * 60 * 1000
  ).toISOString();

  const { data, error } = await supabase
    .from("signals")
    .insert({
      owner_id: user.id,

      category: input.category,
      title: input.title,
      description: input.description,
      motto: input.motto,
      icon: input.icon,
      priority: input.priority,

      location: `POINT(${input.longitude} ${input.latitude})`,

      expires_at: expiresAt,
    })
    .select()
    .single();

  if (error) throw error;

  return data;
}

export async function getNearbySignals(
  latitude: number,
  longitude: number,
  radiusMeters = 5000
) {
  const { data, error } = await supabase.rpc(
    "get_nearby_signals",
    {
      lat: latitude,
      long: longitude,
      radius_meters: radiusMeters,
    }
  );

  if (error) throw error;

  return data;
}

export async function endSignal(signalId: string) {
  const { error } = await supabase
    .from("signals")
    .update({
      status: "ENDED",
      ended_at: new Date().toISOString(),
    })
    .eq("id", signalId);

  if (error) throw error;
}

export async function fetchActiveSignals() {
  const { data, error } = await supabase
    .from("signals")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching signals from Supabase:", error);
    return [];
  }

  return (data || []).map((row: any) => {
    let lat = 13.0827;
    let lng = 80.2707;

    if (row.location) {
      if (typeof row.location === "string") {
        const match = row.location.match(/POINT\s*\(\s*([-\d.]+)\s+([-\d.]+)\s*\)/i);
        if (match) {
          lng = parseFloat(match[1]);
          lat = parseFloat(match[2]);
        }
      } else if (typeof row.location === "object") {
        if (row.location.coordinates && Array.isArray(row.location.coordinates)) {
          lng = row.location.coordinates[0];
          lat = row.location.coordinates[1];
        } else if (typeof row.location.lat === "number" && typeof row.location.lng === "number") {
          lat = row.location.lat;
          lng = row.location.lng;
        }
      }
    } else {
      if (typeof row.latitude === "number") lat = row.latitude;
      if (typeof row.longitude === "number") lng = row.longitude;
    }

    return {
      id: row.id,
      anonymousUserId: row.owner_id || row.anonymous_user_id || "",
      title: row.title,
      description: row.description,
      motto: row.motto,
      category: row.category,
      priority: row.priority,
      icon: row.icon || "📍",
      latitude: lat,
      longitude: lng,
      createdAt: row.created_at || new Date().toISOString(),
      expiresAt: row.expires_at || new Date().toISOString(),
      endedAt: row.ended_at,
      status: row.status || "ACTIVE",
      isDemo: false,
    };
  });
}