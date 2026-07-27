import { NextRequest, NextResponse } from "next/server";

/**
 * POST /api/create-order
 *
 * Creates a Razorpay order server-side. Also extracts the visitor IP from
 * request headers so the client never needs to call an external IP service.
 *
 * Request body: { amount: number }  (amount in rupees)
 * Response:     Razorpay order object + { ip_address: string }
 */
export async function POST(request: NextRequest) {
  let body: unknown;

  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ message: "Invalid request body." }, { status: 400 });
  }

  const { amount } = (body as Record<string, unknown>) ?? {};

  if (!amount || isNaN(Number(amount)) || Number(amount) <= 0) {
    return NextResponse.json(
      { message: "A valid positive amount is required." },
      { status: 400 }
    );
  }

  const keyId = process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID;
  const secret = process.env.RAZORPAY_KEY_SECRET || process.env.NEXT_PUBLIC_RAZORPAY_KEY_SECRET;

  if (!keyId || !secret) {
    console.error("Razorpay credentials missing:", { keyId: !!keyId, secret: !!secret });
    return NextResponse.json(
      { message: "Payment service is not configured. Please check environment variables." },
      { status: 500 }
    );
  }

  // Convert rupees to paise (Razorpay works in the smallest currency unit).
  const amountInPaise = Math.round(Number(amount) * 100);

  const auth = "Basic " + Buffer.from(`${keyId}:${secret}`).toString("base64");

  let razorpayOrder: Record<string, unknown>;

  try {
    const res = await fetch("https://api.razorpay.com/v1/orders", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: auth,
      },
      body: JSON.stringify({
        amount: amountInPaise,
        currency: "INR",
        receipt: `receipt_${Date.now()}`,
        payment_capture: 1,
      }),
    });

    const data = await res.json();

    if (!res.ok) {
      console.error("Razorpay order creation error:", data);
      return NextResponse.json(
        { message: data?.error?.description ?? "Could not create payment order." },
        { status: res.status }
      );
    }

    razorpayOrder = data as Record<string, unknown>;
  } catch (err) {
    console.error("Razorpay fetch failed:", err);
    return NextResponse.json(
      { message: "Could not reach payment service. Please try again." },
      { status: 502 }
    );
  }

  // Extract visitor IP from request headers (server-side, no external fetch needed).
  const forwarded = request.headers.get("x-forwarded-for");
  const ip_address = forwarded ? forwarded.split(",")[0].trim() : "unknown";

  return NextResponse.json({ ...razorpayOrder, ip_address }, { status: 200 });
}
