const subjectFiles = {
  "MPI": [
    "MIP-UNIT-6.pdf",
    "MPI-UNIT-2.pdf",
    "MPI-UNIT-4.pdf",
    "MPI_Cathment Question_Solution.pdf",
    "MPI_Study_Material_e-Notes_Unit-2.pdf",
    "MPI_Study_Material_e-Notes_Unit-4.pdf",
    "MPI_Study_Material_e-Notes_Unit-6.pdf",
    "MPI_Unit- 1.pdf",
    "MPI_Unit- 3.pdf",
    "MPI_Unit-3.pdf",
    "Unit_1 (1).pdf"
  ],
  "PDS": [
    "PDS_UNIT WISE QUESTIONS_SEM-5_CSE_2026.pdf",
    "UNIT-4_1_SCIPY_and_NUMPY.pdf",
    "UNIT-4_Exploring_Python_libraries-PART-2.pdf",
    "Unit-5 Probabilistics and Infrential Statistics.pdf",
    "UNIT-6 Data preparation.pdf",
    "Unit_1.pdf",
    "unit_2_Python_File_Handling_and_exception_handling.pdf",
    "Unit_3_Data_Science_and_Descriptive_Statistics.pdf"
  ],
  "PM": [
    "PM Catchment .pdf"
  ],
  "SS": [
    "SS Ch-9 Notes upto MSE-1.pdf",
    "SS_35_Questions and solution reference.pdf",
    "SS_Chapter-1_Notes.pdf",
    "SS_Chapter-2_Notes.pdf",
    "SS_Chapter-3_Notes.pdf",
    "SS_Chapter-4_Notes_Combined.pdf",
    "SS_Chapter-5_Notes upto MSE-2.pdf",
    "SS_Chapter-6_Notes_Upto_ MSE-2.pdf",
    "SS_Chapter-7_Notes Upto MSE-2.pdf",
    "SS_Chapter-8_Notes.pdf"
  ],
  "WAD": [],
  "CN": []
};

const subjectDetails = {
  MPI: { title: "Microprocessor and Interfacing", code: "01", description: "Microprocessor notes and study material" },
  PDS: { title: "Python for Data Science", code: "02", description: "Python, statistics and data science notes" },
  PM:  { title: "Project Management", code: "03", description: "Project Management study material" },
  SS:  { title: "Software Security", code: "04", description: "Software Security notes and question solutions" },
  WAD: { title: "Web Application Development", code: "05", description: "Notes will be added soon" },
  CN:  { title: "Computer Networks", code: "06", description: "Notes will be added soon" }
};

const grid = document.getElementById("subjectGrid");
const searchInput = document.getElementById("searchInput");
let openedSubject = null;

function fileUrl(subject, filename) {
  return "materials/" + subject + "/" + filename.split("/").map(encodeURIComponent).join("/");
}

function renderSubjects(query = "") {
  const q = query.trim().toLowerCase();
  grid.innerHTML = "";

  Object.entries(subjectDetails).forEach(([code, details]) => {
    const files = subjectFiles[code] || [];
    const matchingFiles = files.filter(name => name.toLowerCase().includes(q));
    const subjectMatches = (code + " " + details.title + " " + details.description).toLowerCase().includes(q);
    if (q && !subjectMatches && matchingFiles.length === 0) return;

    const card = document.createElement("article");
    card.className = "subject-card" + (openedSubject === code ? " is-open" : "");

    const toggle = document.createElement("button");
    toggle.className = "subject-toggle";
    toggle.type = "button";
    toggle.setAttribute("aria-expanded", String(openedSubject === code));
    toggle.innerHTML = `
      <span class="subject-topline"><span class="subject-code">${code}</span><span class="subject-count">${files.length ? files.length + " PDFs" : "Coming soon"}</span></span>
      <span class="subject-title">${details.title}</span>
      <span class="subject-bottom"><span>${files.length ? "Open Notes" : "Notes will be added later"}</span><span class="arrow">${openedSubject === code ? "−" : "+"}</span></span>
    `;

    toggle.addEventListener("click", () => {
      openedSubject = openedSubject === code ? null : code;
      renderSubjects(searchInput.value);
    });
    card.appendChild(toggle);

    if (openedSubject === code) {
      const panel = document.createElement("div");
      panel.className = "file-panel";
      const visibleFiles = q ? matchingFiles : files;
      if (!visibleFiles.length) {
        panel.innerHTML = `<p class="empty-state">No matching PDF files in this subject.</p>`;
      } else {
        const label = document.createElement("p");
        label.className = "file-panel-label";
        label.textContent = "AVAILABLE PDF FILES";
        panel.appendChild(label);
        visibleFiles.forEach((filename, index) => {
          const row = document.createElement("div");
          row.className = "file-row";
          const name = document.createElement("a");
          name.className = "file-name file-download-link";
          name.textContent = filename;
          name.href = fileUrl(code, filename);
          name.download = filename;
          name.setAttribute("aria-label", "Download " + filename);

          const actions = document.createElement("span");
          actions.className = "file-actions";

          const open = document.createElement("a");
          open.className = "file-action primary";
          open.href = fileUrl(code, filename);
          open.target = "_blank";
          open.rel = "noopener";
          open.textContent = "View";

          const download = document.createElement("a");
          download.className = "file-action";
          download.href = fileUrl(code, filename);
          download.setAttribute("download", filename);
          download.textContent = "Download ↓";
          download.setAttribute("aria-label", "Download " + filename);

          actions.append(open, download);
          row.append(name, actions);
          panel.appendChild(row);
        });
      }
      card.appendChild(panel);
    }
    grid.appendChild(card);
  });

  if (!grid.children.length) {
    grid.innerHTML = `<div class="no-results">No subjects or PDFs found. Try another search.</div>`;
  }
}

searchInput.addEventListener("input", () => {
  openedSubject = null;
  renderSubjects(searchInput.value);
});

renderSubjects();
