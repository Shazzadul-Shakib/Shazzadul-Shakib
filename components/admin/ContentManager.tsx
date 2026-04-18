'use client';
import { useEffect, useMemo, useState } from 'react';
import Button from '@/components/ui/Button';
import toast from 'react-hot-toast';

type TabType = 'skills' | 'projects' | 'experiences';

type SkillForm = {
  name: string;
  category: 'Frontend' | 'Backend' | 'Tools';
  level: string;
  order: string;
};

type ProjectForm = {
  title: string;
  description: string;
  image: string;
  techCsv: string;
  liveUrl: string;
  clientUrl: string;
  serverUrl: string;
  featured: boolean;
  order: string;
};

type ExperienceForm = {
  role: string;
  company: string;
  period: string;
  type: string;
  descriptionText: string;
  techCsv: string;
  order: string;
};

type DeleteTarget = {
  id: string;
  label: string;
} | null;

const tabs: Array<{ label: string; value: TabType }> = [
  { label: 'Skills', value: 'skills' },
  { label: 'Projects', value: 'projects' },
  { label: 'Experiences', value: 'experiences' },
];

const initialSkillForm: SkillForm = {
  name: '',
  category: 'Frontend',
  level: '',
  order: '0',
};

const initialProjectForm: ProjectForm = {
  title: '',
  description: '',
  image: '',
  techCsv: '',
  liveUrl: '',
  clientUrl: '',
  serverUrl: '',
  featured: false,
  order: '0',
};

const initialExperienceForm: ExperienceForm = {
  role: '',
  company: '',
  period: '',
  type: 'Full-time',
  descriptionText: '',
  techCsv: '',
  order: '0',
};

type FlattenedValidationError = {
  formErrors?: string[];
  fieldErrors?: Record<string, string[] | undefined>;
};

function toSentence(field: string): string {
  return field
    .replace(/([a-z0-9])([A-Z])/g, '$1 $2')
    .replace(/\bUrl\b/g, 'URL')
    .replace(/\bId\b/g, 'ID')
    .replace(/^./, (char) => char.toUpperCase());
}

function extractValidationFieldErrors(error: unknown): Record<string, string> {
  if (!error || typeof error !== 'object') return {};

  const parsed = error as FlattenedValidationError;
  const fieldErrors: Record<string, string> = {};

  for (const [field, messages] of Object.entries(parsed.fieldErrors || {})) {
    const firstMessage = messages?.find((entry) => entry?.trim());
    if (firstMessage) fieldErrors[field] = firstMessage.trim();
  }

  return fieldErrors;
}

function normalizeProjectFieldErrors(
  rawErrors: Record<string, string>,
): Record<string, string> {
  const mapped: Record<string, string> = { ...rawErrors };

  // API uses `tech`, while this form input is named `techCsv`.
  if (mapped.tech && !mapped.techCsv) {
    mapped.techCsv = mapped.tech;
  }

  return mapped;
}

function formatApiError(error: unknown): string {
  if (typeof error === 'string') return error;

  if (!error || typeof error !== 'object') {
    return 'Failed to save. Please try again.';
  }

  const parsed = error as FlattenedValidationError;
  const lines: string[] = [];

  for (const message of parsed.formErrors || []) {
    if (message?.trim()) lines.push(message.trim());
  }

  for (const [field, messages] of Object.entries(parsed.fieldErrors || {})) {
    const firstMessage = messages?.find((entry) => entry?.trim());
    if (!firstMessage) continue;

    const normalizedField = toSentence(field);
    const normalizedMessage = firstMessage.trim();
    if (
      normalizedMessage.toLowerCase().startsWith(normalizedField.toLowerCase())
    ) {
      lines.push(normalizedMessage);
    } else {
      lines.push(`${normalizedField}: ${normalizedMessage}`);
    }
  }

  if (!lines.length)
    return 'Failed to save. Please review your input and try again.';
  return lines.join(' | ');
}

