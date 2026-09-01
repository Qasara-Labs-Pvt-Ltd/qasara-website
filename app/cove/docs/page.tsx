import type { Metadata } from "next";
import Link from "next/link";
import type { ReactNode } from "react";
import { ArrowUpRight, ArrowLeft } from "lucide-react";
import { DocsNav, type DocsNavItem } from "./DocsNav";

export const metadata: Metadata = {
  title: "Cove Wallet API — documentation",
  description:
    "REST API reference for the Cove Wallet API on Canton Network: prepare-sign-submit transfers, external party onboarding, utility registry issuance, ledger reads, real-time events and x402 pay-per-call.",
  openGraph: {
    title: "Cove Wallet API — documentation",
    description:
      "REST API reference for the Cove Wallet API on Canton Network.",
    url: "https://qasara.ai/cove/docs",
    type: "article",
  },
};

/* ───────────────────────────── primitives ───────────────────────────── */

function Code({ children }: { children: string }) {
  return (
    <pre className="overflow-x-auto rounded-lg border border-line bg-bg-subtle p-4 text-[13px] leading-relaxed text-ink/90">
      <code className="font-mono">{children}</code>
    </pre>
  );
}

function M({ children }: { children: ReactNode }) {
  return <span className="font-mono text-[0.92em] text-ink">{children}</span>;
}

function P({ children }: { children: ReactNode }) {
  return <p className="text-[15px] leading-relaxed text-ink-muted">{children}</p>;
}

function Note({
  tone = "info",
  title,
  children,
}: {
  tone?: "info" | "warn";
  title?: string;
  children: ReactNode;
}) {
  const c =
    tone === "warn"
      ? "border-brand-amber/30 bg-brand-amber/[0.06]"
      : "border-brand-blue/30 bg-brand-blue/[0.06]";
  return (
    <div className={`rounded-lg border ${c} p-4 text-sm leading-relaxed text-ink-muted`}>
      {title && <p className="mb-1.5 font-semibold text-ink">{title}</p>}
      {children}
    </div>
  );
}

