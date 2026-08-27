import { useEffect, useState } from 'react'
import './App.css'

const palettes = {
  Casual: [['Sage & oat', ['#879b82', '#e7dac3', '#342f2c', '#faf8f2']], ['Blue denim', ['#9dbbd4', '#f2e9dc', '#d77558', '#4b5563']], ['Cocoa cream', ['#6e4b3a', '#f4e4c8', '#263f3e', '#d5b38a']]],
  Y2K: [['Bubblegum pop', ['#f18eb5', '#a8d9e7', '#f8e566', '#5e4b8b']], ['Chrome candy', ['#d9dde1', '#ba90d6', '#74c5c9', '#202638']], ['Cherry flash', ['#d63542', '#f2b7b0', '#ffda54', '#171b28']]],
  Formal: [['Quiet luxury', ['#1e2c32', '#b8ab96', '#f7f1e7', '#8d9b98']], ['Burgundy hour', ['#5e202c', '#d8c6b3', '#211f22', '#c5a46d']], ['Ivory edit', ['#f3eee4', '#283c49', '#9d765f', '#d6b568']]],
  Streetwear: [['Concrete heat', ['#34383d', '#c5c6bd', '#e56842', '#101318']], ['Olive utility', ['#65735d', '#e0d5bc', '#ca8f43', '#252c31']], ['Electric night', ['#161b2b', '#4f72df', '#d6e65c', '#e9e7df']]],
  Random: [['Rosewood veil', ['#9a5f5d', '#ead9ce', '#4c3837', '#bc9d79']], ['Cloud latte', ['#d8c4ae', '#faf7f1', '#70817d', '#a47460']], ['Plum shadow', ['#573d57', '#c2a9bb', '#e4d7ca', '#2f3542']]],
  Vintage: [['Warm heirloom', ['#9d5d43', '#e7cda8', '#53645c', '#332d2b']], ['Moss & mustard', ['#71815c', '#d6a841', '#f0dfc0', '#59423d']], ['Old rose', ['#b97873', '#ead8c2', '#6d5361', '#3e4541']]],
  Retro: [['Diner pop', ['#e85d4a', '#f4d35e', '#3f79a5', '#fff1d0']], ['Sunset radio', ['#ef8b43', '#c94f5c', '#5a477c', '#f5d89b']], ['Mint groove', ['#8bc7b1', '#f27b61', '#f5cf64', '#39434b']]],
  Chic: [['Monochrome muse', ['#222326', '#d5d1ca', '#f7f5f0', '#9c8e82']], ['Olive silk', ['#6d7560', '#d8c6a9', '#252a27', '#b59c7c']], ['Soft espresso', ['#5b4035', '#e7d7c6', '#a7afa8', '#292625']]],
  Edgy: [['Night signal', ['#17191f', '#8b2635', '#c7d33e', '#d9d7d0']], ['Rust & ink', ['#b74c34', '#242a35', '#d2a35e', '#dedbd2']], ['Acid shadow', ['#232323', '#c6df3c', '#6e4b8e', '#eee9df']]],
  Minimalist: [['Clean lines', ['#f3eee6', '#c9c3b8', '#6f7773', '#25282a']], ['Stone study', ['#ded8cd', '#a6a39b', '#e9e4dc', '#4e514d']], ['Black & sand', ['#252525', '#d7c4a8', '#f7f3eb', '#77716a']]],
}
const outfitOptions = ['Top', 'Bottom', 'Jacket', 'Hijab', 'Shoes', 'Hat']
const categories = Object.keys(palettes)

