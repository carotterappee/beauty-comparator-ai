"use client";
import Header from ".";        
export default function HeroPanel() {
  const panelBg = "#f6e3f2b4";
  const pageBg = "#fcf9e781";

  return (
    <section className="relative isolate">
      {/* Bloc entête coloré */}
      <div className="relative" style={{ backgroundColor: panelBg }}>
        <Header />
      </div>
    </section>
  );
}
