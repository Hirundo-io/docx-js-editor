# @eigenpal/docx-js-editor

An open-source, extendable WYSIWYG DOCX editor for JavaScript.

## Demo

<!-- Add video here -->

## Installation

```bash
npm install @eigenpal/docx-js-editor
```

## Usage

```tsx
import DocxEditor from '@eigenpal/docx-js-editor';
import '@eigenpal/docx-js-editor/styles.css';

function App() {
  const handleChange = (document) => {
    console.log('Document changed:', document);
  };

  return <DocxEditor onChange={handleChange} />;
}
```

### Load a DOCX file

```tsx
import { parseDocx } from '@eigenpal/docx-js-editor';

const file = await fetch('/template.docx').then((r) => r.arrayBuffer());
const document = await parseDocx(file);

<DocxEditor initialDocument={document} />;
```

### Template variables

```tsx
import { processTemplate } from '@eigenpal/docx-js-editor';

const result = await processTemplate(docxBuffer, {
  name: 'John Doe',
  company: 'Acme Inc',
});
```

## Features

- Full WYSIWYG editing with Microsoft Word fidelity
- Open, edit, and save DOCX files directly in the browser
- Template variable support (`{{variable}}`)
- Extendable plugin architecture
- Zero server dependencies — runs entirely client-side

## Development

```bash
bun install
bun run dev
```

## Contributing

This is an open-source project. Contributions are welcome!

- [Open an issue](https://github.com/eigenpal/docx-js-editor/issues) to report bugs or request features
- Submit pull requests to help improve the editor

## License

MIT
