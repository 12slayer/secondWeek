// Generates a consistent color per name, so the same person always
// gets the same avatar color across renders and reloads.
function nameToHue(name) {
  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash);
  }
  return Math.abs(hash) % 360;
}

function initials(name) {
  const parts = name.trim().split(/\s+/);
  const first = parts[0]?.[0] || '';
  const last = parts.length > 1 ? parts[parts.length - 1][0] : '';
  return (first + last).toUpperCase();
}

export default function Avatar({ name, size = 48 }) {
  const hue = nameToHue(name || '?');
  const bg = `hsl(${hue}, 55%, 88%)`;
  const fg = `hsl(${hue}, 45%, 32%)`;

  return (
    <div
      style={{
        width: size,
        height: size,
        borderRadius: '50%',
        background: bg,
        color: fg,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: 'var(--font-display)',
        fontWeight: 600,
        fontSize: size * 0.38,
        flexShrink: 0
      }}
    >
      {initials(name || '?')}
    </div>
  );
}
