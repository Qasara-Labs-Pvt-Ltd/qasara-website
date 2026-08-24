import type { Metadata } from "next";
import type { ReactNode } from "react";

/**
 * Unlisted. Deliberately not linked from Nav, the Cove page, or anywhere else,
 * and marked noindex — it is handed out by direct link to Featured App
 * reviewers. Nothing here is secret (no credential appears on the page), but it
 * is written for one audience and should not surface in search or navigation.
 */
export const metadata: Metadata = {
  title: "Cove Wallet API — reviewer guide",
  description:
    "Endpoint-by-endpoint guide to the nine wallet-API tests, with real request and response bodies captured from Canton MainNet.",
  robots: { index: false, follow: false },
};

/* ─────────────────────────── building blocks ─────────────────────────── */

function Code({ children }: { children: string }) {
  return (
    <pre className="overflow-x-auto rounded-lg border border-line bg-bg-subtle p-4 text-[13px] leading-relaxed text-ink/90">
      <code className="font-mono">{children}</code>
    </pre>
  );
}

function Verb({ method, path }: { method: string; path: string }) {
  const tone =
    method === "GET"
      ? "bg-brand-teal/15 text-brand-mint border-brand-teal/30"
      : "bg-brand-blue/15 text-blue-300 border-brand-blue/30";
  return (
    <div className="flex flex-wrap items-center gap-3">
      <span className={`rounded border px-2 py-0.5 font-mono text-xs font-semibold ${tone}`}>
        {method}
      </span>
      <span className="break-all font-mono text-sm text-ink">{path}</span>
    </div>
  );
}

function Badge({ kind }: { kind: "captured" | "pending" }) {
  return kind === "captured" ? (
    <span className="inline-flex items-center gap-1.5 rounded-full border border-brand-teal/30 bg-brand-teal/10 px-2.5 py-0.5 text-xs font-medium text-brand-mint">
      <span className="h-1.5 w-1.5 rounded-full bg-brand-mint" />
      Captured from a live call
    </span>
  ) : (
    <span className="inline-flex items-center gap-1.5 rounded-full border border-brand-amber/30 bg-brand-amber/10 px-2.5 py-0.5 text-xs font-medium text-amber-300">
      <span className="h-1.5 w-1.5 rounded-full bg-amber-400" />
      Not yet re-captured
    </span>
  );
}

function Note({ tone = "info", children }: { tone?: "info" | "warn"; children: ReactNode }) {
  const c =
    tone === "warn"
      ? "border-brand-amber/30 bg-brand-amber/[0.06]"
      : "border-brand-blue/30 bg-brand-blue/[0.06]";
  return <div className={`rounded-lg border ${c} p-4 text-sm text-ink-muted`}>{children}</div>;
}

function Test({
  n,
  title,
  badge,
  children,
}: {
  n: number;
  title: string;
  badge: "captured" | "pending";
  children: ReactNode;
}) {
  return (
    <section id={`test-${n}`} className="scroll-mt-24 border-t border-line pt-10">
      <div className="mb-5 flex flex-wrap items-center gap-x-4 gap-y-2">
        <span className="font-mono text-sm text-ink-dim">Test {n}</span>
        <h2 className="text-xl font-semibold tracking-tight text-ink">{title}</h2>
        <Badge kind={badge} />
      </div>
      <div className="space-y-5">{children}</div>
    </section>
  );
}

function P({ children }: { children: ReactNode }) {
  return <p className="text-[15px] leading-relaxed text-ink-muted">{children}</p>;
}

const TESTS = [
  "The service is up",
  "Create parties A and B",
  "Authorise A to receive",
  "Confirm the pre-approval",
  "We fund A",
  "Check the balance",
  "Send Canton Coin, one step",
  "Send USDCx to B, two steps",
  "Party scoping. Must fail.",
];

/* ────────────────────────────── the page ────────────────────────────── */