function Table({
  head,
  rows,
}: {
  head: string[];
  rows: ReactNode[][];
}) {
  return (
    <div className="overflow-x-auto rounded-lg border border-line">
      <table className="w-full min-w-[520px] border-collapse text-left text-[13.5px]">
        <thead>
          <tr className="bg-bg-subtle">
            {head.map((h) => (
              <th
                key={h}
                className="border-b border-line px-4 py-2.5 font-mono text-[11px] uppercase tracking-[0.14em] text-ink-dim"
              >
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((r, i) => (
            <tr key={i} className="align-top">
              {r.map((cell, j) => (
                <td
                  key={j}
                  className="border-b border-line/60 px-4 py-2.5 leading-relaxed text-ink-muted"
                >
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

const TAGS: Record<string, string> = {
  public: "border-line bg-bg-elevated text-ink-muted",
  key: "border-brand-teal/30 bg-brand-teal/10 text-brand-mint",
  admin: "border-brand-amber/30 bg-brand-amber/10 text-amber-300",
  scoped: "border-brand-purple/40 bg-brand-purple/10 text-violet-300",
  node: "border-brand-blue/30 bg-brand-blue/10 text-blue-300",
  x402: "border-brand-purple/40 bg-brand-purple/10 text-violet-300",
};

function Tag({ kind, children }: { kind: keyof typeof TAGS; children: ReactNode }) {
  return (
    <span
      className={`inline-flex items-center rounded border px-1.5 py-0.5 font-mono text-[10px] uppercase tracking-[0.14em] ${TAGS[kind]}`}
    >
      {children}
    </span>
  );
}

function Endpoint({
  id,
  method,
  path,
  title,
  tags,
  children,
}: {
  id: string;
  method: "GET" | "POST" | "PATCH" | "DELETE" | "WS" | "ALL";
  path: string;
  title?: string;
  tags?: ReactNode;
  children: ReactNode;
}) {
  const tone =
    method === "GET" || method === "WS"
      ? "border-brand-teal/30 bg-brand-teal/15 text-brand-mint"
      : method === "DELETE"
        ? "border-brand-amber/30 bg-brand-amber/15 text-amber-300"
        : "border-brand-blue/30 bg-brand-blue/15 text-blue-300";
  return (
    <div
      id={id}
      className="scroll-mt-24 rounded-xl border border-line bg-bg-card/50 p-5 sm:p-6"
    >
      <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
        <span className={`rounded border px-2 py-0.5 font-mono text-xs font-semibold ${tone}`}>
          {method}
        </span>
        <span className="break-all font-mono text-sm text-ink">{path}</span>
        {tags}
      </div>
      {title && <p className="mt-3 text-[15px] font-medium text-ink">{title}</p>}
      <div className="mt-4 space-y-4">{children}</div>
    </div>
  );
}

function Section({
  id,
  title,
  children,
}: {
  id: string;
  title: string;
  children: ReactNode;
}) {
  const index = SECTION_INDEX[id] ?? "";
  return (
    <section id={id} className="scroll-mt-24 border-t border-line pt-12">
      <div className="eyebrow mb-4">
        <span className="text-brand-teal/80">{index}</span>
        <span className="eyebrow-dot" aria-hidden />
        <span>Reference</span>
      </div>
      <h2 className="display-h3 text-ink">{title}</h2>
      <div className="mt-6 space-y-5">{children}</div>
    </section>
  );
}

/* ───────────────────────────── contents ───────────────────────────── */

/**
 * Which sections are published. Key provisioning, the node registry and
 * burn/mint are operator surfaces, and the Utility Registry mint / issue routes
 * create supply — all of them are gated on an admin secret, so they are
 * documented for the accounts that hold one rather than on the public page.
 * Flip a flag and the section, its number, its sidebar entry, its rows in the
 * route index and any recipe that depends on it all come back automatically.
 */
const SHOW = {
  auth: false,
  nodes: false,
  parties: true,
  registryIssuance: false,
  burnMint: false,
};

const ALL_SECTIONS: { id: string; label: string; show: boolean }[] = [
  { id: "conventions", label: "Conventions", show: true },
  { id: "system", label: "System", show: true },
  { id: "auth", label: "Authentication & keys", show: SHOW.auth },
  { id: "nodes", label: "Nodes", show: SHOW.nodes },
  { id: "parties", label: "Parties", show: SHOW.parties },
  { id: "wallets", label: "Wallets", show: true },
  { id: "transfers", label: "Transfers", show: true },
  { id: "canton", label: "Canton operations", show: true },
  { id: "ledger", label: "Ledger reads", show: true },
  { id: "utility-registry", label: "Utility Registry", show: true },
  { id: "burn-mint", label: "Burn / mint", show: SHOW.burnMint },
  { id: "x402", label: "x402 paid surface", show: true },
  { id: "events", label: "Events", show: true },
  { id: "errors", label: "Errors", show: true },
  { id: "limits", label: "Rate limits", show: true },
  { id: "recipes", label: "End-to-end recipes", show: true },
  { id: "traps", label: "Traps", show: true },
  { id: "route-index", label: "Route index", show: true },
];

const NAV: DocsNavItem[] = ALL_SECTIONS.filter((x) => x.show).map((x, i) => ({
  id: x.id,
  label: x.label,
  n: String(i).padStart(2, "0"),
}));

const SECTION_INDEX: Record<string, string> = {};
for (const x of NAV) SECTION_INDEX[x.id] = x.n;

type Route = [string, string, string];

const ROUTES: Route[] = [
  ["GET", "/v1/health", "public"],
  ["GET", "/v1/ready", "public"],
  ...(SHOW.auth
    ? ([
        ["POST", "/v1/auth/keys", "admin secret"],
        ["GET", "/v1/auth/keys", "key"],
        ["DELETE", "/v1/auth/keys/:id", "key"],
      ] as Route[])
    : []),
  ["POST", "/v1/auth/stream-token", "key"],
  ...(SHOW.nodes
    ? ([
        ["GET", "/v1/nodes", "key"],
        ["POST", "/v1/nodes", "key + admin"],
        ["PATCH", "/v1/nodes/:name", "key + admin"],
        ["DELETE", "/v1/nodes/:name", "key + admin"],
        ["POST", "/v1/nodes/:name/health", "key"],
      ] as Route[])
    : []),
  ...(SHOW.parties
    ? ([
        ["POST", "/v1/parties/prepare", "key"],
        ["POST", "/v1/parties/register", "key · party-scoped"],
        ["GET", "/v1/parties", "key · account-scoped"],
        ["GET", "/v1/parties/{partyId}", "key"],
      ] as Route[])
    : []),
  ["GET", "/v1/wallets/holdings", "key"],
  ["GET", "/v1/wallets/{partyId}/balance", "key"],
  ["GET", "/v1/wallets/{partyId}/contracts", "key"],
  ["GET", "/v1/wallets/{partyId}/preapproval", "key"],
  ["POST", "/v1/wallets/{partyId}/preapproval/prepare", "key · party-scoped"],
  ["POST", "/v1/transfers/prepare", "key · party-scoped"],
  ["POST", "/v1/transfers/prepare/bulk", "key · party-scoped"],
  ["POST", "/v1/transfers/accept", "key · party-scoped"],
  ["POST", "/v1/transfers/reject", "key · party-scoped"],
  ["POST", "/v1/transfers/withdraw", "key · party-scoped"],
  ["POST", "/v1/transfers/broadcast", "key · party-scoped"],
  ["GET", "/v1/transfers/:commandId/status", "key-scoped"],
  ["GET", "/v1/transfers/pending", "key"],
  ["GET", "/v1/transfers/history", "key-scoped"],
  ["POST", "/v1/transfers/context", "key · party-scoped"],
  ["POST", "/v1/transfers/estimate-gas", "key"],
  ["POST", "/v1/canton/prepare", "key · party-scoped"],
  ["POST", "/v1/canton/broadcast", "key · party-scoped"],
  ["POST", "/v1/canton/merge-delegation/prepare", "key · party-scoped"],
  ["POST", "/v1/canton/gas/check", "key"],
  ["POST", "/v1/ledger/active-contracts", "key"],
  ["POST", "/v1/ledger/update", "key"],
  ["POST", "/v1/ledger/consuming-exercise", "key"],
  ["GET", "/v1/ledger/packages", "key"],
  ["POST", "/v1/utility-registry/factory", "key"],
  ["POST", "/v1/utility-registry/transfer-context", "key"],
  ["POST", "/v1/utility-registry/transfer", "key + admin"],
  ...(SHOW.registryIssuance
    ? ([
        ["POST", "/v1/utility-registry/mint", "key + admin"],
        ["POST", "/v1/utility-registry/issue", "key + admin"],
        ["GET", "/v1/utility-registry/issue/:reference", "key"],
      ] as Route[])
    : []),
  ["POST", "/v1/utility-registry/preapproval/prepare", "key · party-scoped"],
  ["POST", "/v1/interactive/execute", "key · party-scoped"],
  ...(SHOW.burnMint
    ? ([
        ["POST", "/v1/burn-mint/context", "key"],
        ["POST", "/v1/burn-mint/prepare", "key"],
        ["POST", "/v1/burn-mint/broadcast", "key"],
      ] as Route[])
    : []),
  ["GET", "/v1/x402/info", "public"],
  ["GET", "/v1/x402/ping", "x402 payment"],
  ["POST", "/v1/x402/transfers/fee-preview", "x402 payment"],
  ["WS", "/v1/events", "stream token"],
  ["GET", "/v1/events/stream", "stream token"],
];

/* ────────────────────────────── the page ────────────────────────────── */

export default function CoveDocsPage() {
  return (
    <>
      {/* HEADER */}
      <header className="relative overflow-hidden border-b border-line">
        <div className="nebula nebula--teal opacity-40" aria-hidden />
        <div className="vignette" aria-hidden />
        <div className="container-page relative py-16 sm:py-20">
          <Link href="/cove" className="btn-ghost mb-8">
            <ArrowLeft className="h-4 w-4" />
            Cove
          </Link>
          <div className="eyebrow mb-5">
            <span className="text-brand-teal/80">API</span>
            <span className="eyebrow-dot" aria-hidden />
            <span>Version 1 · REST</span>
          </div>
          <h1 className="display-h1 max-w-3xl text-balance">
            Cove Wallet API
            <br />
            <span className="bg-gradient-to-br from-brand-mint via-brand-teal to-brand-blue bg-clip-text text-transparent">
              documentation
            </span>
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-ink-muted">
            One HTTP surface for Canton-native digital assets: onboard self-custodied
            parties, move CIP-56 tokens, issue registry instruments, read the ledger, and
            stream events — without running a validator.
          </p>

          <div className="mt-10 grid gap-3 sm:grid-cols-2 lg:max-w-3xl">
            <div className="rounded-xl border border-line bg-bg-card/60 p-5">
              <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-ink-dim">
                Base URL
              </p>
              <p className="mt-2 break-all font-mono text-sm text-brand-mint">
                https://walletapi.cove.qasara.ai
              </p>
            </div>
            <div className="rounded-xl border border-line bg-bg-card/60 p-5">
              <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-ink-dim">
                Authentication
              </p>
              <p className="mt-2 break-all font-mono text-sm text-ink">
                Authorization: Bearer canton_sk_…
              </p>
            </div>
          </div>

          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/contact" className="btn-primary">
              Request an API key
              <ArrowUpRight className="h-4 w-4" />
            </Link>
            <a href="#recipes" className="btn-secondary">
              Jump to recipes
            </a>
          </div>
        </div>
      </header>

      <div className="container-page py-14">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-14">
          {/* SIDEBAR */}
          <aside className="lg:col-span-3">
            <div className="lg:sticky lg:top-24">
              <p className="mb-3 font-mono text-[11px] uppercase tracking-[0.18em] text-ink-dim">
                Contents
              </p>
              <DocsNav items={NAV} />
            </div>
          </aside>

          {/* BODY */}
          <div className="min-w-0 lg:col-span-9">
            <div className="max-w-3xl space-y-14">
              {/* ─── 00 CONVENTIONS ─── */}
              <Section id="conventions" title="Conventions">
                <h3 className="text-lg font-semibold text-ink">The gateway holds no keys</h3>
                <P>
                  Every ledger write is <M>prepare → sign → submit</M>. Cove builds an
                  unsigned Canton interactive submission, you sign its hash with an Ed25519
                  key we never see, and you post the signature back. Signing happens on your
                  machine, between the two calls. Every <M>prepare</M> response has this
                  shape:
                </P>
                <Code>{`{
  "commandId": "b2d1c8e0-…",
  "preparedTransaction": "<base64 protobuf>",
  "preparedTransactionHash": "<base64 hash — sign THIS>",
  "hashingSchemeVersion": "HASHING_SCHEME_VERSION_V2",
  "trafficCost": {
    "requestBytes": 3412,
    "responseBytes": 812,
    "totalBytes": 4224,
    "estimatedAt": "2026-08-20T09:41:02Z"
  }
}`}</Code>
                <P>
                  <M>trafficCost</M> is the ledger&rsquo;s own sequencer-traffic estimate in
                  bytes — the real answer to &ldquo;what will this submission cost&rdquo;. It
                  is absent on participants older than Canton 3.5.
                </P>

                <h3 className="pt-4 text-lg font-semibold text-ink">
                  Three submit endpoints, and which to use
                </h3>
                <Table
                  head={["Endpoint", "Real hash?", "Use for"]}
                  rows={[
                    [
                      <M key="a">POST /v1/transfers/broadcast</M>,
                      "No (legacy path)",
                      "CC / CIP-56 transfers, accept · reject · withdraw, Amulet preapproval proposals",
                    ],
                    [
                      <M key="b">POST /v1/canton/broadcast</M>,
                      "No",
                      <>
                        submissions built by <M key="b2">/v1/canton/prepare</M>
                      </>,
                    ],
                    [
                      <M key="c">POST /v1/interactive/execute</M>,
                      "Yes",
                      "anything where the participant validates the hash — notably a receiver-signed Utility Registry preapproval",
                    ],
                  ]}
                />
                <P>
                  If a submit fails with a hash-mismatch or authorization error on a legacy
                  path, retry through <M>/v1/interactive/execute</M>, passing the{" "}
                  <M>preparedTransactionHash</M> and <M>hashingSchemeVersion</M> from the
                  prepare response.
                </P>

                <h3 className="pt-4 text-lg font-semibold text-ink">Authentication</h3>
                <P>
                  Every route except <M>GET /v1/health</M>, <M>GET /v1/ready</M> and{" "}
                  <M>/v1/x402/*</M> requires a bearer key:
                </P>
                <Code>{`Authorization: Bearer canton_sk_<48 hex chars>
Content-Type: application/json      # on POST only`}</Code>
                <P>
                  Keys are provisioned by us rather than self-served:{" "}
                  <Link href="/contact" className="text-brand-mint hover:underline">
                    ask for one
                  </Link>
                  , and it arrives scoped to an account, optionally pinned to an IP allowlist
                  and an expiry date.
                </P>
                <P>
                  A missing header, or one not starting with <M>Bearer canton_sk_</M>, is 401{" "}
                  <M>UNAUTHORIZED</M>. Key validation is cached for 15 seconds, so a revoked
                  key can still authenticate for up to 15 s. If your key carries an{" "}
                  <M>ipWhitelist</M>, a request from any other address is 403{" "}
                  <M>IP_NOT_WHITELISTED</M>.
                </P>
                <P>
                  A few routes additionally require an admin header,{" "}
                  <M>X-Admin-Secret</M> — those that run as the issuer, i.e. that create or
                  move supply rather than acting for a client party. They are marked{" "}
                  <Tag kind="admin">admin secret</Tag> below, and the rest of the operator
                  surface (key provisioning, the node registry) is documented separately for
                  the accounts that hold one. The gate is fail-closed in production and runs
                  before body validation, so an unauthorised caller cannot probe the schema.
                </P>

                <h3 className="pt-4 text-lg font-semibold text-ink">Party scoping</h3>
                <P>
                  Every handler that <em className="text-ink">acts as</em> a party checks that
                  the party belongs to your account. An unknown or foreign party gets a
                  uniform 403 <M>FORBIDDEN</M> — deliberately indistinguishable, so party
                  existence does not leak.
                </P>
                <P>
                  Reads are not scoped (pass any party id), and neither is the issuer surface
                  — party scoping is the wrong control there, which is why those routes are
                  admin-gated instead. The two history reads are isolated by{" "}
                  <em className="text-ink">API key</em> rather than account, so a second key
                  on the same account cannot read the first key&rsquo;s transfer log.
                </P>

                <h3 className="pt-4 text-lg font-semibold text-ink">Multi-node routing</h3>
                <P>
                  Many endpoints accept an optional <M>node</M> (body field or query param)
                  naming a Canton participant to route to. <span className="text-ink">
                  Omit it</span> unless we have given you a node name &mdash; the request then
                  goes to the default node for your account, which is what almost every
                  integration wants. Endpoints that accept one are marked{" "}
                  <Tag kind="node">node</Tag> below; the rest have no such field and silently
                  ignore one:{" "}
                  <M>transfers/accept · reject · withdraw · broadcast · context</M>, all of{" "}
                  <M>canton/*</M>, and both wallet preapproval actions.
                </P>

                <h3 className="pt-4 text-lg font-semibold text-ink">Party IDs in paths</h3>
                <P>
                  Canton party ids contain <M>::</M>. Both raw and percent-encoded forms work
                  in a path:
                </P>
                <Code>{`GET /v1/wallets/alice::1220abc…/balance
GET /v1/wallets/alice%3A%3A1220abc…/balance`}</Code>
                <P>
                  Under <M>/v1/wallets/*</M> only four action suffixes are routed —{" "}
                  <M>balance</M>, <M>contracts</M>, <M>preapproval</M>,{" "}
                  <M>preapproval/prepare</M>. Anything else is 404 <M>NOT_FOUND</M>.
                </P>

                <h3 className="pt-4 text-lg font-semibold text-ink">
                  Amounts, headers, bodies
                </h3>
                <ul className="space-y-2.5">
                  <li className="tick-item">
                    <span>
                      <span className="text-ink">Amounts are decimal strings.</span> All
                      internal math is arbitrary-precision decimal — never send a JSON number
                      or a float.
                    </span>
                  </li>
                  <li className="tick-item">
                    <span>
                      Every response carries <M>X-Request-Id</M>. Quote it in bug reports.
                    </span>
                  </li>
                  <li className="tick-item">
                    <span>
                      The JSON parser tolerates an empty body with a JSON content type, so{" "}
                      <M>POST /v1/auth/stream-token</M> can be called with none.
                    </span>
                  </li>
                </ul>
              </Section>

              {/* ─── 01 SYSTEM ─── */}
              <Section id="system" title="System">
                <P>Both routes are unauthenticated.</P>
                <Endpoint
                  id="get-health"
                  method="GET"
                  path="/v1/health"
                  title="Liveness. Never touches the ledger, the database, or Redis."
                  tags={<Tag kind="public">no auth</Tag>}
                >
                  <Code>{`{ "status": "healthy", "timestamp": "2026-08-20T09:41:02.114Z", "version": "1.0.0" }`}</Code>
                </Endpoint>
                <Endpoint
                  id="get-ready"
                  method="GET"
                  path="/v1/ready"
                  title="Readiness. Probes Canton, Postgres and Redis independently."
                  tags={<Tag kind="public">no auth</Tag>}
                >
                  <Code>{`{ "status": "ready", "db": "connected", "redis": "connected", "canton": "connected" }`}</Code>
                  <Note tone="warn">
                    <M>status</M> is <M>ready</M> only when all three are <M>connected</M>,
                    otherwise <M>degraded</M> — and the response is{" "}
                    <span className="text-ink">200 either way</span>, so a load balancer must
                    inspect the body, not the status code. <M>canton</M> is one of{" "}
                    <M>connected</M> / <M>unhealthy</M> / <M>not_initialized</M>.
                  </Note>
                </Endpoint>
              </Section>

              {/* ─── 02 AUTH ─── */}
              {SHOW.auth && (
              <Section id="auth" title="Authentication and API keys">
                <Endpoint
                  id="post-auth-keys"
                  method="POST"
                  path="/v1/auth/keys"
                  title="Create an API key."
                  tags={<Tag kind="admin">admin secret</Tag>}
                >
                  <Code>{`curl -X POST "$BASE/v1/auth/keys" \\
  -H "X-Admin-Secret: $ADMIN_SECRET" \\
  -H "Content-Type: application/json" \\
  -d '{"label":"bridge-prod","tier":"growth","ipWhitelist":["203.0.113.10"]}'`}</Code>
                  <Table
                    head={["Field", "Type", "Notes"]}
                    rows={[
                      [<M key="l">label</M>, "string, 1–100", "required"],
                      [
                        <M key="t">tier</M>,
                        <M key="tv">free · growth · enterprise</M>,
                        "default free",
                      ],
                      [<M key="i">ipWhitelist</M>, "string[]", "optional; empty = any IP"],
                      [<M key="e">expiresAt</M>, "ISO 8601 datetime", "optional"],
                    ]}
                  />
                  <Code>{`201
{
  "apiKey": "canton_sk_9f3c…",
  "prefix": "canton_sk_9f3c",
  "label": "bridge-prod",
  "tier": "growth",
  "createdAt": "2026-08-20T09:41:02.114Z"
}`}</Code>
                  <Note tone="warn">
                    <M>apiKey</M> is shown <span className="text-ink">once</span> — only its
                    SHA-256 hash is stored. There is no way to recover it later.
                  </Note>
                </Endpoint>

                <Endpoint
                  id="get-auth-keys"
                  method="GET"
                  path="/v1/auth/keys"
                  title="List the keys on the calling account."
                  tags={<Tag kind="key">api key</Tag>}
                >
                  <Code>{`{
  "keys": [
    { "id": "uuid", "prefix": "canton_sk_9f3c", "label": "bridge-prod",
      "tier": "growth", "isActive": true,
      "lastUsedAt": "2026-08-20T09:40:11.000Z",
      "createdAt": "2026-08-01T12:00:00.000Z" }
  ]
}`}</Code>
                </Endpoint>

                <Endpoint
                  id="delete-auth-key"
                  method="DELETE"
                  path="/v1/auth/keys/:id"
                  title="Revoke a key. 204 on success."
                  tags={<Tag kind="key">api key</Tag>}
                >
                  <P>
                    404 <M>NOT_FOUND</M> if the id is not on this account. The 15 s auth cache
                    means the key may keep working briefly.
                  </P>
                </Endpoint>

                <Endpoint
                  id="post-stream-token"
                  method="POST"
                  path="/v1/auth/stream-token"
                  title="Exchange the API key for a short-lived token for the WebSocket / SSE surface."
                  tags={<Tag kind="key">api key</Tag>}
                >
                  <P>
                    So a long-lived secret never lands in a query string or a browser URL. No
                    body required.
                  </P>
                  <Code>{`{ "token": "e7c9…-uuid", "expiresIn": 60 }`}</Code>
                  <Note>
                    Single-use, 60 s TTL, held in the memory of the instance that issued it —
                    fetch the token from the same instance you will connect to. Above 10 000
                    outstanding tokens the route returns 429 <M>RATE_LIMIT_EXCEEDED</M>.
                  </Note>
                </Endpoint>
              </Section>
              )}

{/* ─── 03 NODES ─── */}
              {SHOW.nodes && (
              <Section id="nodes" title="Nodes">
                <P>
                  A registry of Canton participants. Rows here are what the <M>node</M>{" "}
                  parameter selects.
                </P>
                <Endpoint
                  id="get-nodes"
                  method="GET"
                  path="/v1/nodes"
                  tags={<Tag kind="key">api key</Tag>}
                >
                  <Code>{`{
  "nodes": [
    { "name": "excellar-devnet", "displayName": "Excellar DevNet",
      "endpointUrl": "https://ledger.devnet.example",
      "isDefault": true, "isActive": true,
      "healthStatus": "healthy", "lastHealthCheck": "2026-08-20T09:30:00.000Z" }
  ]
}`}</Code>
                </Endpoint>
                <Endpoint
                  id="post-nodes"
                  method="POST"
                  path="/v1/nodes"
                  title="Register a node."
                  tags={
                    <>
                      <Tag kind="key">api key</Tag>
                      <Tag kind="admin">admin secret</Tag>
                    </>
                  }
                >
                  <Table
                    head={["Field", "Type", "Notes"]}
                    rows={[
                      [
                        <M key="n">name</M>,
                        <M key="nv">^[a-z0-9-]+$</M>,
                        <>
                          the value callers pass as <M key="n2">node</M>
                        </>,
                      ],
                      [<M key="d">displayName</M>, "string, 1–100", "required"],
                      [<M key="e">endpointUrl</M>, "URL", "ledger JSON API base"],
                      [
                        <M key="a">authConfig</M>,
                        "object",
                        <>
                          <M key="a2">adminUrl</M>, <M key="a3">network</M>,{" "}
                          <M key="a4">authType</M>, <M key="a5">audience</M>,{" "}
                          <M key="a6">userId</M>
                        </>,
                      ],
                      [
                        <M key="i">isDefault</M>,
                        "boolean",
                        "setting true clears the previous default",
                      ],
                    ]}
                  />
                </Endpoint>
                <Endpoint
                  id="patch-node"
                  method="PATCH"
                  path="/v1/nodes/:name"
                  title="Update displayName, endpointUrl, authConfig or isDefault."
                  tags={
                    <>
                      <Tag kind="key">api key</Tag>
                      <Tag kind="admin">admin secret</Tag>
                    </>
                  }
                >
                  <P>
                    <M>name</M> cannot be changed. The cached connection is dropped so the
                    next request reconnects with the new config. 404 for an unknown name.
                  </P>
                </Endpoint>
                <Endpoint
                  id="delete-node"
                  method="DELETE"
                  path="/v1/nodes/:name"
                  title="Soft delete — sets isActive=false. 204."
                  tags={
                    <>
                      <Tag kind="key">api key</Tag>
                      <Tag kind="admin">admin secret</Tag>
                    </>
                  }
                >
                  <P>404 for an unknown name.</P>
                </Endpoint>
                <Endpoint
                  id="post-node-health"
                  method="POST"
                  path="/v1/nodes/:name/health"
                  title="Probe a node and persist the result."
                  tags={<Tag kind="key">api key</Tag>}
                >
                  <Code>{`{ "name": "excellar-devnet", "healthy": true, "checkedAt": "2026-08-20T09:41:02.114Z" }`}</Code>
                  <P>
                    A connection failure returns 200 with{" "}
                    <M>{`{ "healthy": false, "error": "…" }`}</M> rather than a 5xx.
                  </P>
                </Endpoint>
              </Section>
              )}

{/* ─── 04 PARTIES ─── */}
              {SHOW.parties && (
              <Section id="parties" title="Parties">
                <P>
                  External, self-custodied party onboarding: Cove derives the topology from a
                  public key you supply, you sign the resulting hash, Cove allocates.
                </P>
                <Endpoint
                  id="post-parties-prepare"
                  method="POST"
                  path="/v1/parties/prepare"
                  tags={
                    <>
                      <Tag kind="key">api key</Tag>
                      <Tag kind="node">node</Tag>
                    </>
                  }
                >
                  <Code>{`{ "publicKey": "<base64 raw Ed25519 public key>" }`}</Code>
                  <Code>{`{
  "partyId": "alice::1220abc…",
  "publicKey": "<echoed base64>",
  "topologyTransactions": ["<base64>", "…"],
  "multiHash": "<base64 — sign THIS>",
  "publicKeyFingerprint": "1220abc…"
}`}</Code>
                  <Note>
                    A party row is written with status <M>preparing</M>, owned by the calling
                    account — that row is what later makes the party actable, so{" "}
                    <span className="text-ink">
                      prepare and register must be done by keys on the same account
                    </span>
                    .
                  </Note>
                </Endpoint>

                <Endpoint
                  id="post-parties-register"
                  method="POST"
                  path="/v1/parties/register"
                  tags={
                    <>
                      <Tag kind="key">api key</Tag>
                      <Tag kind="scoped">party-scoped</Tag>
                    </>
                  }
                >
                  <Code>{`{
  "signature": "<base64 Ed25519 signature over multiHash>",
  "preparedParty": {
    "partyId": "alice::1220abc…",
    "publicKey": "<base64>",
    "topologyTransactions": ["<base64>"],
    "multiHash": "<base64>",
    "publicKeyFingerprint": "1220abc…"
  }
}`}</Code>
                  <P>
                    <M>preparedParty.publicKey</M> is optional only if the party was prepared
                    here — the handler falls back to the key stored at prepare time.
                    Otherwise: 400 <M>MISSING_PUBLIC_KEY</M>.
                  </P>
                  <P>
                    On success the party is allocated <span className="text-ink">and</span>{" "}
                    granted <M>actAs</M> / <M>readAs</M> for the gateway&rsquo;s ledger user.
                    The party stays self-custodied — Cove needs those rights only to read its
                    ACS and build prepared submissions on its behalf. If the grant fails the
                    party <span className="text-ink">is</span> allocated and the route returns
                    502 <M>PARTY_RIGHTS_GRANT_FAILED</M>: grant the rights, do not
                    re-register.
                  </P>
                </Endpoint>

                <Endpoint
                  id="get-parties"
                  method="GET"
                  path="/v1/parties"
                  title="Cursor pagination over parties owned by the calling account."
                  tags={<Tag kind="key">api key</Tag>}
                >
                  <P>
                    <M>?limit=25&amp;cursor=&lt;id&gt;</M> — <M>limit</M> is 1–100 (default
                    25); <M>nextCursor</M> is the last item&rsquo;s <M>id</M>.
                  </P>
                  <Code>{`{
  "items": [
    { "id": "uuid", "cantonPartyId": "alice::1220abc…",
      "publicKeyFingerprint": "1220abc…", "displayName": null,
      "status": "allocated", "createdAt": "2026-08-01T12:00:00.000Z" }
  ],
  "hasMore": false
}`}</Code>
                </Endpoint>

                <Endpoint
                  id="get-party"
                  method="GET"
                  path="/v1/parties/{partyId}"
                  tags={<Tag kind="key">api key</Tag>}
                >
                  <Code>{`{
  "id": "uuid",
  "cantonPartyId": "alice::1220abc…",
  "publicKey": "<base64>",
  "publicKeyFingerprint": "1220abc…",
  "displayName": null,
  "status": "allocated",
  "preApprovedInstruments": ["USDCx"],
  "createdAt": "2026-08-01T12:00:00.000Z"
}`}</Code>
                  <P>
                    404 <M>NOT_FOUND</M> if the gateway does not know the party.
                  </P>
                </Endpoint>
              </Section>
              )}

{/* ─── 05 WALLETS ─── */}
              <Section id="wallets" title="Wallets">
                <P>All reads here are unscoped: pass any party id.</P>

                <Endpoint
                  id="get-wallets-holdings"
                  method="GET"
                  path="/v1/wallets/holdings"
                  title="Operator view — who holds this instrument?"
                  tags={
                    <>
                      <Tag kind="key">api key</Tag>
                      <Tag kind="node">node</Tag>
                    </>
                  }
                >
                  <P>
                    <M>?instrument=USDCx</M> is required (400 <M>VALIDATION_ERROR</M> without
                    it).
                  </P>
                  <Code>{`{
  "instrument": "USDCx",
  "totalBalance": "125000.5",
  "holderCount": 3,
  "partiesQueried": 42,
  "queryErrors": 1,
  "holders": [
    { "partyId": "alice::1220abc…", "displayName": null, "balance": "100000" },
    { "partyId": "bob::1220def…",   "displayName": null, "balance": "25000.5" }
  ]
}`}</Code>
                  <P>
                    Sorted largest first, zero balances dropped. <M>queryErrors</M> counts
                    parties whose balance read failed; those are excluded from{" "}
                    <M>totalBalance</M>, so a non-zero <M>queryErrors</M> means the total is a
                    lower bound. Cost scales with the number of known parties.
                  </P>
                </Endpoint>

                <Endpoint
                  id="get-wallet-balance"
                  method="GET"
                  path="/v1/wallets/{partyId}/balance"
                  tags={
                    <>
                      <Tag kind="key">api key</Tag>
                      <Tag kind="node">node</Tag>
                    </>
                  }
                >
                  <Code>{`{
  "partyId": "alice::1220abc…",
  "balance": "1234.5",
  "instruments": [ { "id": "Amulet", "amount": "1200" }, { "id": "USDCx", "amount": "34.5" } ]
}`}</Code>
                  <Note>
                    Small amounts come back in{" "}
                    <span className="text-ink">exponential notation</span> — a balance of{" "}
                    <M>0.0000001</M> reads as <M>1e-7</M>. It is the correct value; do not
                    parse <M>instruments[].amount</M> assuming plain decimal.
                  </Note>
                  <Note tone="warn" title="Do not use this for an issuer or registrar party.">
                    It sums holdings where the party is a{" "}
                    <em className="text-ink">stakeholder</em>, and a registrar is a
                    stakeholder on every holding of its own instruments — so the figure
                    over-counts badly. For that case read the ACS with{" "}
                    <M>POST /v1/ledger/active-contracts</M> and filter on the interface
                    view&rsquo;s <M>owner</M> yourself.
                  </Note>
                </Endpoint>

                <Endpoint
                  id="get-wallet-contracts"
                  method="GET"
                  path="/v1/wallets/{partyId}/contracts"
                  tags={
                    <>
                      <Tag kind="key">api key</Tag>
                      <Tag kind="node">node</Tag>
                    </>
                  }
                >
                  <P>
                    <M>?limit=25&amp;cursor=&lt;offset&gt;</M> — returns a bare array.{" "}
                    <M>cursor</M> is an integer <span className="text-ink">offset</span> here,
                    unlike the id cursors elsewhere.
                  </P>
                  <Code>{`[ { "contractId": "00abc…", "asset": "Amulet", "amount": "1200" } ]`}</Code>
                  <Note tone="warn">
                    The <M>instrument</M> query param is accepted and validated but{" "}
                    <span className="text-ink">not applied</span>. Filter client-side, or use{" "}
                    <M>POST /v1/ledger/active-contracts</M> with a <M>templateId</M>.
                  </Note>
                </Endpoint>

                <Endpoint
                  id="get-wallet-preapproval"
                  method="GET"
                  path="/v1/wallets/{partyId}/preapproval"
                  tags={<Tag kind="key">api key</Tag>}
                >
                  <Code>{`{ "partyId": "alice::1220abc…", "isPreApproved": true, "status": "active" }`}</Code>
                  <P>
                    This reports the Amulet / Splice Wallet preapproval only. For a Utility
                    Registry instrument, check the ACS for a <M>TransferPreapproval</M>{" "}
                    contract instead.
                  </P>
                </Endpoint>

                <Endpoint
                  id="post-wallet-preapproval-prepare"
                  method="POST"
                  path="/v1/wallets/{partyId}/preapproval/prepare"
                  title="Two request families, discriminated on registry."
                  tags={
                    <>
                      <Tag kind="key">api key</Tag>
                      <Tag kind="scoped">party-scoped</Tag>
                    </>
                  }
                >
                  <P>
                    <span className="text-ink">Amulet / CC</span> (the default when{" "}
                    <M>registry</M> is omitted) — creates a Splice{" "}
                    <M>TransferPreapprovalProposal</M>:
                  </P>
                  <Code>{`{ "registry": "amulet", "instrument": { "id": "Amulet", "admin": "dso::1220…" } }`}</Code>
                  <P>
                    <span className="text-ink">Utility Registry</span> (USDCx, CBTC, …) —
                    creates a receiver-initiated <M>TransferPreapproval</M> scoped to an
                    operator and a registrar:
                  </P>
                  <Code>{`{
  "registry": "utility",
  "operatorPartyId": "operator::1220…",
  "registrarPartyId": "issuer::1220…",
  "instrumentAllowances": [ { "id": "USDCx" } ],
  "templateId": "#package-name:Module:TransferPreapproval"
}`}</Code>
                  <P>
                    Each allowance is <M>{`{ "id": "…" }`}</M> and nothing else — the Daml
                    template rejects an <M>admin</M> key; the instrument admin comes from{" "}
                    <M>registrarPartyId</M>. An empty or omitted <M>instrumentAllowances</M>{" "}
                    means <em className="text-ink">all</em> instruments from that registrar.
                  </P>
                  <Note>
                    <M>POST /v1/utility-registry/preapproval/prepare</M> is the same operation
                    with the operator and registrar defaulted from configuration — usually the
                    one you want. Either submit path commits it:{" "}
                    <M>/v1/transfers/broadcast</M> is verified on USDCx and CBTC, and{" "}
                    <M>/v1/interactive/execute</M> is the safe fallback.
                  </Note>
                </Endpoint>
              </Section>

              {/* ─── 06 TRANSFERS ─── */}
              <Section id="transfers" title="Transfers">
                <P>
                  The typed CC / CIP-56 money path. Every mutating call here is party-scoped.
                </P>

                <Endpoint
                  id="post-transfers-prepare"
                  method="POST"
                  path="/v1/transfers/prepare"
                  tags={
                    <>
                      <Tag kind="key">api key</Tag>
                      <Tag kind="scoped">party-scoped</Tag>
                      <Tag kind="node">node</Tag>
                    </>
                  }
                >
                  <Code>{`{
  "senderPartyId": "alice::1220abc…",
  "receiverPartyId": "bob::1220def…",
  "amount": "10.5",
  "instrument": { "id": "Amulet", "admin": "dso::1220…" },
  "expiryDate": "2026-08-27T00:00:00Z",
  "memo": "invoice 4471",
  "registryChoiceContext": { "factoryId": "00fac…", "choiceContext": {} }
}`}</Code>
                  <P>
                    <M>memo</M> is at most 256 characters. Returns a prepared submission.
                  </P>
                  <Note
                    tone="warn"
                    title="registryChoiceContext is required for any instrument Cove is not the registrar for."
                  >
                    This route does not resolve a foreign registry: it uses a caller-supplied
                    context, then the choice-context cache, then the default registry. Fetch
                    the factory from the owning registry yourself (
                    <M>POST {`{registryBase}`}/registry/transfer-instruction/v1/transfer-factory</M>
                    ) and pass <M>{`{ factoryId, choiceContext }`}</M>. <M>choiceContext</M> is
                    a free-form record, so the registry&rsquo;s <M>disclosedContracts</M> ride
                    through untouched. For an instrument Cove{" "}
                    <em className="text-ink">is</em> the registrar for, omitting it is fine —
                    though a pre-fetched context still saves the lookup when batching.
                  </Note>
                </Endpoint>

                <Endpoint
                  id="post-transfers-bulk"
                  method="POST"
                  path="/v1/transfers/prepare/bulk"
                  title="One prepared transaction paying many recipients."
                  tags={
                    <>
                      <Tag kind="key">api key</Tag>
                      <Tag kind="scoped">party-scoped</Tag>
                      <Tag kind="node">node</Tag>
                    </>
                  }
                >
                  <Code>{`{
  "partyId": "alice::1220abc…",
  "receivers": [
    { "recipient": "bob::1220def…", "amount": "10", "memo": "a" },
    { "recipient": "carol::1220ghi…", "amount": "5", "expiryDate": "2026-08-27T00:00:00Z" }
  ],
  "instrument": { "id": "Amulet", "admin": "dso::1220…" }
}`}</Code>
                  <P>
                    <M>receivers</M> is 1–50, on every tier.
                  </P>
                </Endpoint>

                <Endpoint
                  id="post-transfers-accept"
                  method="POST"
                  path="/v1/transfers/accept · reject · withdraw"
                  title="Same body for all three; each returns a prepared submission to sign and broadcast."
                  tags={
                    <>
                      <Tag kind="key">api key</Tag>
                      <Tag kind="scoped">party-scoped</Tag>
                    </>
                  }
                >
                  <Code>{`{
  "partyId": "bob::1220def…",
  "transferContractId": "00inst…",
  "instrument": { "id": "USDCx", "admin": "decentralized-usdc-interchain-rep::1220…" },
  "synchronizerId": "global-domain::1220…",
  "registryApiUrl": "https://api.utilities.digitalasset.com/api/token-standard/v0/registrars/<registrar>",
  "registryChoiceContext": { "choiceContextData": { }, "disclosedContracts": [ ] }
}`}</Code>
                  <P>
                    <M>accept</M> and <M>reject</M> are the receiver&rsquo;s choices;{" "}
                    <M>withdraw</M> is the sender&rsquo;s. Everything except <M>partyId</M>{" "}
                    and <M>transferContractId</M> is optional.
                  </P>
                  <P>
                    The choice context comes from the registry that owns the instrument, and
                    Cove resolves that registry itself — you do not have to pass a URL, and
                    there is no per-token configuration to maintain. Resolution order:
                  </P>
                  <ol className="ml-5 list-decimal space-y-1.5 text-[15px] leading-relaxed text-ink-muted">
                    <li>
                      <M>registryChoiceContext</M> — used as-is, no registry call.
                    </li>
                    <li>
                      <M>registryApiUrl</M> — one call, fetched from there.
                    </li>
                    <li>an exact configured mapping for the instrument admin.</li>
                    <li>
                      derived —{" "}
                      <M>{`{host}/api/token-standard/v0/registrars/{admin}`}</M> for each
                      known host, in order, the winner remembered per admin. One host covers
                      every instrument it serves.
                    </li>
                    <li>nothing configured — the default (Amulet) registry.</li>
                  </ol>
                  <P>
                    The instrument admin for steps 3–4 comes from <M>instrument.admin</M> when
                    you send it, otherwise it is read off the <M>TransferInstruction</M>{" "}
                    itself — so <M>{`{ partyId, transferContractId }`}</M> alone is enough.
                    Passing <M>instrument</M> just saves one ACS read.
                  </P>
                  <Note tone="warn">
                    Reaching step 5 with a foreign instrument fails with{" "}
                    <M>TRANSFER_CHOICE_ERROR</M> and{" "}
                    <M>AmuletTransferInstruction &lsquo;&lt;cid&gt;&rsquo; not found</M> — the
                    Amulet registry has never seen another registrar&rsquo;s instruction. If
                    registries <em className="text-ink">were</em> resolved and none answered,
                    it is <M>REGISTRY_CHOICE_CONTEXT_ERROR</M> (502) listing every host tried.
                    <br />
                    <br />
                    <M>synchronizerId</M> matters when the registry&rsquo;s disclosed
                    contracts live on a domain other than the configured default — a mismatch
                    surfaces as contract-not-found.
                  </Note>
                </Endpoint>

                <Endpoint
                  id="post-transfers-broadcast"
                  method="POST"
                  path="/v1/transfers/broadcast"
                  tags={
                    <>
                      <Tag kind="key">api key</Tag>
                      <Tag kind="scoped">party-scoped</Tag>
                    </>
                  }
                >
                  <Code>{`{
  "partyId": "alice::1220abc…",
  "signature": "<base64>",
  "publicKey": "<base64>",
  "preparedTransaction": {
    "preparedTransaction": "<base64 from prepare>",
    "preparedTransactionHash": "<base64 from prepare>",
    "hashingSchemeVersion": "HASHING_SCHEME_VERSION_V2"
  }
}`}</Code>
                  <P>
                    <span className="text-ink">Synchronous</span> by default — waits for
                    Canton and returns 200:
                  </P>
                  <Code>{`{ "status": "confirmed", "transactionId": "1220upd…",
  "cantonUpdateId": "1220upd…", "commandId": "1220upd…" }`}</Code>
                  <P>
                    <M>status</M> is the same terminal value the status endpoint will report —{" "}
                    <M>confirmed</M> or <M>failed</M>, never <M>submitted</M>. The call
                    resolves only once the ledger has accepted, and <M>cantonUpdateId</M> is
                    the commit proof.
                  </P>
                  <P>
                    <span className="text-ink">Asynchronous</span> — send{" "}
                    <M>X-Async: true</M> to enqueue and get 202 immediately:
                  </P>
                  <Code>{`{ "jobId": "412", "commandId": "b2d1c8e0-…", "status": "queued",
  "statusUrl": "/v1/transfers/b2d1c8e0-…/status" }`}</Code>
                  <P>
                    The worker retries 6 times with exponential backoff and reuses the same{" "}
                    <M>commandId</M> as the ledger submission id, so a retry of the same
                    signed transaction is an idempotent resubmission rather than a second
                    execution. Job priority comes from the key&rsquo;s tier.
                  </P>
                  <Note tone="warn" title="A client re-post of the same body is NOT retryable.">
                    The confirmation-request UUID is minted at <M>/prepare</M> time and
                    travels inside <M>preparedTransaction</M>, so re-posting the same body
                    yields <M>DUPLICATE_CONFIRMATION_REQUEST_UUID</M> with an{" "}
                    <M>expireAfter</M> roughly 48 h out. To retry, call <M>/prepare</M> again
                    for a fresh UUID and re-sign. The error means the UUID was consumed,{" "}
                    <span className="text-ink">not</span> that the transaction failed — check
                    whether the first attempt committed before resubmitting.
                  </Note>
                </Endpoint>

                <Endpoint
                  id="get-transfer-status"
                  method="GET"
                  path="/v1/transfers/:commandId/status"
                  title="Scoped to the calling API key. 404 if the command id belongs to another key."
                  tags={<Tag kind="key">api key</Tag>}
                >
                  <Code>{`{
  "commandId": "b2d1c8e0-…",
  "status": "confirmed",
  "transactionId": "1220upd…",
  "createdAt": "2026-08-20T09:41:02.114Z",
  "completedAt": "2026-08-20T09:41:04.902Z"
}`}</Code>
                  <P>
                    <M>status</M> is one of <M>prepared</M>, <M>submitted</M>, <M>queued</M>,{" "}
                    <M>processing</M>, <M>confirmed</M>, <M>failed</M>, <M>dead_letter</M>.{" "}
                    <M>transactionId</M> is the Canton update id, null until confirmed. A sync
                    broadcast is already terminal on the first poll; async broadcasts walk{" "}
                    <M>queued → processing → confirmed / failed / dead_letter</M>.
                  </P>
                </Endpoint>

                <Endpoint
                  id="get-transfers-pending"
                  method="GET"
                  path="/v1/transfers/pending"
                  title="Live read of open TransferInstruction contracts."
                  tags={
                    <>
                      <Tag kind="key">api key</Tag>
                      <Tag kind="node">node</Tag>
                    </>
                  }
                >
                  <P>
                    <M>?partyId=…</M> — returns a bare array.
                  </P>
                  <Code>{`[ { "transferContractId": "00inst…", "sender": "alice::1220abc…",
    "receiver": "bob::1220def…", "amount": "10.5", "status": "pending" } ]`}</Code>
                </Endpoint>

                <Endpoint
                  id="get-transfers-history"
                  method="GET"
                  path="/v1/transfers/history"
                  title="Cove's own transaction log — not a ledger read."
                  tags={<Tag kind="key">api key</Tag>}
                >
                  <P>It contains only transfers this API key broadcast through Cove.</P>
                  <Table
                    head={["Query", "Notes"]}
                    rows={[
                      [<M key="p">partyId</M>, "required"],
                      [<M key="s">status</M>, <M key="s2">pending · confirmed · failed</M>],
                      [
                        <>
                          <M key="a">asset</M>, <M key="c">counterparty</M>
                        </>,
                        "exact match",
                      ],
                      [
                        <>
                          <M key="f">from</M>, <M key="t">to</M>
                        </>,
                        <>
                          ISO 8601 datetimes, filter on <M key="ca">createdAt</M>
                        </>,
                      ],
                      [<M key="so">sort</M>, "asc · desc (default desc)"],
                      [
                        <>
                          <M key="l">limit</M>, <M key="cu">cursor</M>
                        </>,
                        "1–100, default 25; id cursor",
                      ],
                    ]}
                  />
                  <P>
                    Returns <M>{`{ items, hasMore, nextCursor }`}</M>.
                  </P>
                </Endpoint>

                <Endpoint
                  id="post-transfers-context"
                  method="POST"
                  path="/v1/transfers/context"
                  title="Fetch the transfer-factory choice context without preparing anything."
                  tags={
                    <>
                      <Tag kind="key">api key</Tag>
                      <Tag kind="scoped">party-scoped</Tag>
                    </>
                  }
                >
                  <P>
                    Feed the result back as <M>registryChoiceContext</M>, or use it to build a
                    custom multi-leg command via <M>/v1/canton/prepare</M>. The body is the
                    same as <M>prepare</M> minus <M>registryChoiceContext</M> and <M>node</M>.
                  </P>
                </Endpoint>

                <Endpoint
                  id="post-estimate-gas"
                  method="POST"
                  path="/v1/transfers/estimate-gas"
                  title="Always 501 NOT_IMPLEMENTED."
                  tags={<Tag kind="key">api key</Tag>}
                >
                  <P>
                    The real traffic estimate already rides on every prepare response as{" "}
                    <M>trafficCost</M>; for Amulet protocol fees use the x402 fee-preview
                    endpoint.
                  </P>
                </Endpoint>
              </Section>

              {/* ─── 07 CANTON ─── */}
              <Section id="canton" title="Canton operations">
                <P>
                  The escape hatch: drive any Daml template — a third-party venue&rsquo;s AMM,
                  an allocation, a DvP leg — that the typed surface has no model for. None of
                  these accept <M>node</M>.
                </P>

                <Endpoint
                  id="post-canton-prepare"
                  method="POST"
                  path="/v1/canton/prepare"
                  tags={
                    <>
                      <Tag kind="key">api key</Tag>
                      <Tag kind="scoped">party-scoped</Tag>
                    </>
                  }
                >
                  <Code>{`{
  "partyId": "alice::1220abc…",
  "command": { "ExerciseCommand": { "templateId": "#pkg:Module:Entity",
                                    "contractId": "00abc…", "choice": "Swap",
                                    "choiceArgument": {} } },
  "disclosedContracts": [],
  "instrument": { "id": "Amulet", "admin": "dso::1220…" },
  "synchronizerId": "global-domain::1220…"
}`}</Code>
                  <P>
                    Pass <span className="text-ink">exactly one</span> of <M>command</M> (a
                    single command object) or <M>commands</M> (a non-empty array, for several
                    commands in one atomic transaction) — both or neither is 400{" "}
                    <M>VALIDATION_ERROR</M>.
                  </P>
                  <Note>
                    <M>synchronizerId</M> pins the submission to a synchronizer, overriding
                    the node default. You need it when exercising a third-party venue&rsquo;s
                    contracts: their disclosures name their own domain, and a mismatch
                    surfaces as the misleading &ldquo;contract could not be found&rdquo;.
                  </Note>
                </Endpoint>

                <Endpoint
                  id="post-canton-broadcast"
                  method="POST"
                  path="/v1/canton/broadcast"
                  title="Body identical to /v1/transfers/broadcast."
                  tags={
                    <>
                      <Tag kind="key">api key</Tag>
                      <Tag kind="scoped">party-scoped</Tag>
                    </>
                  }
                >
                  <P>
                    Returns <M>{`{ status, transactionId?, cantonUpdateId? }`}</M>.
                  </P>
                  <Note tone="warn">
                    It accepts <M>preparedTransactionHash</M> and <M>hashingSchemeVersion</M>{" "}
                    but forwards only <M>preparedTransaction</M> — the legacy path zeroes the
                    hash. If the participant rejects the submission on hash grounds, resubmit
                    through <M>POST /v1/interactive/execute</M>, which sends the real values.
                  </Note>
                </Endpoint>

                <Endpoint
                  id="post-merge-delegation"
                  method="POST"
                  path="/v1/canton/merge-delegation/prepare"
                  title="Prepare the holding-merge delegation — Amulet housekeeping that consolidates fragmented holdings."
                  tags={
                    <>
                      <Tag kind="key">api key</Tag>
                      <Tag kind="scoped">party-scoped</Tag>
                    </>
                  }
                >
                  <Code>{`{ "partyId": "alice::1220abc…" }   ->   PreparedSubmission`}</Code>
                </Endpoint>

                <Endpoint
                  id="post-gas-check"
                  method="POST"
                  path="/v1/canton/gas/check"
                  title="Whether a traffic top-up is outstanding for the party."
                  tags={<Tag kind="key">api key</Tag>}
                >
                  <Code>{`{ "partyId": "alice::1220abc…" }
->
{ "pending": false, "trackingId": "…", "gasAmount": "…" }`}</Code>
                </Endpoint>
              </Section>

              {/* ─── 08 LEDGER ─── */}
              <Section id="ledger" title="Ledger reads">
                <P>
                  Raw ACS and update-log reads that complete the escape hatch: read contracts
                  Cove has no typed model for, recover a contract id a choice created but did
                  not return, and tell a fill from a cancellation. All four are reads, so none
                  is party-scoped; all four accept <M>node</M>.
                </P>

                <Endpoint
                  id="post-active-contracts"
                  method="POST"
                  path="/v1/ledger/active-contracts"
                  tags={
                    <>
                      <Tag kind="key">api key</Tag>
                      <Tag kind="node">node</Tag>
                    </>
                  }
                >
                  <Code>{`{
  "partyId": "alice::1220abc…",
  "templateId": "#splice-amulet:Splice.Amulet:Amulet",
  "includeBlob": false,
  "includeInterfaceView": true
}`}</Code>
                  <Table
                    head={["Field", "Notes"]}
                    rows={[
                      [
                        <M key="t">templateId</M>,
                        <>
                          fully qualified, e.g. <M key="t2">#pkg-name:Module:Entity</M>
                        </>,
                      ],
                      [
                        <M key="i">interfaceId</M>,
                        "returns the interface view alongside each contract",
                      ],
                      [
                        <M key="e">entityName</M>,
                        "last template segment, matched client-side over a wildcard sweep — use when you do not know the package",
                      ],
                      [
                        <M key="b">includeBlob</M>,
                        <>
                          include <M key="b2">createdEventBlob</M> so results can be forwarded
                          as disclosures (default false)
                        </>,
                      ],
                      [<M key="v">includeInterfaceView</M>, "default true"],
                    ]}
                  />
                  <P>
                    <M>templateId</M> and <M>interfaceId</M> are mutually exclusive (400
                    otherwise).
                  </P>
                  <Code>{`{
  "partyId": "alice::1220abc…",
  "count": 2,
  "contracts": [
    { "templateId": "#pkg:Module:Entity", "contractId": "00abc…",
      "synchronizerId": "global-domain::1220…", "createArgument": { },
      "interfaceViews": [ ], "createdEventBlob": "<base64, only if includeBlob>" }
  ]
}`}</Code>
                </Endpoint>

                <Endpoint
                  id="post-ledger-update"
                  method="POST"
                  path="/v1/ledger/update"
                  title="One transaction's events, by update id."
                  tags={
                    <>
                      <Tag kind="key">api key</Tag>
                      <Tag kind="node">node</Tag>
                    </>
                  }
                >
                  <Code>{`{ "partyId": "alice::1220abc…", "updateId": "1220upd…", "shape": "LEDGER_EFFECTS" }`}</Code>
                  <P>
                    <M>shape</M> is <M>ACS_DELTA</M> (default — &ldquo;what did my submission
                    create&rdquo;) or <M>LEDGER_EFFECTS</M>, which also reports{" "}
                    <em className="text-ink">which choice ran</em> — the only shape that
                    distinguishes a fill from a cancellation, since both archive the contract.
                  </P>
                  <Code>{`{ "updateId": "1220upd…", "created": [ … ],
  "exercised": [ { "contractId": "00abc…", "templateId": "#pkg:Module:Entity",
                   "choice": "Swap", "choiceArgument": { }, "exerciseResult": { },
                   "consuming": true, "actingParties": ["alice::1220abc…"] } ] }`}</Code>
                  <P>
                    <M>exercised</M> is empty unless you asked for <M>LEDGER_EFFECTS</M>.
                  </P>
                </Endpoint>

                <Endpoint
                  id="post-consuming-exercise"
                  method="POST"
                  path="/v1/ledger/consuming-exercise"
                  title="Which choice consumed a contract, searched backwards from the ledger end."
                  tags={
                    <>
                      <Tag kind="key">api key</Tag>
                      <Tag kind="node">node</Tag>
                    </>
                  }
                >
                  <Code>{`{ "partyId": "alice::1220abc…", "contractId": "00abc…", "offsetsBack": 4000 }`}</Code>
                  <P>
                    <M>offsetsBack</M> is 1–100 000, default 4 000.
                  </P>
                  <Code>{`{ "contractId": "00abc…", "found": true,
  "exercise": { "choice": "Swap", "consuming": true, "updateId": "1220upd…" } }`}</Code>
                  <Note tone="warn">
                    <M>found: false</M> means{" "}
                    <span className="text-ink">not found in this window</span> — which is not
                    the same as &ldquo;still active&rdquo;. Widen <M>offsetsBack</M> before
                    concluding anything.
                  </Note>
                </Endpoint>

                <Endpoint
                  id="get-packages"
                  method="GET"
                  path="/v1/ledger/packages"
                  title="Package ids vetted on the connected participant."
                  tags={
                    <>
                      <Tag kind="key">api key</Tag>
                      <Tag kind="node">node</Tag>
                    </>
                  }
                >
                  <Code>{`{ "count": 214, "packageIds": ["1220pkg…", "…"] }`}</Code>
                  <P>
                    A preflight for third-party workflows: exercising a venue&rsquo;s template
                    by package <em className="text-ink">name</em> only resolves if some
                    upgrade-compatible version is vetted here, and the failure when it is not
                    (<M>TEMPLATES_OR_INTERFACES_NOT_FOUND</M>) reads like a bad template id
                    rather than a missing DAR.
                  </P>
                </Endpoint>
              </Section>

              {/* ─── 09 UTILITY REGISTRY ─── */}
              <Section id="utility-registry" title="Utility Registry">
                <P>
                  Utility Registry instruments (USDCx, CBTC, …). These are{" "}
                  <span className="text-ink">not</span> Amulet: the instrument admin — the
                  registrar / issuer — is a validator-hosted party, so issuance runs as the
                  issuer and <span className="text-ink">no client key is involved in the mint</span>.
                  A holding is self-minted to the issuer, then delivered to a receiver holding
                  a matching <M>TransferPreapproval</M>, atomically.
                </P>
                <P>
                  Issuer, operator, validator, package ids and synchronizer come from
                  deployment configuration. Any of them can be overridden per request with an
                  optional <M>reg</M> object, on every endpoint in this section:
                </P>
                <Code>{`{
  "reg": {
    "issuerPartyId": "issuer::1220…",
    "operatorPartyId": "operator::1220…",
    "validatorPartyId": "validator::1220…",
    "regAppPackageId": "1220pkg…",
    "synchronizerId": "global-domain::1220…",
    "regAppPackageName": "utility-registry-app",
    "registryPackageName": "utility-registry",
    "allocationFactoryId": "00fac…"
  }
}`}</Code>

                <div className="rounded-xl border border-brand-teal/25 bg-brand-teal/[0.05] p-5">
                  <p className="mb-3 font-mono text-[10px] uppercase tracking-[0.18em] text-brand-mint">
                    The preapproval-then-fund flow
                  </p>
                  <Code>{`1. POST /v1/utility-registry/preapproval/prepare  { receiverPartyId }
2. receiver signs preparedTransactionHash (client-side, Ed25519)
3. POST /v1/interactive/execute  { partyId: receiver, signature, publicKey, prepared… }`}</Code>
                  <p className="mt-3 text-[13.5px] leading-relaxed text-ink-muted">
                    Once the pre-approval is live the registrar can settle into that account
                    directly, with no further signature from the receiver. Issuance itself
                    runs as the issuer and is not part of the client surface.
                  </p>
                </div>

                <Endpoint
                  id="post-ur-factory"
                  method="POST"
                  path="/v1/utility-registry/factory"
                  title="Discover the AllocationFactory, InstrumentConfiguration and TransferRule for an instrument."
                  tags={
                    <>
                      <Tag kind="key">api key</Tag>
                      <Tag kind="node">node</Tag>
                    </>
                  }
                >
                  <Code>{`{ "instrumentId": "USDCx" }
->
{ "allocationFactoryId": "00fac…",
  "instrumentConfig": { "contractId": "00cfg…" },
  "transferRule":     { "contractId": "00rul…" } }`}</Code>
                  <Note tone="warn" title="Registry factory endpoints are disclosure-gated.">
                    They only answer for a party with{" "}
                    <span className="text-ink">real owned holdings</span> of the instrument —
                    keep a permanent dust holding, or these calls start failing once the
                    balance hits zero. Two distinct rejections: no contract ids at all gives{" "}
                    <M>400 &ldquo;No holdings provided&rdquo;</M>, while a fabricated or
                    already-spent id gives <M>&ldquo;Given holdings are invalid&rdquo;</M>.
                    Holding contract ids are single-use — a transfer archives its input and
                    creates a fresh change holding, so re-read the sender&rsquo;s holdings
                    before every send.
                  </Note>
                </Endpoint>

{SHOW.registryIssuance && (
                <Endpoint
                  id="post-ur-mint"
                  method="POST"
                  path="/v1/utility-registry/mint"
                  title="Self-mint a holding to the issuer. No client signature."
                  tags={
                    <>
                      <Tag kind="key">api key</Tag>
                      <Tag kind="admin">admin secret</Tag>
                      <Tag kind="node">node</Tag>
                    </>
                  }
                >
                  <Code>{`{ "instrumentId": "USDCx", "amount": "1000", "reference": "topup-2026-08-20" }
->
{ "holdingCid": "00hold…", "mintOfferCid": "00offer…", "updateId": "1220upd…" }`}</Code>
                  <P>
                    <M>reference</M> is optional here; when supplied, an existing mint offer
                    for that reference is adopted rather than a second one created, so a crash
                    mid-mint never double-mints. Prefer <M>/issue</M> for anything
                    customer-facing — it is the idempotent, resumable version.
                  </P>
                </Endpoint>
)}

                <Endpoint
                  id="post-ur-transfer-context"
                  method="POST"
                  path="/v1/utility-registry/transfer-context"
                  title="Assemble a direct transfer context — for a DvP leg, or to hand to /v1/canton/prepare."
                  tags={
                    <>
                      <Tag kind="key">api key</Tag>
                      <Tag kind="node">node</Tag>
                    </>
                  }
                >
                  <Code>{`{ "receiverPartyId": "bob::1220def…", "instrumentId": "USDCx" }
->
{ "factoryId": "00fac…", "transferKind": "direct",
  "choiceContext": { "choiceContextData": { "values": { } } } }`}</Code>
                </Endpoint>

                <Endpoint
                  id="post-ur-transfer"
                  method="POST"
                  path="/v1/utility-registry/transfer"
                  title="Deliver an existing issuer holding to a receiver, direct settlement against their preapproval."
                  tags={
                    <>
                      <Tag kind="key">api key</Tag>
                      <Tag kind="admin">admin secret</Tag>
                      <Tag kind="node">node</Tag>
                    </>
                  }
                >
                  <Code>{`{ "holdingCid": "00hold…", "receiverPartyId": "bob::1220def…",
  "instrumentId": "USDCx", "amount": "1000" }
->
{ "updateId": "1220upd…", "executedTransferCid": "00xfer…" }`}</Code>
                  <P>
                    <M>executedTransferCid</M> may be <M>null</M> when the transfer completes
                    without leaving a contract.
                  </P>
                </Endpoint>

{SHOW.registryIssuance && (
                <Endpoint
                  id="post-ur-issue"
                  method="POST"
                  path="/v1/utility-registry/issue"
                  title="Mint and deliver in one call, exactly-once per reference. This is the endpoint to integrate against."
                  tags={
                    <>
                      <Tag kind="key">api key</Tag>
                      <Tag kind="admin">admin secret</Tag>
                      <Tag kind="node">node</Tag>
                    </>
                  }
                >
                  <Code>{`{ "receiverPartyId": "bob::1220def…", "instrumentId": "USDCx",
  "amount": "1000", "reference": "swap-8f21c4" }
->
{ "holdingCid": "00hold…", "transferUpdateId": "1220upd…",
  "status": "delivered", "alreadyDelivered": false }`}</Code>
                  <P>
                    <M>reference</M> is <span className="text-ink">required</span> here
                    (unlike <M>/mint</M>) because it is the exactly-once key. Use a stable,
                    high-entropy id — the swap id, the settlement id. Progress is persisted:
                  </P>
                  <Code>{`pending --(mint)--> minted --(transfer)--> delivered`}</Code>
                  <P>A repeated call resumes from the last persisted step:</P>
                  <ul className="ml-5 list-disc space-y-1.5 text-[15px] leading-relaxed text-ink-muted">
                    <li>
                      <M>delivered</M> — returns the stored result with{" "}
                      <M>alreadyDelivered: true</M>, no ledger work.
                    </li>
                    <li>
                      <M>minted</M> — the issuer holding exists and may already have been
                      delivered by a crashed attempt. Cove commit-proofs it and adopts that
                      transfer&rsquo;s update id rather than transferring again.
                    </li>
                    <li>
                      <M>pending</M> — mints, adopting any existing mint offer for the
                      reference.
                    </li>
                  </ul>
                  <Note tone="warn" title="Serialize per reference.">
                    A double mint would break the issuer&rsquo;s 1:1 collateral invariant and a
                    double delivery would double-pay the receiver, so this is deliberately the
                    most defensive endpoint in the API. The intended pattern is a queue with{" "}
                    <M>jobId = reference</M>, at-most-one in flight. A concurrent duplicate
                    degrades to &ldquo;adopt the same offer&rdquo; rather than double-minting,
                    but do not rely on that as the primary guard. On failure the record is
                    marked <M>failed</M> and the call throws; retry the same reference.
                  </Note>
                </Endpoint>
)}

{SHOW.registryIssuance && (
                <Endpoint
                  id="get-ur-issue"
                  method="GET"
                  path="/v1/utility-registry/issue/:reference"
                  title="Resolve the fate of an issue after a crash or timeout — before deciding to retry or refund."
                  tags={<Tag kind="key">api key</Tag>}
                >
                  <Code>{`{ "reference": "swap-8f21c4", "status": "delivered", "holdingCid": "00hold…",
  "transferUpdateId": "1220upd…", "errorMessage": null }`}</Code>
                  <P>
                    <M>status</M> is <M>pending</M> / <M>minted</M> / <M>delivered</M> /{" "}
                    <M>failed</M>. 404 <M>ISSUE_RECORD_NOT_FOUND</M> if the reference was never
                    seen — which is a meaningful answer: nothing was minted.
                  </P>
                </Endpoint>
)}

                <Endpoint
                  id="post-ur-preapproval-prepare"
                  method="POST"
                  path="/v1/utility-registry/preapproval/prepare"
                  title="Build the receiver's TransferPreapproval create command for signing."
                  tags={
                    <>
                      <Tag kind="key">api key</Tag>
                      <Tag kind="scoped">party-scoped</Tag>
                      <Tag kind="node">node</Tag>
                    </>
                  }
                >
                  <Code>{`{
  "receiverPartyId": "bob::1220def…",
  "operatorPartyId": "operator::1220…",
  "registrarPartyId": "issuer::1220…",
  "instrumentAllowances": [ { "id": "USDCx" } ],
  "templateId": "#pkg-name:Module:TransferPreapproval"
}`}</Code>
                  <P>
                    <M>operatorPartyId</M> and <M>registrarPartyId</M> resolve{" "}
                    <M>body → reg override → configuration</M>, so{" "}
                    <M>{`{ "receiverPartyId": "…" }`}</M> alone is usually enough, and a body
                    carrying both parties works on a deployment that is not configured at all.
                    Empty <M>instrumentAllowances</M> means all instruments from that
                    registrar. Note the shape difference from the wallet variant: allowances
                    here are <M>{`{ id }`}</M> only, not <M>{`{ admin, id }`}</M>.
                  </P>
                </Endpoint>

                <Endpoint
                  id="post-interactive-execute"
                  method="POST"
                  path="/v1/interactive/execute"
                  title="Commit any prepared submission with one external signature, passing the real hash and hashing scheme."
                  tags={
                    <>
                      <Tag kind="key">api key</Tag>
                      <Tag kind="scoped">party-scoped</Tag>
                    </>
                  }
                >
                  <Code>{`{
  "partyId": "bob::1220def…",
  "signature": "<base64>",
  "publicKey": "<base64>",
  "preparedTransaction": "<base64 from prepare>",
  "preparedTransactionHash": "<base64 from prepare>",
  "hashingSchemeVersion": "HASHING_SCHEME_VERSION_V2"
}
->
{ "status": "confirmed", "cantonUpdateId": "1220upd…" }`}</Code>
                  <Note>
                    Note the flat body: <M>preparedTransaction</M> is a{" "}
                    <span className="text-ink">string</span> here, whereas{" "}
                    <M>/v1/transfers/broadcast</M> and <M>/v1/canton/broadcast</M> nest it in
                    an object. Despite living under the utility-registry routes, this endpoint
                    is general — use it for any prepared submission whose hash the participant
                    validates.
                  </Note>
                </Endpoint>
              </Section>

              {/* ─── 10 BURN / MINT ─── */}
              {SHOW.burnMint && (
              <Section id="burn-mint" title="Burn / mint">
                <P>
                  For token issuers on a burn/mint-capable registry.{" "}
                  <M>BurnMintFactory_BurnMint</M> burns the input holdings and creates the
                  outputs in one transaction; with no inputs it is a pure mint, with no
                  outputs a pure burn. None of these accept <M>node</M>.
                </P>

                <Endpoint
                  id="post-bm-context"
                  method="POST"
                  path="/v1/burn-mint/context"
                  title="Pre-fetch the factory context from the registry. No body required."
                  tags={<Tag kind="key">api key</Tag>}
                >
                  <Code>{`{ "factoryId": "00fac…", "choiceContext": { }, "disclosedContracts": [ ] }`}</Code>
                  <P>
                    Pass the result back as <M>factoryContext</M> on <M>/prepare</M> to skip
                    the registry round trip.
                  </P>
                </Endpoint>

                <Endpoint
                  id="post-bm-prepare"
                  method="POST"
                  path="/v1/burn-mint/prepare"
                  tags={<Tag kind="key">api key</Tag>}
                >
                  <Code>{`{
  "adminPartyId": "issuer::1220…",
  "instrument": { "id": "USDCx", "admin": "issuer::1220…" },
  "inputHoldingCids": ["00hold…"],
  "outputs": [ { "owner": "bob::1220def…", "amount": "500", "context": { } } ],
  "extraActors": ["bob::1220def…"],
  "meta": { },
  "factoryContext": { "factoryId": "00fac…", "choiceContext": { }, "disclosedContracts": [ ] },
  "templateId": "#pkg-name:Module:BurnMintFactory"
}`}</Code>
                  <P>
                    <M>inputHoldingCids</M> and <M>outputs</M> both default to <M>[]</M>, but
                    cannot both be empty (400). Returns a prepared submission.
                  </P>
                  <Note tone="warn" title="extraActors is the mint-to-receiver requirement.">
                    A <M>TransferPreapproval</M> does <span className="text-ink">not</span>{" "}
                    substitute for BurnMint authorization — confirmed on a live network. To
                    mint into someone else&rsquo;s account, put the receiver in{" "}
                    <M>extraActors</M> and have them co-sign.
                  </Note>
                </Endpoint>

                <Endpoint
                  id="post-bm-broadcast"
                  method="POST"
                  path="/v1/burn-mint/broadcast"
                  title="Multi-signature submit."
                  tags={<Tag kind="key">api key</Tag>}
                >
                  <Code>{`{
  "preparedTransaction": "<base64 from prepare>",
  "submissionId": "<the commandId from prepare>",
  "signers": [
    { "partyId": "issuer::1220…", "signature": "<base64>", "publicKey": "<base64>" },
    { "partyId": "bob::1220def…", "signature": "<base64>", "publicKey": "<base64>" }
  ]
}
->
{ "submissionId": "b2d1c8e0-…" }`}</Code>
                  <P>
                    <M>signers</M> needs at least one entry; every party in <M>extraActors</M>{" "}
                    must appear, each signing <span className="text-ink">the same</span>{" "}
                    <M>preparedTransactionHash</M>. <M>submissionId</M> is the{" "}
                    <M>commandId</M> from the prepare response.
                  </P>
                  <Code>{`1. POST /v1/burn-mint/prepare   { adminPartyId, extraActors: [receiver], outputs: […] }
                                -> { preparedTransactionHash, preparedTransaction, commandId }
2. admin signs preparedTransactionHash    -> adminSig
   receiver signs the SAME hash           -> receiverSig
3. POST /v1/burn-mint/broadcast { preparedTransaction, submissionId: commandId,
                                  signers: [admin, receiver] }`}</Code>
                </Endpoint>
              </Section>
              )}

{/* ─── 11 X402 ─── */}
              <Section id="x402" title="x402 paid surface">
                <P>
                  Pay-per-call in Canton Coin. <span className="text-ink">No API key</span> —
                  in x402 the payment <em className="text-ink">is</em> the credential. Cove is
                  the merchant and resource server; the agent&rsquo;s facilitator prepares,
                  submits and pays the Canton traffic, so this path needs no ledger write
                  access on our side.
                </P>
                <Note>
                  One hard constraint: the <em className="text-ink">payer</em> party must be
                  hosted by the facilitator, because its relay reads payer holdings from its
                  own participant. The <em className="text-ink">merchant</em> party need not
                  be — preapproval lookup is Scan-backed.
                </Note>

                <h3 className="pt-2 text-lg font-semibold text-ink">Wire format</h3>
                <P>x402 v2, headers in both directions, base64-encoded JSON.</P>
                <Table
                  head={["Header", "Direction", "Meaning"]}
                  rows={[
                    [
                      <M key="a">X-PAYMENT-REQUIRED</M>,
                      "response (402)",
                      <>
                        the requirements, including price and <M key="a2">payTo</M>
                      </>,
                    ],
                    [
                      <M key="b">X-PAYMENT-SIGNATURE</M>,
                      "request",
                      <>
                        the payment envelope (legacy <M key="b2">X-PAYMENT</M> also accepted)
                      </>,
                    ],
                    [<M key="c">X-PAYMENT-RESPONSE</M>, "response (200)", "the settle receipt"],
                  ]}
                />
                <P>
                  A 402 also repeats the requirements in the body — clients ignore it; it is
                  there so a human with curl can read the price without decoding a header.
                  Guard order:
                </P>
                <Code>{`1. no X-PAYMENT-SIGNATURE          -> 402 + requirements header
2. undecodable header              -> 400 MALFORMED_PAYMENT_HEADER
3. claim does not match our price  -> 402, facilitator NOT called
4. facilitator /verify says invalid-> 402 with their reason
5. /settle not success             -> 402 with their reason
6. success                         -> handler runs, X-PAYMENT-RESPONSE set`}</Code>
                <P>Two non-402 failure modes matter to an integrator:</P>
                <ul className="ml-5 list-disc space-y-1.5 text-[15px] leading-relaxed text-ink-muted">
                  <li>
                    <M>400 PAYMENT_ENVELOPE_REJECTED</M> — the facilitator understood us and
                    refused the envelope. Retrying is futile; fix the envelope, their message
                    names the field.
                  </li>
                  <li>
                    <M>502 FACILITATOR_UNAVAILABLE</M> — our dependency is down, not your
                    payment. <span className="text-ink">Retry with the same payment.</span>
                  </li>
                </ul>
                <Note tone="warn" title="One payment, one delivery.">
                  After a successful settle the guard claims the facilitator&rsquo;s update id
                  as a redemption ticket and refuses a second delivery with{" "}
                  <M>402 payment_already_redeemed</M>. Nothing in x402 binds a settle to a
                  delivery, so a replayed payment header would otherwise re-verify and settle
                  straight back to the recorded success. Pay again to buy another unit. A
                  retry after a response you lost costs a verify + settle round trip and then
                  answers 402 — double <em className="text-ink">charging</em> remains
                  impossible two layers down, so a lost response costs you nothing but the
                  call.
                </Note>

                <Endpoint
                  id="get-x402-info"
                  method="GET"
                  path="/v1/x402/info"
                  title="Free, unpriced on purpose — an agent must be able to discover the price and the payTo party without paying to find out what they cost."
                  tags={<Tag kind="public">no auth</Tag>}
                >
                  <Code>{`{
  "x402Version": 2,
  "network": "canton:mainnet",
  "payTo": "cove::1220…",
  "facilitator": "https://facilitator.example",
  "instrument": { "admin": "dso::1220…", "id": "Amulet" },
  "feePayer": "payer::1220…",
  "synchronizerId": "global-domain::1220…",
  "routes": [
    { "method": "GET",  "path": "/v1/x402/ping",
      "priceCc": "0.01", "priceAtomic": "100000000", "description": "…" },
    { "method": "POST", "path": "/v1/x402/transfers/fee-preview",
      "priceCc": "0.02", "priceAtomic": "200000000", "description": "…" }
  ],
  "notes": [ "…" ]
}`}</Code>
                  <P>
                    <M>priceAtomic</M> is CC × 10^10.
                  </P>
                  <P>
                    <span className="text-ink">Paying in something other than Canton Coin.</span>{" "}
                    The surface can quote several instruments for the same route.{" "}
                    <M>instruments[]</M> lists every instrument accepted, primary first;{" "}
                    <M>routes[].accepts[]</M> lists every way to pay that route, each with its
                    own price. Prices are set per instrument, not converted between them — pay
                    whichever you hold, echo that entry as <M>accepted</M> in your envelope and
                    the guard pins to it. Pinning matches on <M>extra.instrumentId</M>, so a
                    claim that pays the cheap instrument&rsquo;s amount under the dear
                    instrument&rsquo;s entry is refused before the facilitator is called.
                  </P>
                </Endpoint>

                <Endpoint
                  id="get-x402-ping"
                  method="GET"
                  path="/v1/x402/ping"
                  title="Liveness echo — proves the payment loop with no data involved."
                  tags={<Tag kind="x402">x402 payment</Tag>}
                >
                  <Code>{`{ "ok": true, "at": "2026-08-20T09:41:02.114Z", "paidBy": "payer::1220…",
  "amount": "0.01", "asset": "CC",
  "instrument": { "admin": "dso::1220…", "id": "Amulet" },
  "transaction": "1220upd…" }`}</Code>
                  <P>
                    <M>amount</M> is in the units of whichever instrument paid; <M>asset</M>{" "}
                    and <M>instrument</M> say which one settled, taken from the pinned entry
                    rather than from the client&rsquo;s envelope. Keep <M>transaction</M> — the
                    Canton update id of the payment is the only receipt on our side tying a
                    payer to a ledger update, and it is the ticket this payment was redeemed
                    with.
                  </P>
                </Endpoint>

                <Endpoint
                  id="post-x402-fee-preview"
                  method="POST"
                  path="/v1/x402/transfers/fee-preview"
                  title="The live Amulet fee schedule applied to your amount, plus current network pricing."
                  tags={<Tag kind="x402">x402 payment</Tag>}
                >
                  <Code>{`{ "amountCc": "100", "outputCount": 2 }`}</Code>
                  <P>
                    All fields optional. <M>outputCount</M> is 1–100 (default 1).
                  </P>
                  <Code>{`{
  "basis": "fee-schedule",
  "amuletFees": {
    "createFee": "0.03", "transferFeeInitialRate": "0.01", "transferFeeSteps": [],
    "holdingFeeRatePerRound": "0.0000048", "lockHolderFee": "0.005",
    "maxNumInputs": "100", "maxNumOutputs": "100"
  },
  "pricing": {
    "extraTrafficPriceUsdPerMb": "1.0", "readVsWriteScalingFactor": "4",
    "amuletPriceUsdPerCc": "0.005", "roundNumber": "18422"
  },
  "amuletFeeEstimate": {
    "transferFeeCc": "1", "createFeeCc": "0.06", "subtotalCc": "1.06",
    "transferAmountCc": "100"
  },
  "trafficCost": { "included": false, "code": "TRAFFIC_COST_NOT_MEASURED", "message": "…" },
  "flags": [ { "code": "traffic_cost_not_measured", "severity": "warn", "message": "…" } ]
}`}</Code>
                  <Note tone="warn" title="This deliberately does not return a total cost.">
                    The Amulet terms are the live schedule applied to your amount — exact given
                    the inputs. The Canton traffic term is{" "}
                    <span className="text-ink">absent, not estimated</span>: traffic is priced
                    above a free base-rate allowance and the billed quantity is the sequenced
                    submission, not a payload size, so a byte-derived figure measured wildly
                    high. <M>trafficCost.included</M> is present and <M>false</M> so the
                    omission cannot be missed. For the per-submission byte estimate, read{" "}
                    <M>trafficCost</M> off the prepare response.
                  </Note>
                  <P>
                    <M>flags</M> is machine-readable — branch on <M>code</M>, do not parse the
                    prose. Scan problems surface as <M>503 FEE_PREVIEW_UNCONFIGURED</M> or{" "}
                    <M>502 FEE_PREVIEW_SOURCE_ERROR</M>, deliberately an error rather than a
                    fee defaulted to zero: a confidently wrong price is worse than none for
                    something a customer paid to learn.
                  </P>
                </Endpoint>
              </Section>

              {/* ─── 12 EVENTS ─── */}
              <Section id="events" title="Events">
                <P>
                  An ingester tails the ledger&rsquo;s update stream and publishes per-party
                  events, with a five-minute replay buffer. Both transports authenticate with
                  a short-lived stream token.
                </P>
                <Note>
                  Canton filters an update stream by party as a{" "}
                  <em className="text-ink">stakeholder</em>, so a stream only carries updates
                  its own party is party to — a transfer between two parties that are neither
                  of them produces no event. Every published event is fanned out to every
                  party the event names (signatories, observers, witnesses, acting parties), so
                  both sides of a transfer see it on their own channel.
                </Note>

                <Endpoint
                  id="events-token"
                  method="POST"
                  path="/v1/auth/stream-token"
                  title="Step 1 — get a stream token."
                  tags={<Tag kind="key">api key</Tag>}
                >
                  <Code>{`curl -X POST "$BASE/v1/auth/stream-token" -H "Authorization: Bearer $KEY"
# { "token": "e7c9…", "expiresIn": 60 }`}</Code>
                </Endpoint>

                <Endpoint
                  id="ws-events"
                  method="WS"
                  path="/v1/events?token=…"
                  title="WebSocket. Connect, then subscribe."
                  tags={<Tag kind="key">stream token</Tag>}
                >
                  <Code>{`{ "action": "subscribe", "partyIds": ["alice::1220abc…", "bob::1220def…"] }`}</Code>
                  <P>
                    Acknowledged with <M>{`{ "status": "subscribed", "partyIds": […] }`}</M>. A
                    second subscribe replaces the first. The server pings every 30 s. Auth
                    failures arrive as a JSON error frame followed by a close:
                  </P>
                  <Code>{`{ "error": { "code": "INVALID_TOKEN", "message": "Stream token is invalid or expired" } }`}</Code>
                </Endpoint>

                <Endpoint
                  id="sse-events"
                  method="GET"
                  path="/v1/events/stream?token=…&partyId=…"
                  title="Server-sent events. One party per connection."
                  tags={<Tag kind="key">stream token</Tag>}
                >
                  <Code>{`curl -N "$BASE/v1/events/stream?token=$TOKEN&partyId=alice::1220abc…"`}</Code>
                  <P>
                    <M>partyId</M> is required (400 <M>MISSING_PARTY_ID</M>). Each event is
                    emitted with its <M>eventId</M> as the SSE <M>id</M> and its type as the
                    SSE event name. Headers arrive immediately, followed by{" "}
                    <M>retry: 5000</M> and a <M>: connected</M> comment, then a{" "}
                    <M>: ping</M> comment every 15 s while idle — so a client can tell a live
                    stream from a hung one without waiting for ledger activity. If the
                    subscription cannot be established the stream reports it in-band as an{" "}
                    <M>error</M> event and closes.
                  </P>
                </Endpoint>

                <h3 className="pt-4 text-lg font-semibold text-ink">Event envelope</h3>
                <Code>{`{
  "eventId": "1220upd…-<uuid>",
  "type": "transfer.executed",
  "partyId": "alice::1220abc…",
  "data": {
    "contractId": "00abc…",
    "templateId": "#pkg:Module:Entity",
    "choice": "Transfer",
    "consuming": true,
    "updateId": "1220upd…",
    "effectiveAt": "2026-08-20T09:41:04Z"
  },
  "timestamp": "2026-08-20T09:41:04.902Z"
}`}</Code>

                <Table
                  head={["Type", "Emitted when"]}
                  rows={[
                    [
                      <M key="a">transfer.pending</M>,
                      <>
                        a contract is created whose template id contains{" "}
                        <M key="a2">transfer</M> or <M key="a3">instruction</M>
                      </>,
                    ],
                    [<M key="b">contract.created</M>, "any other created event"],
                    [
                      <M key="c">transfer.executed</M>,
                      <>
                        the <M key="c2">Transfer</M> or <M key="c3">Execute</M> choice is
                        exercised
                      </>,
                    ],
                    [
                      <M key="d">transfer.accepted</M>,
                      <>
                        the <M key="d2">Accept</M> choice is exercised
                      </>,
                    ],
                    [
                      <M key="e">transfer.rejected</M>,
                      <>
                        the <M key="e2">Reject</M> choice is exercised
                      </>,
                    ],
                    [
                      <M key="f">transfer.withdrawn</M>,
                      <>
                        the <M key="f2">Withdraw</M> choice is exercised
                      </>,
                    ],
                    [<M key="g">contract.archived</M>, "an archived event"],
                    [
                      <M key="h">choice.&lt;lowercased-name&gt;</M>,
                      "any other exercised choice",
                    ],
                  ]}
                />
                <Note tone="warn">
                  The stream requests Canton&rsquo;s ACS_DELTA shape, which carries{" "}
                  <span className="text-ink">created and archived events only</span> — so in
                  practice you receive <M>contract.created</M> / <M>transfer.pending</M> /{" "}
                  <M>contract.archived</M>. An accept, for instance, arrives as the archive of
                  the offer plus the created holdings. Classification is by string matching on
                  template ids and choice names, so treat <M>type</M> as a hint and{" "}
                  <M>data.templateId</M> as the truth.
                  <br />
                  <br />
                  Events are <span className="text-ink">at-most-once</span>: if no subscriber
                  is listening, the five-minute buffer is the only recovery, and there is no
                  replay-from-offset API. For anything that must not be missed, poll{" "}
                  <M>GET /v1/transfers/:commandId/status</M> or read the ledger.
                </Note>
              </Section>

              {/* ─── 13 ERRORS ─── */}
              <Section id="errors" title="Errors">
                <P>Every error has the same envelope:</P>
                <Code>{`{ "error": { "code": "VALIDATION_ERROR", "message": "Validation failed",
             "details": { "issues": [ ] } } }`}</Code>
                <P>
                  <M>details</M> is present only when the error carries it — notably schema{" "}
                  <M>issues</M> on a 400. An unrecognised internal error is deliberately
                  flattened to <M>INTERNAL_ERROR</M> with no details.
                </P>
                <Table
                  head={["Code", "Status", "Meaning"]}
                  rows={[
                    [<M key="1">VALIDATION_ERROR</M>, "400", <>schema failure; see <M key="1b">details.issues</M></>],
                    [<M key="2">MISSING_PUBLIC_KEY</M>, "400", "party register without a resolvable public key"],
                    [<M key="3">MISSING_PARTY_ID</M>, "400", "SSE without partyId"],
                    [<M key="4">MALFORMED_PAYMENT_HEADER</M>, "400", "x402 payment header could not be decoded"],
                    [<M key="5">PAYMENT_ENVELOPE_REJECTED</M>, "400", "facilitator refused the envelope — do not retry as-is"],
                    [<M key="6">UNAUTHORIZED</M>, "401", "missing or malformed Authorization header"],
                    [<M key="7">INVALID_API_KEY</M>, "401", "key not found"],
                    [<M key="8">API_KEY_REVOKED</M>, "401", "key revoked"],
                    [<M key="9">API_KEY_EXPIRED</M>, "401", "past expiresAt"],
                    [<M key="10">INVALID_TOKEN</M>, "401", "stream token invalid, expired, or already used"],
                    [<M key="11">FORBIDDEN</M>, "403", "party not managed by this account, or admin gate refused"],
                    [<M key="12">IP_NOT_WHITELISTED</M>, "403", "source IP not in the key's whitelist"],
                    [<M key="13">ACCOUNT_SUSPENDED</M>, "403", "account status is not active"],
                    [<M key="14">NOT_FOUND</M>, "404", "unknown party / node / command id / key id, or an unrouted wallet action"],
                    ...(SHOW.registryIssuance
                      ? [[<M key="15">ISSUE_RECORD_NOT_FOUND</M>, "404", "no issue record for that reference"]]
                      : []),
                    [<M key="16">RATE_LIMIT_EXCEEDED</M>, "429", "global IP limit, or the stream-token ceiling"],
                    [<M key="17">INTERNAL_ERROR</M>, "500", "unhandled"],
                    [<M key="18">NOT_IMPLEMENTED</M>, "501", "POST /v1/transfers/estimate-gas"],
                    ...(SHOW.parties
                      ? [[<M key="19">PARTY_RIGHTS_GRANT_FAILED</M>, "502", "party allocated but actAs/readAs grant failed"]]
                      : []),
                    [<M key="20">TRANSACTION_BROADCAST_ERROR</M>, "502", "Canton rejected the submission; the message wraps its error"],
                    [<M key="21">FEE_PREVIEW_SOURCE_ERROR</M>, "502", "scan error, or an unrecognised payload shape"],
                    [<M key="22">FACILITATOR_UNAVAILABLE</M>, "502", "x402 facilitator unreachable — retry with the same payment"],
                    [<M key="23">FEE_PREVIEW_UNCONFIGURED</M>, "503", "fee preview not configured on this deployment"],
                  ]}
                />
                <P>
                  Any error at status ≥ 500 is logged with the Canton reason attached — quote
                  the <M>X-Request-Id</M> when you report one. A few Canton-level failures are
                  worth recognising by their message rather than their code:
                </P>
                <Table
                  head={["Message fragment", "Usual cause"]}
                  rows={[
                    [
                      <M key="a">TEMPLATES_OR_INTERFACES_NOT_FOUND</M>,
                      <>
                        the DAR is not vetted on this participant — check{" "}
                        <M key="a2">GET /v1/ledger/packages</M>
                      </>,
                    ],
                    [
                      <M key="b">contract could not be found</M>,
                      <>
                        on a third-party exercise: wrong synchronizer — pin{" "}
                        <M key="b2">synchronizerId</M> on <M key="b3">/v1/canton/prepare</M>
                      </>,
                    ],
                    [
                      <M key="c">security-sensitive error</M>,
                      "intermittent: client clock ahead of the participant",
                    ],
                    [
                      <M key="d">DUPLICATE_CONFIRMATION_REQUEST_UUID</M>,
                      "the same prepared transaction was already submitted — re-prepare, do not retry the body",
                    ],
                  ]}
                />
              </Section>

              {/* ─── 14 LIMITS ─── */}
              <Section id="limits" title="Rate limits and tiers">
                <P>
                  A global, IP-keyed limit of{" "}
                  <span className="text-ink">1000 requests per minute</span> applies, returning
                  429 <M>RATE_LIMIT_EXCEEDED</M>. It is anti-abuse in intent. Cove sits behind
                  a proxy that preserves the real client IP, so one noisy tenant does not
                  exhaust the bucket for everyone.
                </P>
                <Table
                  head={["Tier", "Requests / min", "WebSocket conns", "Bulk recipients", "Job priority"]}
                  rows={[
                    ["free", "30", "2", "10", "30"],
                    ["growth", "300", "10", "50", "20"],
                    ["enterprise", "3000", "50", "50", "10"],
                  ]}
                />
                <Note tone="warn">
                  Today only <M>jobPriority</M> is enforced (async-broadcast ordering, lower
                  runs first). Per-key request limits, WebSocket connection caps and monthly
                  request limits are declared but not yet enforced, and{" "}
                  <span className="text-ink">
                    no <M>X-RateLimit-*</M> headers are emitted
                  </span>{" "}
                  — do not build a client backoff around them. Bulk transfers are capped at a
                  flat 50 recipients on every tier.
                </Note>
              </Section>

              {/* ─── 15 RECIPES ─── */}
              <Section id="recipes" title="End-to-end recipes">
                <P>
                  Copy-pasteable curl for one wallet&rsquo;s whole life: create a
                  self-custodied external party, read its balance, then pre-approve and
                  transfer Canton Coin and utility-registry tokens. Every command below was
                  run against mainnet.
                </P>
                <Note>
                  <span className="text-ink">Shell:</span> these are written for a POSIX shell
                  (Git Bash, zsh, WSL). In PowerShell use <M>curl.exe</M> — bare <M>curl</M>{" "}
                  is an alias for <M>Invoke-WebRequest</M> and will not accept these flags.
                </Note>

                <h3 className="pt-2 text-lg font-semibold text-ink">Setup</h3>
                <Code>{String.raw`export COVE=https://walletapi.cove.qasara.ai
export KEY=canton_sk_...                 # Cove API key; must own the party it acts for
export PARTY='<party id>'                # receiver / subject party
export PUB='<public key, base64>'        # that party's Ed25519 public key
export PRIV='<private key, base64>'      # that party's private key — never sent to Cove
export DSO='DSO::1220b1431ef217342db44d516bb9befde802be7d8899637d290895fa58880f19accc'`}</Code>
                <Note title="Where $KEY comes from.">
                  Keys are issued by us, not self-served &mdash;{" "}
                  <Link href="/contact" className="text-brand-mint hover:underline">
                    tell us what you are building
                  </Link>{" "}
                  and we provision one against your account, with an optional IP allowlist and
                  expiry. The key is shown once, so store it before you close the reply. Every
                  party you go on to create belongs to the account that key was minted for,
                  which is what makes it actable later &mdash; so use one account per
                  environment rather than mixing test and production parties under one key.
                </Note>

                <h3 className="pt-4 text-lg font-semibold text-ink">
                  Health and auth smoke test
                </h3>
                <Code>
                  {String.raw`curl -s $COVE/v1/health   # {"status":"healthy","timestamp":"...","version":"..."} - no auth needed
curl -s $COVE/v1/ready    # {"status":"ready","db":"connected","redis":"connected","canton":"connected"}
` +
                    (SHOW.parties
                      ? String.raw`curl -s $COVE/v1/parties -H "authorization: Bearer $KEY"`
                      : String.raw`curl -s "$COVE/v1/wallets/$PARTY/balance" -H "authorization: Bearer $KEY"`)}
                </Code>
                <P>
                  <M>/v1/health</M> is liveness only &mdash; it returns <M>healthy</M> from a
                  live process even when Canton is down. <M>/v1/ready</M> is the real readiness
                  probe, reporting database, Redis and Canton separately, and it returns{" "}
                  <span className="text-ink">200 whether or not it is ready</span> &mdash;{" "}
                  <M>status</M> flips to <M>&quot;degraded&quot;</M> and the individual fields
                  name the culprit.{" "}
                  {SHOW.parties ? (
                    <>
                      <M>/v1/parties</M> lists the calling account&rsquo;s parties and is the
                      cheapest confirmation that the key works and is scoped where you expect.
                    </>
                  ) : (
                    <>
                      A balance read is the cheapest confirmation that the key works and is
                      scoped where you expect &mdash; a party that is not yours answers 403
                      rather than a balance.
                    </>
                  )}
                </P>

                <h3 className="pt-4 text-lg font-semibold text-ink">
                  The signing step, used by every mutating call
                </h3>
                <P>
                  Cove is non-custodial: it returns material to sign, you sign locally, it
                  broadcasts. Every <M>/prepare</M> response carries a base64 hash, and the
                  signature must be a{" "}
                  <span className="text-ink">
                    raw Ed25519 detached signature over the decoded hash bytes, base64-encoded
                  </span>
                  .
                </P>
                <P>
                  <span className="text-ink">Check the prepare succeeded before you sign.</span>{" "}
                  One line, and it saves a confusing detour:
                </P>
                <Code>{String.raw`node -e 'console.log(Object.keys(require("./prep.json")).join(", "))'`}</Code>
                <P>
                  You want{" "}
                  <M>
                    commandId, preparedTransaction, preparedTransactionHash,
                    hashingSchemeVersion, trafficCost
                  </M>
                  . If it prints <M>error</M>, the prepare failed — read the body and fix that.
                  Do not sign.
                </P>
                <Code>{String.raw`export SIG=$(node -e 'const c=require("crypto"),p=require("./prep.json"),s=Buffer.from(process.env.PRIV,"base64").subarray(0,32),k=c.createPrivateKey({key:Buffer.concat([Buffer.from("302e020100300506032b657004220420","hex"),s]),format:"der",type:"pkcs8"});console.log(c.sign(null,Buffer.from(p.preparedTransactionHash,"base64"),k).toString("base64"))')

echo -n "$SIG" | wc -c     # expect 88 — 64 signature bytes in base64`}</Code>
                <P>
                  Every flow below repeats this command verbatim.{" "}
                  {SHOW.parties && (
                    <>
                      Only party registration differs: swap{" "}
                      <M>p.preparedTransactionHash</M> for <M>p.multiHash</M>.
                    </>
                  )}
                </P>
                <Note tone="warn">
                  <span className="text-ink">
                    Sign with the key of the party whose authority the command needs
                  </span>{" "}
                  — the sender for a transfer, the receiver for a pre-approval or an accept.{" "}
                  <M>PRIV</M> must be that party&rsquo;s key when this runs, and <M>PARTY</M> /{" "}
                  <M>PUB</M> must be the same party when the body is built.
                  <br />
                  <br />
                  <M>Buffer.from(PRIV,&apos;base64&apos;)</M> never errors. A hex-encoded key
                  silently decodes to garbage and produces a valid-looking signature that the
                  participant rejects.
                  <br />
                  <br />
                  A <M>TypeError … Received undefined</M> from <M>Buffer.from</M> means{" "}
                  <M>prep.json</M> is an error body, so <M>p.preparedTransactionHash</M> is{" "}
                  <M>undefined</M>. The signing command is not at fault — the prepare before it
                  failed.
                </Note>

                <h4 className="pt-2 text-[15px] font-semibold text-ink">
                  Why those three details, if you are reimplementing this
                </h4>
                <P>
                  They look arbitrary and are not. If you port the signing step into another
                  language or runtime, these are the parts to get right.
                </P>
                <P>
                  <span className="text-ink">
                    The <M>302e020100300506032b657004220420</M> constant
                  </span>{" "}
                  is not a magic number — it is the exact 16 bytes Node prepends when exporting
                  an Ed25519 private key as PKCS#8 DER (48 bytes = 16-byte header followed by
                  the 32-byte seed). <M>crypto.createPrivateKey</M> accepts only DER/PEM/JWK,
                  never raw key bytes, so the smallest valid DER blob is assembled by hand. It
                  is fixed for every Ed25519 key:
                </P>
                <Code>{String.raw`30 2e                      SEQUENCE, 46 bytes follow
   02 01 00                  INTEGER 0                — PKCS#8 version
   30 05                     SEQUENCE, 5 bytes        — AlgorithmIdentifier
      06 03 2b 65 70           OID 1.3.101.112        — "this is Ed25519"
   04 22                     OCTET STRING, 34 bytes
      04 20                     OCTET STRING, 32 bytes — the seed goes here`}</Code>
                <P>
                  <span className="text-ink">
                    <M>crypto.sign(null, …)</M>
                  </span>{" "}
                  passes <M>null</M> for the digest because Ed25519 is PureEdDSA and hashes
                  internally. Passing <M>&apos;sha512&apos;</M> is wrong.
                </P>
                <P>
                  <span className="text-ink">
                    <M>.subarray(0, 32)</M>
                  </span>{" "}
                  exists because a 64-byte nacl secret key is the seed followed by the public
                  key, and Node wants only the seed. Two key formats are in circulation and
                  they are not interchangeable: <M>signTransactionHash</M> from{" "}
                  <M>@canton-network/core-signing-lib</M> requires the full 64-byte nacl key
                  and throws <M>bad secret key size</M> on a bare seed, whereas the{" "}
                  <M>node:crypto</M> path above takes either.
                </P>

                <h3 className="pt-4 text-lg font-semibold text-ink">The commit body</h3>
                <P>Two shapes, and they are not interchangeable.</P>
                <P>
                  <span className="text-ink">Nested</span> — for{" "}
                  <M>POST /v1/transfers/broadcast</M>, which zeroes the hash server-side. This
                  is the one almost every flow uses:
                </P>
                <Code>{String.raw`node -e 'const p=require("./prep.json");console.log(JSON.stringify({partyId:process.env.PARTY,signature:process.env.SIG,publicKey:process.env.PUB,preparedTransaction:{preparedTransaction:p.preparedTransaction,preparedTransactionHash:p.preparedTransactionHash,hashingSchemeVersion:p.hashingSchemeVersion}}))' > body.json`}</Code>
                <P>
                  <span className="text-ink">Flat</span> — for{" "}
                  <M>POST /v1/interactive/execute</M>, which passes the real hash that some
                  templates validate. Same fields, one level up:
                </P>
                <Code>{String.raw`node -e 'const p=require("./prep.json");console.log(JSON.stringify({partyId:process.env.PARTY,signature:process.env.SIG,publicKey:process.env.PUB,preparedTransaction:p.preparedTransaction,preparedTransactionHash:p.preparedTransactionHash,hashingSchemeVersion:p.hashingSchemeVersion}))' > body-exec.json`}</Code>
                <P>
                  Both read the current <M>prep.json</M> and <M>$SIG</M>, so{" "}
                  <span className="text-ink">
                    always run the body command after the signing command
                  </span>
                  , in that order. Building <M>body.json</M> from a stale <M>prep.json</M> is
                  what produces <M>DUPLICATE_CONFIRMATION_REQUEST_UUID</M>.{" "}
                  <M>hashingSchemeVersion</M> is a{" "}
                  <span className="text-ink">string</span>; coercing it to a number gets a 400.
                </P>
                <Note tone="warn" title="A broadcast is not retryable.">
                  The confirmation-request UUID is minted at <M>/prepare</M> time and travels
                  inside <M>preparedTransaction</M>, so re-posting the same <M>body.json</M>{" "}
                  replays the same UUID and Canton rejects it for ~48 h. To retry, go back to{" "}
                  <M>/prepare</M> for a fresh UUID and re-sign — the hash changes, so the old{" "}
                  <M>$SIG</M> is useless. Before retrying, check whether the first attempt
                  actually committed: the error says the UUID was consumed, not that the
                  transaction failed.
                </Note>

                {/* A */}
                {SHOW.parties && (
                  <>
                <h3 className="pt-6 text-lg font-semibold text-ink">
                  Create an external party
                </h3>
                <P>
                  Three calls: prepare (you supply a public key), sign, register. The private
                  key never leaves the machine.
                </P>
                <Code>{String.raw`# 1. keypair, locally. Emits the 64-byte nacl key the SDK expects.
node -e 'const c=require("crypto");const {publicKey,privateKey}=c.generateKeyPairSync("ed25519");const pub=publicKey.export({type:"spki",format:"der"}).subarray(-32);const seed=privateKey.export({type:"pkcs8",format:"der"}).subarray(-32);console.log(JSON.stringify({publicKey:pub.toString("base64"),privateKey:Buffer.concat([seed,pub]).toString("base64")},null,2))' > key.json
export PUB=$(node -e 'console.log(require("./key.json").publicKey)')
export PRIV=$(node -e 'console.log(require("./key.json").privateKey)')

# 2. prepare
curl -sX POST "$COVE/v1/parties/prepare" -H "authorization: Bearer $KEY" \
  -H "content-type: application/json" -d "{\"publicKey\":\"$PUB\"}" > prep.json

# 3. sign — note p.multiHash here, not p.preparedTransactionHash
export SIG=$(node -e 'const c=require("crypto"),p=require("./prep.json"),s=Buffer.from(process.env.PRIV,"base64").subarray(0,32),k=c.createPrivateKey({key:Buffer.concat([Buffer.from("302e020100300506032b657004220420","hex"),s]),format:"der",type:"pkcs8"});console.log(c.sign(null,Buffer.from(p.multiHash,"base64"),k).toString("base64"))')

# 4. register — allocates and grants Cove actAs/readAs as a side effect
curl -sX POST "$COVE/v1/parties/register" -H "authorization: Bearer $KEY" \
  -H "content-type: application/json" \
  -d "{\"signature\":\"$SIG\",\"preparedParty\":$(cat prep.json)}"

# 5. capture the party id and verify
export PARTY=$(node -e 'console.log(require("./prep.json").partyId)')
curl -s "$COVE/v1/parties" -H "authorization: Bearer $KEY"`}</Code>
                <ul className="ml-5 list-disc space-y-1.5 text-[15px] leading-relaxed text-ink-muted">
                  <li>
                    <span className="text-ink">
                      Prepare and register must use keys on the same Cove account.
                    </span>{" "}
                    The <M>preparing</M> party row written at prepare time is what the
                    party-scoping check reads at register.
                  </li>
                  <li>
                    <M>502 PARTY_RIGHTS_GRANT_FAILED</M> means the party{" "}
                    <span className="text-ink">is</span> allocated and only the{" "}
                    <M>actAs</M>/<M>readAs</M> grant failed. Grant the rights; do not
                    re-register.
                  </li>
                  <li>
                    There is no party-hint parameter — the hint is whatever the validator
                    assigns.
                  </li>
                </ul>
                  </>
                )}

                {/* B */}
                <h3 className="pt-6 text-lg font-semibold text-ink">
                  Balances and holdings
                </h3>
                <Code>{String.raw`curl -s "$COVE/v1/wallets/$PARTY/balance" -H "authorization: Bearer $KEY"

{ "partyId": "…", "balance": "1234.5",
  "instruments": [ { "id": "Amulet", "amount": "1200" }, { "id": "USDCx", "amount": "34.5" } ] }`}</Code>
                <P>
                  <span className="text-ink">
                    Read <M>instruments[]</M>, not <M>balance</M>.
                  </span>{" "}
                  The top-level figure sums different instruments together and denominates
                  nothing.
                </P>
                <P>
                  The contracts behind the balance — you need a <M>contractId</M> from here as
                  the input holding for a utility transfer:
                </P>
                <Code>{String.raw`curl -s "$COVE/v1/wallets/$PARTY/contracts" -H "authorization: Bearer $KEY"
# [ { "contractId": "00abc…", "asset": "Amulet", "amount": "1200" } ]`}</Code>
                <P>
                  The package-independent read — every holding with its instrument id, whatever
                  package it came from, which is the robust option for utility tokens. Add{" "}
                  <M>&quot;includeBlob&quot;: true</M> when the results will be forwarded as{" "}
                  <M>disclosedContracts</M>:
                </P>
                <Code>{String.raw`curl -sX POST "$COVE/v1/ledger/active-contracts" -H "authorization: Bearer $KEY" \
  -H "content-type: application/json" \
  -d "{\"partyId\":\"$PARTY\",\"interfaceId\":\"#splice-api-token-holding-v1:Splice.Api.Token.HoldingV1:Holding\"}"`}</Code>
                <P>
                  The operator view &mdash; who holds an instrument, across every party the
                  gateway knows. <M>instrument</M> is required:
                </P>
                <Code>{String.raw`curl -s "$COVE/v1/wallets/holdings?instrument=USDCx" -H "authorization: Bearer $KEY"`}</Code>
                <P>
                  This fans a balance query out to <span className="text-ink">every</span>{" "}
                  allocated party in the gateway&rsquo;s database, so cost scales with the
                  party count, and a non-zero <M>queryErrors</M> makes <M>totalBalance</M> a
                  lower bound.
                </P>

                {/* C */}
                <h3 className="pt-6 text-lg font-semibold text-ink">
                  Canton Coin — pre-approve, then transfer
                </h3>
                <P>
                  Check first. Unscoped, so any valid key can check any party — and Amulet
                  only:
                </P>
                <Code>{String.raw`curl -s "$COVE/v1/wallets/$PARTY/preapproval" -H "authorization: Bearer $KEY"
# {"partyId":"…","isPreApproved":true,"status":"active"}`}</Code>
                <P>
                  Create it. <M>PARTY</M> / <M>PUB</M> / <M>PRIV</M> must all be the{" "}
                  <span className="text-ink">receiving</span> party:
                </P>
                <Code>{String.raw`# 1. prepare
curl -sX POST "$COVE/v1/wallets/$PARTY/preapproval/prepare" \
  -H "authorization: Bearer $KEY" -H "content-type: application/json" \
  -d "{\"registry\":\"amulet\",\"instrument\":{\"id\":\"Amulet\",\"admin\":\"$DSO\"}}" > prep.json

# 2. sign
export SIG=$(node -e 'const c=require("crypto"),p=require("./prep.json"),s=Buffer.from(process.env.PRIV,"base64").subarray(0,32),k=c.createPrivateKey({key:Buffer.concat([Buffer.from("302e020100300506032b657004220420","hex"),s]),format:"der",type:"pkcs8"});console.log(c.sign(null,Buffer.from(p.preparedTransactionHash,"base64"),k).toString("base64"))')

# 3. build the nested body
node -e 'const p=require("./prep.json");console.log(JSON.stringify({partyId:process.env.PARTY,signature:process.env.SIG,publicKey:process.env.PUB,preparedTransaction:{preparedTransaction:p.preparedTransaction,preparedTransactionHash:p.preparedTransactionHash,hashingSchemeVersion:p.hashingSchemeVersion}}))' > body.json

# 4. commit
curl -sX POST "$COVE/v1/transfers/broadcast" -H "authorization: Bearer $KEY" \
  -H "content-type: application/json" -d @body.json`}</Code>
                <Note tone="warn" title="Then poll — it is not instant.">
                  The commit creates only a <M>TransferPreapprovalProposal</M>; the
                  validator&rsquo;s wallet automation accepts it and mints the real
                  pre-approval, typically within 30–60 s. <M>&quot;status&quot;:&quot;none&quot;</M>{" "}
                  immediately after committing is not a failure. The resulting pre-approval
                  carries <M>validFrom</M>, <M>lastRenewedAt</M> and <M>expiresAt</M> —{" "}
                  <span className="text-ink">90 days</span>. Confirm renewal before expiry
                  rather than assuming automation covers it.
                </Note>
                <Code>{String.raw`for i in $(seq 1 8); do curl -s "$COVE/v1/wallets/$PARTY/preapproval" -H "authorization: Bearer $KEY"; echo; sleep 10; done`}</Code>
                <P>Now the transfer. The sender signs this one:</P>
                <Code>{String.raw`export SENDER='<sender party id>'
export RECEIVER='<receiver party id>'
export PARTY="$SENDER"               # broadcast's partyId is the signer
export PUB='<SENDER public key>'
export PRIV='<SENDER private key>'

# 1. prepare
curl -sX POST "$COVE/v1/transfers/prepare" -H "authorization: Bearer $KEY" \
  -H "content-type: application/json" \
  -d "{\"senderPartyId\":\"$SENDER\",\"receiverPartyId\":\"$RECEIVER\",\"amount\":\"0.01\",\"instrument\":{\"id\":\"Amulet\",\"admin\":\"$DSO\"},\"memo\":\"invoice 4471\"}" > prep.json

# 2. sign as the SENDER
export SIG=$(node -e 'const c=require("crypto"),p=require("./prep.json"),s=Buffer.from(process.env.PRIV,"base64").subarray(0,32),k=c.createPrivateKey({key:Buffer.concat([Buffer.from("302e020100300506032b657004220420","hex"),s]),format:"der",type:"pkcs8"});console.log(c.sign(null,Buffer.from(p.preparedTransactionHash,"base64"),k).toString("base64"))')

# 3. build the nested body
node -e 'const p=require("./prep.json");console.log(JSON.stringify({partyId:process.env.PARTY,signature:process.env.SIG,publicKey:process.env.PUB,preparedTransaction:{preparedTransaction:p.preparedTransaction,preparedTransactionHash:p.preparedTransactionHash,hashingSchemeVersion:p.hashingSchemeVersion}}))' > body.json

# 4. commit
curl -sX POST "$COVE/v1/transfers/broadcast" -H "authorization: Bearer $KEY" \n  -H "content-type: application/json" -d @body.json

{ "status": "confirmed", "transactionId": "1220upd…", "cantonUpdateId": "1220upd…", "commandId": "…" }`}</Code>
                <P>
                  <M>cantonUpdateId</M> is the commit proof and is lookup-able on Scan. Add{" "}
                  <M>-H &quot;X-Async: true&quot;</M> to get a 202 with a <M>jobId</M> and{" "}
                  <M>statusUrl</M> instead of waiting.{" "}
                  <span className="text-ink">
                    If the receiver has no pre-approval
                  </span>
                  , the transfer lands as a pending <M>TransferInstruction</M> instead of
                  settling — the accept flow below is the same for Amulet and utility tokens.
                </P>
                <Code>{String.raw`export COMMAND_ID='<commandId from the broadcast response>'
curl -s "$COVE/v1/transfers/$COMMAND_ID/status" -H "authorization: Bearer $KEY"`}</Code>
                <P>
                  <M>status</M> is one of <M>prepared</M>, <M>submitted</M>, <M>queued</M>,{" "}
                  <M>processing</M>, <M>confirmed</M>, <M>failed</M>, <M>dead_letter</M>. A
                  sync broadcast is already terminal when it returns, so this reports{" "}
                  <M>confirmed</M> or <M>failed</M> on the first poll and never sits at{" "}
                  <M>submitted</M>. Status lookups are scoped to the calling key &mdash;
                  another key&rsquo;s <M>commandId</M> is a 404.
                </P>
                <P>
                  <span className="text-ink">Bulk:</span>{" "}
                  <M>POST /v1/transfers/prepare/bulk</M> with{" "}
                  <M>{`{partyId, receivers:[{recipient, amount, memo}], instrument}`}</M> pays
                  up to 50 recipients from one prepared transaction. Sign and broadcast it
                  exactly as above &mdash; it is one prepared transaction, so one signature.
                </P>

                {/* D */}
                <h3 className="pt-6 text-lg font-semibold text-ink">
                  Utility-registry tokens
                </h3>
                <P>
                  A utility-registry <M>TransferPreapproval</M> is the receiver saying
                  &ldquo;settle this instrument into my account without asking me each
                  time&rdquo;. It is scoped to an <M>(operator, registrar)</M> pair and, within
                  that, to a list of instrument ids. The{" "}
                  <span className="text-ink">receiver is the sole signatory</span>, so it is
                  live the moment it commits — no proposal, no provider accept, nothing to
                  poll, and no cooperation needed from the registrar or the operator. That is
                  the opposite of the Canton Coin flow above.
                </P>
                <Note>
                  Use <M>POST /v1/utility-registry/preapproval/prepare</M>. Do{" "}
                  <span className="text-ink">not</span> use{" "}
                  <M>POST /v1/wallets/&#123;party&#125;/preapproval/prepare</M> with{" "}
                  <M>registry:&quot;utility&quot;</M>: its schema requires <M>admin</M> inside{" "}
                  <M>instrumentAllowances</M>, but the Daml template rejects that key with{" "}
                  <M>&quot;Unexpected fields: admin&quot;</M>, so that branch cannot succeed
                  with a non-empty allowance list.
                </Note>

                <h4 className="pt-2 text-[15px] font-semibold text-ink">
                  What you need, for any utility token
                </h4>
                <P>
                  Ten values. Two are constants, three are yours, and five describe the
                  instrument.
                </P>
                <Table
                  head={["Field", "What it is", "How to obtain it"]}
                  rows={[
                    [
                      <M key="a">receiverPartyId</M>,
                      "party being pre-approved",
                      "yours",
                    ],
                    [
                      <M key="b">reg.validatorPartyId</M>,
                      <>
                        the validator party <span className="text-ink">submitting</span> the
                        transaction — yours, not the token&rsquo;s home validator
                      </>,
                      "your own participant's operator party",
                    ],
                    [
                      <M key="c">reg.synchronizerId</M>,
                      "the synchronizer your participant and the registrar's share",
                      <>
                        <M key="c2">synchronizerId</M> on any contract from an ACS read
                      </>,
                    ],
                    [
                      <>
                        <M key="d">registrarPartyId</M>
                        <br />
                        <M key="d2">reg.issuerPartyId</M>
                      </>,
                      "the instrument admin / registrar (same value in both fields)",
                      <>
                        registry <M key="d3">/registry/metadata/v1/info</M> →{" "}
                        <M key="d4">adminId</M>, or the <M key="d5">registrar</M> field on the
                        instrument&rsquo;s <M key="d6">InstrumentConfiguration</M>
                      </>,
                    ],
                    [
                      <>
                        <M key="e">operatorPartyId</M>
                        <br />
                        <M key="e2">reg.operatorPartyId</M>
                      </>,
                      "the utility operator the registry runs under (same value in both fields)",
                      <>
                        the <M key="e3">operator</M> field on the instrument&rsquo;s{" "}
                        <M key="e4">InstrumentConfiguration</M>{" "}
                        <span className="text-ink">and</span> <M key="e5">TransferRule</M> —
                        both must agree
                      </>,
                    ],
                    [
                      <M key="f">instrumentAllowances</M>,
                      <>
                        <M key="f2">[&#123;&quot;id&quot;:&quot;…&quot;&#125;]</M>, or{" "}
                        <M key="f3">[]</M> for every instrument from that registrar
                      </>,
                      <>
                        registry <M key="f4">/registry/metadata/v1/instruments</M> →{" "}
                        <M key="f5">id</M>
                      </>,
                    ],
                    [
                      <M key="g">reg.regAppPackageId</M>,
                      <>
                        package id of the <M key="g2">utility-registry-app-v0</M> release{" "}
                        <span className="text-ink">that registrar runs</span>
                      </>,
                      <>
                        the 64-hex prefix of the <M key="g3">templateId</M> on one of that
                        registrar&rsquo;s live app contracts
                      </>,
                    ],
                    [
                      <M key="h">templateId</M>,
                      <>
                        the <M key="h2">TransferPreapproval</M> template
                      </>,
                      <span key="h3" className="break-all font-mono text-[12px] text-ink">
                        #utility-registry-app-v0:Utility.Registry.App.V0.Model.TransferPreapproval:TransferPreapproval
                      </span>,
                    ],
                    [
                      <M key="i">reg.regAppPackageName</M>,
                      "constant",
                      <M key="i2">utility-registry-app-v0</M>,
                    ],
                    [
                      <M key="j">reg.registryPackageName</M>,
                      "constant",
                      <M key="j2">utility-registry-v0</M>,
                    ],
                  ]}
                />
                <Note tone="warn">
                  <M>reg</M> is{" "}
                  <span className="text-ink">
                    mandatory for any registrar the gateway is not itself configured for.
                  </span>{" "}
                  The route resolves its own configuration before reading the top-level{" "}
                  <M>operatorPartyId</M> / <M>registrarPartyId</M>, so omitting it returns{" "}
                  <M>400 UTILITY_REGISTRY_NOT_CONFIGURED</M> listing fields you already
                  supplied in the body.
                </Note>

                <h4 className="pt-2 text-[15px] font-semibold text-ink">
                  Discovering the instrument, registrar and operator
                </h4>
                <P>
                  The registry HTTP API answers unauthenticated. The{" "}
                  <M>/registrars/&#123;party&#125;</M> prefix is mandatory and the
                  party&rsquo;s <M>::</M> must be percent-encoded as <M>%3A%3A</M>; the bare
                  host 404s.
                </P>
                <Code>{String.raw`export REG_HOST='https://api.utilities.digitalasset.com'   # DA-hosted registrars
export REG_PARTY='<registrar party, %3A%3A-encoded>'
export REG_BASE="$REG_HOST/api/token-standard/v0/registrars/$REG_PARTY"

curl -s "$REG_BASE/registry/metadata/v1/instruments"   # instrument ids, decimals, supported APIs
curl -s "$REG_BASE/registry/metadata/v1/info"          # adminId, supported APIs`}</Code>
                <Note tone="warn">
                  Read <M>/instruments</M> and check the array is non-empty.{" "}
                  <span className="text-ink">Do not treat a 200 as proof of anything</span> —{" "}
                  <M>/info</M> echoes back whatever registrar is in the request path, and an
                  unknown registrar returns <M>200 &#123;&quot;instruments&quot;:[]&#125;</M>{" "}
                  rather than a 404.
                </Note>
                <P>
                  The operator and the app package id are not served by the registry API. Get
                  them from the instrument&rsquo;s <M>InstrumentConfiguration</M> contract —
                  via an ACS read if your party is a stakeholder, otherwise from a block
                  explorer&rsquo;s token-info view:
                </P>
                <Code>{String.raw`curl -sX POST "$COVE/v1/ledger/active-contracts" -H "authorization: Bearer $KEY" \
  -H "content-type: application/json" \
  -d "{\"partyId\":\"$PARTY\",\"entityName\":\"InstrumentConfiguration\"}"`}</Code>
                <P>
                  Take <M>createArgument.operator</M> and <M>createArgument.registrar</M>; the{" "}
                  <M>templateId</M>&rsquo;s 64-hex prefix is the <M>utility-registry-v0</M>{" "}
                  package, which is <span className="text-ink">not</span> the app package id.
                  Repeat with <M>&quot;entityName&quot;:&quot;TransferRule&quot;</M> and confirm
                  the operator matches — a registrar can host several rule and configuration
                  contracts under different operators, and a mismatch fails at transfer time,
                  not at pre-approval time.
                </P>
                <P>
                  Two more pre-flight checks. First, that the package is{" "}
                  <span className="text-ink">vetted on your participant</span>: a bogus entity
                  inside a present package returns{" "}
                  <M>NO_TEMPLATES_FOR_PACKAGE_NAME_AND_QUALIFIED_NAME</M>, while an absent
                  package returns <M>PACKAGE_NAMES_NOT_FOUND</M> — that difference tests vetting
                  without knowing any real module path. Second, that you and the registrar are
                  on a <span className="text-ink">shared synchronizer</span>; if not, the party
                  cannot hold the instrument at all and no pre-approval will help.
                </P>
                <Code>{String.raw`curl -sX POST "$COVE/v1/ledger/active-contracts" -H "authorization: Bearer $KEY" \
  -H "content-type: application/json" \
  -d "{\"partyId\":\"$PARTY\",\"templateId\":\"#utility-registry-app-v0:Nope.Nope:Nope\"}"`}</Code>

                <h4 className="pt-2 text-[15px] font-semibold text-ink">
                  Known mainnet instruments
                </h4>
                <Table
                  head={["Instrument", "Registrar / instrumentAdmin", "Decimals"]}
                  rows={[
                    [
                      <span key="u1" className="font-semibold text-ink">
                        USDCx
                      </span>,
                      <span key="u1a" className="break-all font-mono text-[12px]">
                        decentralized-usdc-interchain-rep::12208115f1e168dd7e792320be9c4ca720c751a02a3053c7606e1c1cd3dad9bf60ef
                      </span>,
                      "10",
                    ],
                    [
                      <span key="u3" className="font-semibold text-ink">
                        CBTC
                      </span>,
                      <span key="u3a" className="break-all font-mono text-[12px]">
                        cbtc-network::12205af3b949a04776fc48cdcc05a060f6bda2e470632935f375d1049a8546a3b262
                      </span>,
                      "10",
                    ],
                  ]}
                />
                <P>
                  Both are served by DA&rsquo;s hosted registry (
                  <M>https://api.utilities.digitalasset.com</M>) and share one operator:
                </P>
                <Code>{String.raw`operator          auth0_007c6643538f2eadd3e573dd05b9::12205bcc106efa0eaa7f18dc491e5c6f5fb9b0cc68dc110ae66f4ed6467475d7c78e
validatorPartyId  qasara-validator-1::1220632cdae7977b01e0024d6310a32003bb67a6215cbdfffc6bbc8791be2382f0e0
regAppPackageId   2293eb12e82ceaeb3ff7f8fe3346dece8578e1e9fd7d46624aeb7bb07fa31eda   (utility-registry-app-v0 0.8.2)
synchronizerId    global-domain::1220b1431ef217342db44d516bb9befde802be7d8899637d290895fa58880f19accc`}</Code>
                <Note tone="warn">
                  <M>regAppPackageId</M> is confirmed for USDCx. It is{" "}
                  <span className="text-ink">unconfirmed for CBTC</span>, whose{" "}
                  <M>InstrumentConfiguration</M> sits under an older release — DA runs
                  different versions per registrar, so treat a shared app package id as an
                  assumption to verify, not a given. Devnet CBTC is a different registrar
                  party, with a different operator, on a different host and synchronizer; do
                  not mix the two sets of coordinates.
                </Note>

                <h4 className="pt-2 text-[15px] font-semibold text-ink">
                  Check the pre-approval
                </h4>
                <P>
                  <M>GET /v1/wallets/&#123;party&#125;/preapproval</M> does{" "}
                  <span className="text-ink">not</span> work here — it reports the Amulet
                  pre-approval and ignores the instrument, returning <M>true</M> for a utility
                  token that has none. Read the ACS instead; <M>entityName</M> sweeps across
                  packages, so one command covers every instrument regardless of package id:
                </P>
                <Code>{String.raw`curl -sX POST "$COVE/v1/ledger/active-contracts" -H "authorization: Bearer $KEY" \
  -H "content-type: application/json" \
  -d "{\"partyId\":\"$PARTY\",\"entityName\":\"TransferPreapproval\"}"`}</Code>
                <P>
                  Match on <M>createArgument.instrumentAdmin</M> and{" "}
                  <M>instrumentAllowances</M>. Utility pre-approvals carry{" "}
                  <span className="text-ink">no expiry</span> — indefinite until archived,
                  unlike Canton Coin&rsquo;s 90 days. The functional check is stronger: the
                  transfer-factory lookup below returns <M>transferKind: &quot;direct&quot;</M>{" "}
                  instead of <M>&quot;offer&quot;</M>.
                </P>

                <h4 className="pt-2 text-[15px] font-semibold text-ink">
                  Create the pre-approval
                </h4>
                <P>
                  Fill the four instrument-specific exports; the rest is constant per network.
                </P>
                <Code>{String.raw`export UR_REGISTRAR='decentralized-usdc-interchain-rep::12208115f1e168dd7e792320be9c4ca720c751a02a3053c7606e1c1cd3dad9bf60ef'
export UR_INSTRUMENT='USDCx'
export UR_OPERATOR='auth0_007c6643538f2eadd3e573dd05b9::12205bcc106efa0eaa7f18dc491e5c6f5fb9b0cc68dc110ae66f4ed6467475d7c78e'
export UR_APP_PKG='2293eb12e82ceaeb3ff7f8fe3346dece8578e1e9fd7d46624aeb7bb07fa31eda'

cat > ur-body.json <<EOF
{ "receiverPartyId": "$PARTY",
  "operatorPartyId":  "$UR_OPERATOR",
  "registrarPartyId": "$UR_REGISTRAR",
  "instrumentAllowances": [ { "id": "$UR_INSTRUMENT" } ],
  "templateId": "#utility-registry-app-v0:Utility.Registry.App.V0.Model.TransferPreapproval:TransferPreapproval",
  "reg": {
    "issuerPartyId":       "$UR_REGISTRAR",
    "operatorPartyId":     "$UR_OPERATOR",
    "validatorPartyId":    "qasara-validator-1::1220632cdae7977b01e0024d6310a32003bb67a6215cbdfffc6bbc8791be2382f0e0",
    "regAppPackageId":     "$UR_APP_PKG",
    "regAppPackageName":   "utility-registry-app-v0",
    "registryPackageName": "utility-registry-v0",
    "synchronizerId":      "global-domain::1220b1431ef217342db44d516bb9befde802be7d8899637d290895fa58880f19accc"
  } }
EOF`}</Code>
                <P>
                  Then prepare, sign, build the body and commit —{" "}
                  <span className="text-ink">in this order, every time.</span>{" "}
                  <M>PARTY</M> / <M>PUB</M> / <M>PRIV</M> must all be the{" "}
                  <span className="text-ink">receiver</span>: it signs its own pre-approval,
                  and it must match <M>receiverPartyId</M> inside <M>ur-body.json</M>.
                </P>
                <Code>{String.raw`# 1. prepare
curl -sX POST "$COVE/v1/utility-registry/preapproval/prepare" \
  -H "authorization: Bearer $KEY" -H "content-type: application/json" \
  -d @ur-body.json > prep.json

# 2. sign
export SIG=$(node -e 'const c=require("crypto"),p=require("./prep.json"),s=Buffer.from(process.env.PRIV,"base64").subarray(0,32),k=c.createPrivateKey({key:Buffer.concat([Buffer.from("302e020100300506032b657004220420","hex"),s]),format:"der",type:"pkcs8"});console.log(c.sign(null,Buffer.from(p.preparedTransactionHash,"base64"),k).toString("base64"))')

# 3. build the nested body
node -e 'const p=require("./prep.json");console.log(JSON.stringify({partyId:process.env.PARTY,signature:process.env.SIG,publicKey:process.env.PUB,preparedTransaction:{preparedTransaction:p.preparedTransaction,preparedTransactionHash:p.preparedTransactionHash,hashingSchemeVersion:p.hashingSchemeVersion}}))' > body.json

# 4. commit
curl -sX POST "$COVE/v1/transfers/broadcast" -H "authorization: Bearer $KEY" \
  -H "content-type: application/json" -d @body.json`}</Code>
                <P>
                  Expect <M>{`{"status":"confirmed","cantonUpdateId":"1220…"}`}</M>. Verify with
                  the ACS read above — the new contract appears immediately, with no polling.
                  If step 4 is rejected, rebuild with the{" "}
                  <span className="text-ink">flat</span> body and commit through{" "}
                  <M>/v1/interactive/execute</M> instead.
                </P>
                <Code>{String.raw`node -e 'const p=require("./prep.json");console.log(JSON.stringify({partyId:process.env.PARTY,signature:process.env.SIG,publicKey:process.env.PUB,preparedTransaction:p.preparedTransaction,preparedTransactionHash:p.preparedTransactionHash,hashingSchemeVersion:p.hashingSchemeVersion}))' > body-exec.json

curl -sX POST "$COVE/v1/interactive/execute" -H "authorization: Bearer $KEY" \
  -H "content-type: application/json" -d @body-exec.json`}</Code>
                <P>
                  Debugging a duplicate-UUID error: print the UUID your body actually carries
                  and compare it with the one in the error message. A match means the
                  transaction genuinely reached the ledger before; a mismatch means{" "}
                  <M>body.json</M> is older than <M>prep.json</M> and the build step was
                  skipped.
                </P>
                <Code>{String.raw`node -e 'console.log(require("./prep.json").commandId)'`}</Code>

                <h4 className="pt-2 text-[15px] font-semibold text-ink">
                  Send a utility token
                </h4>
                <Note tone="warn" title="The send path does not resolve a foreign registry for you.">
                  <M>POST /v1/transfers/prepare</M> uses a caller-supplied context, then a
                  cache, then the gateway&rsquo;s <em className="text-ink">default</em> (Amulet)
                  registry — so for any instrument Cove is not itself the registrar for, you
                  must fetch the transfer factory yourself and pass it as{" "}
                  <M>registryChoiceContext</M>. <M>POST /v1/transfers/context</M> does not help
                  here: it reads the same default registry. The accept path{" "}
                  <em className="text-ink">does</em> resolve — the asymmetry is real.
                </Note>
                <P>
                  <span className="text-ink">Step 0 — parameters.</span> Note the registry base
                  URL wants the party <M>%3A%3A</M>-encoded, unlike <M>UR_REGISTRAR</M>.
                </P>
                <Code>{String.raw`export UR_SENDER='<sender party>'
export UR_RECEIVER='<receiver party>'
export UR_INSTRUMENT='USDCx'
export UR_REGISTRAR='<registrar party, raw ::>'
export UR_AMOUNT='0.1'
export REG_BASE="https://api.utilities.digitalasset.com/api/token-standard/v0/registrars/<registrar %3A%3A-encoded>"`}</Code>
                <P>
                  <span className="text-ink">
                    Step 1 — an input holding cid. Re-run this before every transfer.
                  </span>{" "}
                  A transfer archives the input holding and creates a fresh change holding with
                  a <span className="text-ink">new</span> contract id, so a cid from a previous
                  transfer is always dead. Reusing one gives{" "}
                  <M>400 &quot;Given holdings are invalid&quot;</M>.
                </P>
                <Code>{String.raw`curl -s "$COVE/v1/wallets/$UR_SENDER/contracts?limit=100" -H "authorization: Bearer $KEY" > hold.json
node -e 'const a=require("./hold.json");a.filter(h=>h.asset===process.env.UR_INSTRUMENT).forEach(h=>console.log(h.contractId,h.amount))'

export UR_HOLDING='<contract id from the line above>'`}</Code>
                <P>
                  <span className="text-ink">
                    Step 2 — the transfer factory, straight from the owning registry.
                  </span>
                </P>
                <Code>{String.raw`node -e 'const now=new Date(),then=new Date(now.getTime()+3600e3);console.log(JSON.stringify({choiceArguments:{expectedAdmin:process.env.UR_REGISTRAR,transfer:{sender:process.env.UR_SENDER,receiver:process.env.UR_RECEIVER,amount:process.env.UR_AMOUNT,instrumentId:{admin:process.env.UR_REGISTRAR,id:process.env.UR_INSTRUMENT},requestedAt:now.toISOString(),executeBefore:then.toISOString(),inputHoldingCids:[process.env.UR_HOLDING],meta:{values:{}}},extraArgs:{context:{values:{}},meta:{values:{}}}},excludeDebugFields:true}))' > factory-req.json

curl -sX POST "$REG_BASE/registry/transfer-instruction/v1/transfer-factory" \
  -H "content-type: application/json" -d @factory-req.json > factory.json

node -e 'const f=require("./factory.json");console.log("transferKind:",f.transferKind,"factoryId:",f.factoryId)'`}</Code>
                <P>
                  <M>transferKind</M> tells you which settlement mode you are about to get:{" "}
                  <M>direct</M> (one step, the receiver holds a pre-approval) or <M>offer</M>{" "}
                  (two steps — see the accept flow). This call requires a real, unlocked,
                  sender-owned holding: an empty list gives{" "}
                  <M>400 &quot;No holdings provided&quot;</M> and a fabricated or spent cid
                  gives <M>&quot;Given holdings are invalid&quot;</M>.
                </P>
                <Note tone="warn" title="Retry this call on failure.">
                  DA&rsquo;s hosted factory endpoint flaps: it can hang for ~45 s and then
                  return a <M>502</M> from its own proxy —{" "}
                  <em className="text-ink">including for an empty body</em> — while metadata
                  GETs on the same host keep returning 200. A 502 or timeout here is their
                  backend, not your request; it has cleared on its own within a couple of
                  minutes. Loop until you get a 200 before reading <M>transferKind</M>.
                </Note>
                <P>
                  <span className="text-ink">
                    Step 3 — prepare, passing the registry&rsquo;s context through.
                  </span>{" "}
                  <M>choiceContext</M> is a free-form record, so the registry&rsquo;s{" "}
                  <M>disclosedContracts</M> ride through untouched.
                </P>
                <Code>{String.raw`node -e 'const f=require("./factory.json");console.log(JSON.stringify({senderPartyId:process.env.UR_SENDER,receiverPartyId:process.env.UR_RECEIVER,amount:process.env.UR_AMOUNT,instrument:{id:process.env.UR_INSTRUMENT,admin:process.env.UR_REGISTRAR},registryChoiceContext:{factoryId:f.factoryId,choiceContext:f.choiceContext}}))' > xfer-req.json

curl -sX POST "$COVE/v1/transfers/prepare" -H "authorization: Bearer $KEY" \
  -H "content-type: application/json" -d @xfer-req.json > prep.json`}</Code>
                <P>
                  <span className="text-ink">Step 4 — sign as the sender and broadcast.</span>{" "}
                  <M>PARTY</M> / <M>PUB</M> / <M>PRIV</M> must be the sender here. Broadcast
                  works for this leg; <M>/v1/interactive/execute</M> is not needed.
                </P>
                <Code>{String.raw`export PARTY="$UR_SENDER"      # broadcast's partyId is the signer
export PUB='<sender public key>'
export PRIV='<sender private key>'

# sign
export SIG=$(node -e 'const c=require("crypto"),p=require("./prep.json"),s=Buffer.from(process.env.PRIV,"base64").subarray(0,32),k=c.createPrivateKey({key:Buffer.concat([Buffer.from("302e020100300506032b657004220420","hex"),s]),format:"der",type:"pkcs8"});console.log(c.sign(null,Buffer.from(p.preparedTransactionHash,"base64"),k).toString("base64"))')

# build the nested body
node -e 'const p=require("./prep.json");console.log(JSON.stringify({partyId:process.env.PARTY,signature:process.env.SIG,publicKey:process.env.PUB,preparedTransaction:{preparedTransaction:p.preparedTransaction,preparedTransactionHash:p.preparedTransactionHash,hashingSchemeVersion:p.hashingSchemeVersion}}))' > body.json

# commit
curl -sX POST "$COVE/v1/transfers/broadcast" -H "authorization: Bearer $KEY" \n  -H "content-type: application/json" -d @body.json`}</Code>
                <P>
                  A <M>direct</M> transfer creates two holdings — the payee&rsquo;s and the
                  sender&rsquo;s change — and no offer. A party-scoped read shows only the one
                  the sender is a stakeholder on, so seeing a single created <M>Holding</M>{" "}
                  there is correct, not a partial settlement. Confirm a direct settle two ways:{" "}
                  <M>GET /v1/transfers/pending?partyId=&lt;receiver&gt;</M> returns <M>[]</M>,
                  and the ledger effects contain no <M>TransferOffer</M>.
                </P>

                <h4 className="pt-2 text-[15px] font-semibold text-ink">
                  Accept an incoming transfer
                </h4>
                <Code>{String.raw`curl -s "$COVE/v1/transfers/pending?partyId=$PARTY" -H "authorization: Bearer $KEY"
# [ { "transferContractId": "00inst…", "sender": "…", "receiver": "…", "amount": "10.5", "status": "pending" } ]

# PARTY / PUB / PRIV must all be the RECEIVER
export CID='00inst…'

curl -sX POST "$COVE/v1/transfers/accept" -H "authorization: Bearer $KEY" \
  -H "content-type: application/json" \
  -d "{\"partyId\":\"$PARTY\",\"transferContractId\":\"$CID\"}" > prep.json

# sign
export SIG=$(node -e 'const c=require("crypto"),p=require("./prep.json"),s=Buffer.from(process.env.PRIV,"base64").subarray(0,32),k=c.createPrivateKey({key:Buffer.concat([Buffer.from("302e020100300506032b657004220420","hex"),s]),format:"der",type:"pkcs8"});console.log(c.sign(null,Buffer.from(p.preparedTransactionHash,"base64"),k).toString("base64"))')

# build the nested body
node -e 'const p=require("./prep.json");console.log(JSON.stringify({partyId:process.env.PARTY,signature:process.env.SIG,publicKey:process.env.PUB,preparedTransaction:{preparedTransaction:p.preparedTransaction,preparedTransactionHash:p.preparedTransactionHash,hashingSchemeVersion:p.hashingSchemeVersion}}))' > body.json

# commit
curl -sX POST "$COVE/v1/transfers/broadcast" -H "authorization: Bearer $KEY" \n  -H "content-type: application/json" -d @body.json`}</Code>
                <P>
                  <span className="text-ink">
                    <M>{`{partyId, transferContractId}`}</M> alone is enough, including for a
                    foreign instrument.
                  </span>{" "}
                  Unlike the send path, this route resolves the instrument&rsquo;s own
                  registry: it reads the admin off the <M>TransferInstruction</M> and tries
                  each configured registry host until one answers, remembering the winner.
                  Passing <M>instrument</M> just saves one ACS read. <M>reject</M> (receiver)
                  and <M>withdraw</M> (sender) take the same body and follow the same flow.
                </P>

                {/* E */}
                <h3 className="pt-6 text-lg font-semibold text-ink">
                  Drive a third-party Daml workflow
                </h3>
                <Code>{String.raw`# 1. find the venue's contracts, WITH disclosure blobs
curl -sX POST "$COVE/v1/ledger/active-contracts" -H "authorization: Bearer $KEY" \
  -H "content-type: application/json" \
  -d "{\"partyId\":\"$PARTY\",\"entityName\":\"SwapOrder\",\"includeBlob\":true}" > acs.json

# 2. build the exercise, pinning THEIR synchronizer, blobs as disclosures
curl -sX POST "$COVE/v1/canton/prepare" -H "authorization: Bearer $KEY" \
  -H "content-type: application/json" -d @command.json > prep.json

# 3. sign
export SIG=$(node -e 'const c=require("crypto"),p=require("./prep.json"),s=Buffer.from(process.env.PRIV,"base64").subarray(0,32),k=c.createPrivateKey({key:Buffer.concat([Buffer.from("302e020100300506032b657004220420","hex"),s]),format:"der",type:"pkcs8"});console.log(c.sign(null,Buffer.from(p.preparedTransactionHash,"base64"),k).toString("base64"))')

# 4. build the FLAT body - interactive/execute passes the real hash
node -e 'const p=require("./prep.json");console.log(JSON.stringify({partyId:process.env.PARTY,signature:process.env.SIG,publicKey:process.env.PUB,preparedTransaction:p.preparedTransaction,preparedTransactionHash:p.preparedTransactionHash,hashingSchemeVersion:p.hashingSchemeVersion}))' > body-exec.json

# 5. commit
curl -sX POST "$COVE/v1/interactive/execute" -H "authorization: Bearer $KEY" \
  -H "content-type: application/json" -d @body-exec.json > done.json

# 6. a fill and a cancellation both archive the order —
#    only LEDGER_EFFECTS names the choice
curl -sX POST "$COVE/v1/ledger/update" -H "authorization: Bearer $KEY" \
  -H "content-type: application/json" \
  -d "{\"partyId\":\"$PARTY\",\"updateId\":\"$(node -e 'console.log(require("./done.json").cantonUpdateId)')\",\"shape\":\"LEDGER_EFFECTS\"}"`}</Code>
                <P>
                  Preflight with <M>GET /v1/ledger/packages</M> — if the venue&rsquo;s package
                  is not vetted on this participant, step 2 fails with{" "}
                  <M>TEMPLATES_OR_INTERFACES_NOT_FOUND</M>, which reads like a typo in the
                  template id.
                </P>

                {/* F */}
                <h3 className="pt-6 text-lg font-semibold text-ink">
                  Pay for a call with x402
                </h3>
                <Code>{String.raw`# 1. discover the price — free
curl -s "$COVE/v1/x402/info" | jq '.routes, .payTo'

# 2. call unpaid to get the requirements header
curl -si "$COVE/v1/x402/ping" | grep -i x-payment-required

# 3. hand those requirements to your facilitator, then replay with the envelope
curl -s "$COVE/v1/x402/ping" -H "X-PAYMENT-SIGNATURE: $ENVELOPE_B64"`}</Code>
                <P>
                  A 502 <M>FACILITATOR_UNAVAILABLE</M> means retry with the{" "}
                  <span className="text-ink">same</span> envelope; a 400{" "}
                  <M>PAYMENT_ENVELOPE_REJECTED</M> means fix it first.
                </P>

                <Note tone="warn" title="Clean up.">
                  <M>key.json</M> holds a private key. Delete the scratch files —{" "}
                  <M>key.json</M>, <M>prep*.json</M>, <M>body*.json</M>, <M>factory*.json</M>,{" "}
                  <M>*-req.json</M> — when you are done.
                </Note>
              </Section>

              {/* ─── 16 TRAPS ─── */}
              <Section id="traps" title="Traps">
                <P>
                  Every one of these cost someone an afternoon. They are collected here because
                  each is a case where the API does something defensible that does not look
                  like what you expected.
                </P>
                <Table
                  head={["#", "Trap"]}
                  rows={[
                    [
                      "1",
                      <>
                        <M key="t1">POST /v1/wallets/&#123;party&#125;/preapproval/prepare</M>{" "}
                        with <M key="t1b">registry:&quot;utility&quot;</M>{" "}
                        <span className="text-ink">cannot succeed</span> with a non-empty
                        allowance list — its schema requires <M key="t1c">admin</M> inside{" "}
                        <M key="t1d">instrumentAllowances</M>, which the Daml template rejects.
                        Use <M key="t1e">/v1/utility-registry/preapproval/prepare</M>.
                      </>,
                    ],
                    [
                      "2",
                      <>
                        <M key="t2">reg</M> is{" "}
                        <span className="text-ink">
                          mandatory for a registrar the gateway is not configured for
                        </span>
                        , otherwise <M key="t2b">400 UTILITY_REGISTRY_NOT_CONFIGURED</M> names
                        fields already present in the body. <M key="t2c">issuerPartyId</M> is
                        the registrar; <M key="t2d">validatorPartyId</M> is yours.
                      </>,
                    ],
                    [
                      "3",
                      <>
                        <M key="t3">/v1/transfers/broadcast</M>{" "}
                        <span className="text-ink">works for utility pre-approvals</span>.
                        Keep <M key="t3b">/v1/interactive/execute</M> as the fallback, not the
                        default.
                      </>,
                    ],
                    [
                      "4",
                      <>
                        <M key="t4">hashingSchemeVersion</M> is a{" "}
                        <span className="text-ink">string</span>. Coercing it to a number gets
                        a 400.
                      </>,
                    ],
                    [
                      "5",
                      <>
                        <M key="t5">GET /v1/wallets/&#123;party&#125;/preapproval</M> is{" "}
                        <span className="text-ink">Amulet-only</span> and ignores the
                        instrument — it returns <M key="t5b">true</M> for utility tokens that
                        have no pre-approval.
                      </>,
                    ],
                    [
                      "6",
                      <>
                        <span className="text-ink">A registry 200 proves nothing.</span>{" "}
                        <M key="t6">/registry/metadata/v1/info</M> echoes back the registrar
                        from the request path, and an unknown registrar returns{" "}
                        <M key="t6b">200 &#123;&quot;instruments&quot;:[]&#125;</M> rather than
                        404. Check that <M key="t6c">/instruments</M> is non-empty.
                      </>,
                    ],
                    [
                      "7",
                      <>
                        <span className="text-ink">
                          Factory lookups are disclosure-gated on real owned holdings
                        </span>{" "}
                        — <M key="t7">400 &quot;No holdings provided&quot;</M>, and a
                        fabricated cid gives{" "}
                        <M key="t7b">&quot;Given holdings are invalid&quot;</M>. Keep a dust
                        holding so these calls keep answering.
                      </>,
                    ],
                    [
                      "8",
                      <>
                        <span className="text-ink">Operator pinning.</span> A
                        pre-approval&rsquo;s operator must match the operator on the
                        instrument&rsquo;s <M key="t8">InstrumentConfiguration</M>{" "}
                        <span className="text-ink">and</span> <M key="t8b">TransferRule</M>, or
                        the first transfer fails{" "}
                        <M key="t8c">AssertionFailed: &quot;Operator must match expected&quot;</M>
                        . The pre-approval commits regardless, so this surfaces late.
                      </>,
                    ],
                    [
                      "9",
                      <>
                        <span className="text-ink">
                          Send resolves no foreign registry; accept does.
                        </span>{" "}
                        <M key="t9">/v1/transfers/prepare</M> needs{" "}
                        <M key="t9b">registryChoiceContext</M> for a foreign instrument, while{" "}
                        <M key="t9c">/v1/transfers/accept</M> resolves it from the instruction.
                      </>,
                    ],
                    [
                      "10",
                      <>
                        <M key="t10">/v1/wallets/&#123;party&#125;/balance</M>{" "}
                        <span className="text-ink">over-counts for an issuer or registrar</span>{" "}
                        (stakeholder ≠ owner) and its top-level <M key="t10b">balance</M> sums
                        unlike instruments. Read <M key="t10c">instruments[]</M>, and use an
                        owner-filtered ACS read for registrar parties.
                      </>,
                    ],
                    [
                      "11",
                      <>
                        <M key="t11">/v1/ready</M>{" "}
                        <span className="text-ink">returns 200 even when degraded.</span> Read{" "}
                        <M key="t11b">status</M> and the per-dependency fields.
                      </>,
                    ],
                    [
                      "12",
                      <>
                        <M key="t12">/v1/transfers/history</M> is{" "}
                        <span className="text-ink">
                          the gateway&rsquo;s own log, not a ledger read
                        </span>{" "}
                        — it contains only transfers this API key broadcast through this
                        gateway.
                      </>,
                    ],
                    [
                      "13",
                      <>
                        <M key="t13">DUPLICATE_CONFIRMATION_REQUEST_UUID</M> means you
                        re-broadcast the same prepared transaction. The UUID is fixed at
                        prepare time, so retrying a broadcast can never work — it is blocked
                        for ~48 h. Re-prepare, re-sign, re-broadcast, and check first whether
                        the original actually committed.
                      </>,
                    ],
                    [
                      "14",
                      <>
                        <span className="text-ink">Holding contract ids are single-use.</span>{" "}
                        A transfer archives its input holding, so the cid must be re-read
                        before every send; a spent cid gives{" "}
                        <M key="t14">400 &quot;Given holdings are invalid&quot;</M>.
                      </>,
                    ],
                    [
                      "15",
                      <>
                        <span className="text-ink">
                          Small amounts come back in exponential notation.
                        </span>{" "}
                        <M key="t15">0.0000001</M> reads as <M key="t15b">1e-7</M> in a balance
                        response. It is the right value — do not parse{" "}
                        <M key="t15c">instruments[].amount</M> assuming plain decimal.
                      </>,
                    ],
                    [
                      "16",
                      <>
                        <span className="text-ink">
                          An unset shell variable becomes an empty string, not an error.
                        </span>{" "}
                        <M key="t16">&quot;admin&quot;:&quot;$DSO&quot;</M> with{" "}
                        <M key="t16b">DSO</M> unset sends <M key="t16c">&quot;&quot;</M>; the
                        prepare returns <M key="t16d">400 VALIDATION_ERROR</M> naming the
                        field, and the <em className="text-ink">signing</em> step then dies
                        with a cryptic <M key="t16e">Buffer.from … Received undefined</M>. A
                        fresh shell loses every export — check <M key="t16f">prep.json</M>{" "}
                        after every prepare.
                      </>,
                    ],
                    [
                      "17",
                      <>
                        <M key="t17">key.json</M>{" "}
                        <span className="text-ink">holds a private key.</span> Delete the
                        scratch files when done — they are not gitignored.
                      </>,
                    ],
                  ]}
                />
              </Section>
              {/* ─── 17 ROUTE INDEX ─── */}
              <Section id="route-index" title="Route index">
                <Table
                  head={["Method", "Path", "Auth"]}
                  rows={ROUTES.map(([m, p, a]) => [
                    <span
                      key={`${m}${p}`}
                      className="font-mono text-[11px] font-semibold uppercase tracking-wider text-ink-dim"
                    >
                      {m}
                    </span>,
                    <M key={`p${p}`}>{p}</M>,
                    a,
                  ])}
                />
              </Section>

              {/* CTA */}
              <section className="border-t border-line pt-12">
                <div className="relative overflow-hidden rounded-2xl border border-line bg-bg-card/60 p-8 md:p-10">
                  <div
                    className="pointer-events-none absolute -top-24 -right-24 h-[18rem] w-[18rem] rounded-full bg-brand-teal/15 blur-[100px]"
                    aria-hidden
                  />
                  <div className="relative">
                    <div className="eyebrow mb-4">
                      <span className="eyebrow-dot" aria-hidden />
                      <span>Get started</span>
                    </div>
                    <h2 className="display-h3 text-balance">
                      Keys are issued to design partners.
                    </h2>
                    <p className="mt-4 max-w-xl text-[15px] leading-relaxed text-ink-muted">
                      Tell us what you are building and which instruments you need. We issue a
                      key, a test party, and a route into the network — usually the same week.
                    </p>
                    <div className="mt-7 flex flex-wrap gap-3">
                      <Link href="/contact" className="btn-primary">
                        Request an API key
                        <ArrowUpRight className="h-4 w-4" />
                      </Link>
                      <Link href="/cove" className="btn-secondary">
                        Back to Cove
                      </Link>
                    </div>
                  </div>
                </div>
              </section>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
