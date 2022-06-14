export const customCss = `
  ::-webkit-scrollbar {
    width: 0px;
    height: 6px;

    background: transparent;
  }

  ::-webkit-scrollbar-corner {
    background: rgba(0, 0, 0, 0);
  }

  ::-webkit-scrollbar-track {
    border-radius: 7px;
  }

  ::-webkit-scrollbar-thumb {
    background: #00bfff;
    border-radius: 7px;
  }

  button {
    outline: 0 !important;
  }

  textarea {
    resize: vertical !important;
    min-height: 120px !important;
    background: #282828 !important;
    color: #c3c3c3 !important;
  }

  .swagger-ui .operation-tag-content button svg {
    margin-right: 10px;
  }

  .swagger-ui .operation-tag-content button:last-of-type svg {
    margin-right: 20px;
  }

  .swagger-ui button.locked svg,
  .swagger-ui button.unlocked svg {
    margin-right: 10px !important;
  }

  html, body, #swagger-ui {
    height: 100%;
    background: #1B203C;

    overflow: hidden;
  }

  .scheme-container {
    background: #1B203C !important;
  }

  .modal-ux {
    background: #232323 !important;
    border-color: #121212 !important;
  }

  .modal-ux h1,
  .modal-ux h2,
  .modal-ux h3,
  .modal-ux h4,
  .modal-ux h5,
  .modal-ux h6,
  .modal-ux p,
  .modal-ux label,
  .modal-ux strong,
  .modal-ux span,
  .modal-ux .button {
    color: #fbfbfb !important;
  }

  .modal-ux .modal-ux-header {
    border-color: #121212 !important;
  }

  #swagger-ui {
    overflow: scroll;
  }

  .swagger-ui .topbar {
    background: linear-gradient(45deg, #131D31 0%, #304875 100%);
    box-shadow: 2px 2px 6px 4px rgb(0 0 0 / 30%);
  }

  .title, .responses-table td, h4, h5, span, th, table a, input {
    color: #fbfbfb !important;
  }

  input {
    background: #232323 !important;
    border-color: #fbfbfb !important;

    color: #fbfbfb !important;
  }

  select {
    background: #1b203c !important;
    color: #fbfbfb !important;
    border-color: #89bf04 !important;
  }

  svg {
    fill: #fbfbfb;
  }

  table div, p, pre, pre span, pre code, pre code span {
    color: #c3c3c3 !important;
  }

  .swagger-ui .opblock .opblock-section-header {
    background: #131D31;
  }

  .opblock-summary-description {
    color: #fbfbfb !important;
  }

  .swagger-ui .btn {
    color: #fbfbfb !important;
    border: 2px solid #89bf04 !important;
    background: #89bf04;
  }

  .swagger-ui .btn:hover {
    color: #89bf04 !important;
    background: transparent;
  }

  .swagger-ui .execute-wrapper {
    padding: 0;
  }

  .property-row td {
    color: #c3c3c3 !important;
  }

  .swagger-ui table tbody tr td {
    padding: 0;
    vertical-align: inherit;
  }

  .tablinks {
    color: #fbfbfb !important;
  }

  pre.version {
    color: #fbfbfb !important;
  }
`;
