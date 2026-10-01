import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { Apple, CheckCircle2, Download, HardDrive, Laptop, ShieldCheck, Usb } from "lucide-react";
import { prefixPath } from "@/lib/prefix";

export const metadata: Metadata = {
  title: "Download Lux Agent — Lux Automaton",
  description: "Get started with Lux Agent Desktop for Mac or Windows and explore the optional Lux Agent USB travel companion.",
};

const requirements = [
  ["Mac", "Current supported macOS build", Apple],
  ["Windows", "Current supported Windows build", Laptop],
  ["Memory", "8 GB recommended", HardDrive],
  ["Activation", "Internet may be required for activation", ShieldCheck],
];

export default function DownloadPage(){
  return (
    <main className="lux26-download">
      <section className="lux26-download-hero">
        <video className="lux26-hero-film" autoPlay muted loop playsInline poster={prefixPath("/images/lux-agent-hero-bg.jpg")}>
          <source src={prefixPath("/videos/lux-automaton-intro.mp4")} type="video/mp4"/>
        </video>
        <div className="lux26-hero-shade"/>
        <div className="lux26-site-width lux26-download-grid">
          <div>
            <span className="lux26-eyebrow">GET STARTED</span>
            <h1>Download <em>Lux Agent.</em></h1>
            <h2>Your AI team, on your desktop.</h2>
            <p>
              Start with the full Lux Agent Desktop experience. Release access is provided through the
              current Lux onboarding flow so you receive the correct build and setup path for your device.
            </p>
            <div className="lux26-download-actions">
              <Link href="/contact" className="lux26-download-button primary"><Apple size={22}/> Get the Mac Build <b>→</b></Link>
              <Link href="/contact" className="lux26-download-button"><Laptop size={22}/> Get the Windows Build <b>→</b></Link>
            </div>
            <div className="lux26-download-trust">
              <span><ShieldCheck size={17}/> Private-first options</span>
              <span><CheckCircle2 size={17}/> Guided setup</span>
              <span><Usb size={17}/> Optional USB companion</span>
            </div>
          </div>
          <div className="lux26-download-device">
            <Image src={prefixPath("/images/lux-agent-hero.png")} alt="Lux Agent Desktop workspace" width={1400} height={900} priority/>
          </div>
        </div>
      </section>

      <section className="lux26-requirements">
        <div className="lux26-site-width">
          {requirements.map(([title,copy,Icon])=>(
            <div key={String(title)}>
              <Icon size={30} strokeWidth={1.6}/>
              <span><strong>{String(title)}</strong><small>{String(copy)}</small></span>
            </div>
          ))}
        </div>
      </section>

      <section className="lux26-download-body">
        <div className="lux26-site-width">
          <header className="lux26-section-heading compact">
            <span>GET UP AND RUNNING</span>
            <h2>Three simple steps.</h2>
          </header>
          <div className="lux26-step-grid">
            {[
              ["01","Request the right build","Choose your device and start the current Lux access flow.",Download],
              ["02","Install + configure","Follow the guided setup for Lux Agent Desktop and your workspace.",Laptop],
              ["03","Activate your environment","Connect your account, approved tools, and the context you want Lux to use.",ShieldCheck],
            ].map(([num,title,copy,Icon])=>(
              <article key={String(num)}>
                <span>{String(num)}</span>
                <Icon size={34} strokeWidth={1.6}/>
                <h3>{String(title)}</h3>
                <p>{String(copy)}</p>
              </article>
            ))}
          </div>

          <div className="lux26-download-addons">
            <div>
              <span className="lux26-eyebrow">OPTIONAL COMPANIONS</span>
              <h2>Take the experience further.</h2>
              <p>Desktop stays the home base. USB and packs extend the experience without replacing it.</p>
            </div>
            <Link href="/products/lux-agent-usb">
              <Image src={prefixPath("/images/lux-agent-usb-thumbnail.png")} alt="" width={520} height={400}/>
              <strong>Lux Agent USB</strong><span>Portable travel companion.</span>
            </Link>
            <Link href="/products#memory-packs">
              <Image src={prefixPath("/images/ecosystem/memory-packs-hero.png")} alt="" width={520} height={400}/>
              <strong>Memory Packs</strong><span>Structured context and continuity.</span>
            </Link>
            <Link href="/products/success-packs">
              <Image src={prefixPath("/images/ecosystem/success-packs-hero.png")} alt="" width={520} height={400}/>
              <strong>Success Packs</strong><span>Templates, tools, and playbooks.</span>
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
