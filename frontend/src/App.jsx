import { useState, useEffect } from 'react';
import {
  getProfiles,
  createProfile,
  updateProfile,
  deleteProfile,
  toggleFavorite
} from './api/profiles.js';
import ProfileCard from './components/ProfileCard.jsx';
import ProfileForm from './components/ProfileForm.jsx';

export default function App() {
  const [profiles, setProfiles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState('');
  const [search, setSearch] = useState('');
  const [favoritesOnly, setFavoritesOnly] = useState(false);
  const [formOpen, setFormOpen] = useState(false);
  const [editingProfile, setEditingProfile] = useState(null);

  const loadProfiles = async (searchTerm = search) => {
    setLoading(true);
    setLoadError('');
    try {
      const data = await getProfiles(searchTerm);
      setProfiles(data);
    } catch (err) {
      setLoadError(
        'Could not reach the API. Make sure the backend is running on http://localhost:3000.'
      );
    } finally {
      setLoading(false);
    }
  };

  // Load once on mount
  useEffect(() => {
    loadProfiles('');
  }, []);

  // Re-fetch from the server 300ms after the user stops typing (debounce),
  // instead of firing a request on every keystroke
  useEffect(() => {
    const timeout = setTimeout(() => {
      loadProfiles(search);
    }, 300);
    return () => clearTimeout(timeout);
  }, [search]);

  const handleSave = async (formData) => {
    if (editingProfile) {
      await updateProfile(editingProfile.id, formData);
    } else {
      await createProfile(formData);
    }
    setFormOpen(false);
    setEditingProfile(null);
    loadProfiles();
  };

  const handleDelete = async (id) => {
    if (!confirm('Delete this profile?')) return;
    await deleteProfile(id);
    loadProfiles();
  };

  const handleToggleFavorite = async (id) => {
    await toggleFavorite(id);
    loadProfiles();
  };

  const openCreate = () => {
    setEditingProfile(null);
    setFormOpen(true);
  };

  const openEdit = (profile) => {
    setEditingProfile(profile);
    setFormOpen(true);
  };

  const filtered = favoritesOnly ? profiles.filter((p) => p.isFavorite) : profiles;

  return (
    <div style={{ maxWidth: '960px', margin: '0 auto', padding: '48px 24px' }}>
      <header
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-end',
          marginBottom: '32px',
          gap: '16px',
          flexWrap: 'wrap'
        }}
      >
        <div>
          <p style={{ margin: 0, fontSize: '13px', color: 'var(--accent)', fontWeight: 600, letterSpacing: '0.04em' }}>
            MERN DIRECTORY
          </p>
          <h1 style={{ fontSize: '28px', marginTop: '4px' }}>Profiles</h1>
        </div>
        <button
          onClick={openCreate}
          className="btn btn-primary"
          style={{
            padding: '12px 20px',
            fontSize: '14px'
          }}
        >
          + Add profile
        </button>
      </header>

      <div style={{ display: 'flex', gap: '10px', marginBottom: '28px' }}>
        <input
          placeholder="Search by name, title, or email…"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{
            flex: 1,
            padding: '12px 16px',
            borderRadius: '10px',
            border: '1px solid var(--border)',
            fontSize: '14px',
            background: 'var(--surface)',
            boxShadow: 'var(--shadow-sm)'
          }}
        />
        <button
          onClick={() => setFavoritesOnly((prev) => !prev)}
          className={favoritesOnly ? 'btn btn-primary' : 'btn btn-ghost'}
          style={{ padding: '0 16px', whiteSpace: 'nowrap' }}
        >
          ★ Favorites
        </button>
      </div>

      {loading && <p style={{ color: 'var(--ink-muted)' }}>Loading profiles…</p>}

      {loadError && (
        <p style={{ color: 'var(--danger)', fontSize: '14px' }}>{loadError}</p>
      )}

      {!loading && !loadError && filtered.length === 0 && (
        <p style={{ color: 'var(--ink-muted)' }}>
          No profiles yet. Click "Add profile" to create one.
        </p>
      )}

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
          gap: '16px'
        }}
      >
        {filtered.map((profile) => (
          <ProfileCard
            key={profile.id}
            profile={profile}
            onEdit={openEdit}
            onDelete={handleDelete}
            onToggleFavorite={handleToggleFavorite}
          />
        ))}
      </div>

      {formOpen && (
        <ProfileForm
          initialData={editingProfile}
          onSave={handleSave}
          onCancel={() => {
            setFormOpen(false);
            setEditingProfile(null);
          }}
        />
      )}
    </div>
  );
}