/** Each route fades up as it arrives; the header and footer stay put. */
export default function Template({ children }: { children: React.ReactNode }) {
  return <div className="page-enter">{children}</div>;
}
