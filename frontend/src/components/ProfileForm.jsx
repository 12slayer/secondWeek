import { useState, useEffect } from 'react';
import { SERVER_URL } from '../api/profiles.js';

const emptyForm = { name: '', email: '', jobTitle: '', phone: '', bio: '' };

export default function ProfileForm({ initialData, onSave, onCancel }) {
  const [form, setForm] = useState(emptyForm);
  const [avatarFile, setAvatarFile] = useState(null);   // the actual File object to upload
  const [avatarPreview, setAvatarPreview] = useState(''); // local preview URL
  const [error, setError] = useState('');
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    setForm(initialData ? { ...emptyForm, ...initialData } : emptyForm);
    setAvatarFile(null);
    setAvatarPreview(initialData?.avatarUrl ? `${SERVER_URL}${initialData.avatarUrl}` : '');
  }, [initialData]);

  const handleChange = (field) => (e) => {
    setForm((prev) => ({ ...prev, [field]: e.target.value }));
  };

  const handlePhotoChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setAvatarFile(file);
    setAvatarPreview(URL.createObjectURL(file)); // instant local preview, no upload yet
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    if (!form.name.trim() || !form.email.trim()) {
      setError('Name and email are required.');
      return;
    }
    setSaving(true);
    try {
      await onSave({ ...form, avatarFile });
    } catch (err) {
      setError(err?.response?.data?.error || 'Something went wrong. Try again.');
    } finally {
      setSaving(false);
    }
  };

  const inputStyle = {
    width: '100%',
    padding: '10px 12px',
    borderRadius: '8px',
    border: '1px solid var(--border)',
    fontSize: '14px',
    background: 'var(--bg)',
    color: 'var(--ink)'
  };

  const labelStyle = {
    fontSize: '12px',
    fontWeight: 500,
    color: 'var(--ink-muted)',
    marginBottom: '6px',
    display: 'block'
  };

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        background: 'rgba(28, 31, 42, 0.45)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 10,
        padding: '20px'
      }}
      onClick={onCancel}
    >
      <form
        onClick={(e) => e.stopPropagation()}
        onSubmit={handleSubmit}
        style={{
          background: 'var(--surface)',
          borderRadius: 'var(--radius)',
          padding: '28px',
          width: '100%',
          maxWidth: '440px',
          display: 'flex',
          flexDirection: 'column',
          gap: '16px',
          maxHeight: '90vh',
          overflowY: 'auto'
        }}
      >
        <h2 style={{ fontSize: '18px', textAlign: 'center' }}>
          {initialData ? 'Edit profile' : 'Add profile'}
        </h2>

        <div>
          <label className="avatar-upload">
            {avatarPreview ? (
              <img src={avatarPreview} alt="Preview" />
            ) : (
              <span style={{ fontSize: '11px', color: 'var(--ink-muted)' }}>+ Photo</span>
            )}
            <input type="file" accept="image/*" onChange={handlePhotoChange} />
          </label>
          <p className="avatar-upload-label">Click to {avatarPreview ? 'change' : 'add'} a photo</p>
        </div>

        <div>
          <label style={labelStyle}>Name *</label>
          <input style={inputStyle} value={form.name} onChange={handleChange('name')} />
        </div>

        <div>
          <label style={labelStyle}>Email *</label>
          <input style={inputStyle} type="email" value={form.email} onChange={handleChange('email')} />
        </div>

        <div>
          <label style={labelStyle}>Job title</label>
          <input style={inputStyle} value={form.jobTitle} onChange={handleChange('jobTitle')} />
        </div>

        <div>
          <label style={labelStyle}>Phone</label>
          <input style={inputStyle} value={form.phone} onChange={handleChange('phone')} />
        </div>

        <div>
          <label style={labelStyle}>Bio</label>
          <textarea
            style={{ ...inputStyle, resize: 'vertical', minHeight: '70px' }}
            value={form.bio}
            onChange={handleChange('bio')}
          />
        </div>

        {error && (
          <p style={{ margin: 0, fontSize: '13px', color: 'var(--danger)' }}>{error}</p>
        )}

        <div style={{ display: 'flex', gap: '10px', marginTop: '8px' }}>
          <button type="button" className="btn btn-ghost" style={{ flex: 1 }} onClick={onCancel}>
            Cancel
          </button>
          <button type="submit" className="btn btn-primary" style={{ flex: 1 }} disabled={saving}>
            {saving ? 'Saving…' : 'Save'}
          </button>
        </div>
      </form>
    </div>
  );
}