export default function ReviewerGuidePage() {
  return (
    <main className="mx-auto max-w-3xl px-6 py-16 sm:py-24">
      <header className="mb-12">
        <p className="mb-3 font-mono text-xs uppercase tracking-widest text-brand-mint">
          Featured App review · entry 1270
        </p>
        <h1 className="text-3xl font-semibold tracking-tightest-2 text-ink sm:text-4xl">
          Cove Wallet API — reviewer guide
        </h1>
        <p className="mt-4 text-lg leading-relaxed text-ink-muted">
          Nine tests following one wallet&rsquo;s life: create it, authorise it, fund it, check it,
          spend from it. Every request and response marked{" "}
          <span className="text-brand-mint">captured</span> was transcribed from a live Canton
          MainNet call on 24 August 2026, not written from a schema.
        </p>
        <div className="mt-6 rounded-lg border border-line bg-bg-card p-4">
          <p className="text-sm text-ink-muted">
            <span className="text-ink">Base URL</span>
            <span className="mx-2 text-ink-dim">·</span>
            <code className="font-mono text-brand-mint">https://walletapi.cove.qasara.ai</code>
          </p>
        </div>
      </header>

      {/* contents */}
      <nav className="mb-14 rounded-xl border border-line bg-bg-card p-5">
        <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-ink-dim">
          The nine tests
        </p>
        <ol className="space-y-1.5">
          {TESTS.map((t, i) => (
            <li key={t}>
              <a
                href={`#test-${i + 1}`}
                className="group flex gap-3 text-sm text-ink-muted transition hover:text-ink"
              >
                <span className="font-mono text-ink-dim group-hover:text-brand-mint">
                  {String(i + 1).padStart(2, "0")}
                </span>
                {t}
              </a>
            </li>
          ))}
        </ol>
      </nav>

      {/* conventions */}
      <section className="mb-4 space-y-5">
        <h2 className="text-xl font-semibold tracking-tight text-ink">Conventions</h2>
        <P>
          One bearer token on every call except <code className="font-mono text-ink">/v1/health</code>{" "}
          and <code className="font-mono text-ink">/v1/ready</code>. Your reviewer key arrives with
          your credentials, separately from this page.
        </P>
        <Code>{`authorization: Bearer <reviewer api key>
content-type: application/json      # on POST only`}</Code>
        <P>
          Party ids contain <code className="font-mono text-ink">::</code>. Percent-encode them in a
          path (<code className="font-mono text-ink">%3A%3A</code>) or let curl do it. Query-string
          uses are fine raw.
        </P>
        <Note>
          <span className="text-ink">Nothing is custodial.</span> Every state-changing call is a
          pair: a <span className="font-mono">prepare</span> that returns material to sign, and a{" "}
          <span className="font-mono">broadcast</span> that takes your signature. We never see a
          private key and never return a signature. Signing happens on your machine, between the two
          calls.
        </Note>
        <P>Errors all share one shape:</P>
        <Code>{`{ "error": { "code": "VALIDATION_ERROR", "message": "Validation failed", "details": { } } }

400  VALIDATION_ERROR   body failed schema validation; details.issues[] names each field
401  UNAUTHORIZED       Missing Authorization header / Invalid Authorization header format
403  FORBIDDEN          Party not managed by this account, or admin secret required
404  NOT_FOUND          unknown id
501  NOT_IMPLEMENTED    /v1/transfers/estimate-gas, deliberately`}</Code>
        <Note tone="warn">
          <span className="text-ink">Settlement is not instant.</span> We have observed 33 seconds
          to 4 minutes on MainNet. Poll the status endpoint rather than the clock. There is no{" "}
          <span className="font-mono">settled</span> status; the terminal values are{" "}
          <span className="font-mono">confirmed</span> and <span className="font-mono">failed</span>.
        </Note>
      </section>

      <div className="mt-14 space-y-14">
        <Test n={1} title="The service is up" badge="captured">
          <Verb method="GET" path="/v1/health" />
          <Code>{`{ "status": "healthy", "timestamp": "2026-08-24T08:47:38.374Z", "version": "1.0.0" }`}</Code>
          <Verb method="GET" path="/v1/ready" />
          <Code>{`{ "status": "ready", "db": "connected", "redis": "connected", "canton": "connected" }`}</Code>
          <P>
            <span className="font-mono">/health</span> is liveness only.{" "}
            <span className="font-mono">/ready</span> is the one that tells you our dependencies are
            up. Neither needs a key.
          </P>
        </Test>

        <Test n={2} title="Create parties A and B, keeping both keys" badge="captured">
          <P>
            Do this twice. A is the wallet under test; B is the counterparty for test 8. Generate an
            Ed25519 keypair locally and send us only the public half.
          </P>
          <Verb method="POST" path="/v1/parties/prepare" />
          <Code>{`{ "publicKey": "AvC9tFfulOw6L9riF2ixaLyc9hQAfL/w/aBLia/V+xc=" }`}</Code>
          <P>Response 200:</P>
          <Code>{`{
  "partyId": "9a8363e6-...::1220d6f2bfc0efae700e421a5f0a5dd454243cf11be318913b0106d6b8648e13ce80",
  "publicKey": "AvC9tFfulOw6L9riF2ixaLyc9hQAfL/w/aBLia/V+xc=",
  "topologyTransactions": ["CpMCCAEQARqMAkqJAgpqOWE4MzYzZTYt..."],
  "multiHash": "EiBG7eRJ9kZVSQML3XiMCCpr6V6G2whTuVMyoz4WEUi7dg==",
  "publicKeyFingerprint": "1220d6f2bfc0efae700e421a5f0a5dd454243cf11be318913b0106d6b8648e13ce80"
}`}</Code>
          <P>
            The party id is derived from your public key, so it exists before the party does.
            Nothing is on-ledger yet. Sign <span className="font-mono">multiHash</span> locally: an
            Ed25519 detached signature over the base64-decoded bytes, returned base64.
          </P>
          <Verb method="POST" path="/v1/parties/register" />
          <Code>{`{
  "signature": "bFpNVb3Uw44n1OltOgRyEIfjwTSa8JJc4VxaopwbvKdFV9muk7PyRDaVYj2wp4gyyE+7NnWtgGv3L8yLNYOMBg==",
  "preparedParty": { "...the entire object from prepare, verbatim..." }
}

-> 200  { "partyId": "9a8363e6-...::1220d6f2...", "status": "allocated" }`}</Code>
          <Note>
            <span className="text-ink">What to check.</span> Read both request bodies you sent: your
            private key is in neither. Read both of our responses: neither contains a signature.
            That is the whole non-custodial claim, and it takes thirty seconds to verify.
          </Note>
          <Verb method="GET" path="/v1/parties" />
          <Code>{`{
  "items": [
    { "id": "f34d02b1-9bd1-4078-a3b3-a2a254cc3eef",
      "cantonPartyId": "9a8363e6-...::1220d6f2...",
      "publicKeyFingerprint": "1220d6f2...",
      "displayName": null,
      "status": "allocated",
      "createdAt": "2026-08-24T11:16:20.853Z" }
  ],
  "hasMore": false
}`}</Code>
          <P>
            Scoped to your account rather than to the individual key, since several keys can belong
            to one account and the account owns the parties.{" "}
            <span className="font-mono">GET /v1/parties/&#123;partyId&#125;</span> returns one, with{" "}
            <span className="font-mono">publicKey</span> and{" "}
            <span className="font-mono">preApprovedInstruments</span> added.
          </P>
        </Test>

        <Test n={3} title="Authorise A to receive, before it holds anything" badge="captured">
          <P>
            A pre-approval is the receiver saying &ldquo;accept this instrument without asking me
            each time&rdquo;. It is <span className="text-ink">A&rsquo;s</span> authorisation, so{" "}
            <span className="text-ink">A signs it</span> — not the sender, not us. Do it on a new
            party, so you see the state change. Leave B alone: test 8 needs a receiver without one.
          </P>
          <Verb method="POST" path="/v1/wallets/{A}/preapproval/prepare" />
          <Code>{`{
  "registry": "amulet",
  "instrument": { "id": "Amulet",
                  "admin": "DSO::1220b1431ef217342db44d516bb9befde802be7d8899637d290895fa58880f19accc" }
}

-> 200
{
  "commandId": "bd9de490-0f5d-4fb2-9955-172273420d15",
  "preparedTransaction": "CpUICgMyLjESATAa5gcKATDCPt8HCtwHCgMyLjESQjAwYjRhMjk5...",
  "preparedTransactionHash": "aFGhXpi/ck9wSW3eBRRnomRAa0uBfStWEAz7rfqFBFY=",
  "hashingSchemeVersion": "HASHING_SCHEME_VERSION_V2",
  "trafficCost": { "requestBytes": 3380, "responseBytes": 0, "totalBytes": 3380 }
}`}</Code>
          <P>
            Note <span className="font-mono">trafficCost</span>: the real byte cost of the
            submission, returned on every prepare. A signs{" "}
            <span className="font-mono">preparedTransactionHash</span>, then:
          </P>
          <Verb method="POST" path="/v1/transfers/broadcast" />
          <Code>{`{
  "partyId": "9a8363e6-...::1220d6f2...",
  "signature": "rotUtHGw5dBwH18jaifAbQlidn1mQnMEoweC2DwXpaJ2LxVfY1ZRVoYh3I0VxQGEjymr8RjEcpQkwHC2kS4PDQ==",
  "publicKey": "AvC9tFfulOw6L9riF2ixaLyc9hQAfL/w/aBLia/V+xc=",
  "preparedTransaction": { "preparedTransaction": "...", "preparedTransactionHash": "...",
                           "hashingSchemeVersion": "HASHING_SCHEME_VERSION_V2" }
}

-> 200
{ "status": "confirmed",
  "transactionId": "0d54557f-545a-422d-8934-f53170a1ad1b",
  "cantonUpdateId": "1220d722caa41210c63fc83acedcf37cae998e78440ef1d42214a36e677896f7441e",
  "commandId": "0d54557f-545a-422d-8934-f53170a1ad1b" }`}</Code>
          <P>
            That <span className="font-mono">cantonUpdateId</span> resolves on Scan. The transaction
            creates a <span className="font-mono">TransferPreapprovalProposal</span> — a proposal,
            not the pre-approval itself. Test 4 is where it becomes real.
          </P>
          <P>
            <span className="text-ink">For USDCx, or any registry token</span>, the same route takes
            a different body, and commits by a different path:
          </P>
          <Code>{`{
  "registry": "utility",
  "operatorPartyId": "<operator, in the credentials pack>",
  "registrarPartyId": "<registrar, in the credentials pack>",
  "instrumentAllowances": [ { "id": "USDCx" } ]
}`}</Code>
          <Note tone="warn">
            Commit this one with{" "}
            <span className="font-mono text-ink">POST /v1/interactive/execute</span>, not{" "}
            <span className="font-mono">/v1/transfers/broadcast</span>. The participant validates
            this template against the real transaction hash and the broadcast path zeroes it. It
            takes effect immediately: no proposal, nothing to wait for. Allowance entries are{" "}
            <span className="font-mono">&#123;&quot;id&quot;&#125;</span> only; an empty list
            pre-approves every instrument from that registrar.
          </Note>
        </Test>

        <Test n={4} title="Confirm the Canton Coin pre-approval went live" badge="captured">
          <Verb method="GET" path="/v1/wallets/{A}/preapproval" />
          <Code>{`before, and for up to a minute after
{ "partyId": "9a8363e6-...::1220d6f2...", "isPreApproved": false, "status": "none" }

after the validator's automation accepts the proposal
{ "partyId": "9a8363e6-...::1220d6f2...", "isPreApproved": true,  "status": "active" }`}</Code>
          <Note tone="warn">
            <span className="text-ink">We measured 60 seconds</span>, six polls at ten-second
            intervals. Reading that first <span className="font-mono">false</span> as a failure is
            the single most likely way to misread this API, which is why it gets its own test. The
            pre-approval expires — 90 days when we last checked — and nothing renews it
            automatically.
          </Note>
          <Note tone="warn">
            <span className="text-ink">A known inconsistency, reported rather than hidden.</span>{" "}
            <span className="font-mono">GET /v1/parties/&#123;partyId&#125;</span> returns{" "}
            <span className="font-mono">&quot;preApprovedInstruments&quot;: []</span> for the same
            party while <span className="font-mono">/preapproval</span> reports{" "}
            <span className="font-mono">active</span>.{" "}
            <span className="text-ink">/preapproval is authoritative.</span> The party-detail field
            is not being populated and we are fixing it. If you check party detail and conclude the
            pre-approval failed, that is our bug, not your mistake.
          </Note>
          <P>
            This endpoint reports the Amulet pre-approval only. There is no read endpoint for a
            registry token&rsquo;s. For those, ask the registry for a transfer factory (test 8, step
            2) and read <span className="font-mono">transferKind</span>:{" "}
            <span className="font-mono">&quot;offer&quot;</span> means no pre-approval,{" "}
            <span className="font-mono">&quot;direct&quot;</span> means there is one.
          </P>
        </Test>

        <Test n={5} title="We fund A, and it lands in one step" badge="captured">
          <P>
            Send us A&rsquo;s party id and we transfer it Canton Coin and USDCx. Because test 3
            pre-approved both, each transfer settles in one step.
          </P>
          <Verb method="GET" path="/v1/transfers/pending?partyId={A}" />
          <Code>{`[]`}</Code>
          <P>
            Empty is the result you want: nothing is waiting for you to accept. Without test 3, both
            transfers would be sitting in that array. That is what a pre-approval is for, and it is
            worth seeing before test 8 shows you the other case.
          </P>
        </Test>

        <Test n={6} title="Check the balance" badge="captured">
          <Verb method="GET" path="/v1/wallets/{A}/balance" />
          <Code>{`a funded party
{ "partyId": "eaa94ebd-...::1220216527...",
  "balance": "1.8641441161",
  "instruments": [ { "id": "Amulet", "amount": "0.9" },
                   { "id": "USDCx",  "amount": "0.9641441161" } ] }

a new one
{ "partyId": "9a8363e6-...::1220d6f2...", "balance": "0", "instruments": [] }`}</Code>
          <Note tone="warn">
            <span className="text-ink">Read instruments, not balance.</span> The top-level{" "}
            <span className="font-mono">balance</span> sums every instrument, so above it adds 0.9
            Amulet to 0.964 USDCx and reports 1.8641441161, which denominates nothing. It is a known
            defect, we are removing it, and we would rather point at it than have you find it.
            Canton Coin appears as <span className="font-mono text-ink">Amulet</span>, not CC.
          </Note>
          <Verb method="GET" path="/v1/wallets/{A}/contracts" />
          <Code>{`[]   // the individual holdings behind the balance, each with its contractId`}</Code>
          <P>Test 8 needs one of those contract ids.</P>
          <Verb method="GET" path="/v1/transfers/history?partyId={A}" />
          <Code>{`{ "items": [ {
    "id": "71f5d0cb-b85d-4364-a2ae-37fb560b312b",
    "apiKeyId": "17832142-5462-4953-9e15-9b661f640b26",
    "commandId": "0d54557f-545a-422d-8934-f53170a1ad1b",
    "partyId": "9a8363e6-...::1220d6f2...",
    "type": "broadcast", "status": "confirmed", "broadcastMode": "sync", "retryCount": 0,
    "cantonUpdateId": "1220d722caa41210c63fc83acedcf37cae998e78440ef1d42214a36e677896f7441e",
    "completedAt": "2026-08-24T11:17:59.536Z"
} ] }`}</Code>
          <P>
            Every submission records the <span className="font-mono">apiKeyId</span> that made it,
            so activity is attributable per reviewer if you take a key each.
          </P>
        </Test>

        <Test n={7} title="Send Canton Coin, one step" badge="pending">
          <P>
            The receiver is our funding party, which is pre-approved, so this settles without anyone
            accepting. Its id is in the credentials pack.
          </P>
          <Verb method="POST" path="/v1/transfers/prepare" />
          <Code>{`{
  "senderPartyId": "<A>",
  "receiverPartyId": "<our funding party>",
  "amount": "0.01",
  "instrument": { "id": "Amulet", "admin": "DSO::1220b1431ef2..." }
}`}</Code>
          <P>
            Returns the same shape as test 3. A signs the hash, then{" "}
            <span className="font-mono">POST /v1/transfers/broadcast</span> exactly as before.
          </P>
          <Verb method="GET" path="/v1/transfers/{commandId}/status" />
          <P>
            Poll until <span className="font-mono">status</span> is{" "}
            <span className="font-mono">confirmed</span>. Take the{" "}
            <span className="font-mono">cantonUpdateId</span> to Scan, then re-run test 6: the
            balance has dropped by the amount plus fees.
          </P>
          <Note tone="warn">
            The prepare and broadcast pair is proven by test 3, which uses the identical endpoints,
            but a Canton Coin transfer specifically has not been re-run since 21 August because the
            test party is not yet funded.
          </Note>
        </Test>

        <Test n={8} title="Send USDCx to B, two steps, and accept it" badge="pending">
          <P>
            Same endpoints, different outcome, because B never authorised the instrument.
          </P>
          <Note>
            <span className="text-ink">Where step 2 goes matters.</span> The transfer factory comes
            from the instrument&rsquo;s own registry, not from us. We do not proxy it and you do not
            have to trust us for it. That is how the token standard is meant to work, and it is why
            this is not a path peculiar to Cove.
          </Note>
          <Code>{`1. GET /v1/wallets/{A}/contracts   -> take the contractId of a USDCx holding

2. POST https://api.utilities.digitalasset.com/api/token-standard/v0
        /registrars/{registrar}/registry/transfer-instruction/v1/transfer-factory
   (not us, no auth) naming sender A, receiver B, amount, instrumentId, holding id
   -> { factoryId, choiceContext, transferKind: "offer" }
      "offer" is the tell that B has no pre-approval

3. POST /v1/transfers/prepare
   { "senderPartyId": "<A>", "receiverPartyId": "<B>", "amount": "0.01",
     "instrument": { "id": "USDCx", "admin": "<registrar>" },
     "registryChoiceContext": { "factoryId": "...", "choiceContext": {} } }

4. A signs -> POST /v1/transfers/broadcast -> poll status to confirmed

5. GET /v1/transfers/pending?partyId={B}   -> the TransferInstruction, waiting

6. POST /v1/transfers/accept
   { "partyId": "<B>", "transferContractId": "<from pending>" }
   That is the entire body. B signs and broadcasts as usual.`}</Code>
          <P>
            We read the instrument off the instruction on-ledger and resolve that registrar&rsquo;s
            registry ourselves, which is what makes accept, reject and withdraw work for any
            token-standard asset rather than a list we maintain by hand.
          </P>
          <Note tone="warn">
            <span className="text-ink">Until B accepts, the amount is not in B&rsquo;s balance.</span>{" "}
            The holding still belongs to A and is locked by the registrar. We deliberately do not
            credit a receiver with funds they cannot yet spend.
          </Note>
          <P>
            Verified end to end on 21 August with USDCx, including the bare{" "}
            <span className="font-mono">&#123;partyId, transferContractId&#125;</span> accept.
            Blocked from re-running until the test party holds USDCx.
          </P>
        </Test>

        <Test n={9} title="Party scoping. This one must fail." badge="captured">
          <P>
            Repeat test 7 with a party that is not yours in{" "}
            <span className="font-mono">senderPartyId</span>. Any real party will do.
          </P>
          <Code>{`-> 403
{ "error": { "code": "FORBIDDEN", "message": "Party not managed by this account" } }`}</Code>
          <P>
            The refusal happens before anything is prepared. A key may only prepare or sign for
            parties belonging to its own account. If this ever succeeds it is a serious finding and
            we want to hear about it immediately.
          </P>
          <P>
            The same control guards our operator surface.{" "}
            <span className="font-mono">POST /v1/nodes</span> and{" "}
            <span className="font-mono">POST /v1/utility-registry/issue</span> both answer{" "}
            <span className="font-mono">403 &quot;admin secret required&quot;</span> to a reviewer
            key. Operator reads are open:{" "}
            <span className="font-mono">GET /v1/nodes</span> returns{" "}
            <span className="font-mono">200 &#123;&quot;nodes&quot;: []&#125;</span>. We would rather
            say so than claim a boundary that is only true of the writes.
          </P>
        </Test>
      </div>

      <section className="mt-16 border-t border-line pt-10">
        <h2 className="mb-4 text-xl font-semibold tracking-tight text-ink">Not covered here</h2>
        <P>
          The x402 pay-per-call endpoints and the real-time event stream are part of the product but
          not the wallet API, so they are out of scope for these tests.{" "}
          <span className="font-mono">GET /v1/x402/info</span> is public if you want to look.{" "}
          <span className="font-mono">POST /v1/transfers/estimate-gas</span> returns 501
          deliberately.
        </P>
        <div className="mt-8 rounded-xl border border-line bg-bg-card p-6">
          <h3 className="mb-2 text-base font-semibold text-ink">If something goes wrong</h3>
          <P>
            Send us the <span className="font-mono">commandId</span> or the{" "}
            <span className="font-mono">cantonUpdateId</span> and the timestamp. Every request
            carries a correlation id and we can trace any call end to end from it.
          </P>
          <p className="mt-4 text-sm text-ink-muted">
            <span className="text-ink">Anand Agarwal</span>
            <span className="mx-2 text-ink-dim">·</span>
            <a className="text-brand-mint hover:underline" href="mailto:anand@qasara.ai">
              anand@qasara.ai
            </a>
            <span className="mx-2 text-ink-dim">·</span>
            available for a call at short notice during the review.
          </p>
        </div>
      </section>
    </main>
  );
}
