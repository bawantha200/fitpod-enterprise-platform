/**
 * reportPdf.js
 * ------------------------------------------------------------------
 * Builds the report as a PDF (A4, portrait) and downloads it.
 * Charts are DRAWN in the PDF as sharp vector shapes: a column chart
 * for values over time and bars for rankings and shares (a ring chart
 * is shown as bars with percentages, which prints more clearly).
 *
 * The PDF libraries are loaded only when the admin presses the
 * button, so they never slow down the rest of the app.
 * ------------------------------------------------------------------
 */
import { formatCompact, niceScale } from './chartMath';
import { describeReport } from './reportSections';
import { downloadBlob, reportFileBase } from './reportCsv';

const PAGE = { width: 210, height: 297, margin: 15 };
const CONTENT_WIDTH = PAGE.width - PAGE.margin * 2;
const FOOTER_SPACE = 10; // room kept free at the bottom for the page footer

const COLORS = {
  green: [9, 113, 78],
  blue: [37, 99, 235],
  text: [25, 25, 25],
  grey: [110, 110, 110],
  track: [228, 228, 228],
  line: [208, 208, 208],
  white: [255, 255, 255],
};

/**
 * The standard PDF fonts only contain Western (Latin) letters. Any other
 * character (for example Sinhala or Tamil) would print as garbage, so it
 * is shown as "?" instead. The Word and CSV downloads keep every character.
 */
export function pdfSafeText(value) {
  return String(value ?? '')
    .replace(/\s+/g, ' ')
    .replace(/[^\u0020-\u007E\u00A0-\u00FF]/g, '?');
}

function style(doc, { size = 10, bold = false, color = COLORS.text } = {}) {
  doc.setFont('helvetica', bold ? 'bold' : 'normal');
  doc.setFontSize(size);
  doc.setTextColor(...color);
}

/** Writes text (made safe first). */
function put(doc, text, x, y, options) {
  doc.text(pdfSafeText(text), x, y, options);
}

/** Shortens text with "..." so it fits in the given width (mm). */
function fitText(doc, text, maxWidth) {
  let safe = pdfSafeText(text);
  if (doc.getTextWidth(safe) <= maxWidth) return safe;
  while (safe.length > 1 && doc.getTextWidth(`${safe}...`) > maxWidth) safe = safe.slice(0, -1);
  return `${safe}...`;
}

/** Starts a new page when the next block would not fit. Returns the y to continue at. */
function ensureSpace(doc, y, needed) {
  if (y + needed > PAGE.height - PAGE.margin - FOOTER_SPACE) {
    doc.addPage();
    return PAGE.margin;
  }
  return y;
}

/** Title, period, filters and the counting note. */
function drawHeader(doc, description, startY) {
  let y = startY;
  style(doc, { size: 22, bold: true, color: COLORS.green });
  put(doc, '.fit pod', PAGE.margin, y + 6);
  const brandWidth = doc.getTextWidth('.fit pod');
  style(doc, { size: 13, color: COLORS.grey });
  put(doc, 'Cafe Report', PAGE.margin + brandWidth + 3, y + 6);
  y += 14;

  style(doc, { size: 15, bold: true });
  put(doc, description.periodLabel, PAGE.margin, y);
  y += 6;
  style(doc, { size: 10, color: COLORS.grey });
  put(doc, description.filterLine, PAGE.margin, y);
  y += 5;
  put(doc, description.generatedLine, PAGE.margin, y);
  y += 5;

  style(doc, { size: 8, color: COLORS.grey });
  const noteLines = doc.splitTextToSize(pdfSafeText(description.note), CONTENT_WIDTH);
  doc.text(noteLines, PAGE.margin, y);
  y += noteLines.length * 3.5 + 2;

  doc.setDrawColor(...COLORS.line);
  doc.line(PAGE.margin, y, PAGE.width - PAGE.margin, y);
  return y + 6;
}

