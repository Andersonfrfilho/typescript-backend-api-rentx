* Migration - MongoDB
* Implementar Kafka
* health check

```json
{
  //Defini o tema e icones
  "workbench.colorTheme": "Omni",
  "workbench.iconTheme": "material-icon-theme",
  "workbench.editor.enablePreview": false,
  "workbench.editor.labelFormat": "short", 

  //Terminal
  "terminal.integrated.fontSize": 14,
  "terminal.integrated.shell.linux": "/bin/zsh",
  
  //Configura tamanho e familia da fonte
  "editor.fontFamily": "Fira Code",
  "editor.fontLigatures": true,
  "editor.fontSize": 16,
  "editor.renderLineHighlight": "gutter",
  "editor.parameterHints.enabled": false,
  "editor.tabSize": 2,
  "editor.rulers": [80, 120],
  "editor.lineHeight": 24,
  "editor.semanticHighlighting.enabled": false,
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
  },
  //explorer
  "explorer.confirmDelete": false,
  "explorer.compactFolders": false,
  "explorer.confirmDragAndDrop": false,
  
  //breadcrumbs
  "breadcrumbs.enabled": true,

  //typescript
  "typescript.updateImportsOnFileMove.enabled": "never",

  //javascript
  "javascript.updateImportsOnFileMove.enabled": "never",

  // code Speell
  "cSpell.language": "en,pt,pt_BR",

  //emmet
  "emmet.syntaxProfiles": {
    "javascript": "jsx"
  },
  "emmet.includeLanguages": {
    "javascript": "javascriptreact"
  },
  
  //material ui
  "material-icon-theme.folders.associations": {
    "infra": "app",
    "entities": "class",
    "schemas": "class",
    "typeorm": "database",
    "repositories": "mappings",
    "http": "container",
    "migrations": "tools",
    "modules": "components",
    "implementations": "core",
    "dtos": "typescript",
    "fakes": "mock",
    "websockets": "pipe",
    "protos": "pipe",
    "grpc": "pipe"
  },
  "material-icon-theme.files.associations": {
    "ormconfig.json": "database",
    "tsconfig.json": "tune",
    "*.proto": "3d"
  },
  //tabnine
  "tabnine.experimentalAutoImports": true,
}
```