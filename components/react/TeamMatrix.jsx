/**
 * Team Matrix React components.
 * Needs tokens/tokens.css and css/team-matrix.css loaded once in the app.
 *
 * import { Button, Card, Stat, Badge, SectionHeading, Logo, Tier, Honours, MatchScore } from "./components/react/TeamMatrix";
 */
import React from "react";

const cx = (...c) => c.filter(Boolean).join(" ");

/** Primary = accent fill (main background). Inside a Card or .tm-on-second it turns white automatically. */
export function Button({ variant = "primary", href, children, className, ...rest }) {
  const cls = cx("tm-btn", `tm-btn--${variant}`, className);
  return href ? <a className={cls} href={href} {...rest}>{children}</a> : <button className={cls} type="button" {...rest}>{children}</button>;
}

/** Card on the second background (#513899). */
export function Card({ children, className, ...rest }) {
  return <div className={cx("tm-card", className)} {...rest}>{children}</div>;
}

/** Big number in Bebas Neue with a label underneath. */
export function Stat({ value, of, label }) {
  return (
    <div className="tm-stat">
      <span className="tm-stat__value">{value}{of && <small>/ {of}</small>}</span>
      <span className="tm-stat__label">{label}</span>
    </div>
  );
}

/** variant: "default" | "accent" | "red" | "blue" (red and blue are FTC alliance colours, match graphics only) */
export function Badge({ variant = "default", children }) {
  return <span className={cx("tm-badge", variant !== "default" && `tm-badge--${variant}`)}>{children}</span>;
}

/** Eyebrow label + uppercase Bebas heading. level: 1-4 */
export function SectionHeading({ label, children, level = 2 }) {
  const Tag = `h${level}`;
  return (
    <div className="tm-section-head">
      {label && <span className="tm-label">{label}</span>}
      <Tag className={`tm-h${level}`}>{children}</Tag>
    </div>
  );
}

/** Official logo. Transparent white version by default; use src for the original file. */
export function Logo({ src = "/assets/logo/team-matrix-logo-white-trimmed.png", width = 180, alt = "Team Matrix #20870" }) {
  return <img className="tm-logo" src={src} width={width} alt={alt} />;
}

/** Sponsor tier card. */
export function Tier({ name, price, perks = [] }) {
  return (
    <div className="tm-tier">
      <h4 className="tm-h4">{name}</h4>
      {price && <span className="tm-label">{price}</span>}
      <ul>{perks.map((p) => <li key={p}>{p}</li>)}</ul>
    </div>
  );
}

/** Awards list. items: [{ season: "24-25", title: "Inspire Award, 3rd", event: "India Championship" }] */
export function Honours({ items = [] }) {
  return (
    <ul className="tm-honours">
      {items.map((i) => (
        <li key={i.season + i.title}><time>{i.season}</time><span><b>{i.title}</b>{i.event}</span></li>
      ))}
    </ul>
  );
}

/** Red vs blue match result. */
export function MatchScore({ red, blue, label = "Q1", redTeams, blueTeams }) {
  return (
    <div className="tm-match">
      <div className="tm-match__side tm-match__side--red"><span className="tm-match__score">{red}</span><div className="tm-small">{redTeams}</div></div>
      <div className="tm-match__mid">{label}</div>
      <div className="tm-match__side tm-match__side--blue"><span className="tm-match__score">{blue}</span><div className="tm-small">{blueTeams}</div></div>
    </div>
  );
}