/** The eight headline numbers, as two rows of four boxes. */
function drawSummaryCards(doc, cards, startY) {
  const gap = 4;
  const boxWidth = (CONTENT_WIDTH - gap * 3) / 4;
  const boxHeight = 19;
  let y = startY;

  cards.forEach((card, index) => {
    const column = index % 4;
    if (index > 0 && column === 0) y += boxHeight + gap;
    const x = PAGE.margin + column * (boxWidth + gap);

    doc.setDrawColor(...COLORS.line);
    doc.roundedRect(x, y, boxWidth, boxHeight, 2, 2, 'S');
    style(doc, { size: 8, color: COLORS.grey });
    put(doc, card.label, x + 3, y + 5);

    style(doc, { size: 13, bold: true, color: index === 0 ? COLORS.green : COLORS.text });
    if (doc.getTextWidth(pdfSafeText(card.value)) > boxWidth - 6) doc.setFontSize(10.5);
    put(doc, card.value, x + 3, y + 12);

    if (card.hint) {
      style(doc, { size: 6.5, color: COLORS.grey });
      put(doc, card.hint, x + 3, y + 16.5);
    }
  });
  return y + boxHeight + 8;
}

/** Ranked rows: label, a bar, and the value text. Returns the y below the bars. */
function drawBars(doc, rows, startY, color) {
  const rowHeight = 7;
  const labelWidth = 52;
  const valueWidth = 62;
  const barX = PAGE.margin + labelWidth + 2;
  const barWidth = CONTENT_WIDTH - labelWidth - valueWidth - 4;
  const max = Math.max(1, ...rows.map((row) => row.value));
  let y = startY;

  rows.forEach((row) => {
    style(doc, { size: 8.5 });
    doc.text(fitText(doc, row.label, labelWidth), PAGE.margin, y + 4.3);

    doc.setFillColor(...COLORS.track);
    doc.roundedRect(barX, y + 1.4, barWidth, 3.4, 1.2, 1.2, 'F');
    if (row.value > 0) {
      doc.setFillColor(...color);
      doc.roundedRect(barX, y + 1.4, Math.max((row.value / max) * barWidth, 1.6), 3.4, 1.2, 1.2, 'F');
    }

    style(doc, { size: 8.5, color: COLORS.grey });
    put(doc, row.valueText, PAGE.width - PAGE.margin, y + 4.3, { align: 'right' });
    y += rowHeight;
  });
  return y;
}

/** A column chart: gridlines, axis numbers, one bar per row, labels underneath. */
function drawColumns(doc, rows, startY, color, height) {
  const axisWidth = 13;
  const labelHeight = 6;
  const plotX = PAGE.margin + axisWidth;
  const plotWidth = CONTENT_WIDTH - axisWidth;
  const plotHeight = height - labelHeight;
  const { max, ticks } = niceScale(Math.max(0, ...rows.map((row) => row.value)));
  const yFor = (value) => startY + plotHeight - (value / max) * plotHeight;

  doc.setLineWidth(0.15);
  ticks.forEach((tick) => {
    doc.setDrawColor(...COLORS.line);
    doc.line(plotX, yFor(tick), PAGE.width - PAGE.margin, yFor(tick));
    style(doc, { size: 7, color: COLORS.grey });
    put(doc, formatCompact(tick), plotX - 2, yFor(tick) + 1, { align: 'right' });
  });

  const slot = plotWidth / rows.length;
  const barWidth = Math.min(8, slot * 0.7);
  const labelEvery = Math.ceil(rows.length / 12);
  rows.forEach((row, index) => {
    const x = plotX + index * slot + (slot - barWidth) / 2;
    const barHeight = (row.value / max) * plotHeight;
    if (barHeight > 0) {
      // Set the colour for EVERY bar: drawing text (the labels) changes the fill colour too.
      doc.setFillColor(...color);
      doc.rect(x, yFor(row.value), barWidth, barHeight, 'F');
    }
    if (index % labelEvery === 0) {
      style(doc, { size: 7, color: COLORS.grey });
      put(doc, row.label, x + barWidth / 2, startY + height - 1, { align: 'center' });
    }
  });
  return startY + height;
}

