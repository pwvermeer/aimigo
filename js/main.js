// js/main.js
fetch('header.html')
  .then(res => res.text())
  .then(html => {
    document.getElementById('header-placeholder').innerHTML = html;
  });

// Prompt copy counters
const copyCounts = JSON.parse(localStorage.getItem('promptCopyCounts')) || {
  p1: 18, p2: 26, p3: 12, p4: 5, p5: 9, p6: 15,
};

function copyPrompt(id) {
  const text = document.getElementById(id).textContent;
  navigator.clipboard.writeText(text).then(() => {
    copyCounts[id] = (copyCounts[id] || 0) + 1;
    document.getElementById("count-" + id).textContent = copyCounts[id];
    localStorage.setItem("promptCopyCounts", JSON.stringify(copyCounts));
  });
}

// Voting (no limit per user)
const voteCounts = JSON.parse(localStorage.getItem('promptVotes')) || {
  p1: 12, p2: 8, p3: 3, p4: 2, p5: 7, p6: 5,
};

function vote(id, change) {
  voteCounts[id] = (voteCounts[id] || 0) + change;
  document.getElementById("score-" + id).textContent = voteCounts[id];
  localStorage.setItem("promptVotes", JSON.stringify(voteCounts));
}

// Populate copy/vote counts on load
document.addEventListener("DOMContentLoaded", () => {
  Object.entries(copyCounts).forEach(([id, count]) => {
    const el = document.getElementById("count-" + id);
    if (el) el.textContent = count;
  });
  Object.entries(voteCounts).forEach(([id, score]) => {
    const el = document.getElementById("score-" + id);
    if (el) el.textContent = score;
  });
});

// Submission form
function submitPrompt(e) {
  e.preventDefault();
  const prompt = document.getElementById("prompt").value;
  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;

  alert("Thank you for your submission! 🎉\nPrompt: " + prompt + (name ? `\nName: ${name}` : "") + (email ? `\nEmail: ${email}` : ""));
  e.target.reset();
}