export default function ContentManager() {
  const [tab, setTab] = useState<TabType>('skills');
  const [items, setItems] = useState<Record<TabType, any[]>>({
    skills: [],
    projects: [],
    experiences: [],
  });
  const [skillFilterCategory, setSkillFilterCategory] = useState<
    'All' | SkillForm['category']
  >('All');
  const [skillFilterQuery, setSkillFilterQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<DeleteTarget>(null);
  const [projectFieldErrors, setProjectFieldErrors] = useState<
    Record<string, string>
  >({});

  const [skillForm, setSkillForm] = useState<SkillForm>(initialSkillForm);
  const [projectForm, setProjectForm] =
    useState<ProjectForm>(initialProjectForm);
  const [experienceForm, setExperienceForm] = useState<ExperienceForm>(
    initialExperienceForm,
  );

  const activeItems = items[tab];
  const filteredItems = useMemo(() => {
    if (tab !== 'skills') return activeItems;

    const query = skillFilterQuery.trim().toLowerCase();
    return activeItems.filter((item) => {
      const categoryMatch =
        skillFilterCategory === 'All' || item.category === skillFilterCategory;
      const queryMatch =
        !query ||
        String(item.name || '')
          .toLowerCase()
          .includes(query) ||
        String(item.level || '')
          .toLowerCase()
          .includes(query);

      return categoryMatch && queryMatch;
    });
  }, [tab, activeItems, skillFilterCategory, skillFilterQuery]);

  const loadItems = async (target: TabType) => {
    setLoading(true);
    try {
      const res = await fetch(`/api/portfolio/${target}`);
      const data = await res.json();
      if (!res.ok) throw new Error('Failed to load data');
      setItems((prev) => ({ ...prev, [target]: data.items || [] }));
    } catch {
      toast.error(`Failed to load ${target}`);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadItems(tab);
  }, [tab]);

  const resetForm = () => {
    setEditingId(null);
    setSkillForm(initialSkillForm);
    setProjectForm(initialProjectForm);
    setExperienceForm(initialExperienceForm);
    setProjectFieldErrors({});
  };

  const clearProjectFieldError = (field: string) => {
    setProjectFieldErrors((prev) => {
      if (!prev[field]) return prev;
      const next = { ...prev };
      delete next[field];
      return next;
    });
  };

  const payload = useMemo(() => {
    if (tab === 'skills') {
      return {
        name: skillForm.name.trim(),
        category: skillForm.category,
        level: skillForm.level.trim(),
        order: Number(skillForm.order) || 0,
      };
    }

    if (tab === 'projects') {
      return {
        title: projectForm.title.trim(),
        description: projectForm.description.trim(),
        image: projectForm.image.trim(),
        tech: projectForm.techCsv
          .split(',')
          .map((t) => t.trim())
          .filter(Boolean),
        liveUrl: projectForm.liveUrl.trim(),
        clientUrl: projectForm.clientUrl.trim(),
        serverUrl: projectForm.serverUrl.trim(),
        featured: projectForm.featured,
        order: Number(projectForm.order) || 0,
      };
    }

    return {
      role: experienceForm.role.trim(),
      company: experienceForm.company.trim(),
      period: experienceForm.period.trim(),
      type: experienceForm.type.trim(),
      description: experienceForm.descriptionText
        .split('\n')
        .map((line) => line.trim())
        .filter(Boolean),
      tech: experienceForm.techCsv
        .split(',')
        .map((t) => t.trim())
        .filter(Boolean),
      order: Number(experienceForm.order) || 0,
    };
  }, [tab, skillForm, projectForm, experienceForm]);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setProjectFieldErrors({});
    try {
      const isEdit = Boolean(editingId);
      const url = isEdit
        ? `/api/portfolio/${tab}/${editingId}`
        : `/api/portfolio/${tab}`;
      const method = isEdit ? 'PUT' : 'POST';

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (!res.ok) {
        const fieldErrors = extractValidationFieldErrors(data?.error);
        if (tab === 'projects' && Object.keys(fieldErrors).length > 0) {
          setProjectFieldErrors(normalizeProjectFieldErrors(fieldErrors));
          toast.error('Please fix the highlighted fields.');
          return;
        }

        throw new Error(
          data?.error ? formatApiError(data.error) : 'Failed to save',
        );
      }

      toast.success(isEdit ? 'Updated successfully' : 'Created successfully');
      resetForm();
      await loadItems(tab);
    } catch (err) {
      toast.error(err instanceof Error ? err.message : 'Failed to save');
    } finally {
      setSaving(false);
    }
  };

  const onEdit = (item: any) => {
    setEditingId(item._id);

    if (tab === 'skills') {
      setSkillForm({
        name: item.name || '',
        category: item.category || 'Frontend',
        level: item.level || '',
        order: String(item.order ?? 0),
      });
      return;
    }

    if (tab === 'projects') {
      setProjectForm({
        title: item.title || '',
        description: item.description || '',
        image: item.image || '',
        techCsv: (item.tech || []).join(', '),
        liveUrl: item.liveUrl || '',
        clientUrl: item.clientUrl || '',
        serverUrl: item.serverUrl || '',
        featured: Boolean(item.featured),
        order: String(item.order ?? 0),
      });
      return;
    }

    setExperienceForm({
      role: item.role || '',
      company: item.company || '',
      period: item.period || '',
      type: item.type || '',
      descriptionText: (item.description || []).join('\n'),
      techCsv: (item.tech || []).join(', '),
      order: String(item.order ?? 0),
    });
  };

  const confirmDelete = async () => {
    if (!deleteTarget) return;

    setDeleting(true);
    try {
      const res = await fetch(`/api/portfolio/${tab}/${deleteTarget.id}`, {
        method: 'DELETE',
      });
      if (!res.ok) throw new Error('Delete failed');
      toast.success('Deleted');
      if (editingId === deleteTarget.id) resetForm();
      setDeleteTarget(null);
      await loadItems(tab);
    } catch {
      toast.error('Failed to delete item');
    } finally {
      setDeleting(false);
    }
  };

  const inputClass =
    'w-full bg-white/[0.03] border border-border-glass rounded-xl px-4 py-3 text-text-primary placeholder:text-text-muted/50 focus:outline-none focus:border-accent-violet/60 transition-all duration-200 text-sm';
  const selectClass =
    'appearance-none pr-10 [&>option]:bg-[#0B1325] [&>option]:text-text-primary';
  const getProjectInputClass = (field: string) =>
    `${inputClass} ${projectFieldErrors[field] ? 'border-red-400/80 focus:border-red-300' : ''}`;

  return (
    <div className='space-y-8'>
      <div className='flex flex-wrap gap-2'>
        {tabs.map((tabOption) => (
          <button
            key={tabOption.value}
            onClick={() => {
              setTab(tabOption.value);
              resetForm();
            }}
            className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
              tab === tabOption.value
                ? 'bg-accent-violet/15 text-accent-violet border border-accent-violet/40'
                : 'bg-white/5 border border-border-glass text-text-muted hover:text-text-primary'
            }`}
          >
            {tabOption.label}
          </button>
        ))}
      </div>

      <div className='grid lg:grid-cols-[1.15fr,1fr] gap-8'>
        <div className='bg-white/[0.02] border border-border-glass rounded-2xl p-5'>
          <div className='flex items-center justify-between mb-4'>
            <h2 className='text-lg font-grotesk font-semibold text-text-primary capitalize'>
              {tab} list
            </h2>
            <span className='text-xs text-text-muted'>
              {filteredItems.length} items
            </span>
          </div>

          {tab === 'skills' ? (
            <div className='grid sm:grid-cols-2 gap-3 mb-4'>
              <div className='relative'>
                <select
                  className={`${inputClass} ${selectClass}`}
                  value={skillFilterCategory}
                  onChange={(e) =>
                    setSkillFilterCategory(
                      e.target.value as 'All' | SkillForm['category'],
                    )
                  }
                >
                  <option value='All'>All categories</option>
                  <option value='Frontend'>Frontend</option>
                  <option value='Backend'>Backend</option>
                  <option value='Tools'>Tools</option>
                </select>
                <span className='pointer-events-none absolute inset-y-0 right-3 flex items-center text-text-muted'>
                  <svg
                    width='14'
                    height='14'
                    viewBox='0 0 24 24'
                    fill='none'
                    xmlns='http://www.w3.org/2000/svg'
                  >
                    <path
                      d='M6 9L12 15L18 9'
                      stroke='currentColor'
                      strokeWidth='2'
                      strokeLinecap='round'
                      strokeLinejoin='round'
                    />
                  </svg>
                </span>
              </div>
              <input
                className={inputClass}
                placeholder='Search skill or level'
                value={skillFilterQuery}
                onChange={(e) => setSkillFilterQuery(e.target.value)}
              />
            </div>
          ) : null}

          {loading ? (
            <div className='space-y-3'>
              {Array.from({ length: 4 }).map((_, index) => (
                <div
                  key={index}
                  className='rounded-xl border border-border-glass bg-white/[0.02] p-4 animate-pulse'
                >
                  <div className='h-4 w-1/3 rounded bg-white/10' />
                  <div className='h-3 w-2/3 rounded bg-white/5 mt-3' />
                  <div className='flex gap-2 mt-4'>
                    <div className='h-7 w-14 rounded-lg bg-white/10' />
                    <div className='h-7 w-16 rounded-lg bg-white/10' />
                  </div>
                </div>
              ))}
            </div>
          ) : filteredItems.length === 0 ? (
            <p className='text-sm text-text-muted'>
              {tab === 'skills' &&
              (skillFilterQuery || skillFilterCategory !== 'All')
                ? 'No skills match your filters.'
                : 'No items yet.'}
            </p>
          ) : (
            <div className='space-y-3 max-h-[560px] overflow-auto pr-1'>
              {filteredItems.map((item, index) => (
                <div
                  key={item._id}
                  className='rounded-xl border border-border-glass bg-white/[0.02] p-4'
                >
                  <div className='flex items-start justify-between gap-3'>
                    <div>
                      <div className='flex items-center gap-2'>
                        <span className='inline-flex items-center justify-center min-w-7 h-7 px-2 rounded-lg border border-accent-cyan/35 bg-accent-cyan/12 text-accent-cyan text-xs font-semibold'>
                          #{index + 1}
                        </span>
                        <p className='text-text-primary font-medium text-sm'>
                          {tab === 'skills'
                            ? item.name
                            : tab === 'projects'
                              ? item.title
                              : item.role}
                        </p>
                      </div>
                      <p className='text-text-muted text-xs mt-1'>
                        {tab === 'skills'
                          ? `${item.category}${item.level ? ` • ${item.level}` : ''}`
                          : tab === 'projects'
                            ? item.description
                            : `${item.company} • ${item.period}`}
                        {` • Order: ${item.order ?? 0}`}
                      </p>
                    </div>
                    <div className='flex items-center gap-2'>
                      <button
                        onClick={() => onEdit(item)}
                        className='text-xs px-2 py-1 rounded-lg border border-border-glass text-text-muted hover:text-text-primary'
                      >
                        Edit
                      </button>
                      <button
                        onClick={() =>
                          setDeleteTarget({
                            id: item._id,
                            label:
                              tab === 'skills'
                                ? item.name
                                : tab === 'projects'
                                  ? item.title
                                  : item.role,
                          })
                        }
                        className='text-xs px-2 py-1 rounded-lg border border-accent-cyan/40 text-accent-cyan hover:bg-accent-cyan/12'
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <form
          onSubmit={submit}
          className='bg-white/[0.02] border border-border-glass rounded-2xl p-6 space-y-4'
        >
          <div className='flex items-center justify-between'>
            <h2 className='text-lg font-grotesk font-semibold text-text-primary'>
              {editingId
                ? `Edit ${tab.slice(0, -1)}`
                : tab === 'skills'
                  ? 'Add new skill'
                  : tab === 'projects'
                    ? 'Add new project'
                    : 'Add new experience'}
            </h2>
            {editingId ? (
              <button
                type='button'
                onClick={resetForm}
                className='text-xs text-text-muted hover:text-text-primary'
              >
                Cancel edit
              </button>
            ) : null}
          </div>

          {tab === 'skills' ? (
            <>
              <input
                className={inputClass}
                placeholder='Skill name'
                value={skillForm.name}
                onChange={(e) =>
                  setSkillForm((prev) => ({ ...prev, name: e.target.value }))
                }
                required
              />
              <div className='grid grid-cols-2 gap-3'>
                <div className='relative'>
                  <select
                    className={`${inputClass} ${selectClass}`}
                    value={skillForm.category}
                    onChange={(e) =>
                      setSkillForm((prev) => ({
                        ...prev,
                        category: e.target.value as SkillForm['category'],
                      }))
                    }
                  >
                    <option value='Frontend'>Frontend</option>
                    <option value='Backend'>Backend</option>
                    <option value='Tools'>Tools</option>
                  </select>
                  <span className='pointer-events-none absolute inset-y-0 right-3 flex items-center text-text-muted'>
                    <svg
                      width='14'
                      height='14'
                      viewBox='0 0 24 24'
                      fill='none'
                      xmlns='http://www.w3.org/2000/svg'
                    >
                      <path
                        d='M6 9L12 15L18 9'
                        stroke='currentColor'
                        strokeWidth='2'
                        strokeLinecap='round'
                        strokeLinejoin='round'
                      />
                    </svg>
                  </span>
                </div>
                <input
                  className={inputClass}
                  placeholder='Level (optional)'
                  value={skillForm.level}
                  onChange={(e) =>
                    setSkillForm((prev) => ({ ...prev, level: e.target.value }))
                  }
                />
              </div>
              <input
                className={inputClass}
                type='text'
                inputMode='numeric'
                pattern='[0-9]*'
                maxLength={4}
                placeholder='Display order (0, 1, 2...)'
                value={skillForm.order}
                onChange={(e) =>
                  setSkillForm((prev) => ({
                    ...prev,
                    order: e.target.value.replace(/\D/g, ''),
                  }))
                }
              />
            </>
          ) : null}

          {tab === 'projects' ? (
            <>
              <input
                className={getProjectInputClass('title')}
                placeholder='Project title'
                value={projectForm.title}
                onChange={(e) => {
                  clearProjectFieldError('title');
                  setProjectForm((prev) => ({
                    ...prev,
                    title: e.target.value,
                  }));
                }}
                required
              />
              {projectFieldErrors.title ? (
                <p className='-mt-2 text-xs text-red-300'>
                  {projectFieldErrors.title}
                </p>
              ) : null}
              <textarea
                className={`${getProjectInputClass('description')} resize-none`}
                placeholder='Project description'
                rows={4}
                value={projectForm.description}
                onChange={(e) => {
                  clearProjectFieldError('description');
                  setProjectForm((prev) => ({
                    ...prev,
                    description: e.target.value,
                  }));
                }}
                required
              />
              {projectFieldErrors.description ? (
                <p className='-mt-2 text-xs text-red-300'>
                  {projectFieldErrors.description}
                </p>
              ) : null}
              <input
                className={getProjectInputClass('image')}
                placeholder='Image URL'
                value={projectForm.image}
                onChange={(e) => {
                  clearProjectFieldError('image');
                  setProjectForm((prev) => ({
                    ...prev,
                    image: e.target.value,
                  }));
                }}
              />
              {projectFieldErrors.image ? (
                <p className='-mt-2 text-xs text-red-300'>
                  {projectFieldErrors.image}
                </p>
              ) : null}
              <input
                className={getProjectInputClass('techCsv')}
                placeholder='Technologies (comma separated)'
                value={projectForm.techCsv}
                onChange={(e) => {
                  clearProjectFieldError('techCsv');
                  clearProjectFieldError('tech');
                  setProjectForm((prev) => ({
                    ...prev,
                    techCsv: e.target.value,
                  }));
                }}
                required
              />
              {projectFieldErrors.techCsv || projectFieldErrors.tech ? (
                <p className='-mt-2 text-xs text-red-300'>
                  {projectFieldErrors.techCsv || projectFieldErrors.tech}
                </p>
              ) : null}
              <div className='grid grid-cols-1 gap-3'>
                <div>
                  <input
                    className={getProjectInputClass('liveUrl')}
                    placeholder='Live URL'
                    value={projectForm.liveUrl}
                    onChange={(e) => {
                      clearProjectFieldError('liveUrl');
                      setProjectForm((prev) => ({
                        ...prev,
                        liveUrl: e.target.value,
                      }));
                    }}
                  />
                  {projectFieldErrors.liveUrl ? (
                    <p className='mt-1 text-xs text-red-300'>
                      {projectFieldErrors.liveUrl}
                    </p>
                  ) : null}
                </div>
                <div>
                  <input
                    className={getProjectInputClass('clientUrl')}
                    placeholder='Client repo URL'
                    value={projectForm.clientUrl}
                    onChange={(e) => {
                      clearProjectFieldError('clientUrl');
                      setProjectForm((prev) => ({
                        ...prev,
                        clientUrl: e.target.value,
                      }));
                    }}
                  />
                  {projectFieldErrors.clientUrl ? (
                    <p className='mt-1 text-xs text-red-300'>
                      {projectFieldErrors.clientUrl}
                    </p>
                  ) : null}
                </div>
                <div>
                  <input
                    className={getProjectInputClass('serverUrl')}
                    placeholder='Server repo URL'
                    value={projectForm.serverUrl}
                    onChange={(e) => {
                      clearProjectFieldError('serverUrl');
                      setProjectForm((prev) => ({
                        ...prev,
                        serverUrl: e.target.value,
                      }));
                    }}
                  />
                  {projectFieldErrors.serverUrl ? (
                    <p className='mt-1 text-xs text-red-300'>
                      {projectFieldErrors.serverUrl}
                    </p>
                  ) : null}
                </div>
              </div>
              <div className='flex items-center gap-3'>
                <input
                  id='featured'
                  type='checkbox'
                  checked={projectForm.featured}
                  onChange={(e) =>
                    setProjectForm((prev) => ({
                      ...prev,
                      featured: e.target.checked,
                    }))
                  }
                />
                <label htmlFor='featured' className='text-sm text-text-muted'>
                  Featured project
                </label>
              </div>
              <input
                className={getProjectInputClass('order')}
                type='number'
                placeholder='Order'
                value={projectForm.order}
                onChange={(e) => {
                  clearProjectFieldError('order');
                  setProjectForm((prev) => ({
                    ...prev,
                    order: e.target.value,
                  }));
                }}
              />
              {projectFieldErrors.order ? (
                <p className='-mt-2 text-xs text-red-300'>
                  {projectFieldErrors.order}
                </p>
              ) : null}
            </>
          ) : null}

          {tab === 'experiences' ? (
            <>
              <div className='grid grid-cols-2 gap-3'>
                <input
                  className={inputClass}
                  placeholder='Role'
                  value={experienceForm.role}
                  onChange={(e) =>
                    setExperienceForm((prev) => ({
                      ...prev,
                      role: e.target.value,
                    }))
                  }
                  required
                />
                <input
                  className={inputClass}
                  placeholder='Company'
                  value={experienceForm.company}
                  onChange={(e) =>
                    setExperienceForm((prev) => ({
                      ...prev,
                      company: e.target.value,
                    }))
                  }
                  required
                />
              </div>
              <div className='grid grid-cols-2 gap-3'>
                <input
                  className={inputClass}
                  placeholder='Period'
                  value={experienceForm.period}
                  onChange={(e) =>
                    setExperienceForm((prev) => ({
                      ...prev,
                      period: e.target.value,
                    }))
                  }
                  required
                />
                <input
                  className={inputClass}
                  placeholder='Type'
                  value={experienceForm.type}
                  onChange={(e) =>
                    setExperienceForm((prev) => ({
                      ...prev,
                      type: e.target.value,
                    }))
                  }
                  required
                />
              </div>
              <textarea
                className={`${inputClass} resize-none`}
                rows={5}
                placeholder='Description bullets (one per line)'
                value={experienceForm.descriptionText}
                onChange={(e) =>
                  setExperienceForm((prev) => ({
                    ...prev,
                    descriptionText: e.target.value,
                  }))
                }
                required
              />
              <input
                className={inputClass}
                placeholder='Technologies (comma separated)'
                value={experienceForm.techCsv}
                onChange={(e) =>
                  setExperienceForm((prev) => ({
                    ...prev,
                    techCsv: e.target.value,
                  }))
                }
                required
              />
              <input
                className={inputClass}
                type='number'
                placeholder='Order'
                value={experienceForm.order}
                onChange={(e) =>
                  setExperienceForm((prev) => ({
                    ...prev,
                    order: e.target.value,
                  }))
                }
              />
            </>
          ) : null}

          <Button type='submit' size='md' loading={saving}>
            {editingId ? 'Save Changes' : 'Create'}
          </Button>
        </form>
      </div>

      {deleteTarget ? (
        <div className='fixed inset-0 z-[80] flex items-center justify-center p-4'>
          <div
            className='absolute inset-0 bg-black/60 backdrop-blur-sm'
            onClick={() => (deleting ? null : setDeleteTarget(null))}
          />
          <div className='relative w-full max-w-md rounded-2xl border border-border-glass bg-[#0b1f38] p-6 shadow-2xl'>
            <h3 className='text-lg font-grotesk font-semibold text-text-primary'>
              Confirm Delete
            </h3>
            <p className='mt-2 text-sm text-text-muted leading-relaxed'>
              Are you sure you want to delete{' '}
              <span className='text-text-primary font-medium'>
                {deleteTarget.label}
              </span>
              ? This action cannot be undone.
            </p>
            <div className='mt-6 flex items-center justify-end gap-3'>
              <button
                type='button'
                onClick={() => setDeleteTarget(null)}
                disabled={deleting}
                className='px-4 py-2 rounded-lg text-sm border border-border-glass text-text-muted hover:text-text-primary disabled:opacity-60'
              >
                Cancel
              </button>
              <Button
                type='button'
                size='sm'
                loading={deleting}
                onClick={confirmDelete}
              >
                Delete
              </Button>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
