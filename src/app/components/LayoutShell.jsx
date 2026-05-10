export function Section({ children, className = "bg-white py-20", id }) {
  return (
    <section id={id} className={className}>
      {children}
    </section>
  );
}

export function Container({ children, className = "" }) {
  return (
    <div className={`mx-auto max-w-7xl px-6 ${className}`}>{children}</div>
  );
}
