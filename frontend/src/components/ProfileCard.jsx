import Avatar from './Avatar.jsx';

export default function ProfileCard({ profile, onEdit, onDelete }) {
  return (
    <div
      style={{
        background: 'var(--surface)',
        border: '1px solid var(--border)',
        borderRadius: 'var(--radius)',
        padding: '20px',
        display: 'flex',
        flexDirection: 'column',
        gap: '14px'
      }}
    >
      <div style={{ display: 'flex', gap: '14px', alignItems: 'center' }}>
        <Avatar name={profile.name} />
        <div style={{ minWidth: 0 }}>
          <h3 style={{ fontSize: '16px', lineHeight: 1.3 }}>{profile.name}</h3>
          {profile.jobTitle && (
            <p style={{ margin: 0, fontSize: '13px', color: 'var(--ink-muted)' }}>
              {profile.jobTitle}
            </p>
          )}
        </div>
      </div>

      <div style={{ fontSize: '13px', color: 'var(--ink-muted)', display: 'flex', flexDirection: 'column', gap: '4px' }}>
        <span>{profile.email}</span>
        {profile.phone && <span>{profile.phone}</span>}
      </div>

      {profile.bio && (
        <p style={{ margin: 0, fontSize: '13px', color: 'var(--ink)', lineHeight: 1.5 }}>
          {profile.bio}
        </p>
      )}

      <div style={{ display: 'flex', gap: '8px', marginTop: '4px' }}>
        <button
          onClick={() => onEdit(profile)}
          style={{
            flex: 1,
            padding: '8px 0',
            borderRadius: '8px',
            border: '1px solid var(--border)',
            background: 'transparent',
            color: 'var(--ink)',
            fontSize: '13px',
            fontWeight: 500
          }}
        >
          Edit
        </button>
        <button
          onClick={() => onDelete(profile._id)}
          style={{
            flex: 1,
            padding: '8px 0',
            borderRadius: '8px',
            border: '1px solid transparent',
            background: 'rgba(196, 67, 58, 0.08)',
            color: 'var(--danger)',
            fontSize: '13px',
            fontWeight: 500
          }}
        >
          Delete
        </button>
      </div>
    </div>
  );
}
