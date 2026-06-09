import React from 'react';

export const metadata = {
  title: 'Hardware Store | Lux Agent Pro Setup',
  description: 'Certified, high-performance solid-state USB drives and hubs optimized for local offline AI execution.'
};

export default function USBStorePage() {
  return (
    <main style={{ paddingTop: 120, paddingBottom: 100 }}>
      {/* Decorative Blur Spheres for Premium Tech Vibe */}
      <div style={{ position: 'absolute', top: '10%', left: '5%', width: '400px', height: '400px', background: 'radial-gradient(circle, rgba(162,117,255,0.06) 0%, transparent 70%)', filter: 'blur(40px)', zIndex: 0, pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', top: '50%', right: '5%', width: '500px', height: '500px', background: 'radial-gradient(circle, rgba(139,122,184,0.05) 0%, transparent 70%)', filter: 'blur(50px)', zIndex: 0, pointerEvents: 'none' }} />

      <section className="container" style={{ position: 'relative', zIndex: 1 }}>
        
        {/* HERO SECTION */}
        <div style={{ textAlign: 'center', marginBottom: 80 }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '6px 12px', background: 'rgba(162,117,255,0.08)', border: '1px solid var(--primary)', borderRadius: '100px', color: 'var(--primary)', fontWeight: 600, fontSize: 13, marginBottom: 18 }}>
            ⚡ Recommended Hardware Suite
          </div>
          <h1 style={{ fontSize: 48, fontWeight: 800, margin: '0 0 16px', background: 'linear-gradient(to right, #fff, var(--primary))', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', letterSpacing: '-0.5px' }}>
            The Portable Hardware Core
          </h1>
          <p style={{ fontSize: 17, color: 'var(--text-dim)', maxWidth: 800, margin: '0 auto', lineHeight: 1.6 }}>
            Running localized AI models natively on your computer requires extremely high physical transfer speeds. We recommend and use **MOVESPEED Solid-State Media** as our certified hardware shell, delivering up to 1000MB/s read capability to boot LANA instantly.
          </p>
        </div>

        {/* PRODUCTS GRID */}
        <div className="grid grid-2" style={{ gap: 32, marginBottom: 60 }}>
          
          {/* FEATURED: SSD-LEVEL LED FLASH DRIVE */}
          <div className="card" style={{ gridColumn: 'span 2', background: 'rgba(26, 26, 30, 0.45)', backdropFilter: 'blur(20px)', border: '1px solid rgba(162,117,255,0.2)', padding: 40, display: 'flex', flexDirection: 'column', gap: 24, position: 'relative', overflow: 'hidden' }}>
            <div style={{ position: 'absolute', top: 0, right: 0, padding: '8px 16px', background: 'var(--primary)', color: '#fff', fontSize: 11, fontWeight: 'bold', borderBottomLeftRadius: 12, textTransform: 'uppercase', letterSpacing: 0.5 }}>
              ⭐ Recommended Pro Setup
            </div>
            
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 20 }}>
              <div style={{ flex: 1, minWidth: 300 }}>
                <div style={{ fontSize: 32, marginBottom: 12 }}>💾</div>
                <h2 style={{ fontSize: 28, fontWeight: 800, color: '#fff', marginBottom: 8 }}>
                  MOVESPEED Dual Interface LED SSD USB Drive
                </h2>
                <div style={{ fontSize: 14, color: 'var(--primary)', fontWeight: 600, marginBottom: 16 }}>
                  High-Speed 1000MB/s solid-state performance with active digital output
                </div>
                <p style={{ fontSize: 15, color: 'var(--text-dim)', lineHeight: 1.6, marginBottom: 20 }}>
                  This is our primary standard-retail drive recommended for all Lux setups. It bundles SSD-level flash chips inside a machined aluminum enclosure, completely resolving model loading latency bottlenecks. Includes a real-time digital status screen showing active copy speeds.
                </p>
                
                <div className="grid grid-3" style={{ gap: 16, marginBottom: 24 }}>
                  <div style={{ background: 'rgba(255,255,255,0.02)', padding: 12, borderRadius: 8, border: '1px solid rgba(255,255,255,0.05)' }}>
                    <div style={{ fontSize: 11, color: 'var(--text-muted)', marginBottom: 4 }}>READ SPEED</div>
                    <div style={{ fontSize: 18, fontWeight: 800, color: 'var(--success)' }}>1000 MB/s</div>
                  </div>
                  <div style={{ background: 'rgba(255,255,255,0.02)', padding: 12, borderRadius: 8, border: '1px solid rgba(255,255,255,0.05)' }}>
                    <div style={{ fontSize: 11, color: 'var(--text-muted)', marginBottom: 4 }}>DUAL PORTS</div>
                    <div style={{ fontSize: 18, fontWeight: 800, color: '#fff' }}>USB-C + A</div>
                  </div>
                  <div style={{ background: 'rgba(255,255,255,0.02)', padding: 12, borderRadius: 8, border: '1px solid rgba(255,255,255,0.05)' }}>
                    <div style={{ fontSize: 11, color: 'var(--text-muted)', marginBottom: 4 }}>STATUS DISPLAY</div>
                    <div style={{ fontSize: 18, fontWeight: 800, color: 'var(--warning)' }}>Active LED</div>
                  </div>
                </div>
              </div>

              {/* High-fidelity CSS Image Box */}
              <div style={{ width: '100%', maxWidth: '320px', background: 'rgba(0,0,0,0.3)', borderRadius: 16, padding: '24px', border: '1px solid var(--border)', textAlign: 'center', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                <div style={{ fontSize: 72, marginBottom: 12, filter: 'drop-shadow(0 10px 20px rgba(162,117,255,0.2))' }}>⚡</div>
                <div style={{ fontSize: 14, fontWeight: 'bold', color: '#fff', marginBottom: 4 }}>128GB / 256GB / 512GB</div>
                <div style={{ fontSize: 12, color: 'var(--text-muted)', marginBottom: 20 }}>SSD-Grade High Speed Flash</div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 10, width: '100%' }}>
                  <a 
                    href="https://www.amazon.com/MOVE-SPEED-Display-Android-Windows/dp/B0GKFNHN17/ref=sxin_17_pa_sp_search_thematic_sspa?content-id=amzn1.sym.6f93dabc-97b6-439f-8c1f-f7c2d7b1c674%3Aamzn1.sym.6f93dabc-97b6-439f-8c1f-f7c2d7b1c674&crid=6A4YU5SMD3DE&cv_ct_cx=LED%2Bdisplay%2BUSB%2Bdrive&keywords=LED%2Bdisplay%2BUSB%2Bdrive&pd_rd_i=B0GKFNHN17&pd_rd_r=144abf00-fbb0-4b53-a180-1ed3a45f42a7&pd_rd_w=87OCL&pd_rd_wg=dZ26i&pf_rd_p=6f93dabc-97b6-439f-8c1f-f7c2d7b1c674&pf_rd_r=R92MA1QGAT8N9JQQRM6W&qid=1780282618&sbo=RZvfv%2F%2FHxDF%2BO5021pAnSA%3D%3D&sprefix=led%2Bdisplay%2Busb%2Bdrive%2Caps%2C160&sr=1-2-6024b2a3-78e4-4fed-8fed-e1613be3bcce-spons&aref=lMFViQ4Bqu&sp_csd=d2lkZ2V0TmFtZT1zcF9zZWFyY2hfdGhlbWF0aWM&th=1"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-primary"
                    style={{ width: '100%', fontSize: 13, padding: '10px 14px' }}
                  >
                    View Model A (128GB)
                  </a>
                  <a 
                    href="https://www.amazon.com/MOVE-SPEED-Display-Android-Windows/dp/B0GKFSRQMW/ref=sxin_17_pa_sp_search_thematic_sspa?content-id=amzn1.sym.6f93dabc-97b6-439f-8c1f-f7c2d7b1c674%3Aamzn1.sym.6f93dabc-97b6-439f-8c1f-f7c2d7b1c674&crid=6A4YU5SMD3DE&cv_ct_cx=LED%2Bdisplay%2BUSB%2Bdrive&keywords=LED%2Bdisplay%2BUSB%2Bdrive&pd_rd_i=B0GKFNHN17&pd_rd_r=144abf00-fbb0-4b53-a180-1ed3a45f42a7&pd_rd_w=87OCL&pd_rd_wg=dZ26i&pf_rd_p=6f93dabc-97b6-439f-8c1f-f7c2d7b1c674&pf_rd_r=R92MA1QGAT8N9JQQRM6W&qid=1780282618&sbo=RZvfv%2F%2FHxDF%2BO5021pAnSA%3D%3D&sprefix=led%2Bdisplay%2Busb%2Bdrive%2Caps%2C160&sr=1-2-6024b2a3-78e4-4fed-8fed-e1613be3bcce-spons&aref=lMFViQ4Bqu&sp_csd=d2lkZ2V0TmFtZT1zcF9zZWFyY2hfdGhlbWF0aWM&th=1"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-secondary"
                    style={{ width: '100%', fontSize: 13, padding: '10px 14px' }}
                  >
                    View Model B (256GB SSD)
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* PRODUCT 2: TOUCHSCREEN PORTABLE SSD */}
          <div className="card" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', gap: 20 }}>
            <div>
              <div style={{ fontSize: 28, marginBottom: 12 }}>🖥️</div>
              <h3 style={{ fontSize: 20, fontWeight: 800, color: '#fff', marginBottom: 8 }}>
                MOVESPEED Touchscreen External SSD
              </h3>
              <div style={{ fontSize: 12, color: 'var(--primary)', fontWeight: 600, marginBottom: 12 }}>
                High-End Pocket SSD with LED Interactive Screen
              </div>
              <p style={{ fontSize: 14, color: 'var(--text-dim)', lineHeight: 1.5, marginBottom: 16 }}>
                Designed for advanced workstation users deploying massive Multi-Agent Swarms with heavy 8B+ models. It delivers outstanding 20Gbps data rates and includes an interactive OLED touch control board showing real-time disk parameters and temperature states.
              </p>
              
              <ul style={{ paddingLeft: 16, margin: '0 0 20px', fontSize: 12, color: 'var(--text-muted)', lineHeight: 1.6 }}>
                <li><b>SuperSpeed USB 3.2 Gen 2x2:</b> Speeds up to 20Gbps</li>
                <li><b>Machined chassis:</b> Hardened metal shell with dynamic temperature dissipation</li>
                <li><b>Fully compatible:</b> Ideal for Apple-Silicon Macs, Windows, and Linux</li>
              </ul>
            </div>
            
            <a 
              href="https://www.amazon.com/MOVE-SPEED-External-Touchscreen-Compatible/dp/B0F842RZRX?ref_=ast_sto_dp&th=1"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-secondary"
              style={{ width: '100%', fontSize: 13, padding: '10px 14px' }}
            >
              Shop Touchscreen SSD
            </a>
          </div>

          {/* PRODUCT 3: PUSH-PULL USB DRIVE */}
          <div className="card" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', gap: 20 }}>
            <div>
              <div style={{ fontSize: 28, marginBottom: 12 }}>🎛️</div>
              <h3 style={{ fontSize: 20, fontWeight: 800, color: '#fff', marginBottom: 8 }}>
                MOVESPEED 3-Stage Push-Pull USB Drive
              </h3>
              <div style={{ fontSize: 12, color: 'var(--primary)', fontWeight: 600, marginBottom: 12 }}>
                Rugged Dual Connector USB 3.2 Flash Drive
              </div>
              <p style={{ fontSize: 14, color: 'var(--text-dim)', lineHeight: 1.5, marginBottom: 16 }}>
                The ultimate backup companion. This rugged dual-interface drive features an innovative 3-stage mechanical push-pull protective shield, making it a highly durable, shockproof capsule to safeguard your local Brand memory vaults on the move.
              </p>
              
              <ul style={{ paddingLeft: 16, margin: '0 0 20px', fontSize: 12, color: 'var(--text-muted)', lineHeight: 1.6 }}>
                <li><b>Machined casing:</b> Military-grade mechanical connector protections</li>
                <li><b>Dual Link:</b> High-speed Type-C + Type-A connectors</li>
                <li><b>Shockproof:</b> Tamper-evident dust and spill-proof seals</li>
              </ul>
            </div>
            
            <a 
              href="https://www.amazon.com/MOVE-SPEED-Interface-3-Stage-Push-Pull/dp/B0D3F2SLPF?ref_=ast_sto_dp&th=1&psc=1"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-secondary"
              style={{ width: '100%', fontSize: 13, padding: '10px 14px' }}
            >
              Shop Push-Pull Drive
            </a>
          </div>

          {/* PRODUCT 4: CONVERTER HUB */}
          <div className="card" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', gap: 20, gridColumn: 'span 2' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 20 }}>
              <div style={{ flex: 1, minWidth: 280 }}>
                <div style={{ fontSize: 28, marginBottom: 12 }}>🔌</div>
                <h3 style={{ fontSize: 20, fontWeight: 800, color: '#fff', marginBottom: 8 }}>
                  MOVESPEED Smart LED Hub &amp; Converter
                </h3>
                <div style={{ fontSize: 12, color: 'var(--primary)', fontWeight: 600, marginBottom: 12 }}>
                  Type-C to Type-A digital status adapter with keyboard and controller link
                </div>
                <p style={{ fontSize: 14, color: 'var(--text-dim)', lineHeight: 1.5, marginBottom: 16 }}>
                  An essential connector link to boot Lux Agent from older machines or laptops with limited expansion ports. This digital display adapter matches keypads, mouse setups, and SSD controllers into a single high-bandwidth hub, letting you command your offline OS on any machine seamlessly.
                </p>
                <ul style={{ paddingLeft: 16, margin: 0, fontSize: 12, color: 'var(--text-muted)', lineHeight: 1.6 }}>
                  <li><b>Real-Time Output Wattage Display:</b> Monitors active power draws</li>
                  <li><b>Multi-Port Expander:</b> Connects keyboards, keypads, and USBs in parallel</li>
                  <li><b>Premium Aluminum Shell:</b> Perfect structural companion for daily use</li>
                </ul>
              </div>

              <div style={{ width: '100%', maxWidth: '240px', background: 'rgba(0,0,0,0.2)', border: '1px solid var(--border)', borderRadius: 12, padding: 18, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                <div style={{ fontSize: 44, marginBottom: 10 }}>🎛️</div>
                <div style={{ fontSize: 13, fontWeight: 'bold', color: '#fff', marginBottom: 8 }}>Digital Converter Hub</div>
                <a 
                  href="https://www.amazon.com/Adapter-Digital-Converter-Expander-Keyboards/dp/B0DN1GV58B/ref=sr_1_3?crid=6A4YU5SMD3DE&dib=eyJ2IjoiMSJ9.wrelE_OLR48Wn4r0Et4dZAoR3CIDJDJ4kDsgcy2bk9ZIRtgWhJ389yt47VXcg1Q0c49A502D4ol18K2LH38T8qPsxCUtu9pFtWm4EbsaB6uERkFOeE8S5w-k1ZwuAo3lYvxi0jaAl7IRwVOKahysXnhWgctxpj7EXWNCi44xbfePsKg4mlMzWHXF8jvqy9pXWztawLRt5tYWnvpjNYsJ4Ve5x81LqwawohIiP68cisk.6YAIxP23DWhlY3SXjv85TQsK37ko61JXZ2ZEG_azUkA&dib_tag=se&keywords=LED%2Bdisplay%2BUSB%2Bdrive&qid=1780282618&sprefix=led%2Bdisplay%2Busb%2Bdrive%2Caps%2C160&sr=8-3&th=1"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-secondary"
                  style={{ width: '100%', fontSize: 12, padding: '8px 12px' }}
                >
                  Shop Converter Hub
                </a>
              </div>
            </div>
          </div>

        </div>

        {/* OFFICIAL BRAND BANNER */}
        <div style={{ marginTop: 40, padding: 32, background: 'linear-gradient(135deg, rgba(162,117,255,0.06) 0%, rgba(139,122,184,0.03) 100%)', borderRadius: 20, border: '1px solid rgba(162,117,255,0.1)', display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', gap: 24 }}>
          <div>
            <h3 style={{ fontSize: 22, fontWeight: 800, color: '#fff', marginBottom: 4 }}>
              Explore the Certified MOVESPEED Catalog
            </h3>
            <p style={{ color: 'var(--text-dim)', fontSize: 14, margin: 0 }}>
              Need more heavy solid-state storages, accessory hubs, or power banks? Visit the official store on Amazon.
            </p>
          </div>
          <a 
            href="https://www.amazon.com/stores/MOVESPEED/page/FBFB9DCD-DE95-43B3-98F4-57840C412F96?lp_asin=B0GKFSRQMW&ref_=ast_bln&store_ref=bl_ast_dp_brandlogo_sto" 
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-primary"
            style={{ padding: '12px 24px', fontSize: 14 }}
          >
            Visit Official Amazon Store ↗
          </a>
        </div>

      </section>
    </main>
  );
}
