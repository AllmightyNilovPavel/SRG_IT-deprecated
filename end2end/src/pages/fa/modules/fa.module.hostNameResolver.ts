import options from "options";
import { SiteList } from "../enum/fa.enum.siteList";

export function FaHostNameResolver(bankUrl: SiteList): string {
  let resolvedUrl: string;
  let hostName = options.fa.host;

  hostName === "test" ? (resolvedUrl = bankUrl) : (resolvedUrl = hostName + "-" + bankUrl);

  return resolvedUrl;
}
