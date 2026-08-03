import Avatar from './Avatar.jsx';
import { SERVER_URL } from '../api/profiles.js';

export default function ProfileCard({ profile, onEdit, onDelete }) {
  const hasPhoto = Boolean(profile.avatarUrl);

  return (
    <div className="profile-card">
      {hasPhoto ? (
        <img
          className="profile-photo"
          src={`${SERVER_URL}${profile.avatarUrl}`}
          alt={profile.name}
        />
      ) : (
        <Avatar name={profile.name} size={76} />
      )}

      <div>
        <h3 style={{ fontSize: '16px', lineHeight: 1.3 }}>{profile.name}</h3>
        {profile.jobTitle && (
          <p style={{ margin: '2px 0 0', fontSize: '13px', color: 'var(--ink-muted)' }}>
            {profile.jobTitle}
          </p>
        )}
      </div>

      <div style={{ fontSize: '13px', color: 'var(--ink-muted)', display: 'flex', flexDirection: 'column', gap: '2px' }}>
        <span>{profile.email}</span>
        {profile.phone && <span>{profile.phone}</span>}
      </div>

      {profile.bio && (
        <p style={{ margin: 0, fontSize: '13px', color: 'var(--ink)', lineHeight: 1.5 }}>
          {profile.bio}
        </p>
      )}

      <div style={{ display: 'flex', gap: '8px', marginTop: '6px', width: '100%' }}>
        <button className="btn btn-ghost" style={{ flex: 1 }} onClick={() => onEdit(profile)}>
          Edit
        </button>
        <button className="btn btn-danger" style={{ flex: 1 }} onClick={() => onDelete(profile.id)}>
          Delete
        </button>
      </div>
    </div>
  );
}
