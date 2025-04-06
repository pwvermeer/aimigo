// js/main.js
fetch('header.html')
  .then(res => res.text())
  .then(html => {
    document.getElementById('header-placeholder').innerHTML = html;
  });

const copyCounts = JSON.parse(localStorage.getItem('promptCopyCounts')) || {};

function copyPrompt(id) {
  const text = document.getElementById(id).textContent;
  navigator.clipboard.writeText(text).then(() => {
    copyCounts[id] = (copyCounts[id] || 0) + 1;
    document.getElementById('count-' + id).textContent = copyCounts[id];
    localStorage.setItem('promptCopyCounts', JSON.stringify(copyCounts));
  });
}

document.addEventListener("DOMContentLoaded", () => {
  Object.entries(copyCounts).forEach(([id, count]) => {
    const el = document.getElementById('count-' + id);
    if (el) el.textContent = count;
  });
});
