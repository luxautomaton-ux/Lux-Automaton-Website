const DOMAIN_DESTINATIONS: Record<string, string> = {
  "luxwarmconnect.com": "https://myluxagent.com/products/warm-connect",
  "www.luxwarmconnect.com": "https://myluxagent.com/products/warm-connect",
  "joinluxconnect.com": "https://luxautomaton.com/lux-connect",
  "www.joinluxconnect.com": "https://luxautomaton.com/lux-connect",
  "lawcheckai.com": "https://luxautomaton.com/lawcheck-ai",
  "www.lawcheckai.com": "https://luxautomaton.com/lawcheck-ai",
  "luxverifyai.com": "https://myluxagent.com/products/verify",
  "www.luxverifyai.com": "https://myluxagent.com/products/verify",
  "luxcareeros.com": "https://luxautomaton.com/lux-career-os",
  "www.luxcareeros.com": "https://luxautomaton.com/lux-career-os",
  "luxaikids.com": "https://luxautomaton.com/lux-ai-kids",
  "www.luxaikids.com": "https://luxautomaton.com/lux-ai-kids",
}

export default {
  async fetch(request: Request): Promise<Response> {
    const incoming = new URL(request.url)
    const destination = DOMAIN_DESTINATIONS[incoming.hostname.toLowerCase()]

    if (!destination) {
      return new Response("Lux domain route is not activated for this hostname.", {
        status: 404,
        headers: {
          "content-type": "text/plain; charset=utf-8",
          "cache-control": "no-store",
        },
      })
    }

    const target = new URL(destination)
    target.search = incoming.search
    return Response.redirect(target.toString(), 308)
  },
}
