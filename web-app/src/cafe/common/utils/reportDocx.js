/**
 * reportDocx.js
 * ------------------------------------------------------------------
 * Builds the report as a Word document (.docx, A4, portrait) and
 * downloads it. Word has no simple built-in chart, so each chart is a
 * small table whose cells are shaded to form the bars: it looks like a
 * bar chart, stays sharp, and can be edited like any other Word table.
 *
 * The Word library is loaded only when the admin presses the button,
 * so it never slows down the rest of the app.
 * ------------------------------------------------------------------
 */
import { describeReport } from './reportSections';
import { downloadBlob, reportFileBase } from './reportCsv';

const PAGE_WIDTH = 11906; // A4 in "twips" (1/20 of a point)
const PAGE_HEIGHT = 16838;
const MARGIN = 1134; // 2 cm
const CONTENT_WIDTH = PAGE_WIDTH - MARGIN * 2;

const GREEN = '09714E';
const BLUE = '2563EB';
const TRACK = 'E4E4E4';
const GREY = '6E6E6E';
const LINE = 'D0D0D0';

const MIME_DOCX = 'application/vnd.openxmlformats-officedocument.wordprocessingml.document';

/** Builds the Word document and returns it as a Blob (a file in memory). */
export async function buildReportDocxBlob(report) {
  const {
    Document, Packer, Paragraph, TextRun, Table, TableRow, TableCell, Footer, PageNumber,
    WidthType, ShadingType, BorderStyle, AlignmentType, HeadingLevel, TableLayoutType, HeightRule, VerticalAlign,
  } = await import('docx');

  const description = describeReport(report);

  // ---- small helpers ------------------------------------------
  const noBorder = { style: BorderStyle.NONE, size: 0, color: 'FFFFFF' };
  const noBorders = { top: noBorder, bottom: noBorder, left: noBorder, right: noBorder };
  const lineBorder = { style: BorderStyle.SINGLE, size: 4, color: LINE };
  const lineBorders = { top: lineBorder, bottom: lineBorder, left: lineBorder, right: lineBorder };

  /** A paragraph of text. `size` is in points. */
  const paragraph = (text, { size = 10, bold = false, color = '191919', after = 60, align, keepNext = false } = {}) =>
    new Paragraph({
      alignment: align,
      keepNext,
      spacing: { before: 0, after },
      children: [new TextRun({ text: String(text), size: size * 2, bold, color })],
    });

  const heading = (text) =>
    new Paragraph({
      heading: HeadingLevel.HEADING_2,
      keepNext: true,
      spacing: { before: 280, after: 40 },
      children: [new TextRun({ text, size: 26, bold: true, color: GREEN, font: 'Arial' })],
    });

  /** A table cell with one line of text. */
  const textCell = (text, width, { bold = false, color = '191919', size = 8, align, fill, borders = lineBorders, keepNext = false } = {}) =>
    new TableCell({
      width: { size: width, type: WidthType.DXA },
      borders,
      verticalAlign: VerticalAlign.CENTER,
      margins: { top: 40, bottom: 40, left: 80, right: 80 },
      shading: fill ? { type: ShadingType.CLEAR, fill, color: 'auto' } : undefined,
      children: [
        new Paragraph({
          alignment: align,
          keepNext,
          spacing: { before: 0, after: 0 },
          children: [new TextRun({ text: String(text), size: size * 2, bold, color })],
        }),
      ],
    });

  /** The Summary table: measure and value. */
  const summaryTable = () => {
    const widths = [5000, CONTENT_WIDTH - 5000];
    return new Table({
      width: { size: CONTENT_WIDTH, type: WidthType.DXA },
      columnWidths: widths,
      layout: TableLayoutType.FIXED,
      rows: description.summaryCards.map(
        (card) =>
          new TableRow({
            cantSplit: true,
            children: [
              textCell(card.hint ? `${card.label} (${card.hint.toLowerCase()})` : card.label, widths[0], { size: 9 }),
              textCell(card.value, widths[1], { size: 10, bold: true, align: AlignmentType.RIGHT }),
            ],
          })
      ),
    });
  };

  /**
   * A bar chart made of a table: label | shaded cells | value text.
   * The bar is two cells side by side: a coloured one (the value) and a grey one (the
   * rest), together `steps` columns wide. White lines above and below leave a gap
   * between rows, and "keep with next" keeps the whole chart on one page.
   */
  const barTable = (rows, { labelWidth, steps, color }) => {
    const stepWidth = 190;
    const valueWidth = CONTENT_WIDTH - labelWidth - steps * stepWidth;
    const max = Math.max(1, ...rows.map((row) => row.value));
    const gap = { style: BorderStyle.SINGLE, size: 18, color: 'FFFFFF' };
    const barCell = (span, fill, keepNext) =>
      new TableCell({
        width: { size: span * stepWidth, type: WidthType.DXA },
        columnSpan: span,
        borders: { top: gap, bottom: gap, left: noBorder, right: noBorder },
        shading: { type: ShadingType.CLEAR, fill, color: 'auto' },
        children: [new Paragraph({ keepNext, spacing: { before: 0, after: 0 }, children: [new TextRun({ text: '', size: 4 })] })],
      });

    return new Table({
      width: { size: CONTENT_WIDTH, type: WidthType.DXA },
      columnWidths: [labelWidth, ...Array(steps).fill(stepWidth), valueWidth],
      layout: TableLayoutType.FIXED,
      rows: rows.map((row, rowIndex) => {
        const filled = row.value > 0 ? Math.max(1, Math.round((row.value / max) * steps)) : 0;
        const keepNext = rowIndex < rows.length - 1;
        return new TableRow({
          cantSplit: true,
          height: { value: 270, rule: HeightRule.EXACT },
          children: [
            textCell(row.label, labelWidth, { size: 8, borders: noBorders, keepNext }),
            filled > 0 ? barCell(filled, color, keepNext) : null,
            filled < steps ? barCell(steps - filled, TRACK, keepNext) : null,
            textCell(row.valueText, valueWidth, { size: 8, color: GREY, align: AlignmentType.RIGHT, borders: noBorders, keepNext }),
          ].filter(Boolean),
        });
      }),
    });
  };

  /** A chart section: heading, description, then the bar table (or a "no data" line). */
  const chartSection = (chart) => {
    const parts = [heading(chart.title), paragraph(chart.description, { size: 8.5, color: GREY, after: 100, keepNext: true })];
    if (chart.isEmpty) return [...parts, paragraph(chart.emptyMessage, { size: 9, color: GREY })];
    const isColumns = chart.kind === 'columns';
    const table = barTable(chart.rows, {
      labelWidth: isColumns ? 1300 : 2500,
      steps: isColumns ? 24 : 20,
      color: chart.color === 'blue' ? BLUE : GREEN,
    });
    return [...parts, table];
  };

  /** The order list. */
  const ordersTable = () => {
    const widths = [800, 1500, 1750, 1150, 1000, 2200];
    widths.push(CONTENT_WIDTH - widths.reduce((sum, width) => sum + width, 0));
    const lastColumn = widths.length - 1;
    return new Table({
      width: { size: CONTENT_WIDTH, type: WidthType.DXA },
      columnWidths: widths,
      layout: TableLayoutType.FIXED,
      rows: [
        new TableRow({
          tableHeader: true,
          cantSplit: true,
          children: description.ordersHead.map((title, index) =>
            textCell(title, widths[index], { bold: true, color: 'FFFFFF', fill: GREEN, size: 7.5, align: index === lastColumn ? AlignmentType.RIGHT : undefined })
          ),
        }),
        ...description.orderRows.map(
          (cells, rowIndex) =>
            new TableRow({
              cantSplit: true,
              children: cells.map((text, index) =>
                textCell(text, widths[index], { size: 7.5, fill: rowIndex % 2 === 1 ? 'F6F6F6' : undefined, align: index === lastColumn ? AlignmentType.RIGHT : undefined })
              ),
            })
        ),
      ],
    });
  };

  // ---- the document -------------------------------------------
  const children = [
    new Paragraph({
      spacing: { before: 0, after: 60 },
      children: [
        new TextRun({ text: '.fit pod', size: 44, bold: true, color: GREEN }),
        new TextRun({ text: '  Cafe Report', size: 26, color: GREY }),
      ],
    }),
    paragraph(description.periodLabel, { size: 15, bold: true, after: 40 }),
    paragraph(description.filterLine, { size: 10, color: GREY, after: 20 }),
    paragraph(description.generatedLine, { size: 10, color: GREY, after: 100 }),
    paragraph(description.note, { size: 8, color: GREY, after: 120 }),
    heading('Summary'),
    summaryTable(),
  ];

  if (!description.hasOrders) {
    children.push(paragraph(description.emptyMessage, { size: 10, color: GREY, after: 0 }));
  } else {
    description.charts.forEach((chart) => children.push(...chartSection(chart)));
    children.push(heading('Orders'));
    if (description.ordersNote) children.push(paragraph(description.ordersNote, { size: 8.5, color: GREY, after: 100, keepNext: true }));
    children.push(ordersTable());
  }

  const document = new Document({
    creator: 'FitPod Enterprise Platform',
    title: `${description.title} - ${description.periodLabel}`,
    styles: { default: { document: { run: { font: 'Arial', size: 20 } } } },
    sections: [
      {
        properties: { page: { size: { width: PAGE_WIDTH, height: PAGE_HEIGHT }, margin: { top: MARGIN, right: MARGIN, bottom: MARGIN, left: MARGIN } } },
        footers: {
          default: new Footer({
            children: [
              new Paragraph({
                alignment: AlignmentType.CENTER,
                children: [
                  new TextRun({ children: ['.fit pod cafe report   |   Page ', PageNumber.CURRENT, ' of ', PageNumber.TOTAL_PAGES], size: 16, color: GREY }),
                ],
              }),
            ],
          }),
        },
        children,
      },
    ],
  });

  return Packer.toBlob(document);
}

/** Builds the Word document and downloads it. */
export async function exportReportDocx(report) {
  const blob = await buildReportDocxBlob(report);
  downloadBlob(new Blob([blob], { type: MIME_DOCX }), `${reportFileBase(report)}.docx`);
}
