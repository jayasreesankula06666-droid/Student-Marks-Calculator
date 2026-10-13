const subjectCount = document.getElementById("subjectCount");
const subjectInputs = document.getElementById("subjectInputs");
const marksForm = document.getElementById("marksForm");
const result = document.getElementById("result");
const resetButton = document.getElementById("resetButton");

function renderSubjects() {
  const count = Number(subjectCount.value);
  subjectInputs.innerHTML = "";
  for (let i = 1; i <= count; i++) {
    const wrapper = document.createElement("div");
    const label = document.createElement("label");
    label.htmlFor = `subject${i}`;
    label.textContent = `Subject ${i} marks (0–100)`;
    const input = document.createElement("input");
    input.id = `subject${i}`;
    input.name = `subject${i}`;
    input.type = "number";
    input.min = "0";
    input.max = "100";
    input.step = "0.01";
    input.placeholder = "Enter marks";
    input.required = true;
    input.setAttribute("aria-label", `Subject ${i} marks`);
    wrapper.append(label, input);
    subjectInputs.appendChild(wrapper);
  }
}

function getGrade(percentage, passed) {
  if (!passed) return "F";
  if (percentage >= 90) return "A+";
  if (percentage >= 80) return "A";
  if (percentage >= 70) return "B";
  if (percentage >= 60) return "C";
  if (percentage >= 50) return "D";
  if (percentage >= 35) return "E";
  return "F";
}

subjectCount.addEventListener("change", renderSubjects);

marksForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const name = document.getElementById("studentName").value.trim();
  const count = Number(subjectCount.value);
  const marks = [];

  for (let i = 1; i <= count; i++) {
    const input = document.getElementById(`subject${i}`);
    const value = input.valueAsNumber;
    if (input.value.trim() === "" || !Number.isFinite(value) || value < 0 || value > 100) {
      input.setCustomValidity("Enter a mark between 0 and 100.");
      input.reportValidity();
      input.setCustomValidity("");
      input.focus();
      return;
    }
    marks.push(value);
  }

  const total = marks.reduce((sum, mark) => sum + mark, 0);
  const maximum = count * 100;
  const percentage = (total / maximum) * 100;
  const passed = marks.every((mark) => mark >= 35);

  document.getElementById("resultName").textContent = `Student: ${name}`;
  document.getElementById("totalMarks").textContent = `${Number(total.toFixed(2))} / ${maximum}`;
  document.getElementById("percentage").textContent = `${percentage.toFixed(2)}%`;
  document.getElementById("grade").textContent = getGrade(percentage, passed);
  const status = document.getElementById("status");
  status.textContent = passed ? "PASS ✅" : "FAIL ❌";
  status.style.color = passed ? "#16803d" : "#c62828";
  result.classList.remove("hidden");
  result.scrollIntoView({ behavior: "smooth", block: "start" });
});

resetButton.addEventListener("click", () => {
  marksForm.reset();
  subjectCount.value = "5";
  renderSubjects();
  result.classList.add("hidden");
  document.getElementById("studentName").focus();
});

renderSubjects();