function App() {
  const [category, setCategory] = useState('Casual')
  const [selectedItems, setSelectedItems] = useState(['Top', 'Bottom', 'Shoes'])
  const [activePalette, setActivePalette] = useState(0)
  const [savedPalettes, setSavedPalettes] = useState(() => JSON.parse(localStorage.getItem('choosepalette-library') || '[]'))
  const [comment, setComment] = useState('')
  const [notice, setNotice] = useState('')
  const currentPalettes = palettes[category]
  const [paletteName, colors] = currentPalettes[activePalette]
  const displayColors = selectedItems.map((item, index) => ({ item, color: colors[index % colors.length] }))

  useEffect(() => localStorage.setItem('choosepalette-library', JSON.stringify(savedPalettes)), [savedPalettes])
  const flash = (message) => { setNotice(message); setTimeout(() => setNotice(''), 2400) }
  const toggleItem = (item) => setSelectedItems((items) => items.includes(item) ? items.filter((entry) => entry !== item) : [...items, item])
  const savePalette = () => { setSavedPalettes((items) => [{ name: paletteName, colors: displayColors.map((entry) => entry.color), category, outfit: selectedItems, id: Date.now(), comments: [] }, ...items.filter((item) => item.name !== paletteName || item.category !== category)]); flash('Kombinasi disimpan ke library') }
  const addComment = (event) => { event.preventDefault(); if (!comment.trim()) return; setSavedPalettes((items) => items.map((item) => item.name === paletteName && item.category === category ? { ...item, comments: [...(item.comments || []), comment.trim()] } : item)); setComment(''); flash('Komentar kamu sudah ditambahkan') }

  return (
    <main className="app-shell">
      <header className="topbar"><a className="brand" href="#top"><span>CP</span> ChoosePalette</a><nav><a className="active" href="#studio">Studio</a><a href="#library">Library <b>{savedPalettes.length}</b></a></nav><div className="profile">YP <span>Yashinta Putri</span></div></header>
      <section className="intro" id="top"><div><p className="kicker">OUTFIT COLOR STUDIO <i>✦</i></p><h1>Find your <em>perfect palette.</em></h1><p className="intro-copy">Mix, match, and make every outfit feel unmistakably you.</p></div><div className="intro-note"><span>01</span><p>Start with your mood,<br />we'll handle the colors.</p></div></section>
      <section className="studio" id="studio"><aside className="controls"><div className="section-label"><span>01 /</span> Choose your style</div><div className="category-list">{categories.map((entry) => <button key={entry} className={category === entry ? 'selected' : ''} onClick={() => { setCategory(entry); setActivePalette(0) }}><span className="category-dot" />{entry}<small>03</small></button>)}</div><div className="section-label items-label"><span>02 /</span> What are you wearing?</div><div className="item-list">{outfitOptions.map((item) => <label key={item} className={selectedItems.includes(item) ? 'checked' : ''}><input type="checkbox" checked={selectedItems.includes(item)} onChange={() => toggleItem(item)} /><span className="custom-check">{selectedItems.includes(item) ? '✓' : ''}</span>{item}</label>)}</div><p className="hint">Select the pieces you want to style<br />together. At least one item is needed.</p></aside><div className="result-area"><div className="result-heading"><div><p className="eyebrow">YOUR CURATED PALETTE</p><h2>{paletteName}</h2></div><button className="shuffle" onClick={() => setActivePalette((activePalette + 1) % currentPalettes.length)}>↻ <span>Shuffle</span></button></div><div className="palette-card"><div className="swatches">{displayColors.map(({ item, color }) => <div className="swatch" key={item} style={{ backgroundColor: color }}><span>{item}</span><strong>{color}</strong></div>)}</div><div className="palette-footer"><div><span>FOR</span>{selectedItems.length ? selectedItems.join('  ·  ') : 'Select an item'}</div><button className="save-button" onClick={savePalette}>♡ <span>Save to library</span></button></div></div><div className="palette-meta"><span><i className="sparkle">✦</i> {category} edit</span><span>{displayColors.length} color{displayColors.length === 1 ? '' : 's'} · balanced contrast</span></div><form className="comment-box" onSubmit={addComment}><div><label htmlFor="comment">How did it turn out?</label><p>Share your look with the community.</p></div><div className="comment-input"><input id="comment" value={comment} onChange={(event) => setComment(event.target.value)} placeholder="Write a quick note..." /><button aria-label="Post comment" type="submit">→</button></div></form></div></section>
      <section className="library" id="library"><div className="library-head"><div><p className="kicker">YOUR COLLECTION</p><h2>Saved <em>looks.</em></h2></div><span>{savedPalettes.length} PALETTE{savedPalettes.length === 1 ? '' : 'S'}</span></div>{savedPalettes.length === 0 ? <div className="empty-library"><span>♡</span><p>Your saved palettes will live here.</p><small>Save a palette above to start your collection.</small></div> : <div className="saved-grid">{savedPalettes.map((saved) => <article key={saved.id}><div className="mini-swatches">{saved.colors.map((color) => <span key={color} style={{ backgroundColor: color }} />)}</div><p>{saved.name}</p><small>{saved.category} · {saved.outfit.join(', ')}</small>{saved.comments?.length > 0 && <blockquote>“{saved.comments[saved.comments.length - 1]}”</blockquote>}</article>)}</div>}</section>
      {notice && <div className="toast">✦ {notice}</div>}
    </main>
  )
}

export default App
