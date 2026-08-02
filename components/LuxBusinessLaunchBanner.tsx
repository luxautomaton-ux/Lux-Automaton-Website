import Image from "next/image";
import Link from "next/link";
import { prefixPath } from "@/lib/prefix";

export default function LuxBusinessLaunchBanner() {
  return (
    <section className="launch-os-banner-shell" aria-label="Lux Business Launch OS">
      <div className="launch-os-banner">
        <video autoPlay muted loop playsInline poster={prefixPath("/images/lux-business-launch-os/dashboard.png")}>
          <source src={prefixPath("/videos/lux-business-launch-os-launch-film.mp4")} type="video/mp4" />
        </video>
        <div className="launch-os-banner-shade" />
        <div className="launch-os-banner-copy">
          <Image src={prefixPath("/images/lux-business-launch-os/logo.png")} alt="Lux Business Launch OS by Lux Automaton" width={342} height={114} className="launch-os-banner-logo" />
          <p className="launch-os-eyebrow">New founder service · formation to foundation</p>
          <h2>Build the company.<br /><span>Keep the record.</span></h2>
          <p className="launch-os-banner-lede">Launch with a company identity, organized Corporate Book, guided resolutions, renewal tracking, and LANA beside you for every next step.</p>
          <Link href="/solutions/lux-business-launch-os" className="launch-os-banner-cta">Explore Launch OS <span>→</span></Link>
        </div>
        <div className="launch-os-banner-proof" aria-label="Launch OS benefits">
          <div><b>01</b><span>Launch setup</span></div>
          <div><b>02</b><span>Corporate Book</span></div>
          <div><b>03</b><span>Compliance rhythm</span></div>
        </div>
      </div>
    </section>
  );
}
