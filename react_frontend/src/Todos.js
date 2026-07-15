import { useState, useEffect } from 'react';
import { api } from './api';

export default function Todos({ user, onLogout }) {
  const [todos,     setTodos]     = useState([]);
  const [title,     setTitle]     = useState('');
  const [desc,      setDesc]      = useState('');
  const [editingId, setEditingId] = useState(null);
  const [editTitle, setEditTitle] = useState('');
  const [editDesc,  setEditDesc]  = useState('');

  useEffect(() => { loadTodos(); }, []);

  async function loadTodos() {
    const res  = await api.getTodos();
    const data = await res.json();
    setTodos(data);
  }

  async function addTodo() {
    if (!title.trim()) { alert('Enter a title'); return; }
    const res = await api.addTodo({ user: user.id, title, description: desc, is_completed: false });
    if (res.ok) { setTitle(''); setDesc(''); loadTodos(); }
    else { const err = await res.json(); alert('Failed: ' + JSON.stringify(err)); }
  }

  async function markDone(todo) {
    await api.updateTodo(todo.id, { user: todo.user, title: todo.title, description: todo.description, is_completed: !todo.is_completed });
    loadTodos();
  }

  async function deleteTodo(id) {
    if (!window.confirm('Delete this todo?')) return;
    await api.deleteTodo(id);
    loadTodos();
  }

  function startEdit(todo) {
    setEditingId(todo.id);
    setEditTitle(todo.title);
    setEditDesc(todo.description || '');
  }

  async function saveEdit(todo) {
    if (!editTitle.trim()) { alert('Title cannot be empty'); return; }
    await api.updateTodo(todo.id, { user: todo.user, title: editTitle, description: editDesc, is_completed: todo.is_completed });
    setEditingId(null);
    loadTodos();
  }

  return (
    <div style={{ background:'#f0f2f5', minHeight:'100vh', padding:'2rem 1rem' }}>
      <div style={{ background:'white', maxWidth:'600px', margin:'0 auto', padding:'1.5rem', borderRadius:'10px', boxShadow:'0 2px 10px rgba(0,0,0,0.1)' }}>

        <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:'1rem' }}>
          <h2 style={{ margin:0 }}>My Todos</h2>
          <button onClick={onLogout} style={{ padding:'0.4rem 0.8rem', background:'#ef4444', color:'white', border:'none', borderRadius:'6px', cursor:'pointer' }}>Logout</button>
        </div>

        <input
          style={{ width:'100%', padding:'0.6rem', marginBottom:'0.8rem', border:'1px solid #ddd', borderRadius:'6px', boxSizing:'border-box', display:'block' }}
          placeholder="Task title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <textarea
          style={{ width:'100%', padding:'0.6rem', marginBottom:'0.8rem', border:'1px solid #ddd', borderRadius:'6px', boxSizing:'border-box', display:'block' }}
          placeholder="Description (optional)"
          rows={2}
          value={desc}
          onChange={(e) => setDesc(e.target.value)}
        />
        <button onClick={addTodo} style={{ padding:'0.6rem 1.2rem', background:'#4f46e5', color:'white', border:'none', borderRadius:'6px', cursor:'pointer' }}>
          Add Todo
        </button>

        {todos.map(todo => (
          <div key={todo.id} style={{ padding:'0.8rem', border:'1px solid #eee', borderRadius:'6px', marginTop:'0.8rem' }}>
            {editingId === todo.id ? (
              <>
                <input
                  style={{ width:'100%', padding:'0.6rem', marginBottom:'0.5rem', border:'1px solid #ddd', borderRadius:'6px', boxSizing:'border-box', display:'block' }}
                  value={editTitle}
                  onChange={(e) => setEditTitle(e.target.value)}
                />
                <textarea
                  style={{ width:'100%', padding:'0.6rem', marginBottom:'0.5rem', border:'1px solid #ddd', borderRadius:'6px', boxSizing:'border-box', display:'block' }}
                  rows={2}
                  value={editDesc}
                  onChange={(e) => setEditDesc(e.target.value)}
                />
                <div style={{ display:'flex', gap:'0.5rem' }}>
                  <button onClick={() => saveEdit(todo)} style={{ padding:'0.4rem 0.8rem', background:'#4f46e5', color:'white', border:'none', borderRadius:'6px', cursor:'pointer' }}>Save</button>
                  <button onClick={() => setEditingId(null)} style={{ padding:'0.4rem 0.8rem', background:'#6b7280', color:'white', border:'none', borderRadius:'6px', cursor:'pointer' }}>Cancel</button>
                </div>
              </>
            ) : (
              <>
                <strong style={todo.is_completed ? { textDecoration:'line-through', color:'#999' } : {}}>{todo.title}</strong>
                <p style={{ margin:'0.3rem 0', color:'#555' }}>{todo.description}</p>
                <p style={{ fontSize:'0.8rem', color:'#888' }}>Completed: {todo.is_completed ? 'True' : 'False'}</p>
                <div style={{ display:'flex', gap:'0.5rem', marginTop:'0.5rem', flexWrap:'wrap' }}>
                  <button onClick={() => markDone(todo)} style={{ padding:'0.4rem 0.8rem', background:'#10b981', color:'white', border:'none', borderRadius:'6px', cursor:'pointer' }}>
                    {todo.is_completed ? 'Undo' : 'Mark Done'}
                  </button>
                  <button onClick={() => startEdit(todo)} style={{ padding:'0.4rem 0.8rem', background:'#4f46e5', color:'white', border:'none', borderRadius:'6px', cursor:'pointer' }}>Edit</button>
                  <button onClick={() => deleteTodo(todo.id)} style={{ padding:'0.4rem 0.8rem', background:'#ef4444', color:'white', border:'none', borderRadius:'6px', cursor:'pointer' }}>Delete</button>
                </div>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}