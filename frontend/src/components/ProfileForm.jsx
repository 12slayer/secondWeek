import { useState, useEffect } from 'react';

const emptyForm = { name: '', email: '', jobTitle: '', phone: '', bio: '' };

export default function ProfileForm({ initialData, onSave, onCancel }) {
  const [form, setForm] = useState(emptyForm);
  const [error, setError] = useState('');
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    setForm(initialData ? { ...emptyForm, ...initialData } : emptyForm);
  }, [initialData]);

  const handleChange = (field) => (e) => {
    setForm((prev) => ({ ...prev, [field]: e.target.value }));
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
      await onSave(form);
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
          gap: '16px'
        }}
      >
        <h2 style={{ fontSize: '18px' }}>
          {initialData ? 'Edit profile' : 'Add profile'}
        </h2>

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
          <button
            type="button"
            onClick={onCancel}
            style={{
              flex: 1,
              padding: '10px 0',
              borderRadius: '8px',
              border: '1px solid var(--border)',
              background: 'transparent',
              color: 'var(--ink)',
              fontWeight: 500
            }}
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={saving}
            style={{
              flex: 1,
              padding: '10px 0',
              borderRadius: '8px',
              border: 'none',
              background: 'var(--primary)',
              color: '#fff',
              fontWeight: 500,
              opacity: saving ? 0.7 : 1
            }}
          >
            {saving ? 'Saving…' : 'Save'}
          </button>
        </div>
      </form>
    </div>
  );
}
