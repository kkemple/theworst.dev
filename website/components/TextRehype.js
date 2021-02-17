export default function TestRehype({ children, ...delegated }) {
  return (
    <a className="rehype" {...delegated}>
      {children}
    </a>
  );
}