/** One chart section: title, short description, then the chart. */
function drawChartSection(doc, chart, startY) {
  const bodyHeight = chart.isEmpty ? 6 : chart.kind === 'columns' ? 58 : chart.rows.length * 7;
  let y = ensureSpace(doc, startY, 11 + bodyHeight + 6);

  style(doc, { size: 12, bold: true, color: COLORS.green });
  put(doc, chart.title, PAGE.margin, y);
  y += 4.8;
  style(doc, { size: 8.5, color: COLORS.grey });
  put(doc, chart.description, PAGE.margin, y);
  y += 5;

  if (chart.isEmpty) {
    style(doc, { size: 9, color: COLORS.grey });
    put(doc, chart.emptyMessage, PAGE.margin, y + 3);
    return y + bodyHeight + 6;
  }
  const color = COLORS[chart.color] ?? COLORS.green;
  const end = chart.kind === 'columns' ? drawColumns(doc, chart.rows, y, color, bodyHeight) : drawBars(doc, chart.rows, y, color);
  return end + 6;
}

/** Builds the PDF and returns the jsPDF document. */
export async function buildReportPdf(report) {
  const [{ jsPDF }, { autoTable }] = await Promise.all([import('jspdf'), import('jspdf-autotable')]);
  const description = describeReport(report);
  const doc = new jsPDF({ unit: 'mm', format: 'a4' });
  doc.setProperties({ title: `${description.title} - ${description.periodLabel}`, creator: 'FitPod Enterprise Platform' });

  let y = drawHeader(doc, description, PAGE.margin);
  y = drawSummaryCards(doc, description.summaryCards, y);

  if (!description.hasOrders) {
    style(doc, { size: 10, color: COLORS.grey });
    put(doc, description.emptyMessage, PAGE.margin, y);
  } else {
    description.charts.forEach((chart) => {
      y = drawChartSection(doc, chart, y);
    });

    // The order list
    y = ensureSpace(doc, y, 30);
    style(doc, { size: 12, bold: true, color: COLORS.green });
    put(doc, 'Orders', PAGE.margin, y);
    y += 4.8;
    if (description.ordersNote) {
      style(doc, { size: 8.5, color: COLORS.grey });
      put(doc, description.ordersNote, PAGE.margin, y);
      y += 4.5;
    }
    autoTable(doc, {
      startY: y + 1,
      head: [description.ordersHead],
      body: description.orderRows.map((cells) => cells.map(pdfSafeText)),
      margin: { left: PAGE.margin, right: PAGE.margin, top: PAGE.margin, bottom: PAGE.margin + FOOTER_SPACE },
      styles: { font: 'helvetica', fontSize: 7.5, cellPadding: 1.6, textColor: COLORS.text, lineColor: COLORS.line },
      headStyles: { fillColor: COLORS.green, textColor: COLORS.white, fontStyle: 'bold' },
      alternateRowStyles: { fillColor: [246, 246, 246] },
      columnStyles: {
        0: { cellWidth: 17 },
        1: { cellWidth: 27 },
        2: { cellWidth: 33 },
        3: { cellWidth: 22 },
        4: { cellWidth: 20 },
        6: { cellWidth: 23, halign: 'right' },
      },
    });
  }

  // Footer on every page.
  const pageCount = doc.getNumberOfPages();
  for (let page = 1; page <= pageCount; page += 1) {
    doc.setPage(page);
    style(doc, { size: 8, color: COLORS.grey });
    put(doc, `.fit pod cafe report - ${description.periodLabel}`, PAGE.margin, PAGE.height - 8);
    put(doc, `Page ${page} of ${pageCount}`, PAGE.width - PAGE.margin, PAGE.height - 8, { align: 'right' });
  }
  return doc;
}

/** The PDF as a Blob (a file in memory). */
export async function buildReportPdfBlob(report) {
  const doc = await buildReportPdf(report);
  return doc.output('blob');
}

/** Builds the PDF and downloads it. */
export async function exportReportPdf(report) {
  downloadBlob(await buildReportPdfBlob(report), `${reportFileBase(report)}.pdf`);
}
