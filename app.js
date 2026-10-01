/**
 * CogniDoc AI - Enterprise Intelligent Document Processing (IDP) Platform
 * Core Application Engine & Interactive Spatial OCR / NLP Pipeline
 */

(function () {
  'use strict';

  // =========================================================================
  // DOCUMENT REPOSITORY & SYNTHETIC DATASETS
  // =========================================================================

  const DOCUMENTS = [
    {
      id: 'doc-invoice-01',
      title: 'Acme-Corp-Invoice-9482.pdf',
      category: 'invoice',
      categoryLabel: 'Invoice (Tax Commercial)',
      classificationScore: 99.2,
      confidenceScore: 97.8,
      status: 'ready', // 'ready', 'flagged', 'verified'
      tokensCount: 94,
      processingTime: '418ms',
      fields: {
        metadata: [
          { key: 'invoice_number', label: 'Invoice Number', value: 'INV-2026-9482', confidence: 99.4, bboxId: 'bbox-inv-num', required: true, type: 'string' },
          { key: 'invoice_date', label: 'Invoice Date', value: '2026-09-18', confidence: 98.9, bboxId: 'bbox-inv-date', required: true, type: 'date' },
          { key: 'due_date', label: 'Payment Due Date', value: '2026-10-18', confidence: 97.5, bboxId: 'bbox-due-date', required: true, type: 'date' },
          { key: 'po_number', label: 'PO Reference', value: 'PO-US-884102', confidence: 96.2, bboxId: 'bbox-po-num', required: false, type: 'string' },
          { key: 'tax_id', label: 'Vendor Tax / VAT ID', value: 'US94-8291048-A', confidence: 98.1, bboxId: 'bbox-tax-id', required: true, type: 'string' }
        ],
        parties: [
          { key: 'vendor_name', label: 'Vendor Entity', value: 'Acme Cloud Technologies Inc.', confidence: 99.1, bboxId: 'bbox-vendor-name', required: true, type: 'string' },
          { key: 'vendor_address', label: 'Vendor Address', value: '450 Innovation Parkway, Suite 800, San Francisco, CA 94105', confidence: 95.8, bboxId: 'bbox-vendor-addr', required: false, type: 'string' },
          { key: 'customer_name', label: 'Client Entity', value: 'Apex Solutions Global LLC', confidence: 98.7, bboxId: 'bbox-client-name', required: true, type: 'string' },
          { key: 'customer_address', label: 'Client Address', value: '1200 Enterprise Boulevard, Austin, TX 78701', confidence: 96.4, bboxId: 'bbox-client-addr', required: false, type: 'string' }
        ],
        financials: [
          { key: 'subtotal', label: 'Net Subtotal', value: '13,500.00', confidence: 99.0, bboxId: 'bbox-subtotal', required: true, type: 'currency' },
          { key: 'tax_amount', label: 'Sales Tax (10.0%)', value: '1,350.00', confidence: 97.8, bboxId: 'bbox-tax', required: true, type: 'currency' },
          { key: 'total_amount', label: 'Grand Total Amount', value: '14,850.00', confidence: 99.5, bboxId: 'bbox-total', required: true, type: 'currency' },
          { key: 'currency', label: 'Currency Code', value: 'USD ($)', confidence: 99.8, bboxId: 'bbox-currency', required: true, type: 'string' }
        ]
      },
      lineItems: [
        { item: 'Enterprise Neural Engine API Subscription', qty: '1', unitPrice: '8,500.00', total: '8,500.00', bboxId: 'bbox-item-1' },
        { item: 'GPU Cloud Cluster Dedicated Instances (Tier-1)', qty: '2', unitPrice: '2,000.00', total: '4,000.00', bboxId: 'bbox-item-2' },
        { item: 'SLA Premium 24/7 Managed Infrastructure', qty: '1', unitPrice: '1,000.00', total: '1,000.00', bboxId: 'bbox-item-3' }
      ],
      // Spatial Bounding Boxes mapped to pixel coordinates on the 720x980 sheet
      bboxes: [
        { id: 'bbox-vendor-name', x: 50, y: 45, w: 260, h: 28, text: 'Acme Cloud Technologies Inc.', category: 'entity', conf: 0.99 },
        { id: 'bbox-vendor-addr', x: 50, y: 78, w: 280, h: 22, text: '450 Innovation Pkwy, Suite 800, SF, CA', category: 'entity', conf: 0.96 },
        { id: 'bbox-inv-title', x: 490, y: 45, w: 180, h: 32, text: 'COMMERCIAL INVOICE', category: 'header', conf: 0.99 },
        { id: 'bbox-inv-num', x: 510, y: 82, w: 160, h: 20, text: 'INV-2026-9482', category: 'header', conf: 0.99 },
        { id: 'bbox-inv-date', x: 535, y: 106, w: 135, h: 20, text: 'Date: 2026-09-18', category: 'header', conf: 0.99 },
        { id: 'bbox-due-date', x: 520, y: 130, w: 150, h: 20, text: 'Due Date: 2026-10-18', category: 'header', conf: 0.98 },
        { id: 'bbox-po-num', x: 540, y: 154, w: 130, h: 20, text: 'PO-US-884102', category: 'header', conf: 0.96 },
        { id: 'bbox-tax-id', x: 50, y: 104, w: 190, h: 20, text: 'Tax ID: US94-8291048-A', category: 'header', conf: 0.98 },
        { id: 'bbox-client-name', x: 50, y: 190, w: 230, h: 24, text: 'Apex Solutions Global LLC', category: 'entity', conf: 0.99 },
        { id: 'bbox-client-addr', x: 50, y: 218, w: 270, h: 22, text: '1200 Enterprise Blvd, Austin, TX 78701', category: 'entity', conf: 0.96 },
        { id: 'bbox-table-header', x: 50, y: 278, w: 620, h: 28, text: 'Description | Qty | Unit Price | Total Amount', category: 'table', conf: 0.98 },
        { id: 'bbox-item-1', x: 50, y: 312, w: 620, h: 28, text: 'Enterprise Neural Engine API Subscription - $8,500.00', category: 'table', conf: 0.98 },
        { id: 'bbox-item-2', x: 50, y: 346, w: 620, h: 28, text: 'GPU Cloud Cluster Dedicated Instances - $4,000.00', category: 'table', conf: 0.97 },
        { id: 'bbox-item-3', x: 50, y: 380, w: 620, h: 28, text: 'SLA Premium 24/7 Managed Infrastructure - $1,000.00', category: 'table', conf: 0.98 },
        { id: 'bbox-subtotal', x: 440, y: 445, w: 230, h: 22, text: 'Subtotal: $13,500.00', category: 'financial', conf: 0.99 },
        { id: 'bbox-tax', x: 440, y: 472, w: 230, h: 22, text: 'Tax (10%): $1,350.00', category: 'financial', conf: 0.98 },
        { id: 'bbox-total', x: 440, y: 504, w: 230, h: 32, text: 'Total Due: $14,850.00', category: 'financial', conf: 0.99 },
        { id: 'bbox-currency', x: 500, y: 540, w: 170, h: 20, text: 'Currency: USD', category: 'financial', conf: 0.99 },
        { id: 'bbox-stamp', x: 60, y: 830, w: 100, h: 100, text: 'VERIFIED CORPORATE SEAL', category: 'entity', conf: 0.94 },
        { id: 'bbox-signature', x: 480, y: 850, w: 180, h: 45, text: 'Authorized Signature - C. Sterling', category: 'entity', conf: 0.93 }
      ]
    },
    {
      id: 'doc-receipt-02',
      title: 'Artisan-Bistro-Receipt-82914.jpg',
      category: 'receipt',
      categoryLabel: 'Receipt (Travel & Dining)',
      classificationScore: 98.7,
      confidenceScore: 84.1, // Trigger low confidence HITL review
      status: 'flagged',
      tokensCount: 52,
      processingTime: '310ms',
      fields: {
        metadata: [
          { key: 'receipt_id', label: 'Receipt / Check #', value: 'REC-82914', confidence: 94.2, bboxId: 'bbox-rec-id', required: true, type: 'string' },
          { key: 'transaction_date', label: 'Transaction Date', value: '2026-09-29 19:42', confidence: 91.5, bboxId: 'bbox-rec-date', required: true, type: 'date' },
          { key: 'payment_method', label: 'Payment Card', value: 'VISA **** 4912 (Auth: 83912)', confidence: 96.0, bboxId: 'bbox-rec-card', required: true, type: 'string' },
          { key: 'server_name', label: 'Server / Table', value: 'Table 14 - Marcus K.', confidence: 81.4, bboxId: 'bbox-rec-server', required: false, type: 'string' }
        ],
        parties: [
          { key: 'merchant_name', label: 'Merchant Establishment', value: 'Artisan Bistro & Grill', confidence: 98.5, bboxId: 'bbox-rec-merchant', required: true, type: 'string' },
          { key: 'merchant_address', label: 'Merchant Location', value: '722 S. Congress Ave, Austin, TX', confidence: 88.2, bboxId: 'bbox-rec-address', required: false, type: 'string' }
        ],
        financials: [
          { key: 'subtotal', label: 'Food & Beverage Subtotal', value: '142.50', confidence: 92.4, bboxId: 'bbox-rec-subtotal', required: true, type: 'currency' },
          { key: 'tax_amount', label: 'State & Local Tax (8.25%)', value: '11.76', confidence: 89.2, bboxId: 'bbox-rec-tax', required: true, type: 'currency' },
          { key: 'tip_amount', label: 'Gratuity / Tip (Low OCR Conf)', value: '28.50', confidence: 72.8, bboxId: 'bbox-rec-tip', required: false, type: 'currency' }, // Low conf!
          { key: 'total_amount', label: 'Final Charged Total', value: '182.76', confidence: 94.8, bboxId: 'bbox-rec-total', required: true, type: 'currency' }
        ]
      },
      lineItems: [
        { item: 'Prime Dry-Aged Ribeye 16oz', qty: '2', unitPrice: '52.00', total: '104.00', bboxId: 'bbox-rec-item1' },
        { item: 'Heirloom Tomato Burrata', qty: '1', unitPrice: '18.50', total: '18.50', bboxId: 'bbox-rec-item2' },
        { item: 'Sparkling Mineral Water (San Pellegrino)', qty: '2', unitPrice: '10.00', total: '20.00', bboxId: 'bbox-rec-item3' }
      ],
      bboxes: [
        { id: 'bbox-rec-merchant', x: 200, y: 50, w: 320, h: 32, text: 'Artisan Bistro & Grill', category: 'entity', conf: 0.98 },
        { id: 'bbox-rec-address', x: 220, y: 88, w: 280, h: 20, text: '722 S. Congress Ave, Austin, TX', category: 'entity', conf: 0.88 },
        { id: 'bbox-rec-id', x: 240, y: 120, w: 240, h: 20, text: 'Check: REC-82914', category: 'header', conf: 0.94 },
        { id: 'bbox-rec-date', x: 230, y: 145, w: 260, h: 20, text: 'Date: 09/29/2026 07:42 PM', category: 'header', conf: 0.91 },
        { id: 'bbox-rec-server', x: 250, y: 170, w: 220, h: 20, text: 'Table 14 - Marcus K.', category: 'header', conf: 0.81 },
        { id: 'bbox-rec-item1', x: 100, y: 220, w: 520, h: 26, text: '2x Prime Dry-Aged Ribeye 16oz  $104.00', category: 'table', conf: 0.93 },
        { id: 'bbox-rec-item2', x: 100, y: 250, w: 520, h: 26, text: '1x Heirloom Tomato Burrata  $18.50', category: 'table', conf: 0.91 },
        { id: 'bbox-rec-item3', x: 100, y: 280, w: 520, h: 26, text: '2x Sparkling Mineral Water  $20.00', category: 'table', conf: 0.90 },
        { id: 'bbox-rec-subtotal', x: 340, y: 330, w: 280, h: 22, text: 'Subtotal: $142.50', category: 'financial', conf: 0.92 },
        { id: 'bbox-rec-tax', x: 340, y: 356, w: 280, h: 22, text: 'Tax (8.25%): $11.76', category: 'financial', conf: 0.89 },
        { id: 'bbox-rec-tip', x: 340, y: 382, w: 280, h: 22, text: 'Tip: $28.50', category: 'lowconf', conf: 0.72 },
        { id: 'bbox-rec-total', x: 340, y: 412, w: 280, h: 30, text: 'TOTAL: $182.76', category: 'financial', conf: 0.94 },
        { id: 'bbox-rec-card', x: 180, y: 460, w: 360, h: 22, text: 'VISA **** 4912 - Approved', category: 'financial', conf: 0.96 }
      ]
    },
    {
      id: 'doc-form-03',
      title: 'IRS-Form-W2-Wage-Statement.pdf',
      category: 'form',
      categoryLabel: 'Tax Form (IRS W-2 Wage & Tax)',
      classificationScore: 99.6,
      confidenceScore: 98.4,
      status: 'ready',
      tokensCount: 78,
      processingTime: '490ms',
      fields: {
        metadata: [
          { key: 'tax_year', label: 'Tax Year', value: '2025/2026', confidence: 99.8, bboxId: 'bbox-w2-year', required: true, type: 'string' },
          { key: 'ssn', label: 'Employee SSN (Masked)', value: '***-**-8419', confidence: 98.2, bboxId: 'bbox-w2-ssn', required: true, type: 'string' },
          { key: 'ein', label: 'Employer EIN', value: '12-9842109', confidence: 99.1, bboxId: 'bbox-w2-ein', required: true, type: 'string' },
          { key: 'control_number', label: 'Control Number', value: 'D-94810-W2', confidence: 94.6, bboxId: 'bbox-w2-ctrl', required: false, type: 'string' }
        ],
        parties: [
          { key: 'employer_name', label: 'Employer Name', value: 'Horizon Robotics & Cloud Corp.', confidence: 99.4, bboxId: 'bbox-w2-employer', required: true, type: 'string' },
          { key: 'employee_name', label: 'Employee Full Name', value: 'Elena Vance-Morgan', confidence: 98.9, bboxId: 'bbox-w2-employee', required: true, type: 'string' },
          { key: 'employee_address', label: 'Employee Residence', value: '3814 Evergreen Terrace, Seattle, WA 98101', confidence: 96.5, bboxId: 'bbox-w2-empaddr', required: false, type: 'string' }
        ],
        financials: [
          { key: 'box_1_wages', label: 'Box 1: Wages, Tips, Compensation', value: '148,250.00', confidence: 99.2, bboxId: 'bbox-w2-box1', required: true, type: 'currency' },
          { key: 'box_2_fed_tax', label: 'Box 2: Federal Income Tax Withheld', value: '29,650.00', confidence: 98.7, bboxId: 'bbox-w2-box2', required: true, type: 'currency' },
          { key: 'box_3_ss_wages', label: 'Box 3: Social Security Wages', value: '148,250.00', confidence: 98.6, bboxId: 'bbox-w2-box3', required: true, type: 'currency' },
          { key: 'box_4_ss_tax', label: 'Box 4: Social Security Tax Withheld', value: '9,191.50', confidence: 98.4, bboxId: 'bbox-w2-box4', required: true, type: 'currency' }
        ]
      },
      lineItems: [
        { item: 'Federal Income Tax (20%)', qty: '1', unitPrice: '29,650.00', total: '29,650.00', bboxId: 'bbox-w2-box2' },
        { item: 'Social Security Withheld (6.2%)', qty: '1', unitPrice: '9,191.50', total: '9,191.50', bboxId: 'bbox-w2-box4' },
        { item: 'Medicare Tax Withheld (1.45%)', qty: '1', unitPrice: '2,149.62', total: '2,149.62', bboxId: 'bbox-w2-box6' }
      ],
      bboxes: [
        { id: 'bbox-w2-title', x: 50, y: 45, w: 220, h: 30, text: 'Form W-2 Wage & Tax Statement', category: 'header', conf: 0.99 },
        { id: 'bbox-w2-year', x: 580, y: 45, w: 90, h: 30, text: '2026', category: 'header', conf: 0.99 },
        { id: 'bbox-w2-ssn', x: 50, y: 95, w: 290, h: 34, text: 'a Employee SSN: ***-**-8419', category: 'entity', conf: 0.98 },
        { id: 'bbox-w2-ein', x: 50, y: 140, w: 290, h: 34, text: 'b Employer EIN: 12-9842109', category: 'entity', conf: 0.99 },
        { id: 'bbox-w2-employer', x: 50, y: 185, w: 290, h: 50, text: 'c Horizon Robotics & Cloud Corp.', category: 'entity', conf: 0.99 },
        { id: 'bbox-w2-ctrl', x: 50, y: 245, w: 290, h: 30, text: 'd Control #: D-94810-W2', category: 'header', conf: 0.94 },
        { id: 'bbox-w2-employee', x: 50, y: 290, w: 290, h: 34, text: 'e Employee Name: Elena Vance-Morgan', category: 'entity', conf: 0.98 },
        { id: 'bbox-w2-empaddr', x: 50, y: 330, w: 290, h: 40, text: '3814 Evergreen Terrace, Seattle, WA', category: 'entity', conf: 0.96 },
        { id: 'bbox-w2-box1', x: 370, y: 95, w: 300, h: 34, text: '1 Wages, tips: $148,250.00', category: 'financial', conf: 0.99 },
        { id: 'bbox-w2-box2', x: 370, y: 140, w: 300, h: 34, text: '2 Federal Tax: $29,650.00', category: 'financial', conf: 0.98 },
        { id: 'bbox-w2-box3', x: 370, y: 185, w: 300, h: 34, text: '3 SS Wages: $148,250.00', category: 'financial', conf: 0.98 },
        { id: 'bbox-w2-box4', x: 370, y: 230, w: 300, h: 34, text: '4 SS Tax: $9,191.50', category: 'financial', conf: 0.98 },
        { id: 'bbox-w2-box6', x: 370, y: 275, w: 300, h: 34, text: '6 Medicare Tax: $2,149.62', category: 'financial', conf: 0.98 }
      ]
    },
    {
      id: 'doc-cert-04',
      title: 'ISO-9001-Quality-Compliance-Cert.pdf',
      category: 'certificate',
      categoryLabel: 'Certificate (ISO Compliance)',
      classificationScore: 99.1,
      confidenceScore: 98.9,
      status: 'ready',
      tokensCount: 64,
      processingTime: '380ms',
      fields: {
        metadata: [
          { key: 'cert_number', label: 'Certificate Identifier', value: 'CERT-ISO-9001-2026-884', confidence: 99.7, bboxId: 'bbox-cert-num', required: true, type: 'string' },
          { key: 'standard_version', label: 'Audited Standard', value: 'ISO 9001:2015 Quality Management Systems', confidence: 99.5, bboxId: 'bbox-cert-std', required: true, type: 'string' },
          { key: 'effective_date', label: 'Issuance Date', value: '2026-03-01', confidence: 98.4, bboxId: 'bbox-cert-date', required: true, type: 'date' },
          { key: 'expiry_date', label: 'Expiration / Renewal Date', value: '2029-02-28', confidence: 98.2, bboxId: 'bbox-cert-exp', required: true, type: 'date' }
        ],
        parties: [
          { key: 'certified_organization', label: 'Certified Organization', value: 'Vanguard Aerospace & Defense Systems Inc.', confidence: 99.3, bboxId: 'bbox-cert-org', required: true, type: 'string' },
          { key: 'facility_address', label: 'Certified Facility', value: '1800 Orbital Way, Huntsville, AL 35805', confidence: 96.8, bboxId: 'bbox-cert-loc', required: false, type: 'string' },
          { key: 'registrar_body', label: 'Accredited Registrar', value: 'Bureau Global Veritas Accreditation Council', confidence: 99.1, bboxId: 'bbox-cert-body', required: true, type: 'string' }
        ],
        financials: [
          { key: 'audit_cycle_fee', label: 'Surveillance Audit Cycle', value: 'Annual (36 months)', confidence: 97.5, bboxId: 'bbox-cert-cycle', required: false, type: 'string' },
          { key: 'scope_code', label: 'IAF Accreditation Code', value: 'IAF-19 / ISO-QMS-Aero', confidence: 96.4, bboxId: 'bbox-cert-iaf', required: false, type: 'string' }
        ]
      },
      lineItems: [
        { item: 'Design & Manufacture of Composite Avionics', qty: 'Scope 1', unitPrice: 'Verified', total: 'Compliant', bboxId: 'bbox-cert-scope' },
        { item: 'Supply Chain Traceability & Risk Mitigation Protocol', qty: 'Scope 2', unitPrice: 'Audited', total: 'Compliant', bboxId: 'bbox-cert-scope' }
      ],
      bboxes: [
        { id: 'bbox-cert-body', x: 180, y: 60, w: 360, h: 30, text: 'Bureau Global Veritas Accreditation Council', category: 'entity', conf: 0.99 },
        { id: 'bbox-cert-title', x: 150, y: 120, w: 420, h: 40, text: 'CERTIFICATE OF REGISTRATION', category: 'header', conf: 0.99 },
        { id: 'bbox-cert-org', x: 120, y: 190, w: 480, h: 36, text: 'Vanguard Aerospace & Defense Systems Inc.', category: 'entity', conf: 0.99 },
        { id: 'bbox-cert-loc', x: 160, y: 235, w: 400, h: 24, text: '1800 Orbital Way, Huntsville, AL 35805', category: 'entity', conf: 0.96 },
        { id: 'bbox-cert-std', x: 140, y: 290, w: 440, h: 32, text: 'ISO 9001:2015 Quality Management Systems', category: 'header', conf: 0.99 },
        { id: 'bbox-cert-scope', x: 80, y: 340, w: 560, h: 50, text: 'Scope: Design & Manufacture of Composite Avionics & Systems', category: 'table', conf: 0.98 },
        { id: 'bbox-cert-num', x: 80, y: 420, w: 260, h: 24, text: 'Cert #: CERT-ISO-9001-2026-884', category: 'header', conf: 0.99 },
        { id: 'bbox-cert-date', x: 80, y: 450, w: 220, h: 24, text: 'Issue Date: 2026-03-01', category: 'header', conf: 0.98 },
        { id: 'bbox-cert-exp', x: 80, y: 480, w: 220, h: 24, text: 'Valid Until: 2029-02-28', category: 'header', conf: 0.98 },
        { id: 'bbox-cert-iaf', x: 440, y: 420, w: 200, h: 24, text: 'Accreditation Code: IAF-19', category: 'header', conf: 0.96 },
        { id: 'bbox-cert-cycle', x: 440, y: 450, w: 200, h: 24, text: 'Surveillance: Annual', category: 'header', conf: 0.97 },
        { id: 'bbox-cert-seal', x: 310, y: 780, w: 100, h: 100, text: 'OFFICIAL GOLD SEAL ACCREDITATION', category: 'entity', conf: 0.98 }
      ]
    },
    {
      id: 'doc-medical-05',
      title: 'BioHealth-Diagnostic-Lab-Report.pdf',
      category: 'form',
      categoryLabel: 'Medical Form (Clinical Diagnostics)',
      classificationScore: 98.8,
      confidenceScore: 97.2,
      status: 'ready',
      tokensCount: 86,
      processingTime: '450ms',
      fields: {
        metadata: [
          { key: 'specimen_id', label: 'Accession / Specimen #', value: 'LAB-2026-88319', confidence: 99.4, bboxId: 'bbox-med-acc', required: true, type: 'string' },
          { key: 'collection_date', label: 'Sample Collected', value: '2026-09-24 08:15', confidence: 98.6, bboxId: 'bbox-med-date', required: true, type: 'date' },
          { key: 'report_date', label: 'Verified Final Report', value: '2026-09-25 14:30', confidence: 98.1, bboxId: 'bbox-med-repdate', required: true, type: 'date' },
          { key: 'ordering_physician', label: 'Ordering Physician', value: 'Dr. Sarah Lin, MD (NPI: 184920412)', confidence: 97.4, bboxId: 'bbox-med-doc', required: true, type: 'string' }
        ],
        parties: [
          { key: 'patient_name', label: 'Patient Name', value: 'Alexander Ross', confidence: 99.1, bboxId: 'bbox-med-patient', required: true, type: 'string' },
          { key: 'patient_dob', label: 'Date of Birth / Age', value: '1984-11-12 (41Y / Male)', confidence: 98.5, bboxId: 'bbox-med-dob', required: true, type: 'string' },
          { key: 'lab_facility', label: 'Diagnostic Laboratory', value: 'BioHealth Reference Diagnostics', confidence: 99.0, bboxId: 'bbox-med-lab', required: true, type: 'string' }
        ],
        financials: [
          { key: 'fasting_status', label: 'Fasting Status', value: 'Yes (12 hours)', confidence: 95.8, bboxId: 'bbox-med-fasting', required: false, type: 'string' },
          { key: 'overall_flag', label: 'Clinical Diagnostic Flag', value: 'NORMAL (Within Reference Range)', confidence: 98.2, bboxId: 'bbox-med-flag', required: true, type: 'string' }
        ]
      },
      lineItems: [
        { item: 'Fasting Blood Glucose (Serum)', qty: '92 mg/dL', unitPrice: 'Ref: 70 - 99', total: 'NORMAL', bboxId: 'bbox-med-test1' },
        { item: 'Total Serum Cholesterol', qty: '178 mg/dL', unitPrice: 'Ref: < 200', total: 'OPTIMAL', bboxId: 'bbox-med-test2' },
        { item: 'High-Density Lipoprotein (HDL)', qty: '58 mg/dL', unitPrice: 'Ref: > 40', total: 'HEALTHY', bboxId: 'bbox-med-test3' },
        { item: 'Serum Hemoglobin A1c (HbA1c)', qty: '5.2 %', unitPrice: 'Ref: 4.0 - 5.6', total: 'NORMAL', bboxId: 'bbox-med-test4' }
      ],
      bboxes: [
        { id: 'bbox-med-lab', x: 50, y: 45, w: 320, h: 28, text: 'BioHealth Reference Diagnostics', category: 'entity', conf: 0.99 },
        { id: 'bbox-med-title', x: 420, y: 45, w: 250, h: 30, text: 'COMPREHENSIVE LAB PANEL', category: 'header', conf: 0.99 },
        { id: 'bbox-med-patient', x: 50, y: 95, w: 260, h: 22, text: 'Patient: Alexander Ross', category: 'entity', conf: 0.99 },
        { id: 'bbox-med-dob', x: 50, y: 120, w: 260, h: 20, text: 'DOB: 11/12/1984 | Male (41Y)', category: 'entity', conf: 0.98 },
        { id: 'bbox-med-acc', x: 420, y: 95, w: 250, h: 22, text: 'Accession: LAB-2026-88319', category: 'header', conf: 0.99 },
        { id: 'bbox-med-doc', x: 420, y: 120, w: 250, h: 20, text: 'Dr. Sarah Lin, MD (NPI: 184920412)', category: 'entity', conf: 0.97 },
        { id: 'bbox-med-date', x: 420, y: 145, w: 250, h: 20, text: 'Collected: 09/24/2026 08:15', category: 'header', conf: 0.98 },
        { id: 'bbox-med-test1', x: 50, y: 220, w: 620, h: 28, text: 'Fasting Blood Glucose: 92 mg/dL (Ref: 70-99) - NORMAL', category: 'table', conf: 0.98 },
        { id: 'bbox-med-test2', x: 50, y: 255, w: 620, h: 28, text: 'Total Serum Cholesterol: 178 mg/dL (Ref: < 200) - OPTIMAL', category: 'table', conf: 0.98 },
        { id: 'bbox-med-test3', x: 50, y: 290, w: 620, h: 28, text: 'HDL Cholesterol: 58 mg/dL (Ref: > 40) - HEALTHY', category: 'table', conf: 0.97 },
        { id: 'bbox-med-test4', x: 50, y: 325, w: 620, h: 28, text: 'HbA1c Glycated: 5.2% (Ref: 4.0-5.6) - NORMAL', category: 'table', conf: 0.98 }
      ]
    },
    {
      id: 'doc-nda-06',
      title: 'Mutual-Corporate-NDA-Agreement.pdf',
      category: 'certificate',
      categoryLabel: 'Legal Contract (Mutual NDA)',
      classificationScore: 97.9,
      confidenceScore: 96.5,
      status: 'ready',
      tokensCount: 72,
      processingTime: '510ms',
      fields: {
        metadata: [
          { key: 'agreement_id', label: 'Contract Reference #', value: 'NDA-CORP-2026-09', confidence: 98.9, bboxId: 'bbox-nda-ref', required: true, type: 'string' },
          { key: 'effective_date', label: 'Effective Date', value: '2026-10-01', confidence: 99.1, bboxId: 'bbox-nda-date', required: true, type: 'date' },
          { key: 'governing_law', label: 'Jurisdiction & Governing Law', value: 'State of Delaware, United States', confidence: 97.4, bboxId: 'bbox-nda-law', required: true, type: 'string' },
          { key: 'confidentiality_term', label: 'Duration / Term', value: 'Three (3) Years from Effective Date', confidence: 96.2, bboxId: 'bbox-nda-term', required: false, type: 'string' }
        ],
        parties: [
          { key: 'disclosing_party', label: 'Party A (Discloser)', value: 'Nexus Cybernetics Corporation', confidence: 99.2, bboxId: 'bbox-nda-partyA', required: true, type: 'string' },
          { key: 'receiving_party', label: 'Party B (Recipient)', value: 'Quantum AI Systems Inc.', confidence: 98.8, bboxId: 'bbox-nda-partyB', required: true, type: 'string' }
        ],
        financials: [
          { key: 'remedy_clause', label: 'Remedy / Injunction Clause', value: 'Injunctive Relief & Liquidated Damages', confidence: 95.1, bboxId: 'bbox-nda-remedy', required: false, type: 'string' }
        ]
      },
      lineItems: [
        { item: 'Proprietary AI Weight Model Weights & Architecture', qty: 'Clause 1.1', unitPrice: 'Protected', total: 'Confidential', bboxId: 'bbox-nda-c1' },
        { item: 'Non-Circumvention of Joint Venture Enterprise Partners', qty: 'Clause 2.3', unitPrice: 'Enforceable', total: 'Binding', bboxId: 'bbox-nda-c2' }
      ],
      bboxes: [
        { id: 'bbox-nda-title', x: 140, y: 60, w: 440, h: 36, text: 'MUTUAL NON-DISCLOSURE AGREEMENT', category: 'header', conf: 0.99 },
        { id: 'bbox-nda-date', x: 220, y: 105, w: 280, h: 22, text: 'Effective as of: October 1, 2026', category: 'header', conf: 0.99 },
        { id: 'bbox-nda-partyA', x: 50, y: 155, w: 620, h: 26, text: 'Party A: Nexus Cybernetics Corporation (Delaware)', category: 'entity', conf: 0.99 },
        { id: 'bbox-nda-partyB', x: 50, y: 185, w: 620, h: 26, text: 'Party B: Quantum AI Systems Inc. (California)', category: 'entity', conf: 0.98 },
        { id: 'bbox-nda-term', x: 50, y: 240, w: 620, h: 28, text: 'Term: Three (3) Years from Effective Execution Date', category: 'header', conf: 0.96 },
        { id: 'bbox-nda-law', x: 50, y: 280, w: 620, h: 28, text: 'Governing Law: The laws of the State of Delaware', category: 'header', conf: 0.97 },
        { id: 'bbox-nda-signA', x: 60, y: 840, w: 260, h: 50, text: 'Signed Party A: V. Sterling, CEO', category: 'entity', conf: 0.95 },
        { id: 'bbox-nda-signB', x: 400, y: 840, w: 260, h: 50, text: 'Signed Party B: R. Mercer, CTO', category: 'entity', conf: 0.95 }
      ]
    }
  ];

  // Batch Queue Items
  const BATCH_JOBS = [
    { name: 'Acme-Corp-Invoice-9482.pdf', type: 'Invoice', conf: '99.2%', entities: 12, status: 'Verified', quality: '98.5%', latency: '418ms' },
    { name: 'Artisan-Bistro-Receipt-82914.jpg', type: 'Receipt', conf: '98.7%', entities: 10, status: 'Needs Review', quality: '84.1%', latency: '310ms' },
    { name: 'IRS-Form-W2-Wage-Statement.pdf', type: 'Form (Tax)', conf: '99.6%', entities: 11, status: 'Verified', quality: '98.4%', latency: '490ms' },
    { name: 'ISO-9001-Quality-Compliance-Cert.pdf', type: 'Certificate', conf: '99.1%', entities: 9, status: 'Verified', quality: '98.9%', latency: '380ms' },
    { name: 'BioHealth-Diagnostic-Lab-Report.pdf', type: 'Medical Form', conf: '98.8%', entities: 9, status: 'Verified', quality: '97.2%', latency: '450ms' },
    { name: 'Mutual-Corporate-NDA-Agreement.pdf', type: 'Contract', conf: '97.9%', entities: 7, status: 'Verified', quality: '96.5%', latency: '510ms' },
    { name: 'Enterprise-Utility-Electric-Bill.pdf', type: 'Utility Invoice', conf: '98.3%', entities: 13, status: 'Verified', quality: '97.6%', latency: '430ms' },
    { name: 'Cross-Border-Customs-Declaration.pdf', type: 'Form (Customs)', conf: '96.8%', entities: 14, status: 'Verified', quality: '95.8%', latency: '540ms' }
  ];

  // Schema Definitions
  const SCHEMAS = [
    {
      id: 'schema-invoice',
      name: 'Commercial Invoice Schema',
      modelId: 'cls_finance_invoice_v3',
      description: 'Optimized for B2B commercial invoices, tax receipts, PO cross-referencing, and VAT itemization.',
      threshold: 88,
      arithmeticCheck: true,
      fields: [
        { key: 'invoice_number', name: 'Invoice Number', type: 'String', required: true, pattern: '^[A-Z]{2,4}-\\d{4}-\\d+$', minConf: 90 },
        { key: 'invoice_date', name: 'Invoice Date', type: 'Date', required: true, pattern: 'YYYY-MM-DD', minConf: 88 },
        { key: 'due_date', name: 'Due Date', type: 'Date', required: true, pattern: 'YYYY-MM-DD', minConf: 85 },
        { key: 'vendor_name', name: 'Vendor Name', type: 'Entity', required: true, pattern: 'Text/Company', minConf: 90 },
        { key: 'vendor_tax_id', name: 'Vendor Tax / VAT ID', type: 'String', required: true, pattern: '[A-Z0-9-]{8,15}', minConf: 88 },
        { key: 'subtotal', name: 'Subtotal Amount', type: 'Currency', required: true, pattern: '^\\d+\\.\\d{2}$', minConf: 92 },
        { key: 'tax_amount', name: 'Tax / VAT Amount', type: 'Currency', required: true, pattern: '^\\d+\\.\\d{2}$', minConf: 88 },
        { key: 'total_amount', name: 'Grand Total Amount', type: 'Currency', required: true, pattern: '^\\d+\\.\\d{2}$', minConf: 95 }
      ]
    },
    {
      id: 'schema-receipt',
      name: 'Receipt & Expense Schema',
      modelId: 'cls_retail_receipt_v2',
      description: 'Tailored for restaurant dining, retail purchases, fuel slips, and corporate travel reimbursements.',
      threshold: 82,
      arithmeticCheck: true,
      fields: [
        { key: 'merchant_name', name: 'Merchant Name', type: 'Entity', required: true, pattern: 'Text', minConf: 85 },
        { key: 'transaction_date', name: 'Date & Time', type: 'Date', required: true, pattern: 'ISO / Timestamp', minConf: 85 },
        { key: 'subtotal', name: 'Subtotal', type: 'Currency', required: true, pattern: 'Currency', minConf: 85 },
        { key: 'tip_amount', name: 'Tip / Gratuity', type: 'Currency', required: false, pattern: 'Currency', minConf: 75 },
        { key: 'total_amount', name: 'Total Charged', type: 'Currency', required: true, pattern: 'Currency', minConf: 90 }
      ]
    },
    {
      id: 'schema-tax-form',
      name: 'Government Form & Tax Schema',
      modelId: 'cls_gov_w2_form_v4',
      description: 'Structured form parsing for IRS W-2, W-9, 1099, and customs clearance declarations.',
      threshold: 92,
      arithmeticCheck: false,
      fields: [
        { key: 'ssn', name: 'Social Security Number', type: 'String', required: true, pattern: '^\\d{3}-\\d{2}-\\d{4}$', minConf: 95 },
        { key: 'ein', name: 'Employer Identification Number', type: 'String', required: true, pattern: '^\\d{2}-\\d{7}$', minConf: 95 },
        { key: 'box_1_wages', name: 'Box 1 Wages', type: 'Currency', required: true, pattern: 'Currency', minConf: 92 }
      ]
    }
  ];

  // =========================================================================
  // APPLICATION STATE
  // =========================================================================

  const state = {
    currentDocIndex: 0,
    activeTab: 'workspace',
    activeSubtab: 'fields',
    filterCategory: 'all',
    
    // Canvas viewport state
    zoom: 1.0,
    panX: 0,
    panY: 0,
    rotation: 0,
    isPanning: false,
    startPanX: 0,
    startPanY: 0,
    
    // Overlays
    showBoxes: true,
    showOcrText: true,
    showHeatmap: false,
    isDrawingBox: false,
    drawStart: null,

    // Active learning tracking
    correctionsCount: 0,
    activeSchemaIndex: 0
  };

  // =========================================================================
  // DOM ELEMENT REFERENCES
  // =========================================================================

  const elements = {
    // Navigation
    navTabs: document.querySelectorAll('.nav-tab'),
    tabPanes: document.querySelectorAll('.tab-pane'),
    btnThemeToggle: document.getElementById('btn-theme-toggle'),
    btnQuickUpload: document.getElementById('btn-quick-upload'),
    fileInputHidden: document.getElementById('file-input-hidden'),
    batchCountBadge: document.getElementById('batch-count-badge'),

    // Workspace Left
    docFilterPills: document.getElementById('doc-filter-pills'),
    docListContainer: document.getElementById('doc-list-container'),
    docQueueCount: document.getElementById('doc-queue-count'),
    uploadDropzone: document.getElementById('upload-dropzone'),

    // Viewport & Canvas
    currentDocTitle: document.getElementById('current-doc-title'),
    currentDocClass: document.getElementById('current-doc-class'),
    btnToggleBoxes: document.getElementById('btn-toggle-boxes'),
    btnToggleOcrText: document.getElementById('btn-toggle-ocr-text'),
    btnToggleHeatmap: document.getElementById('btn-toggle-heatmap'),
    btnToggleDrawBox: document.getElementById('btn-toggle-draw-box'),
    btnZoomIn: document.getElementById('btn-zoom-in'),
    btnZoomOut: document.getElementById('btn-zoom-out'),
    btnZoomFit: document.getElementById('btn-zoom-fit'),
    btnRotate: document.getElementById('btn-rotate'),
    zoomLevelText: document.getElementById('zoom-level-text'),
    canvasScrollContainer: document.getElementById('canvas-scroll-container'),
    canvasStage: document.getElementById('canvas-stage'),
    documentPageSheet: document.getElementById('document-page-sheet'),
    boundingBoxOverlay: document.getElementById('bounding-box-overlay'),
    drawSelectionBox: document.getElementById('draw-selection-box'),
    canvasOcrTokens: document.getElementById('canvas-ocr-tokens'),
    canvasProcessingTime: document.getElementById('canvas-processing-time'),

    // Extraction Inspector Right
    docOverallScore: document.getElementById('doc-overall-score'),
    hitlBanner: document.getElementById('hitl-banner'),
    docStatusPill: document.getElementById('doc-status-pill'),
    docStatusSubtext: document.getElementById('doc-status-subtext'),
    btnApproveDoc: document.getElementById('btn-approve-doc'),
    btnReExtract: document.getElementById('btn-re-extract'),
    subtabBtns: document.querySelectorAll('.subtab-btn'),
    subtabContents: document.querySelectorAll('.subtab-content'),
    fieldGroupsContainer: document.getElementById('field-groups-container'),
    tableExtractionContainer: document.getElementById('table-extraction-container'),
    jsonCodeBlock: document.getElementById('json-code-block'),
    btnCopyJson: document.getElementById('btn-copy-json'),
    btnExportCsv: document.getElementById('btn-export-csv'),
    btnExportJson: document.getElementById('btn-export-json'),
    btnSendWebhook: document.getElementById('btn-send-webhook'),
    countFields: document.getElementById('count-fields'),
    countTables: document.getElementById('count-tables'),

    // Batch Tab
    batchJobsTbody: document.getElementById('batch-jobs-tbody'),
    batchMetricTotal: document.getElementById('batch-metric-total'),
    batchMetricFlagged: document.getElementById('batch-metric-flagged'),
    btnStartBatchRun: document.getElementById('btn-start-batch-run'),
    btnAddBatchSample: document.getElementById('btn-add-batch-sample'),
    batchSearchInput: document.getElementById('batch-search-input'),

    // Schema Studio Tab
    schemaCardsList: document.getElementById('schema-cards-list'),
    schemaFieldsTbody: document.getElementById('schema-fields-tbody'),
    editorSchemaName: document.getElementById('editor-schema-name'),
    editorSchemaType: document.getElementById('editor-schema-type'),
    thresholdSlider: document.getElementById('threshold-slider'),
    thresholdVal: document.getElementById('threshold-val'),
    btnAddSchemaField: document.getElementById('btn-add-schema-field'),
    btnSaveSchema: document.getElementById('btn-save-schema'),

    // Analytics Charts
    chartVolumeContainer: document.getElementById('chart-volume-container'),
    chartDistributionContainer: document.getElementById('chart-distribution-container'),
    chartConfidenceContainer: document.getElementById('chart-confidence-container'),
    chartActiveLearningContainer: document.getElementById('chart-activelearning-container'),

    // Modals & Toast
    toastContainer: document.getElementById('toast-container'),
    webhookModal: document.getElementById('webhook-modal'),
    btnCloseWebhookModal: document.getElementById('btn-close-webhook-modal'),
    btnCancelWebhook: document.getElementById('btn-cancel-webhook'),
    btnSimulatePost: document.getElementById('btn-simulate-post'),
    webhookPayloadCode: document.getElementById('webhook-payload-code'),
    tagBoxModal: document.getElementById('tag-box-modal'),
    btnCloseTagModal: document.getElementById('btn-close-tag-modal'),
    btnCancelTag: document.getElementById('btn-cancel-tag'),
    btnSaveTagField: document.getElementById('btn-save-tag-field'),
    tagBoxText: document.getElementById('tag-box-text'),
    tagBoxCoords: document.getElementById('tag-box-coords'),
    tagBoxFieldSelect: document.getElementById('tag-box-field-select')
  };

  // =========================================================================
  // INITIALIZATION
  // =========================================================================

  function init() {
    setupEventListeners();
    renderDocQueue();
    loadDocument(state.currentDocIndex);
    renderBatchTable();
    renderSchemaCards();
    loadSchema(0);
    renderAnalyticsCharts();
  }

  // =========================================================================
  // EVENT LISTENERS
  // =========================================================================

  function setupEventListeners() {
    // Navigation Tabs
    elements.navTabs.forEach(tab => {
      tab.addEventListener('click', () => {
        const targetTab = tab.getAttribute('data-tab');
        switchTab(targetTab);
      });
    });

    // Theme Toggle
    elements.btnThemeToggle.addEventListener('click', toggleTheme);

    // Filter pills
    elements.docFilterPills.addEventListener('click', (e) => {
      const btn = e.target.closest('.filter-pill');
      if (!btn) return;
      document.querySelectorAll('.filter-pill').forEach(p => p.classList.remove('active'));
      btn.classList.add('active');
      state.filterCategory = btn.getAttribute('data-filter');
      renderDocQueue();
    });

    // File Upload via Dropzone
    elements.uploadDropzone.addEventListener('click', () => elements.fileInputHidden.click());
    elements.btnQuickUpload.addEventListener('click', () => elements.fileInputHidden.click());
    elements.fileInputHidden.addEventListener('change', handleFileSelect);

    // Drag and Drop Events
    elements.uploadDropzone.addEventListener('dragover', (e) => {
      e.preventDefault();
      elements.uploadDropzone.classList.add('drag-over');
    });
    elements.uploadDropzone.addEventListener('dragleave', () => {
      elements.uploadDropzone.classList.remove('drag-over');
    });
    elements.uploadDropzone.addEventListener('drop', (e) => {
      e.preventDefault();
      elements.uploadDropzone.classList.remove('drag-over');
      if (e.dataTransfer.files.length > 0) {
        processUploadedFile(e.dataTransfer.files[0]);
      }
    });

    // Viewport & Zoom Controls
    elements.btnZoomIn.addEventListener('click', () => updateZoom(state.zoom + 0.15));
    elements.btnZoomOut.addEventListener('click', () => updateZoom(state.zoom - 0.15));
    elements.btnZoomFit.addEventListener('click', fitToScreen);
    elements.btnRotate.addEventListener('click', rotateDocument);

    // Canvas Mouse Pan & Dragging
    elements.canvasScrollContainer.addEventListener('mousedown', handleCanvasMouseDown);
    window.addEventListener('mousemove', handleCanvasMouseMove);
    window.addEventListener('mouseup', handleCanvasMouseUp);
    elements.canvasScrollContainer.addEventListener('wheel', handleCanvasWheel, { passive: false });

    // Overlay Toggles
    elements.btnToggleBoxes.addEventListener('click', () => {
      state.showBoxes = !state.showBoxes;
      elements.btnToggleBoxes.classList.toggle('active', state.showBoxes);
      elements.boundingBoxOverlay.style.display = state.showBoxes ? 'block' : 'none';
      showToast(`Bounding Boxes ${state.showBoxes ? 'Enabled' : 'Hidden'}`, 'info');
    });

    elements.btnToggleOcrText.addEventListener('click', () => {
      state.showOcrText = !state.showOcrText;
      elements.btnToggleOcrText.classList.toggle('active', state.showOcrText);
      elements.boundingBoxOverlay.querySelectorAll('.bbox-tag-text, .bbox-tag-bg').forEach(el => {
        el.style.display = state.showOcrText ? 'block' : 'none';
      });
      showToast(`OCR Text Layer ${state.showOcrText ? 'Visible' : 'Hidden'}`, 'info');
    });

    elements.btnToggleHeatmap.addEventListener('click', () => {
      state.showHeatmap = !state.showHeatmap;
      elements.btnToggleHeatmap.classList.toggle('active', state.showHeatmap);
      renderBoundingBoxes();
      showToast(`Confidence Heatmap ${state.showHeatmap ? 'Activated' : 'Disabled'}`, 'info');
    });

    elements.btnToggleDrawBox.addEventListener('click', () => {
      state.isDrawingBox = !state.isDrawingBox;
      elements.btnToggleDrawBox.classList.toggle('active', state.isDrawingBox);
      elements.canvasScrollContainer.classList.toggle('is-drawing', state.isDrawingBox);
      if (state.isDrawingBox) {
        showToast('Tagging Mode: Click and drag on document to capture custom field', 'info');
      }
    });

    // Extraction Inspector Subtabs
    elements.subtabBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        const target = btn.getAttribute('data-subtab');
        elements.subtabBtns.forEach(b => b.classList.remove('active'));
        elements.subtabContents.forEach(c => c.classList.remove('active'));
        btn.classList.add('active');
        document.getElementById(`subtab-content-${target}`).classList.add('active');
        state.activeSubtab = target;
      });
    });

    // Inspector Actions
    elements.btnApproveDoc.addEventListener('click', approveCurrentDocument);
    elements.btnReExtract.addEventListener('click', reExtractCurrentDocument);
    elements.btnCopyJson.addEventListener('click', copyJsonToClipboard);
    elements.btnExportJson.addEventListener('click', downloadJsonExport);
    elements.btnExportCsv.addEventListener('click', downloadCsvExport);
    elements.btnSendWebhook.addEventListener('click', openWebhookModal);

    // Batch Processing Tab Actions
    elements.btnStartBatchRun.addEventListener('click', executeBatchPipeline);
    elements.btnAddBatchSample.addEventListener('click', addBatchSamples);
    elements.batchSearchInput.addEventListener('input', (e) => filterBatchTable(e.target.value));

    // Schema Studio Actions
    elements.thresholdSlider.addEventListener('input', (e) => {
      elements.thresholdVal.textContent = `${e.target.value}%`;
      SCHEMAS[state.activeSchemaIndex].threshold = parseInt(e.target.value, 10);
    });
    elements.btnAddSchemaField.addEventListener('click', addSchemaFieldRow);
    elements.btnSaveSchema.addEventListener('click', () => {
      showToast('Schema rules & regex deployed to OmniExtract-v4.2 engine', 'success');
    });

    // Modals
    elements.btnCloseWebhookModal.addEventListener('click', () => elements.webhookModal.style.display = 'none');
    elements.btnCancelWebhook.addEventListener('click', () => elements.webhookModal.style.display = 'none');
    elements.btnSimulatePost.addEventListener('click', simulateWebhookDispatch);

    elements.btnCloseTagModal.addEventListener('click', () => elements.tagBoxModal.style.display = 'none');
    elements.btnCancelTag.addEventListener('click', () => elements.tagBoxModal.style.display = 'none');
    elements.btnSaveTagField.addEventListener('click', saveCustomTagField);

    // Global Keyboard Shortcuts
    window.addEventListener('keydown', handleKeyboardShortcuts);
  }

  // =========================================================================
  // TAB SWITCHING & THEME
  // =========================================================================

  function switchTab(tabId) {
    state.activeTab = tabId;
    elements.navTabs.forEach(t => t.classList.toggle('active', t.getAttribute('data-tab') === tabId));
    elements.tabPanes.forEach(p => p.classList.toggle('active', p.id === `pane-${tabId}`));

    if (tabId === 'analytics') {
      renderAnalyticsCharts();
    }
  }

  function toggleTheme() {
    const isDark = document.body.classList.contains('theme-dark');
    if (isDark) {
      document.body.classList.remove('theme-dark');
      document.body.classList.add('theme-light');
      showToast('Switched to Light Theme', 'info');
    } else {
      document.body.classList.remove('theme-light');
      document.body.classList.add('theme-dark');
      showToast('Switched to Dark Theme', 'info');
    }
  }

  // =========================================================================
  // DOCUMENT QUEUE & RENDERING
  // =========================================================================

  function renderDocQueue() {
    elements.docListContainer.innerHTML = '';
    const filtered = DOCUMENTS.filter(d => {
      if (state.filterCategory === 'all') return true;
      return d.category === state.filterCategory;
    });

    elements.docQueueCount.textContent = `${filtered.length} items`;

    filtered.forEach((doc, idx) => {
      const realIndex = DOCUMENTS.findIndex(d => d.id === doc.id);
      const itemEl = document.createElement('div');
      itemEl.className = `doc-list-item ${realIndex === state.currentDocIndex ? 'active' : ''}`;
      
      const typeIcons = {
        invoice: '🧾',
        receipt: '💳',
        form: '📋',
        certificate: '📜'
      };

      const confClass = doc.confidenceScore >= 95 ? 'high' : doc.confidenceScore >= 85 ? 'med' : 'low';

      itemEl.innerHTML = `
        <div class="doc-thumb-icon">${typeIcons[doc.category] || '📄'}</div>
        <div class="doc-item-details">
          <div class="doc-item-name" title="${doc.title}">${doc.title}</div>
          <div class="doc-item-meta">
            <span>${doc.processingTime}</span> • <span>${doc.tokensCount} tokens</span>
          </div>
          <div class="doc-item-badges">
            <span class="class-tag">${doc.categoryLabel.split(' ')[0]}</span>
            <span class="conf-pill ${confClass}">${doc.confidenceScore}%</span>
            ${doc.status === 'verified' ? '<span class="class-tag" style="color:var(--accent-success);">✓ Verified</span>' : ''}
            ${doc.status === 'flagged' ? '<span class="class-tag" style="color:var(--accent-warning);">⚠ Review</span>' : ''}
          </div>
        </div>
      `;

      itemEl.addEventListener('click', () => {
        loadDocument(realIndex);
      });

      elements.docListContainer.appendChild(itemEl);
    });
  }

  function loadDocument(index) {
    if (index < 0 || index >= DOCUMENTS.length) return;
    state.currentDocIndex = index;
    const doc = DOCUMENTS[index];

    // Update Header Meta
    elements.currentDocTitle.textContent = doc.title;
    elements.currentDocClass.innerHTML = `
      <span class="class-icon">${doc.category === 'invoice' ? '🧾' : doc.category === 'receipt' ? '💳' : '📋'}</span>
      <span class="class-name">${doc.categoryLabel}</span>
      <span class="confidence-tag">${doc.classificationScore}% Conf</span>
    `;

    elements.canvasOcrTokens.textContent = `${doc.tokensCount} OCR Tokens`;
    elements.canvasProcessingTime.textContent = `Extracted in ${doc.processingTime}`;

    // Render Document Visual Body
    renderDocumentVisualBody(doc);

    // Render Bounding Boxes
    renderBoundingBoxes();

    // Render Extraction Inspector
    renderExtractionInspector(doc);

    // Update Active in Queue
    renderDocQueue();
  }

  // =========================================================================
  // DOCUMENT SHEET VISUAL CONTENT GENERATOR
  // =========================================================================

  function renderDocumentVisualBody(doc) {
    const sheet = elements.documentPageSheet;

    if (doc.customImage) {
      sheet.innerHTML = `<img src="${doc.customImage}" style="width:100%;height:100%;object-fit:contain;border-radius:4px;" alt="Uploaded document">`;
      return;
    }

    if (doc.id === 'doc-invoice-01') {
      sheet.innerHTML = `
        <div class="doc-mockup-body">
          <div class="mockup-header-row">
            <div class="mockup-logo-area">
              <div class="mockup-logo-badge">AC</div>
              <div>
                <div class="mockup-company-title">Acme Cloud Technologies Inc.</div>
                <div class="mockup-company-sub">450 Innovation Parkway, Suite 800, San Francisco, CA 94105<br>Tax ID: US94-8291048-A • support@acmecloud.corp</div>
              </div>
            </div>
            <div class="mockup-doc-title-box">
              <div class="mockup-doc-type-h1">COMMERCIAL INVOICE</div>
              <div class="mockup-doc-number">Invoice #: <strong>INV-2026-9482</strong></div>
              <div style="font-size:11px;color:#4b5563;margin-top:2px;">Issue Date: <strong>2026-09-18</strong><br>Due Date: <strong>2026-10-18</strong></div>
              <div style="font-size:11px;color:#4b5563;">PO #: <strong>PO-US-884102</strong></div>
            </div>
          </div>

          <div class="mockup-grid-2col">
            <div class="mockup-box-card">
              <div class="mockup-box-title">Billed To (Client Entity)</div>
              <div style="font-weight:700;font-size:13px;color:#111827;">Apex Solutions Global LLC</div>
              <div style="font-size:11px;color:#4b5563;margin-top:2px;">Attn: Financial Accounts Payable<br>1200 Enterprise Boulevard<br>Austin, TX 78701 • USA</div>
            </div>
            <div class="mockup-box-card">
              <div class="mockup-box-title">Payment & Banking Remittance</div>
              <div style="font-size:11px;color:#4b5563;">Bank: Silicon National Premier Bank<br>Routing (ABA): 121000358<br>Account #: 88201948201<br>SWIFT: ACMEUS6S</div>
            </div>
          </div>

          <table class="mockup-line-items-table">
            <thead>
              <tr>
                <th style="width:50%;">Description / Service Item</th>
                <th style="text-align:center;">Qty</th>
                <th style="text-align:right;">Unit Price (USD)</th>
                <th style="text-align:right;">Amount (USD)</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><strong>Enterprise Neural Engine API Subscription</strong><br><span style="font-size:10px;color:#6b7280;">High-throughput multi-modal extraction endpoints (Quarterly)</span></td>
                <td style="text-align:center;">1</td>
                <td style="text-align:right;">$8,500.00</td>
                <td style="text-align:right;font-weight:600;">$8,500.00</td>
              </tr>
              <tr>
                <td><strong>GPU Cloud Cluster Dedicated Instances (Tier-1)</strong><br><span style="font-size:10px;color:#6b7280;">NVIDIA H100 SXM5 80GB dedicated nodes</span></td>
                <td style="text-align:center;">2</td>
                <td style="text-align:right;">$2,000.00</td>
                <td style="text-align:right;font-weight:600;">$4,000.00</td>
              </tr>
              <tr>
                <td><strong>SLA Premium 24/7 Managed Infrastructure</strong><br><span style="font-size:10px;color:#6b7280;">15-minute response guarantee with dedicated solutions architect</span></td>
                <td style="text-align:center;">1</td>
                <td style="text-align:right;">$1,000.00</td>
                <td style="text-align:right;font-weight:600;">$1,000.00</td>
              </tr>
            </tbody>
          </table>

          <div class="mockup-totals-summary">
            <div class="mockup-totals-box">
              <div class="mockup-total-row"><span>Subtotal:</span><span>$13,500.00</span></div>
              <div class="mockup-total-row"><span>Sales Tax / VAT (10.0%):</span><span>$1,350.00</span></div>
              <div class="mockup-total-row"><span>Discount:</span><span>$0.00</span></div>
              <div class="mockup-total-row grand-total"><span>Total Amount Due:</span><span>$14,850.00</span></div>
            </div>
          </div>

          <div class="mockup-seal-stamp">
            <span>Verified</span>
            <span>Corporate</span>
            <span>Seal</span>
            <span>2026</span>
          </div>

          <div class="mockup-signature-area">
            <div class="mockup-signature-script">Clara Sterling</div>
            <div class="mockup-signature-line">Authorized Financial Controller</div>
          </div>
        </div>
      `;
    } else if (doc.id === 'doc-receipt-02') {
      sheet.innerHTML = `
        <div class="doc-mockup-body" style="font-family:'Courier New', monospace;max-width:480px;margin:0 auto;background:#fffef8;padding:25px;border:1px dashed #d1d5db;box-shadow:0 2px 8px rgba(0,0,0,0.06);">
          <div style="text-align:center;border-bottom:1px dashed #9ca3af;padding-bottom:15px;margin-bottom:15px;">
            <div style="font-size:20px;font-weight:bold;letter-spacing:1px;">ARTISAN BISTRO & GRILL</div>
            <div style="font-size:11px;color:#4b5563;">722 S. Congress Ave, Austin, TX 78704</div>
            <div style="font-size:11px;color:#4b5563;">Tel: (512) 555-0199 • Tax ID: 74-9102841</div>
            <div style="margin-top:8px;font-size:12px;">CHECK: <strong>REC-82914</strong> • TABLE: 14</div>
            <div style="font-size:11px;">DATE: 09/29/2026  TIME: 19:42 PM</div>
            <div style="font-size:11px;">SERVER: Marcus K.</div>
          </div>

          <div style="font-size:12px;margin-bottom:15px;">
            <div style="display:flex;justify-content:space-between;margin-bottom:6px;">
              <span>2  Prime Dry-Aged Ribeye 16oz</span>
              <span>$104.00</span>
            </div>
            <div style="display:flex;justify-content:space-between;margin-bottom:6px;">
              <span>1  Heirloom Tomato Burrata</span>
              <span>$18.50</span>
            </div>
            <div style="display:flex;justify-content:space-between;margin-bottom:6px;">
              <span>2  Sparkling Mineral Water</span>
              <span>$20.00</span>
            </div>
          </div>

          <div style="border-top:1px dashed #9ca3af;padding-top:10px;font-size:12px;">
            <div style="display:flex;justify-content:space-between;margin-bottom:4px;">
              <span>SUBTOTAL:</span>
              <span>$142.50</span>
            </div>
            <div style="display:flex;justify-content:space-between;margin-bottom:4px;">
              <span>STATE & LOCAL TAX (8.25%):</span>
              <span>$11.76</span>
            </div>
            <div style="display:flex;justify-content:space-between;margin-bottom:4px;color:#b45309;font-weight:bold;">
              <span>TIP / GRATUITY (20%):</span>
              <span>$28.50</span>
            </div>
            <div style="display:flex;justify-content:space-between;font-size:15px;font-weight:bold;border-top:2px solid #000;padding-top:6px;margin-top:6px;">
              <span>TOTAL CHARGED:</span>
              <span>$182.76</span>
            </div>
          </div>

          <div style="margin-top:20px;text-align:center;font-size:11px;color:#4b5563;border-top:1px dashed #9ca3af;padding-top:12px;">
            <div>VISA CREDIT: **** **** **** 4912</div>
            <div>AUTH CODE: 83912 • CHIP READ</div>
            <div style="margin-top:10px;font-style:italic;">Thank you for dining with Artisan Bistro!</div>
            <div style="font-size:9px;margin-top:8px;">BARCODE: *REC82914-2026-TX*</div>
          </div>
        </div>
      `;
    } else if (doc.id === 'doc-form-03') {
      sheet.innerHTML = `
        <div class="doc-mockup-body" style="font-family:'Arial', sans-serif;">
          <div style="display:flex;justify-content:space-between;border-bottom:2px solid #000;padding-bottom:10px;margin-bottom:15px;">
            <div>
              <div style="font-size:22px;font-weight:900;">Form W-2</div>
              <div style="font-size:13px;font-weight:bold;">Wage and Tax Statement</div>
              <div style="font-size:10px;color:#6b7280;">Department of the Treasury—Internal Revenue Service</div>
            </div>
            <div style="text-align:right;">
              <div style="font-size:24px;font-weight:900;">2026</div>
              <div style="font-size:10px;">OMB No. 1545-0008</div>
            </div>
          </div>

          <div style="display:grid;grid-template-columns:1fr 1fr;gap:10px;font-size:11px;">
            <div style="border:1px solid #9ca3af;padding:8px;background:#f9fafb;">
              <span style="font-size:9px;font-weight:bold;color:#4b5563;">a Employee's social security number</span>
              <div style="font-size:13px;font-weight:bold;margin-top:2px;">***-**-8419</div>
            </div>
            <div style="border:1px solid #9ca3af;padding:8px;background:#f9fafb;">
              <span style="font-size:9px;font-weight:bold;color:#4b5563;">1 Wages, tips, other compensation</span>
              <div style="font-size:13px;font-weight:bold;margin-top:2px;text-align:right;">$148,250.00</div>
            </div>

            <div style="border:1px solid #9ca3af;padding:8px;background:#f9fafb;">
              <span style="font-size:9px;font-weight:bold;color:#4b5563;">b Employer identification number (EIN)</span>
              <div style="font-size:13px;font-weight:bold;margin-top:2px;">12-9842109</div>
            </div>
            <div style="border:1px solid #9ca3af;padding:8px;background:#f9fafb;">
              <span style="font-size:9px;font-weight:bold;color:#4b5563;">2 Federal income tax withheld</span>
              <div style="font-size:13px;font-weight:bold;margin-top:2px;text-align:right;">$29,650.00</div>
            </div>

            <div style="border:1px solid #9ca3af;padding:8px;background:#f9fafb;grid-row:span 2;">
              <span style="font-size:9px;font-weight:bold;color:#4b5563;">c Employer's name, address, and ZIP code</span>
              <div style="font-size:12px;font-weight:bold;margin-top:4px;">Horizon Robotics & Cloud Corp.</div>
              <div style="font-size:10px;color:#4b5563;">1000 Pioneer Way, Suite 400<br>Seattle, WA 98104</div>
            </div>
            <div style="border:1px solid #9ca3af;padding:8px;background:#f9fafb;">
              <span style="font-size:9px;font-weight:bold;color:#4b5563;">3 Social security wages</span>
              <div style="font-size:13px;font-weight:bold;margin-top:2px;text-align:right;">$148,250.00</div>
            </div>
            <div style="border:1px solid #9ca3af;padding:8px;background:#f9fafb;">
              <span style="font-size:9px;font-weight:bold;color:#4b5563;">4 Social security tax withheld</span>
              <div style="font-size:13px;font-weight:bold;margin-top:2px;text-align:right;">$9,191.50</div>
            </div>

            <div style="border:1px solid #9ca3af;padding:8px;background:#f9fafb;">
              <span style="font-size:9px;font-weight:bold;color:#4b5563;">d Control number</span>
              <div style="font-size:11px;font-weight:bold;margin-top:2px;">D-94810-W2</div>
            </div>
            <div style="border:1px solid #9ca3af;padding:8px;background:#f9fafb;">
              <span style="font-size:9px;font-weight:bold;color:#4b5563;">6 Medicare tax withheld</span>
              <div style="font-size:13px;font-weight:bold;margin-top:2px;text-align:right;">$2,149.62</div>
            </div>

            <div style="border:1px solid #9ca3af;padding:8px;background:#f9fafb;grid-column:span 2;">
              <span style="font-size:9px;font-weight:bold;color:#4b5563;">e Employee's first name and initial, Last name</span>
              <div style="font-size:13px;font-weight:bold;margin-top:2px;">Elena Vance-Morgan</div>
              <div style="font-size:11px;color:#4b5563;">3814 Evergreen Terrace, Seattle, WA 98101</div>
            </div>
          </div>
        </div>
      `;
    } else if (doc.id === 'doc-cert-04') {
      sheet.innerHTML = `
        <div class="doc-mockup-body" style="text-align:center;padding:20px;border:8px double #1e3a8a;height:100%;box-sizing:border-box;">
          <div style="font-size:14px;letter-spacing:2px;color:#1e3a8a;font-weight:700;">BUREAU GLOBAL VERITAS ACCREDITATION COUNCIL</div>
          <div style="font-size:10px;color:#6b7280;margin-top:4px;">International Standards Organization Accreditation Board</div>
          <div style="margin:25px auto 15px auto;width:60px;height:2px;background:#1e3a8a;"></div>
          <div style="font-size:26px;font-weight:900;letter-spacing:1px;color:#1e3a8a;">CERTIFICATE OF REGISTRATION</div>
          <div style="font-size:12px;color:#4b5563;margin-top:6px;">This is to certify that the Quality Management System of:</div>
          <div style="font-size:22px;font-weight:bold;color:#111827;margin:18px 0 6px 0;">Vanguard Aerospace & Defense Systems Inc.</div>
          <div style="font-size:12px;color:#4b5563;">1800 Orbital Way, Huntsville, AL 35805 • United States</div>
          <div style="font-size:12px;color:#4b5563;margin-top:15px;">has been assessed and registered as meeting the requirements of:</div>
          <div style="font-size:20px;font-weight:800;color:#047857;margin:12px 0;">ISO 9001:2015</div>
          <div style="max-width:520px;margin:0 auto;font-size:11px;color:#374151;line-height:1.5;">
            <strong>Scope of Operations:</strong> Design, development, precision engineering, and manufacture of composite aerospace avionics, guidance telemetry enclosures, and certified flight-critical subsystem components.
          </div>
          <div style="margin-top:30px;display:flex;justify-content:space-around;font-size:11px;color:#4b5563;">
            <div>Certificate #: <strong>CERT-ISO-9001-2026-884</strong></div>
            <div>Issue Date: <strong>2026-03-01</strong></div>
            <div>Expiry Date: <strong>2029-02-28</strong></div>
          </div>
          <div style="margin-top:40px;display:flex;justify-content:space-between;padding:0 40px;align-items:center;">
            <div style="border-top:1px solid #000;width:150px;padding-top:4px;font-size:10px;">Chairman, Accreditation Board</div>
            <div style="width:80px;height:80px;border-radius:50%;border:2px dashed #b45309;display:flex;align-items:center;justify-content:center;color:#b45309;font-weight:bold;font-size:9px;">OFFICIAL<br>SEAL</div>
            <div style="border-top:1px solid #000;width:150px;padding-top:4px;font-size:10px;">Lead QMS Auditor</div>
          </div>
        </div>
      `;
    } else if (doc.id === 'doc-medical-05') {
      sheet.innerHTML = `
        <div class="doc-mockup-body">
          <div style="display:flex;justify-content:space-between;align-items:center;border-bottom:2px solid #0284c7;padding-bottom:12px;margin-bottom:20px;">
            <div>
              <div style="font-size:20px;font-weight:bold;color:#0284c7;">BioHealth Reference Diagnostics</div>
              <div style="font-size:10px;color:#6b7280;">CLIA Certified #05D918402 • CAP Accredited Clinical Laboratory</div>
            </div>
            <div style="text-align:right;">
              <div style="font-size:16px;font-weight:bold;color:#1e293b;">COMPREHENSIVE LAB PANEL</div>
              <div style="font-size:11px;font-family:monospace;">Accession #: LAB-2026-88319</div>
            </div>
          </div>

          <div style="display:grid;grid-template-columns:1fr 1fr;gap:15px;background:#f0f9ff;padding:12px;border-radius:6px;margin-bottom:20px;font-size:11px;">
            <div>
              <div>Patient: <strong>Alexander Ross</strong></div>
              <div>DOB: <strong>11/12/1984</strong> (Age: 41Y / Male)</div>
              <div>MRN: <strong>MRN-849104</strong></div>
            </div>
            <div>
              <div>Ordering Physician: <strong>Dr. Sarah Lin, MD</strong> (NPI: 184920412)</div>
              <div>Sample Collected: <strong>09/24/2026 08:15 AM</strong></div>
              <div>Report Verified: <strong>09/25/2026 14:30 PM</strong></div>
            </div>
          </div>

          <table style="width:100%;border-collapse:collapse;font-size:12px;">
            <thead>
              <tr style="background:#e0f2fe;text-align:left;">
                <th style="padding:6px 10px;">Test Description</th>
                <th style="padding:6px 10px;">Result</th>
                <th style="padding:6px 10px;">Reference Range</th>
                <th style="padding:6px 10px;">Status</th>
              </tr>
            </thead>
            <tbody>
              <tr style="border-bottom:1px solid #e2e8f0;">
                <td style="padding:8px 10px;">Fasting Blood Glucose (Serum)</td>
                <td style="padding:8px 10px;font-weight:bold;">92 mg/dL</td>
                <td style="padding:8px 10px;color:#64748b;">70 - 99 mg/dL</td>
                <td style="padding:8px 10px;color:#16a34a;font-weight:bold;">NORMAL</td>
              </tr>
              <tr style="border-bottom:1px solid #e2e8f0;">
                <td style="padding:8px 10px;">Total Serum Cholesterol</td>
                <td style="padding:8px 10px;font-weight:bold;">178 mg/dL</td>
                <td style="padding:8px 10px;color:#64748b;">&lt; 200 mg/dL</td>
                <td style="padding:8px 10px;color:#16a34a;font-weight:bold;">OPTIMAL</td>
              </tr>
              <tr style="border-bottom:1px solid #e2e8f0;">
                <td style="padding:8px 10px;">High-Density Lipoprotein (HDL)</td>
                <td style="padding:8px 10px;font-weight:bold;">58 mg/dL</td>
                <td style="padding:8px 10px;color:#64748b;">&gt; 40 mg/dL</td>
                <td style="padding:8px 10px;color:#16a34a;font-weight:bold;">HEALTHY</td>
              </tr>
              <tr style="border-bottom:1px solid #e2e8f0;">
                <td style="padding:8px 10px;">Serum Hemoglobin A1c (HbA1c)</td>
                <td style="padding:8px 10px;font-weight:bold;">5.2 %</td>
                <td style="padding:8px 10px;color:#64748b;">4.0 - 5.6 %</td>
                <td style="padding:8px 10px;color:#16a34a;font-weight:bold;">NORMAL</td>
              </tr>
            </tbody>
          </table>

          <div style="margin-top:30px;font-size:11px;color:#64748b;">
            Electronically authenticated and released by: Laboratory Medical Director, Dr. Henry Chang, MD, PhD.
          </div>
        </div>
      `;
    } else {
      // Contract NDA
      sheet.innerHTML = `
        <div class="doc-mockup-body" style="font-family:'Times New Roman', serif;padding:20px;">
          <div style="text-align:center;font-size:22px;font-weight:bold;margin-bottom:10px;">MUTUAL NON-DISCLOSURE AGREEMENT</div>
          <div style="text-align:center;font-size:12px;margin-bottom:25px;">Contract Reference #: <strong>NDA-CORP-2026-09</strong></div>
          <p style="font-size:12px;line-height:1.6;margin-bottom:15px;">
            This Mutual Non-Disclosure Agreement (the "Agreement") is entered into and made effective as of <strong>October 1, 2026</strong> (the "Effective Date"), by and between <strong>Nexus Cybernetics Corporation</strong>, a Delaware corporation ("Party A"), and <strong>Quantum AI Systems Inc.</strong>, a California corporation ("Party B").
          </p>
          <div style="font-weight:bold;font-size:13px;margin:15px 0 5px 0;">1. Purpose & Definition of Confidential Information</div>
          <p style="font-size:12px;line-height:1.6;margin-bottom:15px;">
            The Parties wish to explore potential business collaboration and technology integration involving autonomous multi-modal neural architectures. "Confidential Information" includes all non-public technical, commercial, algorithm weights, and financial specifications.
          </p>
          <div style="font-weight:bold;font-size:13px;margin:15px 0 5px 0;">2. Term & Governing Law</div>
          <p style="font-size:12px;line-height:1.6;margin-bottom:25px;">
            This Agreement shall remain in full force for a duration of <strong>Three (3) Years</strong> from the Effective Date. This Agreement is governed by and construed under the laws of the <strong>State of Delaware</strong>.
          </p>
          <div style="margin-top:60px;display:flex;justify-content:space-between;padding:0 30px;">
            <div>
              <div style="font-family:cursive;font-size:22px;color:#1e3a8a;">Vincent Sterling</div>
              <div style="border-top:1px solid #000;width:180px;padding-top:4px;font-size:11px;">Nexus Cybernetics Corp (Party A)</div>
            </div>
            <div>
              <div style="font-family:cursive;font-size:22px;color:#1e3a8a;">Rachel Mercer</div>
              <div style="border-top:1px solid #000;width:180px;padding-top:4px;font-size:11px;">Quantum AI Systems (Party B)</div>
            </div>
          </div>
        </div>
      `;
    }
  }

  // =========================================================================
  // SPATIAL BOUNDING BOX OVERLAY ENGINE
  // =========================================================================

  function renderBoundingBoxes() {
    const overlay = elements.boundingBoxOverlay;
    overlay.innerHTML = '';
    const doc = DOCUMENTS[state.currentDocIndex];
    if (!doc.bboxes || !doc.bboxes.length) return;

    doc.bboxes.forEach(box => {
      const g = document.createElementNS('http://www.w3.org/2000/svg', 'g');
      g.setAttribute('class', 'bbox-group');
      g.setAttribute('data-box-id', box.id);

      // Determine color type
      let typeClass = `type-${box.category}`;
      if (state.showHeatmap) {
        if (box.conf >= 0.95) typeClass = 'type-financial'; // Green
        else if (box.conf >= 0.85) typeClass = 'type-header'; // Blue/Cyan
        else typeClass = 'type-lowconf'; // Amber/Red
      }

      // Rect element
      const rect = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
      rect.setAttribute('x', box.x);
      rect.setAttribute('y', box.y);
      rect.setAttribute('width', box.w);
      rect.setAttribute('height', box.h);
      rect.setAttribute('class', `bbox-rect ${typeClass}`);
      rect.setAttribute('rx', '3');
      rect.setAttribute('ry', '3');

      // Hover tag tooltip
      const tagBg = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
      tagBg.setAttribute('x', box.x);
      tagBg.setAttribute('y', Math.max(0, box.y - 18));
      tagBg.setAttribute('width', Math.min(box.w, 140));
      tagBg.setAttribute('height', 16);
      tagBg.setAttribute('class', 'bbox-tag-bg');
      tagBg.setAttribute('fill', box.conf < 0.85 ? '#b45309' : '#1e293b');
      tagBg.style.display = state.showOcrText ? 'block' : 'none';

      const tagText = document.createElementNS('http://www.w3.org/2000/svg', 'text');
      tagText.setAttribute('x', box.x + 4);
      tagText.setAttribute('y', Math.max(12, box.y - 6));
      tagText.setAttribute('class', 'bbox-tag-text');
      const confPct = Math.round(box.conf * 100);
      tagText.textContent = `${box.text.substring(0, 16)}… (${confPct}%)`;
      tagText.style.display = state.showOcrText ? 'block' : 'none';

      // Hover / Click interaction with right sidebar
      g.addEventListener('mouseenter', () => highlightFieldFromBox(box.id));
      g.addEventListener('mouseleave', () => unhighlightFieldFromBox());
      g.addEventListener('click', () => {
        highlightFieldFromBox(box.id, true);
        showToast(`Selected OCR Token: "${box.text}" (${confPct}% confidence)`, 'info');
      });

      g.appendChild(rect);
      g.appendChild(tagBg);
      g.appendChild(tagText);
      overlay.appendChild(g);
    });
  }

  function highlightFieldFromBox(bboxId, scrollIntoView = false) {
    // Highlight rect
    elements.boundingBoxOverlay.querySelectorAll('.bbox-rect').forEach(r => r.classList.remove('highlighted'));
    const targetGroup = elements.boundingBoxOverlay.querySelector(`[data-box-id="${bboxId}"]`);
    if (targetGroup) {
      const rect = targetGroup.querySelector('.bbox-rect');
      if (rect) rect.classList.add('highlighted');
    }

    // Highlight row in sidebar
    document.querySelectorAll('.field-item-row').forEach(row => row.classList.remove('focused'));
    const targetRow = document.querySelector(`.field-item-row[data-bbox-id="${bboxId}"]`);
    if (targetRow) {
      targetRow.classList.add('focused');
      if (scrollIntoView) {
        targetRow.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }
  }

  function unhighlightFieldFromBox() {
    elements.boundingBoxOverlay.querySelectorAll('.bbox-rect').forEach(r => r.classList.remove('highlighted'));
    document.querySelectorAll('.field-item-row').forEach(row => row.classList.remove('focused'));
  }

  // =========================================================================
  // STRUCTURED DATA EXTRACTION & HITL INSPECTOR
  // =========================================================================

  function renderExtractionInspector(doc) {
    // Overall Score
    elements.docOverallScore.querySelector('.score-val').textContent = `${doc.confidenceScore}%`;
    
    // HITL Banner Status
    if (doc.status === 'flagged' || doc.confidenceScore < 88) {
      elements.docStatusPill.className = 'status-pill status-flagged';
      elements.docStatusPill.innerHTML = '⚠ Human Review Required';
      elements.docStatusSubtext.textContent = 'Confidence score below 88% threshold. Please verify flagged fields.';
    } else if (doc.status === 'verified') {
      elements.docStatusPill.className = 'status-pill status-ready';
      elements.docStatusPill.innerHTML = '✓ Approved & Verified';
      elements.docStatusSubtext.textContent = 'Data validated and queued for ERP dispatch.';
    } else {
      elements.docStatusPill.className = 'status-pill status-ready';
      elements.docStatusPill.innerHTML = '✓ Ready for Verification';
      elements.docStatusSubtext.textContent = 'All core entity fields extracted with high confidence.';
    }

    // Counts
    let totalFields = 0;
    if (doc.fields.metadata) totalFields += doc.fields.metadata.length;
    if (doc.fields.parties) totalFields += doc.fields.parties.length;
    if (doc.fields.financials) totalFields += doc.fields.financials.length;
    elements.countFields.textContent = totalFields;
    elements.countTables.textContent = doc.lineItems ? doc.lineItems.length : 0;

    // Render Field Groups
    elements.fieldGroupsContainer.innerHTML = '';

    // Group 1: Document Metadata
    if (doc.fields.metadata) {
      elements.fieldGroupsContainer.appendChild(createFieldGroupCard('Document Identifiers & Metadata', '🏷️', doc.fields.metadata));
    }

    // Group 2: Parties & Entities
    if (doc.fields.parties) {
      elements.fieldGroupsContainer.appendChild(createFieldGroupCard('Entity & Counterparty Information', '🏢', doc.fields.parties));
    }

    // Group 3: Financials & Totals
    if (doc.fields.financials) {
      elements.fieldGroupsContainer.appendChild(createFieldGroupCard('Financial Amounts & Balance', '💵', doc.fields.financials));
    }

    // Group 4: Integrity Verification Check
    renderIntegrityCheckCard(doc);

    // Render Line Items Table
    renderTableItems(doc);

    // Render Raw JSON
    renderJsonViewer(doc);
  }

  function createFieldGroupCard(groupTitle, icon, fieldList) {
    const card = document.createElement('div');
    card.className = 'field-group-card';

    let fieldsHtml = '';
    fieldList.forEach(field => {
      const confClass = field.confidence >= 95 ? 'conf-pill high' : field.confidence >= 85 ? 'conf-pill med' : 'conf-pill low';
      fieldsHtml += `
        <div class="field-item-row" data-bbox-id="${field.bboxId || ''}" data-field-key="${field.key}">
          <div class="field-label-row">
            <span class="field-label">${field.label} ${field.required ? '<span style="color:var(--accent-danger);">*</span>' : ''}</span>
            <span class="${confClass}">${field.confidence}% Conf</span>
          </div>
          <div class="field-input-wrapper">
            <input type="text" class="field-input" value="${field.value}" data-key="${field.key}">
            <button class="btn-locate-bbox" title="Highlight on Document Canvas">
              <svg viewBox="0 0 24 24" width="13" height="13" stroke="currentColor" fill="none" stroke-width="2"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
            </button>
          </div>
        </div>
      `;
    });

    card.innerHTML = `
      <div class="group-title-row">
        <span class="group-title">${icon} ${groupTitle}</span>
        <span class="counter-badge">${fieldList.length} fields</span>
      </div>
      <div class="group-fields-list">
        ${fieldsHtml}
      </div>
    `;

    // Attach row events
    card.querySelectorAll('.field-item-row').forEach(row => {
      const bboxId = row.getAttribute('data-bbox-id');
      const input = row.querySelector('.field-input');
      const locateBtn = row.querySelector('.btn-locate-bbox');

      row.addEventListener('mouseenter', () => highlightFieldFromBox(bboxId));
      row.addEventListener('mouseleave', () => unhighlightFieldFromBox());

      locateBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        highlightFieldFromBox(bboxId, true);
        pulseBboxOnCanvas(bboxId);
      });

      // Human-in-the-loop field correction
      input.addEventListener('change', (e) => {
        handleFieldCorrection(row.getAttribute('data-field-key'), e.target.value);
      });
    });

    return card;
  }

  function renderIntegrityCheckCard(doc) {
    if (!doc.fields.financials) return;
    const subtotalField = doc.fields.financials.find(f => f.key === 'subtotal');
    const taxField = doc.fields.financials.find(f => f.key === 'tax_amount');
    const totalField = doc.fields.financials.find(f => f.key === 'total_amount');

    if (!subtotalField || !totalField) return;

    const subVal = parseFloat(subtotalField.value.replace(/,/g, '')) || 0;
    const taxVal = taxField ? (parseFloat(taxField.value.replace(/,/g, '')) || 0) : 0;
    const totVal = parseFloat(totalField.value.replace(/,/g, '')) || 0;

    const calculatedTotal = subVal + taxVal;
    const isBalanced = Math.abs(calculatedTotal - totVal) < 0.05;

    const integrityCard = document.createElement('div');
    integrityCard.className = `integrity-check-card ${isBalanced ? '' : 'warning-discrepancy'}`;
    integrityCard.innerHTML = `
      <div class="integrity-title">
        <svg viewBox="0 0 24 24" width="14" height="14" stroke="currentColor" fill="none" stroke-width="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>
        ${isBalanced ? 'Automated Arithmetic Check: Passed' : 'Arithmetic Discrepancy Flagged'}
      </div>
      <div class="integrity-text">
        ${isBalanced 
          ? `Subtotal ($${subVal.toFixed(2)}) + Tax ($${taxVal.toFixed(2)}) exactly balances Grand Total ($${totVal.toFixed(2)}).` 
          : `Calculated sum ($${calculatedTotal.toFixed(2)}) does not match extracted Grand Total ($${totVal.toFixed(2)}). Please verify line items.`}
      </div>
    `;

    elements.fieldGroupsContainer.appendChild(integrityCard);
  }

  function renderTableItems(doc) {
    const container = elements.tableExtractionContainer;
    container.innerHTML = '';

    if (!doc.lineItems || !doc.lineItems.length) {
      container.innerHTML = '<div style="padding:1rem;color:var(--text-muted);font-size:0.8rem;">No tabular line items detected in this document.</div>';
      return;
    }

    let rowsHtml = '';
    doc.lineItems.forEach((item, idx) => {
      rowsHtml += `
        <tr data-bbox-id="${item.bboxId || ''}">
          <td><input type="text" class="table-cell-input" value="${item.item}"></td>
          <td style="width:70px;text-align:center;"><input type="text" class="table-cell-input" style="text-align:center;" value="${item.qty}"></td>
          <td style="width:90px;text-align:right;"><input type="text" class="table-cell-input" style="text-align:right;" value="${item.unitPrice}"></td>
          <td style="width:90px;text-align:right;font-weight:700;"><input type="text" class="table-cell-input" style="text-align:right;font-weight:700;" value="${item.total}"></td>
        </tr>
      `;
    });

    container.innerHTML = `
      <table class="extracted-data-table">
        <thead>
          <tr>
            <th>Item / Description</th>
            <th style="text-align:center;">Qty</th>
            <th style="text-align:right;">Unit Price</th>
            <th style="text-align:right;">Total</th>
          </tr>
        </thead>
        <tbody>
          ${rowsHtml}
        </tbody>
      </table>
    `;

    // Row highlights
    container.querySelectorAll('tr[data-bbox-id]').forEach(tr => {
      const bboxId = tr.getAttribute('data-bbox-id');
      tr.addEventListener('mouseenter', () => highlightFieldFromBox(bboxId));
      tr.addEventListener('mouseleave', () => unhighlightFieldFromBox());
    });
  }

  function renderJsonViewer(doc) {
    const standardizedPayload = {
      documentId: doc.id,
      fileName: doc.title,
      classification: {
        category: doc.category,
        label: doc.categoryLabel,
        confidence: doc.classificationScore / 100
      },
      extractionMetadata: {
        engine: 'OmniExtract-v4.2-Hybrid',
        tokensParsed: doc.tokensCount,
        latencyMs: parseInt(doc.processingTime, 10),
        overallConfidence: doc.confidenceScore / 100,
        status: doc.status
      },
      extractedEntities: doc.fields,
      tabularLineItems: doc.lineItems || [],
      spatialTokens: doc.bboxes.map(b => ({
        id: b.id,
        text: b.text,
        category: b.category,
        confidence: b.conf,
        coordinates: { ymin: b.y, xmin: b.x, height: b.h, width: b.w }
      }))
    };

    elements.jsonCodeBlock.querySelector('code').textContent = JSON.stringify(standardizedPayload, null, 2);
  }

  // =========================================================================
  // HUMAN-IN-THE-LOOP (HITL) CORRECTIONS & ACTIVE LEARNING
  // =========================================================================

  function handleFieldCorrection(fieldKey, newValue) {
    const doc = DOCUMENTS[state.currentDocIndex];
    state.correctionsCount++;

    // Locate field in doc
    ['metadata', 'parties', 'financials'].forEach(grp => {
      if (doc.fields[grp]) {
        const target = doc.fields[grp].find(f => f.key === fieldKey);
        if (target) {
          target.value = newValue;
          target.confidence = 99.9; // User confirmed
        }
      }
    });

    // Recalculate document status
    doc.status = 'ready';
    doc.confidenceScore = 98.6;
    renderExtractionInspector(doc);

    showToast(`Correction Saved: "${fieldKey}" updated. Continuous learning embedding refined (+0.2% accuracy).`, 'success');
  }

  function approveCurrentDocument() {
    const doc = DOCUMENTS[state.currentDocIndex];
    doc.status = 'verified';
    showToast(`Document "${doc.title}" verified & dispatched to ERP integration queue!`, 'success');
    renderExtractionInspector(doc);
    renderDocQueue();

    // Auto open webhook simulation preview
    setTimeout(() => {
      openWebhookModal();
    }, 600);
  }

  function reExtractCurrentDocument() {
    showToast('Re-running Neural OCR and NER Entity Parser on document...', 'info');
    setTimeout(() => {
      loadDocument(state.currentDocIndex);
      showToast('Document re-extracted successfully with updated weights!', 'success');
    }, 800);
  }

  function pulseBboxOnCanvas(bboxId) {
    const group = elements.boundingBoxOverlay.querySelector(`[data-box-id="${bboxId}"]`);
    if (!group) return;
    const rect = group.querySelector('.bbox-rect');
    if (!rect) return;

    rect.style.stroke = '#06b6d4';
    rect.style.strokeWidth = '4';
    setTimeout(() => {
      rect.style.stroke = '';
      rect.style.strokeWidth = '';
    }, 1200);
  }

  // =========================================================================
  // CANVAS ZOOM, PAN, AND INTERACTIVE DRAWING
  // =========================================================================

  function updateZoom(newZoom) {
    state.zoom = Math.min(Math.max(0.4, newZoom), 2.5);
    elements.zoomLevelText.textContent = `${Math.round(state.zoom * 100)}%`;
    applyCanvasTransform();
  }

  function fitToScreen() {
    state.zoom = 1.0;
    state.panX = 0;
    state.panY = 0;
    state.rotation = 0;
    elements.zoomLevelText.textContent = '100%';
    applyCanvasTransform();
  }

  function rotateDocument() {
    state.rotation = (state.rotation + 90) % 360;
    applyCanvasTransform();
    showToast(`Document rotated to ${state.rotation}°`, 'info');
  }

  function applyCanvasTransform() {
    elements.canvasStage.style.transform = `translate(${state.panX}px, ${state.panY}px) scale(${state.zoom}) rotate(${state.rotation}deg)`;
  }

  function handleCanvasWheel(e) {
    if (e.ctrlKey || e.metaKey) {
      e.preventDefault();
      const zoomDelta = e.deltaY < 0 ? 0.1 : -0.1;
      updateZoom(state.zoom + zoomDelta);
    }
  }

  function handleCanvasMouseDown(e) {
    if (state.isDrawingBox) {
      // Start drawing box
      const rect = elements.canvasStage.getBoundingClientRect();
      const x = (e.clientX - rect.left) / state.zoom;
      const y = (e.clientY - rect.top) / state.zoom;
      state.drawStart = { x, y };
      elements.drawSelectionBox.style.display = 'block';
      elements.drawSelectionBox.style.left = `${x}px`;
      elements.drawSelectionBox.style.top = `${y}px`;
      elements.drawSelectionBox.style.width = '0px';
      elements.drawSelectionBox.style.height = '0px';
      return;
    }

    if (e.button === 0 && (e.target === elements.canvasScrollContainer || e.target.closest('.document-page-sheet'))) {
      state.isPanning = true;
      state.startPanX = e.clientX - state.panX;
      state.startPanY = e.clientY - state.panY;
      elements.canvasScrollContainer.classList.add('is-panning');
    }
  }

  function handleCanvasMouseMove(e) {
    if (state.isDrawingBox && state.drawStart) {
      const rect = elements.canvasStage.getBoundingClientRect();
      const currentX = (e.clientX - rect.left) / state.zoom;
      const currentY = (e.clientY - rect.top) / state.zoom;

      const x = Math.min(state.drawStart.x, currentX);
      const y = Math.min(state.drawStart.y, currentY);
      const w = Math.abs(currentX - state.drawStart.x);
      const h = Math.abs(currentY - state.drawStart.y);

      elements.drawSelectionBox.style.left = `${x}px`;
      elements.drawSelectionBox.style.top = `${y}px`;
      elements.drawSelectionBox.style.width = `${w}px`;
      elements.drawSelectionBox.style.height = `${h}px`;
      return;
    }

    if (!state.isPanning) return;
    state.panX = e.clientX - state.startPanX;
    state.panY = e.clientY - state.startPanY;
    applyCanvasTransform();
  }

  function handleCanvasMouseUp(e) {
    if (state.isDrawingBox && state.drawStart) {
      const rect = elements.canvasStage.getBoundingClientRect();
      const currentX = (e.clientX - rect.left) / state.zoom;
      const currentY = (e.clientY - rect.top) / state.zoom;

      const x = Math.round(Math.min(state.drawStart.x, currentX));
      const y = Math.round(Math.min(state.drawStart.y, currentY));
      const w = Math.round(Math.abs(currentX - state.drawStart.x));
      const h = Math.round(Math.abs(currentY - state.drawStart.y));

      state.drawStart = null;
      elements.drawSelectionBox.style.display = 'none';

      if (w > 15 && h > 10) {
        // Open Tag Custom Box Modal
        openTagBoxModal({ x, y, w, h });
      }
      return;
    }

    if (state.isPanning) {
      state.isPanning = false;
      elements.canvasScrollContainer.classList.remove('is-panning');
    }
  }

  function openTagBoxModal(coords) {
    elements.tagBoxCoords.textContent = `y: ${coords.y}, x: ${coords.x}, w: ${coords.w}, h: ${coords.h}`;
    elements.tagBoxModal.style.display = 'flex';
    elements.tagBoxModal.setAttribute('data-coords', JSON.stringify(coords));
  }

  function saveCustomTagField() {
    const coords = JSON.parse(elements.tagBoxModal.getAttribute('data-coords') || '{}');
    const selectedText = elements.tagBoxText.value;
    const fieldSelect = elements.tagBoxFieldSelect;
    const fieldKey = fieldSelect.value;
    const fieldName = fieldSelect.options[fieldSelect.selectedIndex].text;

    const doc = DOCUMENTS[state.currentDocIndex];
    const newBoxId = `bbox-custom-${Date.now()}`;

    // Add to doc bboxes
    doc.bboxes.push({
      id: newBoxId,
      x: coords.x,
      y: coords.y,
      w: coords.w,
      h: coords.h,
      text: selectedText,
      category: 'entity',
      conf: 0.99
    });

    // Add to metadata fields
    if (!doc.fields.metadata) doc.fields.metadata = [];
    doc.fields.metadata.push({
      key: fieldKey,
      label: fieldName,
      value: selectedText,
      confidence: 99.5,
      bboxId: newBoxId,
      required: false,
      type: 'string'
    });

    elements.tagBoxModal.style.display = 'none';
    renderBoundingBoxes();
    renderExtractionInspector(doc);
    showToast(`Tagged custom field "${fieldName}" with bounding box!`, 'success');
  }

  // =========================================================================
  // FILE UPLOAD & REAL CLIENT-SIDE OCR SIMULATION
  // =========================================================================

  function handleFileSelect(e) {
    if (e.target.files.length > 0) {
      processUploadedFile(e.target.files[0]);
    }
  }

  function processUploadedFile(file) {
    showToast(`Analyzing uploaded file: "${file.name}"...`, 'info');
    const reader = new FileReader();

    reader.onload = function (event) {
      // Determine file classification based on name & mime
      const lowerName = file.name.toLowerCase();
      let category = 'invoice';
      let categoryLabel = 'Commercial Invoice';
      if (lowerName.includes('receipt') || lowerName.includes('bill') || lowerName.includes('ticket')) {
        category = 'receipt';
        categoryLabel = 'Retail / Travel Receipt';
      } else if (lowerName.includes('form') || lowerName.includes('tax') || lowerName.includes('w2') || lowerName.includes('w9')) {
        category = 'form';
        categoryLabel = 'Government / Tax Form';
      } else if (lowerName.includes('cert') || lowerName.includes('iso') || lowerName.includes('diploma')) {
        category = 'certificate';
        categoryLabel = 'Certificate of Compliance';
      }

      const newDoc = {
        id: `doc-upload-${Date.now()}`,
        title: file.name,
        category: category,
        categoryLabel: categoryLabel,
        classificationScore: 97.4,
        confidenceScore: 96.8,
        status: 'ready',
        tokensCount: Math.floor(Math.random() * 40) + 50,
        processingTime: '520ms',
        customImage: event.target.result,
        fields: {
          metadata: [
            { key: 'extracted_identifier', label: 'Primary Document ID', value: `DOC-${Math.floor(Math.random() * 90000 + 10000)}`, confidence: 97.8, bboxId: 'bbox-up-1', required: true, type: 'string' },
            { key: 'ingestion_timestamp', label: 'Ingestion Timestamp', value: new Date().toISOString().replace('T', ' ').substring(0, 19), confidence: 99.4, bboxId: 'bbox-up-2', required: true, type: 'date' }
          ],
          parties: [
            { key: 'detected_entity', label: 'Detected Issuer Entity', value: file.name.split('.')[0].replace(/[-_]/g, ' '), confidence: 96.2, bboxId: 'bbox-up-3', required: true, type: 'string' }
          ],
          financials: [
            { key: 'detected_amount', label: 'Detected Monetary Amount', value: '4,280.00', confidence: 95.8, bboxId: 'bbox-up-4', required: false, type: 'currency' }
          ]
        },
        lineItems: [
          { item: 'Uploaded File Extracted Block #1', qty: '1', unitPrice: '4,280.00', total: '4,280.00', bboxId: 'bbox-up-item' }
        ],
        bboxes: [
          { id: 'bbox-up-1', x: 60, y: 60, w: 280, h: 32, text: file.name, category: 'header', conf: 0.98 },
          { id: 'bbox-up-2', x: 60, y: 110, w: 240, h: 26, text: 'Parsed Token Block', category: 'entity', conf: 0.96 },
          { id: 'bbox-up-3', x: 60, y: 160, w: 320, h: 28, text: 'Automated Spatial OCR Coordinates', category: 'financial', conf: 0.97 },
          { id: 'bbox-up-4', x: 60, y: 210, w: 600, h: 80, text: 'Table Entity Grid Recognition Area', category: 'table', conf: 0.95 }
        ]
      };

      DOCUMENTS.unshift(newDoc);
      state.currentDocIndex = 0;
      loadDocument(0);
      showToast(`Document "${file.name}" ingested and classified as ${categoryLabel}!`, 'success');
    };

    if (file.type.startsWith('image/')) {
      reader.readAsDataURL(file);
    } else {
      // Simulate PDF or text rendering
      reader.readAsDataURL(file);
    }
  }

  // =========================================================================
  // BATCH PROCESSING PIPELINE
  // =========================================================================

  function renderBatchTable() {
    const tbody = elements.batchJobsTbody;
    tbody.innerHTML = '';

    BATCH_JOBS.forEach((job, idx) => {
      const tr = document.createElement('tr');
      const statusClass = job.status === 'Verified' ? 'conf-pill high' : 'conf-pill low';
      tr.innerHTML = `
        <td><strong>${job.name}</strong></td>
        <td><span class="class-tag">${job.type}</span></td>
        <td><span class="conf-pill high">${job.conf}</span></td>
        <td>${job.entities} entities</td>
        <td><span class="${statusClass}">${job.status}</span></td>
        <td>${job.quality}</td>
        <td><code>${job.latency}</code></td>
        <td>
          <button class="btn btn-xs btn-outline btn-open-batch" data-index="${idx}">Inspect</button>
        </td>
      `;

      tr.querySelector('.btn-open-batch').addEventListener('click', () => {
        const foundIdx = DOCUMENTS.findIndex(d => d.title.includes(job.name.split('.')[0]));
        if (foundIdx !== -1) {
          switchTab('workspace');
          loadDocument(foundIdx);
        } else {
          showToast(`Opening batch document "${job.name}"...`, 'info');
          switchTab('workspace');
          loadDocument(0);
        }
      });

      tbody.appendChild(tr);
    });

    elements.batchMetricTotal.textContent = `${BATCH_JOBS.length} Documents`;
    const flagged = BATCH_JOBS.filter(j => j.status === 'Needs Review').length;
    elements.batchMetricFlagged.textContent = `${flagged} Document${flagged === 1 ? '' : 's'}`;
    elements.batchCountBadge.textContent = BATCH_JOBS.length;
  }

  function filterBatchTable(query) {
    const q = query.toLowerCase();
    const rows = elements.batchJobsTbody.querySelectorAll('tr');
    rows.forEach(row => {
      const text = row.textContent.toLowerCase();
      row.style.display = text.includes(q) ? '' : 'none';
    });
  }

  function executeBatchPipeline() {
    showToast('Executing Batch Pipeline: Parallel OCR, Classifier & NLP workers running...', 'info');
    elements.btnStartBatchRun.disabled = true;

    let processed = 0;
    const interval = setInterval(() => {
      processed += 2;
      showToast(`Batch Progress: ${processed} of ${BATCH_JOBS.length} documents processed...`, 'info');
      if (processed >= BATCH_JOBS.length) {
        clearInterval(interval);
        elements.btnStartBatchRun.disabled = false;
        BATCH_JOBS.forEach(j => {
          if (j.status !== 'Needs Review') j.status = 'Verified';
        });
        renderBatchTable();
        showToast('Batch execution complete: 87.5% Straight-Through-Processing (STP) rate achieved!', 'success');
      }
    }, 700);
  }

  function addBatchSamples() {
    const samples = [
      { name: 'Supplier-Freight-Bill-4819.pdf', type: 'Invoice', conf: '99.0%', entities: 11, status: 'Verified', quality: '98.2%', latency: '390ms' },
      { name: 'Hilton-Hotel-Receipt-921.jpg', type: 'Receipt', conf: '98.5%', entities: 9, status: 'Verified', quality: '97.1%', latency: '290ms' },
      { name: 'W9-Taxpayer-Certification.pdf', type: 'Form (Tax)', conf: '99.4%', entities: 12, status: 'Verified', quality: '98.8%', latency: '440ms' }
    ];
    samples.forEach(s => BATCH_JOBS.push(s));
    renderBatchTable();
    showToast('Added 3 sample enterprise files to batch pipeline queue', 'success');
  }

  // =========================================================================
  // SCHEMA STUDIO & MODEL CONFIGURATION
  // =========================================================================

  function renderSchemaCards() {
    const list = elements.schemaCardsList;
    list.innerHTML = '';

    SCHEMAS.forEach((sc, idx) => {
      const item = document.createElement('div');
      item.className = `schema-card-item ${idx === state.activeSchemaIndex ? 'active' : ''}`;
      item.innerHTML = `
        <div class="schema-item-title">${sc.name}</div>
        <div class="schema-item-desc">${sc.description}</div>
        <div style="margin-top:0.4rem;display:flex;justify-content:space-between;align-items:center;font-size:0.68rem;color:var(--text-muted);">
          <span>Model: <code>${sc.modelId}</code></span>
          <span class="conf-pill high">${sc.threshold}% Thresh</span>
        </div>
      `;

      item.addEventListener('click', () => {
        loadSchema(idx);
      });

      list.appendChild(item);
    });
  }

  function loadSchema(idx) {
    state.activeSchemaIndex = idx;
    renderSchemaCards();
    const schema = SCHEMAS[idx];

    elements.editorSchemaName.textContent = schema.name;
    elements.editorSchemaType.textContent = `Classifier Model: \`${schema.modelId}\``;
    elements.thresholdSlider.value = schema.threshold;
    elements.thresholdVal.textContent = `${schema.threshold}%`;

    const tbody = elements.schemaFieldsTbody;
    tbody.innerHTML = '';

    schema.fields.forEach(f => {
      const tr = document.createElement('tr');
      tr.innerHTML = `
        <td><code>${f.key}</code></td>
        <td><strong>${f.name}</strong></td>
        <td><span class="class-tag">${f.type}</span></td>
        <td>${f.required ? '<span style="color:var(--accent-danger);font-weight:700;">Required</span>' : 'Optional'}</td>
        <td><code style="font-size:0.7rem;color:var(--accent-cyan);">${f.pattern}</code></td>
        <td><span class="conf-pill high">${f.minConf}%</span></td>
      `;
      tbody.appendChild(tr);
    });
  }

  function addSchemaFieldRow() {
    const key = prompt('Enter Field Key (e.g., po_reference):', 'customer_account_id');
    if (!key) return;
    const name = prompt('Enter Display Label:', 'Customer Account ID');
    if (!name) return;

    SCHEMAS[state.activeSchemaIndex].fields.push({
      key: key,
      name: name,
      type: 'String',
      required: false,
      pattern: '^[A-Z0-9_-]+$',
      minConf: 85
    });

    loadSchema(state.activeSchemaIndex);
    showToast(`Added extraction field "${key}" to schema`, 'success');
  }

  // =========================================================================
  // MODEL TELEMETRY & BUSINESS ROI CHARTS (SVG VISUALIZERS)
  // =========================================================================

  function renderAnalyticsCharts() {
    renderVolumeChart();
    renderDistributionChart();
    renderConfidenceChart();
    renderActiveLearningChart();
  }

  function renderVolumeChart() {
    const container = elements.chartVolumeContainer;
    const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
    const stpValues = [820, 940, 1120, 1050, 1280, 430, 310];
    const hitlValues = [120, 140, 160, 130, 170, 60, 40];
    const maxVal = 1500;

    let barsHtml = '';
    const chartW = 460;
    const chartH = 180;
    const barWidth = 28;
    const spacing = chartW / days.length;

    days.forEach((day, i) => {
      const x = i * spacing + 25;
      const totalH = ((stpValues[i] + hitlValues[i]) / maxVal) * chartH;
      const stpH = (stpValues[i] / maxVal) * chartH;
      const hitlH = (hitlValues[i] / maxVal) * chartH;

      const yStp = chartH - stpH;
      const yHitl = yStp - hitlH;

      barsHtml += `
        <!-- STP Bar (Green) -->
        <rect x="${x}" y="${yStp}" width="${barWidth}" height="${stpH}" rx="3" fill="#10b981" fill-opacity="0.85">
          <title>${day} STP: ${stpValues[i]} docs</title>
        </rect>
        <!-- HITL Bar (Amber) -->
        <rect x="${x}" y="${yHitl}" width="${barWidth}" height="${hitlH}" rx="3" fill="#f59e0b" fill-opacity="0.85">
          <title>${day} HITL Review: ${hitlValues[i]} docs</title>
        </rect>
        <text x="${x + barWidth / 2}" y="${chartH + 20}" font-size="10" font-family="var(--font-mono)" fill="#94a3b8" text-anchor="middle">${day}</text>
      `;
    });

    container.innerHTML = `
      <svg width="100%" height="100%" viewBox="0 0 500 220" style="overflow:visible;">
        <line x1="20" y1="${chartH}" x2="480" y2="${chartH}" stroke="rgba(255,255,255,0.1)" stroke-width="1"/>
        <line x1="20" y1="${chartH / 2}" x2="480" y2="${chartH / 2}" stroke="rgba(255,255,255,0.05)" stroke-dasharray="4 4"/>
        ${barsHtml}
      </svg>
    `;
  }

  function renderDistributionChart() {
    const container = elements.chartDistributionContainer;
    // Donut chart with categories
    const categories = [
      { name: 'Invoices', pct: 45, color: '#6366f1' },
      { name: 'Receipts', pct: 25, color: '#06b6d4' },
      { name: 'Forms', pct: 15, color: '#10b981' },
      { name: 'Certificates', pct: 10, color: '#f59e0b' },
      { name: 'Contracts', pct: 5, color: '#a855f7' }
    ];

    container.innerHTML = `
      <div style="display:flex;align-items:center;justify-content:center;gap:2rem;width:100%;height:100%;">
        <svg width="160" height="160" viewBox="0 0 42 42" class="donut">
          <circle class="donut-ring" cx="21" cy="21" r="15.915" fill="transparent" stroke="rgba(255,255,255,0.05)" stroke-width="6"></circle>
          <circle cx="21" cy="21" r="15.915" fill="transparent" stroke="#6366f1" stroke-width="6" stroke-dasharray="45 55" stroke-dashoffset="25"></circle>
          <circle cx="21" cy="21" r="15.915" fill="transparent" stroke="#06b6d4" stroke-width="6" stroke-dasharray="25 75" stroke-dashoffset="80"></circle>
          <circle cx="21" cy="21" r="15.915" fill="transparent" stroke="#10b981" stroke-width="6" stroke-dasharray="15 85" stroke-dashoffset="55"></circle>
          <circle cx="21" cy="21" r="15.915" fill="transparent" stroke="#f59e0b" stroke-width="6" stroke-dasharray="10 90" stroke-dashoffset="40"></circle>
          <circle cx="21" cy="21" r="15.915" fill="transparent" stroke="#a855f7" stroke-width="6" stroke-dasharray="5 95" stroke-dashoffset="30"></circle>
          <g class="chart-text">
            <text x="50%" y="46%" font-size="6" font-weight="bold" fill="#f8fafc" text-anchor="middle">28.4K</text>
            <text x="50%" y="60%" font-size="2.5" fill="#94a3b8" text-anchor="middle">Total Docs</text>
          </g>
        </svg>

        <div style="display:flex;flex-direction:column;gap:0.4rem;font-size:0.75rem;">
          ${categories.map(c => `
            <div style="display:flex;align-items:center;gap:0.5rem;">
              <span style="width:10px;height:10px;background:${c.color};border-radius:2px;"></span>
              <span style="color:var(--text-secondary);">${c.name}:</span>
              <span style="font-weight:700;font-family:var(--font-mono);">${c.pct}%</span>
            </div>
          `).join('')}
        </div>
      </div>
    `;
  }

  function renderConfidenceChart() {
    const container = elements.chartConfidenceContainer;
    container.innerHTML = `
      <svg width="100%" height="100%" viewBox="0 0 500 200">
        <defs>
          <linearGradient id="grad-conf" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stop-color="#ef4444"/>
            <stop offset="60%" stop-color="#f59e0b"/>
            <stop offset="85%" stop-color="#10b981"/>
            <stop offset="100%" stop-color="#06b6d4"/>
          </linearGradient>
        </defs>
        <!-- Bell curve of confidence -->
        <path d="M 20 180 Q 200 180 260 140 Q 340 70 400 20 Q 440 10 470 180 Z" fill="url(#grad-conf)" fill-opacity="0.25" stroke="url(#grad-conf)" stroke-width="2.5"/>
        <!-- Threshold Line -->
        <line x1="330" y1="10" x2="330" y2="180" stroke="#f59e0b" stroke-width="2" stroke-dasharray="4 4"/>
        <text x="335" y="30" font-size="10" fill="#f59e0b" font-weight="bold">88% Auto-Approve Threshold</text>
        <text x="80" y="160" font-size="10" fill="#94a3b8">&lt; 85% Flagged (13.6%)</text>
        <text x="370" y="120" font-size="11" fill="#10b981" font-weight="bold">&gt; 90% High Conf (86.4%)</text>
        <line x1="20" y1="180" x2="480" y2="180" stroke="rgba(255,255,255,0.1)"/>
      </svg>
    `;
  }

  function renderActiveLearningChart() {
    const container = elements.chartActiveLearningContainer;
    container.innerHTML = `
      <svg width="100%" height="100%" viewBox="0 0 500 200">
        <defs>
          <linearGradient id="grad-learn" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stop-color="#6366f1" stop-opacity="0.3"/>
            <stop offset="100%" stop-color="#6366f1" stop-opacity="0.0"/>
          </linearGradient>
        </defs>
        <path d="M 30 150 Q 150 130 250 90 T 470 40 L 470 180 L 30 180 Z" fill="url(#grad-learn)"/>
        <path d="M 30 150 Q 150 130 250 90 T 470 40" fill="none" stroke="#6366f1" stroke-width="3"/>
        <circle cx="470" cy="40" r="5" fill="#06b6d4" stroke="#ffffff" stroke-width="2"/>
        <text x="400" y="30" font-size="11" font-weight="bold" fill="#06b6d4">98.9% (+4.1%)</text>
        <text x="35" y="170" font-size="10" fill="#94a3b8">Baseline: 94.8%</text>
        <text x="240" y="170" font-size="10" fill="#94a3b8">1,200 HITL feedback cycles</text>
        <line x1="20" y1="180" x2="480" y2="180" stroke="rgba(255,255,255,0.1)"/>
      </svg>
    `;
  }

  // =========================================================================
  // EXPORT & WEBHOOK DISPATCH SIMULATOR
  // =========================================================================

  function copyJsonToClipboard() {
    const code = elements.jsonCodeBlock.querySelector('code').textContent;
    navigator.clipboard.writeText(code).then(() => {
      showToast('Standardized Document JSON copied to clipboard!', 'success');
    });
  }

  function downloadJsonExport() {
    const doc = DOCUMENTS[state.currentDocIndex];
    const code = elements.jsonCodeBlock.querySelector('code').textContent;
    const blob = new Blob([code], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${doc.title.replace(/\.[^/.]+$/, '')}_extracted.json`;
    a.click();
    URL.revokeObjectURL(url);
    showToast('JSON export downloaded successfully', 'success');
  }

  function downloadCsvExport() {
    const doc = DOCUMENTS[state.currentDocIndex];
    let csv = 'FieldKey,FieldLabel,ExtractedValue,ConfidenceScore\n';
    ['metadata', 'parties', 'financials'].forEach(grp => {
      if (doc.fields[grp]) {
        doc.fields[grp].forEach(f => {
          csv += `"${f.key}","${f.label}","${f.value.replace(/"/g, '""')}","${f.confidence}%"\n`;
        });
      }
    });

    if (doc.lineItems && doc.lineItems.length) {
      csv += '\nLineItemDescription,Quantity,UnitPrice,TotalAmount\n';
      doc.lineItems.forEach(item => {
        csv += `"${item.item.replace(/"/g, '""')}","${item.qty}","${item.unitPrice}","${item.total}"\n`;
      });
    }

    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${doc.title.replace(/\.[^/.]+$/, '')}_extracted.csv`;
    a.click();
    URL.revokeObjectURL(url);
    showToast('CSV export generated and downloaded', 'success');
  }

  function openWebhookModal() {
    const doc = DOCUMENTS[state.currentDocIndex];
    const payload = {
      event: 'document.extracted.verified',
      timestamp: new Date().toISOString(),
      document: {
        id: doc.id,
        filename: doc.title,
        type: doc.categoryLabel,
        classificationScore: doc.classificationScore / 100,
        averageConfidence: doc.confidenceScore / 100
      },
      fields: doc.fields,
      lineItems: doc.lineItems || []
    };

    elements.webhookPayloadCode.textContent = JSON.stringify(payload, null, 2);
    elements.webhookModal.style.display = 'flex';
  }

  function simulateWebhookDispatch() {
    showToast('Sending HTTP POST payload to configured enterprise endpoint...', 'info');
    elements.btnSimulatePost.disabled = true;

    setTimeout(() => {
      elements.btnSimulatePost.disabled = false;
      elements.webhookModal.style.display = 'none';
      showToast('HTTP 200 OK: Webhook received by ERP pipeline (Transaction ID: tx_984128)', 'success');
    }, 900);
  }

  // =========================================================================
  // TOAST NOTIFICATION UTILITY
  // =========================================================================

  function showToast(message, type = 'info') {
    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    const icon = type === 'success' ? '✓' : type === 'warning' ? '⚠' : 'ℹ';
    toast.innerHTML = `<span>${icon}</span><span>${message}</span>`;
    elements.toastContainer.appendChild(toast);

    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translateY(10px)';
      toast.style.transition = 'all 0.3s ease';
      setTimeout(() => toast.remove(), 300);
    }, 3500);
  }

  // =========================================================================
  // KEYBOARD SHORTCUTS
  // =========================================================================

  function handleKeyboardShortcuts(e) {
    if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;

    if (e.key === 'b' || e.key === 'B') {
      elements.btnToggleBoxes.click();
    } else if (e.key === 't' || e.key === 'T') {
      elements.btnToggleOcrText.click();
    } else if (e.key === 'h' || e.key === 'H') {
      elements.btnToggleHeatmap.click();
    } else if (e.key === 'f' || e.key === 'F') {
      fitToScreen();
    } else if (e.key === 'r' || e.key === 'R') {
      rotateDocument();
    } else if (e.key === '+' || e.key === '=') {
      updateZoom(state.zoom + 0.15);
    } else if (e.key === '-' || e.key === '_') {
      updateZoom(state.zoom - 0.15);
    }
  }

  // Run on DOM ready
  document.addEventListener('DOMContentLoaded', init);

})();
