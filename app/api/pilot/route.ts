import { EMAIL_RE, SEND_FAILED, field, formReply, htmlRows, mailSupport, oneLine } from "@/lib/siteMail";

// StrategyForge "Join the pilot" waitlist. Each signup is one email to the support inbox, with the
// visitor as Reply-To; product and source come from the form's hidden fields so leads stay segmented.
const PAGE = "/strategyforge#join";

export async function POST(request: Request) {
  let form: FormData;
  try {
    form = await request.formData();
  } catch {
    return formReply(request, PAGE, 400, "That form submission could not be read.");
  }

  // Honeypot: real visitors never see this field, bots fill it. Pretend it went through.
  if (field(form, "website")) return formReply(request, PAGE, 200);

  const email = oneLine(field(form, "email"));
  if (!EMAIL_RE.test(email) || email.length > 254) {
    return formReply(request, PAGE, 400, "Please enter a valid email address.");
  }
  const product = oneLine(field(form, "product")).slice(0, 50) || "strategyforge";
  const source = oneLine(field(form, "source")).slice(0, 50) || "—";

  const rows: [string, string][] = [
    ["Email", email],
    ["Product", product],
    ["Source", source],
  ];

  try {
    await mailSupport({
      subject: `StrategyForge — pilot waitlist: ${email}`,
      replyTo: { address: email },
      text: rows.map(([k, v]) => `${k}: ${v}`).join("\n"),
      html: htmlRows(rows),
    });
  } catch (err) {
    console.error("[pilot] send failed", err);
    return formReply(request, PAGE, 502, SEND_FAILED);
  }

  return formReply(request, PAGE, 200);
}
