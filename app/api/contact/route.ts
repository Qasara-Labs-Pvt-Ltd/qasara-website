import { ENQUIRY_TYPES } from "@/lib/contact";
import {
  EMAIL_RE,
  SEND_FAILED,
  escapeHtml,
  field,
  formReply,
  htmlRows,
  mailSupport,
  oneLine,
} from "@/lib/siteMail";

const PAGE = "/contact";
const LIMITS = { name: 200, email: 254, company: 200, message: 5000 };

type Enquiry = {
  name: string;
  email: string;
  company: string;
  enquiryType: string;
  message: string;
};

export async function POST(request: Request) {
  let form: FormData;
  try {
    form = await request.formData();
  } catch {
    return formReply(request, PAGE, 400, "That form submission could not be read.");
  }

  // Honeypot: real visitors never see this field, bots fill it. Pretend it went through.
  if (field(form, "website")) return formReply(request, PAGE, 200);

  const enquiry: Enquiry = {
    // Name, email and enquiry type end up in mail headers, so they lose any line breaks.
    name: oneLine(field(form, "name")),
    email: oneLine(field(form, "email")),
    company: oneLine(field(form, "company")),
    enquiryType: oneLine(field(form, "enquiry_type")),
    message: field(form, "message"),
  };

  const problem = validate(enquiry);
  if (problem) return formReply(request, PAGE, 400, problem);

  try {
    await mailSupport({
      subject: `Contact: ${enquiry.enquiryType || "General"} — ${enquiry.name}`,
      replyTo: { name: enquiry.name, address: enquiry.email },
      text: [...rows(enquiry).map(([k, v]) => `${k}: ${v}`), "", enquiry.message].join("\n"),
      html: `${htmlRows(rows(enquiry))}<p style="font-family:sans-serif;font-size:14px;white-space:pre-wrap">${escapeHtml(
        enquiry.message,
      )}</p>`,
    });
  } catch (err) {
    console.error("[contact] send failed", err);
    return formReply(request, PAGE, 502, SEND_FAILED);
  }

  return formReply(request, PAGE, 200);
}

function validate(e: Enquiry): string | null {
  if (!e.name || !e.email || !e.message) return "Please fill in your name, email and message.";
  if (!EMAIL_RE.test(e.email) || e.email.length > LIMITS.email) {
    return "Please enter a valid email address.";
  }
  if (e.name.length > LIMITS.name || e.company.length > LIMITS.company) {
    return "Name and company must be under 200 characters.";
  }
  if (e.message.length > LIMITS.message) return "Please keep your message under 5,000 characters.";
  if (e.enquiryType && !(ENQUIRY_TYPES as readonly string[]).includes(e.enquiryType)) {
    return "Please pick an enquiry type from the list.";
  }
  return null;
}

function rows(e: Enquiry): [string, string][] {
  return [
    ["Name", e.name],
    ["Email", e.email],
    ["Company", e.company || "—"],
    ["Enquiry type", e.enquiryType || "—"],
  ];
}
