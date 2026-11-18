# 🚀 Gradient Galaxy

A space-themed exam-practice game for **TDT4172 – Introduksjon til maskinlæring** (NTNU). Bilingual (🇳🇴 / 🇬🇧), a single offline HTML file, no tracking.

**▶ Play:** https://pedropcardonaa.github.io/gradient-galaxy/

## What's inside
- **428 questions across 12 topic "planets"**: data and preprocessing, logistic regression and gradient descent, metrics, Bayes, trees and ensembles, bias/variance, neural nets, clustering, dimensionality reduction and anomalies, RL, XAI, and the AI Act and ethics.
  - Real questions from the 2024 and 2025 exams and the lecture notes.
  - New practice questions in the same style.
- **Question types:**
  - single choice;
  - true/false;
  - "select all that are true";
  - **type-the-number** calculations.
- **Formulas, like on the real exam.** Every calculation question shows the formula you need in a 📐 Formula box (in practice, exam and the PDF report). Formulas are typeset as LaTeX with a bundled copy of [KaTeX](https://katex.org), so they render properly even offline.
- **🧭 Navigation guide.** A formula sheet opened from the map: all 77 formulas in the course, grouped by planet, each with what the symbols mean, when to use it, typical mistakes and a worked example. It is searchable, and each planet has a shortcut to practise it.
- **Visual analysis.** The figures are generated live: real k-means and DBSCAN runs, decision boundaries, ROC/PR curves, confusion matrices, loss curves, elbow and scree plots, decision trees, SHAP waterfall and beeswarm plots, and Frozen Lake grids.
- **🧪 Practice mode.** Rounds of 7, topic-balanced. After each answer you get an explanation, including why each wrong option is wrong. You can browse back to earlier questions.
- **📝 Exam mode.** Choose 7, 20 or 40 questions, with no feedback until you submit. 20- and 40-question exams come in parts of 4 with a per-part zero floor. There is an optional timer (6 min per question), and the result is graded on the NTNU percentage scale.
  - As on the real exam, you can switch an answer but not clear it.
- **📄 Export PDF.** Builds a full report of the exam (score, grade, every question, your answer and all explanations), then use "Save as PDF" in the print dialog.
- Spaced-repetition question picking, a dynamic canvas background that reacts to your score, light/dark/auto theme, and keyboard shortcuts.

Progress is stored only in your browser's `localStorage`.

## Scoring
| Type | Correct | Wrong | Blank |
|---|---|---|---|
| Single choice (n options) | +1 | −1/n | 0 |
| True/false | +1 | −0.5 | 0 |
| Select all (n options, exact set) | +1 | −1/n | 0 |
| Type the number (within tolerance) | +1 | −0.25 | 0 |

## Building from source
`index.html` is generated. Edit the files in `src/`, then run:

```bash
python3 src/build.py index.html      # concatenates template + figures + question banks
cd src && node validate.js app.js    # schema checks + scoring unit tests
```

| File | Contents |
|---|---|
| `src/template.html` | The engine: UI, scoring, modes, sky, PDF report |
| `src/figs.js` | Figure catalog (`{k:"scatter"\|"line"\|"bars"\|"loss"\|"rocMulti"\|"cm"\|"tree"\|"fit"\|"act"\|"grid"\|"waterfall"\|"superpixel"}`) |
| `src/q*.js`, `src/q*b.js`, `src/q*c.js`, `src/q*d.js` | Question banks: exam/notes questions, true-false/multi questions, math and visual questions (math questions carry a formula `f`) |
| `src/guide.js` | Content of the 🧭 Navigation guide (formulas, explanations and examples per topic) |
| `src/vendor/` | KaTeX 0.16.22 (MIT, `KATEX-LICENSE.txt`): `katex.min.js` and `katex.inline.css` with the woff2 fonts inlined; `build.py` embeds both |
| `src/x*.js` | Per-option explanations for the original questions |
| `src/fix*.js` | Small patches, such as figures attached to existing questions |

## Disclaimer
Unofficial study tool, not affiliated with NTNU. Questions are based on NTNU TDT4172 exams (2024–2025) and lecture notes; all course material © NTNU / the course staff. Mistakes are possible: when in doubt, trust the official solutions.
