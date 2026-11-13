const subjects = [
  {
    "code": "MPI",
    "available": true,
    "file": "materials/MPI/MPI_All_Notes.pdf",
    "count": 11,
    "files": [
      "MPI_Unit- 1.pdf",
      "Unit_1 (1).pdf",
      "MPI-UNIT-2.pdf",
      "MPI_Study_Material_e-Notes_Unit-2.pdf",
      "MPI_Unit- 3.pdf",
      "MPI_Unit-3.pdf",
      "MPI-UNIT-4.pdf",
      "MPI_Study_Material_e-Notes_Unit-4.pdf",
      "MIP-UNIT-6.pdf",
      "MPI_Study_Material_e-Notes_Unit-6.pdf",
      "MPI_Cathment Question_Solution.pdf"
    ]
  },
  {
    "code": "PDS",
    "available": true,
    "file": "materials/PDS/PDS_All_Notes.pdf",
    "count": 8,
    "files": [
      "Unit_1.pdf",
      "unit_2_Python_File_Handling_and_exception_handling.pdf",
      "Unit_3_Data_Science_and_Descriptive_Statistics.pdf",
      "UNIT-4_1_SCIPY_and_NUMPY.pdf",
      "UNIT-4_Exploring_Python_libraries-PART-2.pdf",
      "PDS_UNIT WISE QUESTIONS_SEM-5_CSE_2026.pdf",
      "Unit-5 Probabilistics and Infrential Statistics.pdf",
      "UNIT-6 Data preparation.pdf"
    ]
  },
  {
    "code": "PM",
    "available": true,
    "file": "materials/PM/PM_All_Notes.pdf",
    "count": 1,
    "files": [
      "PM Catchment .pdf"
    ]
  },
  {
    "code": "SS",
    "available": true,
    "file": "materials/SS/SS_All_Notes.pdf",
    "count": 10,
    "files": [
      "SS_Chapter-1_Notes.pdf",
      "SS_Chapter-2_Notes.pdf",
      "SS_Chapter-3_Notes.pdf",
      "SS_Chapter-4_Notes_Combined.pdf",
      "SS_Chapter-5_Notes upto MSE-2.pdf",
      "SS_Chapter-6_Notes_Upto_ MSE-2.pdf",
      "SS_Chapter-7_Notes Upto MSE-2.pdf",
      "SS_Chapter-8_Notes.pdf",
      "SS Ch-9 Notes upto MSE-1.pdf",
      "SS_35_Questions and solution reference.pdf"
    ]
  },
  {
    "code": "WAD",
    "available": false,
    "file": null,
    "count": 0,
    "files": []
  },
  {
    "code": "CN",
    "available": false,
    "file": null,
    "count": 0,
    "files": []
  }
];

const grid = document.getElementById('subjects');
const icons = { MPI: '01', PDS: '02', PM: '03', SS: '04', WAD: '05', CN: '06' };

subjects.forEach((subject) => {
  const card = document.createElement('article');
  card.className = 'subject-card';

  const top = document.createElement('div');
  top.className = 'card-top';
  const number = document.createElement('span');
  number.className = 'subject-number';
  number.textContent = icons[subject.code] || '';
  const tag = document.createElement('span');
  tag.className = subject.available ? 'status available' : 'status soon';
  tag.textContent = subject.available ? 'Notes available' : 'Coming soon';
  top.append(number, tag);

  const title = document.createElement('h3');
  title.textContent = subject.code;
  const description = document.createElement('p');
  description.className = 'card-description';

  if (subject.available) {
    description.textContent = `${subject.count} PDF files combined into one subject notes PDF.`;
    const link = document.createElement('a');
    link.className = 'open-link';
    link.href = subject.file;
    link.target = '_blank';
    link.rel = 'noopener';
    link.textContent = 'Open notes';
    card.append(top, title, description, link);
  } else {
    description.textContent = 'Study material will be added here soon.';
    const disabled = document.createElement('span');
    disabled.className = 'open-link disabled';
    disabled.textContent = 'Not available yet';
    card.append(top, title, description, disabled);
  }
  grid.appendChild(card);
});
