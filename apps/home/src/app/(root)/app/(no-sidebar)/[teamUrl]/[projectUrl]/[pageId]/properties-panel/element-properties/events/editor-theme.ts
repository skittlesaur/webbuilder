import type monaco from 'monaco-editor'

const EditorTheme: monaco.editor.IStandaloneThemeData = {
  inherit: false,
  base: 'vs-dark',
  colors: {
    foreground: '#b0a6c9',
    focusBorder: '#4311b2',
    'selection.background': '#5b5694db',
    'scrollbar.shadow': '#000000',
    'activityBar.foreground': '#af98e4',
    'activityBar.background': '#221a34',
    'activityBar.inactiveForeground': '#a391cd',
    'activityBarBadge.foreground': '#ffffff',
    'activityBarBadge.background': '#7246d3',
    'activityBar.border': '#ffffff00',
    'activityBar.activeBackground': '#372a56',
    'sideBar.background': '#2b1f47',
    'sideBar.foreground': '#e9e0ff',
    'sideBarSectionHeader.background': '#291e3b7e',
    'sideBarSectionHeader.foreground': '#cccccc',
    'sideBarSectionHeader.border': '#cccccc1c',
    'sideBarTitle.foreground': '#ffffffd1',
    'sideBar.border': '#9d484800',
    'list.inactiveSelectionBackground': '#4311b2',
    'list.inactiveSelectionForeground': '#cccccc',
    'list.hoverBackground': '#573d94',
    'list.hoverForeground': '#cccccc',
    'list.activeSelectionBackground': '#4419a3',
    'list.activeSelectionForeground': '#ffffff',
    'tree.indentGuidesStroke': '#c0a6ff',
    'list.dropBackground': '#371c71',
    'list.highlightForeground': '#8047ff',
    'list.focusBackground': '#4719ad',
    'list.focusForeground': '#cccccc',
    'listFilterWidget.background': '#584fbc',
    'listFilterWidget.outline': '#00000000',
    'listFilterWidget.noMatchesOutline': '#6456a7',
    'statusBar.foreground': '#e7deff',
    'statusBar.background': '#423364',
    'statusBarItem.hoverBackground': '#ffffff1f',
    'statusBar.debuggingBackground': '#cb2dab',
    'statusBar.debuggingForeground': '#ffffff',
    'statusBar.noFolderBackground': '#8e48a1',
    'statusBar.noFolderForeground': '#ffffff',
    'statusBarItem.remoteBackground': '#361973',
    'statusBarItem.remoteForeground': '#ffffff',
    'titleBar.activeBackground': '#221a34',
    'titleBar.activeForeground': '#d9c9ff',
    'titleBar.inactiveBackground': '#3c3c3c99',
    'titleBar.inactiveForeground': '#cccccc99',
    'titleBar.border': '#00000000',
    'menubar.selectionForeground': '#eae1ff',
    'menubar.selectionBackground': '#b6adad1a',
    'menu.foreground': '#cccccc',
    'menu.background': '#2f2a3b',
    'menu.selectionForeground': '#ffffff',
    'menu.selectionBackground': '#4e4366',
    'menu.selectionBorder': '#00000000',
    'menu.separatorBackground': '#ffffff',
    'menu.border': '#00000085',
    'button.background': '#4311b2',
    'button.foreground': '#ffffff',
    'button.hoverBackground': '#7c51d9',
    'button.secondaryForeground': '#ffffff',
    'button.secondaryBackground': '#3a3d41',
    'button.secondaryHoverBackground': '#45494e',
    'input.background': '#46278a',
    'input.border': '#00000000',
    'input.foreground': '#cccccc',
    'inputOption.activeBackground': '#a8bbc966',
    'inputOption.activeBorder': '#007acc00',
    'inputOption.activeForeground': '#ffffff',
    'input.placeholderForeground': '#a6a6a6',
    'textLink.foreground': '#4e9bff',
    'editor.background': '#121825',
    'editor.foreground': '#ffffff',
    'editorLineNumber.foreground': '#ffffff',
    'editorCursor.foreground': '#aeafad',
    'editorCursor.background': '#000000',
    'editor.selectionBackground': '#402d6b',
    'editor.inactiveSelectionBackground': '#13171d',
    'editorWhitespace.foreground': '#e3e4e229',
    'editor.selectionHighlightBackground': '#add6ff26',
    'editor.selectionHighlightBorder': '#495F77',
    'editor.findMatchBackground': '#515c6a',
    'editor.findMatchBorder': '#74879f',
    'editor.findMatchHighlightBackground': '#ea5c0055',
    'editor.findMatchHighlightBorder': '#ffffff00',
    'editor.findRangeHighlightBackground': '#3a3d4166',
    'editor.findRangeHighlightBorder': '#ffffff00',
    'editor.rangeHighlightBackground': '#ffffff0b',
    'editor.rangeHighlightBorder': '#ffffff00',
    'editor.hoverHighlightBackground': '#264f7840',
    'editor.wordHighlightStrongBackground': '#004972b8',
    'editor.wordHighlightBackground': '#575757b8',
    'editor.lineHighlightBackground': '#ffffff0A',
    'editor.lineHighlightBorder': '#282828',
    'editorLineNumber.activeForeground': '#923FDE',
    'editorLink.activeForeground': '#4e94ce',
    'editorIndentGuide.background': '#404040',
    'editorIndentGuide.activeBackground': '#707070',
    'editorRuler.foreground': '#5a5a5a',
    'editorBracketMatch.background': '#0064001a',
    'editorBracketMatch.border': '#888888',
    'editor.foldBackground': '#264f784d',
    'editorOverviewRuler.background': '#25252500',
    'editorOverviewRuler.border': '#7f7f7f4d',
    'editorError.foreground': '#f48771',
    'editorError.background': '#B73A3400',
    'editorError.border': '#ffffff00',
    'editorWarning.foreground': '#cca700',
    'editorWarning.background': '#A9904000',
    'editorWarning.border': '#ffffff00',
    'editorInfo.foreground': '#75beff',
    'editorInfo.background': '#4490BF00',
    'editorInfo.border': '#4490BF00',
    'editorGutter.background': '#121825',
    'editorGutter.modifiedBackground': '#0c7d9d',
    'editorGutter.addedBackground': '#587c0c',
    'editorGutter.deletedBackground': '#94151b',
    'editorGutter.foldingControlForeground': '#c5c5c5',
    'editorCodeLens.foreground': '#999999',
    'editorGroup.border': '#472e80',
    'diffEditor.insertedTextBackground': '#9bb95533',
    'diffEditor.removedTextBackground': '#ff000033',
    'diffEditor.border': '#444444',
    'panel.background': '#211932',
    'panel.border': '#80808059',
    'panelTitle.activeBorder': '#e7e7e7',
    'panelTitle.activeForeground': '#e7e7e7',
    'panelTitle.inactiveForeground': '#e7e7e799',
    'badge.background': '#6b46ba',
    'badge.foreground': '#ffffff',
    'terminal.foreground': '#cccccc',
    'terminal.selectionBackground': '#ffffff40',
    'terminalCursor.background': '#6a4fa3',
    'terminalCursor.foreground': '#ffffff',
    'terminal.border': '#80808059',
    'terminal.ansiBlack': '#000000',
    'terminal.ansiBlue': '#2472c8',
    'terminal.ansiBrightBlack': '#666666',
    'terminal.ansiBrightBlue': '#3b8eea',
    'terminal.ansiBrightCyan': '#29b8db',
    'terminal.ansiBrightGreen': '#23d18b',
    'terminal.ansiBrightMagenta': '#d670d6',
    'terminal.ansiBrightRed': '#f14c4c',
    'terminal.ansiBrightWhite': '#e5e5e5',
    'terminal.ansiBrightYellow': '#f5f543',
    'terminal.ansiCyan': '#11a8cd',
    'terminal.ansiGreen': '#0dbc79',
    'terminal.ansiMagenta': '#bc3fbc',
    'terminal.ansiRed': '#cd3131',
    'terminal.ansiWhite': '#e5e5e5',
    'terminal.ansiYellow': '#e5e510',
    'breadcrumb.background': '#221a34',
    'breadcrumb.foreground': '#ffffffcc',
    'breadcrumb.focusForeground': '#e0e0e0',
    'editorGroupHeader.tabsBackground': '#352754',
    'tab.activeForeground': '#d9c9ff',
    'tab.border': '#d9c9ff',
    'tab.activeBackground': '#221a34',
    'tab.activeBorder': '#00000000',
    'tab.activeBorderTop': '#00000000',
    'tab.inactiveBackground': '#342851',
    'tab.inactiveForeground': '#d9c9ff',
    'scrollbarSlider.background': '#79797966',
    'scrollbarSlider.hoverBackground': '#646464b3',
    'scrollbarSlider.activeBackground': '#bfbfbf66',
    'progressBar.background': '#875de4',
    'widget.shadow': '#0000005c',
    'editorWidget.foreground': '#cccccc',
    'editorWidget.background': '#23173d',
    'editorWidget.resizeBorder': '#5F5F5F',
    'pickerGroup.border': '#3f3f46',
    'pickerGroup.foreground': '#905ff9',
    'debugToolBar.background': '#333333',
    'debugToolBar.border': '#474747',
    'notifications.foreground': '#cccccc',
    'notifications.background': '#451a42',
    'notificationToast.border': '#474747',
    'notificationsErrorIcon.foreground': '#f48771',
    'notificationsWarningIcon.foreground': '#cca700',
    'notificationsInfoIcon.foreground': '#75beff',
    'notificationCenter.border': '#474747',
    'notificationCenterHeader.foreground': '#cccccc',
    'notificationCenterHeader.background': '#070734',
    'notifications.border': '#303031',
    'gitDecoration.addedResourceForeground': '#81b88b',
    'gitDecoration.conflictingResourceForeground': '#6c6cc4',
    'gitDecoration.deletedResourceForeground': '#c74e39',
    'gitDecoration.ignoredResourceForeground': '#8c8c8c',
    'gitDecoration.modifiedResourceForeground': '#e2c08d',
    'gitDecoration.stageDeletedResourceForeground': '#c74e39',
    'gitDecoration.stageModifiedResourceForeground': '#e2c08d',
    'gitDecoration.submoduleResourceForeground': '#8db9e2',
    'gitDecoration.untrackedResourceForeground': '#73c991',
    'editorMarkerNavigation.background': '#2d2d30',
    'editorMarkerNavigationError.background': '#f48771',
    'editorMarkerNavigationWarning.background': '#cca700',
    'editorMarkerNavigationInfo.background': '#75beff',
    'merge.currentHeaderBackground': '#367366',
    'merge.currentContentBackground': '#27403B',
    'merge.incomingHeaderBackground': '#395F8F',
    'merge.incomingContentBackground': '#28384B',
    'merge.commonHeaderBackground': '#383838',
    'merge.commonContentBackground': '#282828',
    'editorSuggestWidget.background': '#1a1a3b',
    'editorSuggestWidget.border': '#454545',
    'editorSuggestWidget.foreground': '#d4d4d4',
    'editorSuggestWidget.highlightForeground': '#8853fd',
    'editorSuggestWidget.selectedBackground': '#3c2954',
    'editorHoverWidget.foreground': '#cccccc',
    'editorHoverWidget.background': '#0f0f2a',
    'editorHoverWidget.border': '#383434',
    'peekView.border': '#007acc',
    'peekViewEditor.background': '#001f33',
    'peekViewEditorGutter.background': '#001f33',
    'peekViewEditor.matchHighlightBackground': '#ff8f0099',
    'peekViewEditor.matchHighlightBorder': '#ee931e',
    'peekViewResult.background': '#252526',
    'peekViewResult.fileForeground': '#ffffff',
    'peekViewResult.lineForeground': '#bbbbbb',
    'peekViewResult.matchHighlightBackground': '#ea5c004d',
    'peekViewResult.selectionBackground': '#3399ff33',
    'peekViewResult.selectionForeground': '#ffffff',
    'peekViewTitle.background': '#1e1e1e',
    'peekViewTitleDescription.foreground': '#ccccccb3',
    'peekViewTitleLabel.foreground': '#ffffff',
    'icon.foreground': '#b0a6c9',
    'checkbox.background': '#46278a',
    'checkbox.foreground': '#cccccc',
    'checkbox.border': '#00000000',
    'dropdown.background': '#46278a',
    'dropdown.foreground': '#cccccc',
    'dropdown.border': '#00000000',
    'minimapGutter.addedBackground': '#587c0c',
    'minimapGutter.modifiedBackground': '#0c7d9d',
    'minimapGutter.deletedBackground': '#94151b',
    'minimap.findMatchHighlight': '#515c6a',
    'minimap.selectionHighlight': '#402d6b',
    'minimap.errorHighlight': '#f48771',
    'minimap.warningHighlight': '#cca700',
    'minimap.background': '#121825',
    'sideBar.dropBackground': '#371c71',
    'editorGroup.emptyBackground': '#121825',
    'panelSection.border': '#80808059',
    'statusBarItem.activeBackground': '#FFFFFF25',
    'settings.headerForeground': '#b0a6c9',
    'settings.focusedRowBackground': '#ffffff07',
    'walkThrough.embeddedEditorBackground': '#00000050',
    'breadcrumb.activeSelectionForeground': '#e0e0e0',
    'editorGutter.commentRangeForeground': '#c5c5c5',
    'debugExceptionWidget.background': '#333333',
    'debugExceptionWidget.border': '#474747',
  },
  rules: [
    {
      foreground: '#ff4e5b',
      token: 'punctuation.definition.delayed.unison',
    },
    {
      foreground: '#ff4e5b',
      token: 'punctuation.definition.list.begin.unison',
    },
    {
      foreground: '#ff4e5b',
      token: 'punctuation.definition.list.end.unison',
    },
    {
      foreground: '#ff4e5b',
      token: 'punctuation.definition.ability.begin.unison',
    },
    {
      foreground: '#ff4e5b',
      token: 'punctuation.definition.ability.end.unison',
    },
    {
      foreground: '#ff4e5b',
      token: 'punctuation.operator.assignment.as.unison',
    },
    {
      foreground: '#ff4e5b',
      token: 'punctuation.separator.pipe.unison',
    },
    {
      foreground: '#ff4e5b',
      token: 'punctuation.separator.delimiter.unison',
    },
    {
      foreground: '#ff4e5b',
      token: 'punctuation.definition.hash.unison',
    },
    {
      foreground: '#d750ff',
      token: 'variable.other.generic-type.haskell',
    },
    {
      foreground: '#d19a66',
      token: 'storage.type.haskell',
    },
    {
      foreground: '#ff4e5b',
      token: 'support.variable.magic.python',
    },
    {
      foreground: '#ffffff',
      token: 'punctuation.separator.period.python',
    },
    {
      foreground: '#ffffff',
      token: 'punctuation.separator.element.python',
    },
    {
      foreground: '#ffffff',
      token: 'punctuation.parenthesis.begin.python',
    },
    {
      foreground: '#ffffff',
      token: 'punctuation.parenthesis.end.python',
    },
    {
      foreground: '#e5c07b',
      token: 'variable.parameter.function.language.special.self.python',
    },
    {
      foreground: '#ffffff',
      token: 'storage.modifier.lifetime.rust',
    },
    {
      foreground: '#3ca4f9',
      token: 'support.function.std.rust',
    },
    {
      foreground: '#e5c07b',
      token: 'entity.name.lifetime.rust',
    },
    {
      foreground: '#ff4e5b',
      token: 'variable.language.rust',
    },
    {
      foreground: '#d750ff',
      token: 'support.constant.edge',
    },
    {
      foreground: '#ff4e5b',
      token: 'constant.other.character-class.regexp',
    },
    {
      foreground: '#d19a66',
      token: 'keyword.operator.quantifier.regexp',
    },
    {
      foreground: '#98c379',
      token: 'punctuation.definition.string.begin',
    },
    {
      foreground: '#98c379',
      token: 'punctuation.definition.string.end',
    },
    {
      foreground: '#ffffff',
      token: 'variable.parameter.function',
    },
    {
      foreground: '#9785c2',
      token: 'comment markup.link',
    },
    {
      foreground: '#e5c07b',
      token: 'markup.changed.diff',
    },
    {
      foreground: '#3ca4f9',
      token: 'meta.diff.header.from-file',
    },
    {
      foreground: '#3ca4f9',
      token: 'meta.diff.header.to-file',
    },
    {
      foreground: '#3ca4f9',
      token: 'punctuation.definition.from-file.diff',
    },
    {
      foreground: '#3ca4f9',
      token: 'punctuation.definition.to-file.diff',
    },
    {
      foreground: '#98c379',
      token: 'markup.inserted.diff',
    },
    {
      foreground: '#ff4e5b',
      token: 'markup.deleted.diff',
    },
    {
      foreground: '#ff4e5b',
      token: 'meta.function.c',
    },
    {
      foreground: '#ff4e5b',
      token: 'meta.function.cpp',
    },
    {
      foreground: '#ffffff',
      token: 'punctuation.section.block.begin.bracket.curly.cpp',
    },
    {
      foreground: '#ffffff',
      token: 'punctuation.section.block.end.bracket.curly.cpp',
    },
    {
      foreground: '#ffffff',
      token: 'punctuation.terminator.statement.c',
    },
    {
      foreground: '#ffffff',
      token: 'punctuation.section.block.begin.bracket.curly.c',
    },
    {
      foreground: '#ffffff',
      token: 'punctuation.section.block.end.bracket.curly.c',
    },
    {
      foreground: '#ffffff',
      token: 'punctuation.section.parens.begin.bracket.round.c',
    },
    {
      foreground: '#ffffff',
      token: 'punctuation.section.parens.end.bracket.round.c',
    },
    {
      foreground: '#ffffff',
      token: 'punctuation.section.parameters.begin.bracket.round.c',
    },
    {
      foreground: '#ffffff',
      token: 'punctuation.section.parameters.end.bracket.round.c',
    },
    {
      foreground: '#ffffff',
      token: 'punctuation.separator.key-value',
    },
    {
      foreground: '#3ca4f9',
      token: 'keyword.operator.expression.import',
    },
    {
      foreground: '#e5c07b',
      token: 'support.constant.math',
    },
    {
      foreground: '#d19a66',
      token: 'support.constant.property.math',
    },
    {
      foreground: '#e5c07b',
      token: 'variable.other.constant',
    },
    {
      foreground: '#e5c07b',
      token: 'storage.type.annotation.java',
    },
    {
      foreground: '#e5c07b',
      token: 'storage.type.object.array.java',
    },
    {
      foreground: '#ff4e5b',
      token: 'source.java',
    },
    {
      foreground: '#ffffff',
      token: 'punctuation.section.block.begin.java',
    },
    {
      foreground: '#ffffff',
      token: 'punctuation.section.block.end.java',
    },
    {
      foreground: '#ffffff',
      token: 'punctuation.definition.method-parameters.begin.java',
    },
    {
      foreground: '#ffffff',
      token: 'punctuation.definition.method-parameters.end.java',
    },
    {
      foreground: '#ffffff',
      token: 'meta.method.identifier.java',
    },
    {
      foreground: '#ffffff',
      token: 'punctuation.section.method.begin.java',
    },
    {
      foreground: '#ffffff',
      token: 'punctuation.section.method.end.java',
    },
    {
      foreground: '#ffffff',
      token: 'punctuation.terminator.java',
    },
    {
      foreground: '#ffffff',
      token: 'punctuation.section.class.begin.java',
    },
    {
      foreground: '#ffffff',
      token: 'punctuation.section.class.end.java',
    },
    {
      foreground: '#ffffff',
      token: 'punctuation.section.inner-class.begin.java',
    },
    {
      foreground: '#ffffff',
      token: 'punctuation.section.inner-class.end.java',
    },
    {
      foreground: '#ffffff',
      token: 'meta.method-call.java',
    },
    {
      foreground: '#ffffff',
      token: 'punctuation.section.class.begin.bracket.curly.java',
    },
    {
      foreground: '#ffffff',
      token: 'punctuation.section.class.end.bracket.curly.java',
    },
    {
      foreground: '#ffffff',
      token: 'punctuation.section.method.begin.bracket.curly.java',
    },
    {
      foreground: '#ffffff',
      token: 'punctuation.section.method.end.bracket.curly.java',
    },
    {
      foreground: '#ffffff',
      token: 'punctuation.separator.period.java',
    },
    {
      foreground: '#ffffff',
      token: 'punctuation.bracket.angle.java',
    },
    {
      foreground: '#ffffff',
      token: 'punctuation.definition.annotation.java',
    },
    {
      foreground: '#ffffff',
      token: 'meta.method.body.java',
    },
    {
      foreground: '#3ca4f9',
      token: 'meta.method.java',
    },
    {
      foreground: '#e5c07b',
      token: 'storage.modifier.import.java',
    },
    {
      foreground: '#e5c07b',
      token: 'storage.type.java',
    },
    {
      foreground: '#e5c07b',
      token: 'storage.type.generic.java',
    },
    {
      foreground: '#d750ff',
      token: 'keyword.operator.instanceof.java',
    },
    {
      foreground: '#ff4e5b',
      token: 'meta.definition.variable.name.java',
    },
    {
      foreground: '#56b6c2',
      token: 'keyword.operator.logical',
    },
    {
      foreground: '#56b6c2',
      token: 'keyword.operator.bitwise',
    },
    {
      foreground: '#56b6c2',
      token: 'keyword.operator.channel',
    },
    {
      foreground: '#d19a66',
      token: 'support.constant.property-value.scss',
    },
    {
      foreground: '#d19a66',
      token: 'support.constant.property-value.css',
    },
    {
      foreground: '#56b6c2',
      token: 'keyword.operator.css',
    },
    {
      foreground: '#56b6c2',
      token: 'keyword.operator.scss',
    },
    {
      foreground: '#56b6c2',
      token: 'keyword.operator.less',
    },
    {
      foreground: '#d19a66',
      token: 'support.constant.color.w3c-standard-color-name.css',
    },
    {
      foreground: '#d19a66',
      token: 'support.constant.color.w3c-standard-color-name.scss',
    },
    {
      foreground: '#ffffff',
      token: 'punctuation.separator.list.comma.css',
    },
    {
      foreground: '#d19a66',
      token: 'support.constant.color.w3c-standard-color-name.css',
    },
    {
      foreground: '#56b6c2',
      token: 'support.type.vendored.property-name.css',
    },
    {
      foreground: '#e5c07b',
      token: 'support.module.node',
    },
    {
      foreground: '#e5c07b',
      token: 'support.type.object.module',
    },
    {
      foreground: '#e5c07b',
      token: 'support.module.node',
    },
    {
      foreground: '#e5c07b',
      token: 'entity.name.type.module',
    },
    {
      foreground: '#ff4e5b',
      token: 'variable.other.readwrite',
    },
    {
      foreground: '#ff4e5b',
      token: 'meta.object-literal.key',
    },
    {
      foreground: '#ff4e5b',
      token: 'support.variable.property',
    },
    {
      foreground: '#ff4e5b',
      token: 'support.variable.object.process',
    },
    {
      foreground: '#ff4e5b',
      token: 'support.variable.object.node',
    },
    {
      foreground: '#d19a66',
      token: 'support.constant.json',
    },
    {
      foreground: '#d750ff',
      token: 'keyword.operator.expression.instanceof',
    },
    {
      foreground: '#d750ff',
      token: 'keyword.operator.new',
    },
    {
      foreground: '#d750ff',
      token: 'keyword.operator.ternary',
    },
    {
      foreground: '#d750ff',
      token: 'keyword.operator.optional',
    },
    {
      foreground: '#d750ff',
      token: 'keyword.operator.expression.keyof',
    },
    {
      foreground: '#ff4e5b',
      token: 'support.type.object.console',
    },
    {
      foreground: '#d19a66',
      token: 'support.variable.property.process',
    },
    {
      foreground: '#3ca4f9',
      token: 'entity.name.function',
    },
    {
      foreground: '#3ca4f9',
      token: 'support.function.console',
    },
    {
      foreground: '#ffffff',
      token: 'keyword.operator.misc.rust',
    },
    {
      foreground: '#d750ff',
      token: 'keyword.operator.sigil.rust',
    },
    {
      foreground: '#d750ff',
      token: 'keyword.operator.delete',
    },
    {
      foreground: '#56b6c2',
      token: 'support.type.object.dom',
    },
    {
      foreground: '#ff4e5b',
      token: 'support.variable.dom',
    },
    {
      foreground: '#ff4e5b',
      token: 'support.variable.property.dom',
    },
    {
      foreground: '#56b6c2',
      token: 'keyword.operator.arithmetic',
    },
    {
      foreground: '#56b6c2',
      token: 'keyword.operator.comparison',
    },
    {
      foreground: '#56b6c2',
      token: 'keyword.operator.decrement',
    },
    {
      foreground: '#56b6c2',
      token: 'keyword.operator.increment',
    },
    {
      foreground: '#56b6c2',
      token: 'keyword.operator.relational',
    },
    {
      foreground: '#d750ff',
      token: 'keyword.operator.assignment.c',
    },
    {
      foreground: '#d750ff',
      token: 'keyword.operator.comparison.c',
    },
    {
      foreground: '#d750ff',
      token: 'keyword.operator.c',
    },
    {
      foreground: '#d750ff',
      token: 'keyword.operator.increment.c',
    },
    {
      foreground: '#d750ff',
      token: 'keyword.operator.decrement.c',
    },
    {
      foreground: '#d750ff',
      token: 'keyword.operator.bitwise.shift.c',
    },
    {
      foreground: '#d750ff',
      token: 'keyword.operator.assignment.cpp',
    },
    {
      foreground: '#d750ff',
      token: 'keyword.operator.comparison.cpp',
    },
    {
      foreground: '#d750ff',
      token: 'keyword.operator.cpp',
    },
    {
      foreground: '#d750ff',
      token: 'keyword.operator.increment.cpp',
    },
    {
      foreground: '#d750ff',
      token: 'keyword.operator.decrement.cpp',
    },
    {
      foreground: '#d750ff',
      token: 'keyword.operator.bitwise.shift.cpp',
    },
    {
      foreground: '#ffffff',
      token: 'punctuation.separator.delimiter',
    },
    {
      foreground: '#d750ff',
      token: 'punctuation.separator.c',
    },
    {
      foreground: '#d750ff',
      token: 'punctuation.separator.cpp',
    },
    {
      foreground: '#56b6c2',
      token: 'support.type.posix-reserved.c',
    },
    {
      foreground: '#56b6c2',
      token: 'support.type.posix-reserved.cpp',
    },
    {
      foreground: '#d750ff',
      token: 'keyword.operator.sizeof.c',
    },
    {
      foreground: '#d750ff',
      token: 'keyword.operator.sizeof.cpp',
    },
    {
      foreground: '#d19a66',
      token: 'variable.parameter.function.language.python',
    },
    {
      foreground: '#56b6c2',
      token: 'support.type.python',
    },
    {
      foreground: '#d750ff',
      token: 'keyword.operator.logical.python',
    },
    {
      foreground: '#d19a66',
      token: 'variable.parameter.function.python',
    },
    {
      foreground: '#ffffff',
      token: 'punctuation.definition.arguments.begin.python',
    },
    {
      foreground: '#ffffff',
      token: 'punctuation.definition.arguments.end.python',
    },
    {
      foreground: '#ffffff',
      token: 'punctuation.separator.arguments.python',
    },
    {
      foreground: '#ffffff',
      token: 'punctuation.definition.list.begin.python',
    },
    {
      foreground: '#ffffff',
      token: 'punctuation.definition.list.end.python',
    },
    {
      foreground: '#3ca4f9',
      token: 'meta.function-call.generic.python',
    },
    {
      foreground: '#d19a66',
      token: 'constant.character.format.placeholder.other.python',
    },
    {
      foreground: '#ffffff',
      token: 'keyword.operator',
    },
    {
      foreground: '#d750ff',
      token: 'keyword.operator.assignment.compound',
    },
    {
      foreground: '#56b6c2',
      token: 'keyword.operator.assignment.compound.js',
    },
    {
      foreground: '#56b6c2',
      token: 'keyword.operator.assignment.compound.ts',
    },
    {
      foreground: '#d750ff',
      token: 'keyword',
    },
    {
      foreground: '#e5c07b',
      token: 'entity.name.namespace',
    },
    {
      foreground: '#ff4e5b',
      token: 'variable',
    },
    {
      foreground: '#ffffff',
      token: 'variable.c',
    },
    {
      foreground: '#e5c07b',
      token: 'variable.language',
    },
    {
      foreground: '#ffffff',
      token: 'token.variable.parameter.java',
    },
    {
      foreground: '#e5c07b',
      token: 'import.storage.java',
    },
    {
      foreground: '#d750ff',
      token: 'token.package.keyword',
    },
    {
      foreground: '#ffffff',
      token: 'token.package',
    },
    {
      foreground: '#3ca4f9',
      token: 'entity.name.function',
    },
    {
      foreground: '#3ca4f9',
      token: 'meta.require',
    },
    {
      foreground: '#3ca4f9',
      token: 'support.function.any-method',
    },
    {
      foreground: '#3ca4f9',
      token: 'variable.function',
    },
    {
      foreground: '#e5c07b',
      token: 'entity.name.type.namespace',
    },
    {
      foreground: '#e5c07b',
      token: 'support.class',
    },
    {
      foreground: '#e5c07b',
      token: ' entity.name.type.class',
    },
    {
      foreground: '#e5c07b',
      token: 'entity.name.class.identifier.namespace.type',
    },
    {
      foreground: '#e5c07b',
      token: 'entity.name.class',
    },
    {
      foreground: '#e5c07b',
      token: 'variable.other.class.js',
    },
    {
      foreground: '#e5c07b',
      token: 'variable.other.class.ts',
    },
    {
      foreground: '#ff4e5b',
      token: 'variable.other.class.php',
    },
    {
      foreground: '#e5c07b',
      token: 'entity.name.type',
    },
    {
      foreground: '#d750ff',
      token: 'keyword.control',
    },
    {
      foreground: '#d19a66',
      token: 'control.elements',
    },
    {
      foreground: '#d19a66',
      token: ' keyword.operator.less',
    },
    {
      foreground: '#3ca4f9',
      token: 'keyword.other.special-method',
    },
    {
      foreground: '#d750ff',
      token: 'storage',
    },
    {
      foreground: '#d750ff',
      token: 'token.storage',
    },
    {
      foreground: '#d750ff',
      token: 'keyword.operator.expression.delete',
    },
    {
      foreground: '#d750ff',
      token: 'keyword.operator.expression.in',
    },
    {
      foreground: '#d750ff',
      token: 'keyword.operator.expression.of',
    },
    {
      foreground: '#d750ff',
      token: 'keyword.operator.expression.instanceof',
    },
    {
      foreground: '#d750ff',
      token: 'keyword.operator.new',
    },
    {
      foreground: '#d750ff',
      token: 'keyword.operator.expression.typeof',
    },
    {
      foreground: '#d750ff',
      token: 'keyword.operator.expression.void',
    },
    {
      foreground: '#e5c07b',
      token: 'token.storage.type.java',
    },
    {
      foreground: '#56b6c2',
      token: 'support.function',
    },
    {
      foreground: '#ffffff',
      token: 'support.type.property-name',
    },
    {
      foreground: '#ffffff',
      token: 'support.constant.property-value',
    },
    {
      foreground: '#d19a66',
      token: 'support.constant.font-name',
    },
    {
      foreground: '#ffffff',
      token: 'meta.tag',
    },
    {
      foreground: '#98c379',
      token: 'string',
    },
    {
      foreground: '#e5c07b',
      token: 'entity.other.inherited-class',
    },
    {
      foreground: '#56b6c2',
      token: 'constant.other.symbol',
    },
    {
      foreground: '#d19a66',
      token: 'constant.numeric',
    },
    {
      foreground: '#d19a66',
      token: 'constant',
    },
    {
      foreground: '#d19a66',
      token: 'punctuation.definition.constant',
    },
    {
      foreground: '#ff4e5b',
      token: 'entity.name.tag',
    },
    {
      foreground: '#d19a66',
      token: 'entity.other.attribute-name',
    },
    {
      fontStyle: 'normal',
      foreground: '#3ca4f9',
      token: 'entity.other.attribute-name.id',
    },
    {
      fontStyle: 'normal',
      foreground: '#d19a66',
      token: 'entity.other.attribute-name.class.css',
    },
    {
      foreground: '#d750ff',
      token: 'meta.selector',
    },
    {
      foreground: '#ff4e5b',
      token: 'markup.heading',
    },
    {
      foreground: '#3ca4f9',
      token: 'markup.heading punctuation.definition.heading',
    },
    {
      foreground: '#3ca4f9',
      token: ' entity.name.section',
    },
    {
      foreground: '#ff4e5b',
      token: 'keyword.other.unit',
    },
    {
      foreground: '#d19a66',
      token: 'markup.bold',
    },
    {
      foreground: '#d19a66',
      token: 'todo.bold',
    },
    {
      foreground: '#e5c07b',
      token: 'punctuation.definition.bold',
    },
    {
      foreground: '#d750ff',
      token: 'markup.italic',
    },
    {
      foreground: '#d750ff',
      token: ' punctuation.definition.italic',
    },
    {
      foreground: '#d750ff',
      token: 'todo.emphasis',
    },
    {
      foreground: '#d750ff',
      token: 'emphasis md',
    },
    {
      foreground: '#ff4e5b',
      token: 'entity.name.section.markdown',
    },
    {
      foreground: '#ff4e5b',
      token: 'punctuation.definition.heading.markdown',
    },
    {
      foreground: '#ff4e5b',
      token: 'punctuation.definition.list.begin.markdown',
    },
    {
      foreground: '#ffffff',
      token: 'markup.heading.setext',
    },
    {
      foreground: '#d19a66',
      token: 'punctuation.definition.bold.markdown',
    },
    {
      foreground: '#98c379',
      token: 'markup.inline.raw.markdown',
    },
    {
      foreground: '#98c379',
      token: 'markup.inline.raw.string.markdown',
    },
    {
      foreground: '#ff4e5b',
      token: 'punctuation.definition.list.markdown',
    },
    {
      foreground: '#ff4e5b',
      token: 'punctuation.definition.string.begin.markdown',
    },
    {
      foreground: '#ff4e5b',
      token: 'punctuation.definition.string.end.markdown',
    },
    {
      foreground: '#ff4e5b',
      token: 'punctuation.definition.metadata.markdown',
    },
    {
      foreground: '#ff4e5b',
      token: 'beginning.punctuation.definition.list.markdown',
    },
    {
      foreground: '#ff4e5b',
      token: 'punctuation.definition.metadata.markdown',
    },
    {
      foreground: '#d750ff',
      token: 'markup.underline.link.markdown',
    },
    {
      foreground: '#d750ff',
      token: 'markup.underline.link.image.markdown',
    },
    {
      foreground: '#3ca4f9',
      token: 'string.other.link.title.markdown',
    },
    {
      foreground: '#3ca4f9',
      token: 'string.other.link.description.markdown',
    },
    {
      foreground: '#56b6c2',
      token: 'string.regexp',
    },
    {
      foreground: '#56b6c2',
      token: 'constant.character.escape',
    },
    {
      foreground: '#ff4e5b',
      token: 'punctuation.section.embedded',
    },
    {
      foreground: '#ff4e5b',
      token: ' variable.interpolation',
    },
    {
      foreground: '#d750ff',
      token: 'punctuation.section.embedded.begin',
    },
    {
      foreground: '#d750ff',
      token: 'punctuation.section.embedded.end',
    },
    {
      foreground: '#ffffff',
      token: 'invalid.illegal',
    },
    {
      foreground: '#ffffff',
      token: 'invalid.illegal.bad-ampersand.html',
    },
    {
      foreground: '#ffffff',
      token: 'invalid.broken',
    },
    {
      foreground: '#ffffff',
      token: 'invalid.deprecated',
    },
    {
      foreground: '#ffffff',
      token: 'invalid.unimplemented',
    },
    {
      foreground: '#ff4e5b',
      token: 'source.json meta.structure.dictionary.json > string.quoted.json',
    },
    {
      foreground: '#ff4e5b',
      token:
        'source.json meta.structure.dictionary.json > string.quoted.json > punctuation.string',
    },
    {
      foreground: '#98c379',
      token:
        'source.json meta.structure.dictionary.json > value.json > string.quoted.json',
    },
    {
      foreground: '#98c379',
      token:
        'source.json meta.structure.array.json > value.json > string.quoted.json',
    },
    {
      foreground: '#98c379',
      token:
        'source.json meta.structure.dictionary.json > value.json > string.quoted.json > punctuation',
    },
    {
      foreground: '#98c379',
      token:
        'source.json meta.structure.array.json > value.json > string.quoted.json > punctuation',
    },
    {
      foreground: '#56b6c2',
      token:
        'source.json meta.structure.dictionary.json > constant.language.json',
    },
    {
      foreground: '#56b6c2',
      token: 'source.json meta.structure.array.json > constant.language.json',
    },
    {
      foreground: '#ff4e5b',
      token: 'support.type.property-name.json',
    },
    {
      foreground: '#ff4e5b',
      token: 'support.type.property-name.json punctuation',
    },
    {
      foreground: '#d750ff',
      token:
        'text.html.laravel-blade source.php.embedded.line.html entity.name.tag.laravel-blade',
    },
    {
      foreground: '#d750ff',
      token:
        'text.html.laravel-blade source.php.embedded.line.html support.constant.laravel-blade',
    },
    {
      foreground: '#e5c07b',
      token: 'support.other.namespace.use.php',
    },
    {
      foreground: '#e5c07b',
      token: 'support.other.namespace.use-as.php',
    },
    {
      foreground: '#e5c07b',
      token: 'support.other.namespace.php',
    },
    {
      foreground: '#e5c07b',
      token: 'entity.other.alias.php',
    },
    {
      foreground: '#e5c07b',
      token: 'meta.interface.php',
    },
    {
      foreground: '#d750ff',
      token: 'keyword.operator.error-control.php',
    },
    {
      foreground: '#d750ff',
      token: 'keyword.operator.type.php',
    },
    {
      foreground: '#ffffff',
      token: 'punctuation.section.array.begin.php',
    },
    {
      foreground: '#ffffff',
      token: 'punctuation.section.array.end.php',
    },
    {
      foreground: '#f44747',
      token: 'invalid.illegal.non-null-typehinted.php',
    },
    {
      foreground: '#e5c07b',
      token: 'storage.type.php',
    },
    {
      foreground: '#e5c07b',
      token: 'meta.other.type.phpdoc.php',
    },
    {
      foreground: '#e5c07b',
      token: 'keyword.other.type.php',
    },
    {
      foreground: '#e5c07b',
      token: 'keyword.other.array.phpdoc.php',
    },
    {
      foreground: '#3ca4f9',
      token: 'meta.function-call.php',
    },
    {
      foreground: '#3ca4f9',
      token: 'meta.function-call.object.php',
    },
    {
      foreground: '#3ca4f9',
      token: 'meta.function-call.static.php',
    },
    {
      foreground: '#ffffff',
      token: 'punctuation.definition.parameters.begin.bracket.round.php',
    },
    {
      foreground: '#ffffff',
      token: 'punctuation.definition.parameters.end.bracket.round.php',
    },
    {
      foreground: '#ffffff',
      token: 'punctuation.separator.delimiter.php',
    },
    {
      foreground: '#ffffff',
      token: 'punctuation.section.scope.begin.php',
    },
    {
      foreground: '#ffffff',
      token: 'punctuation.section.scope.end.php',
    },
    {
      foreground: '#ffffff',
      token: 'punctuation.terminator.expression.php',
    },
    {
      foreground: '#ffffff',
      token: 'punctuation.definition.arguments.begin.bracket.round.php',
    },
    {
      foreground: '#ffffff',
      token: 'punctuation.definition.arguments.end.bracket.round.php',
    },
    {
      foreground: '#ffffff',
      token: 'punctuation.definition.storage-type.begin.bracket.round.php',
    },
    {
      foreground: '#ffffff',
      token: 'punctuation.definition.storage-type.end.bracket.round.php',
    },
    {
      foreground: '#ffffff',
      token: 'punctuation.definition.array.begin.bracket.round.php',
    },
    {
      foreground: '#ffffff',
      token: 'punctuation.definition.array.end.bracket.round.php',
    },
    {
      foreground: '#ffffff',
      token: 'punctuation.definition.begin.bracket.round.php',
    },
    {
      foreground: '#ffffff',
      token: 'punctuation.definition.end.bracket.round.php',
    },
    {
      foreground: '#ffffff',
      token: 'punctuation.definition.begin.bracket.curly.php',
    },
    {
      foreground: '#ffffff',
      token: 'punctuation.definition.end.bracket.curly.php',
    },
    {
      foreground: '#ffffff',
      token:
        'punctuation.definition.section.switch-block.end.bracket.curly.php',
    },
    {
      foreground: '#ffffff',
      token:
        'punctuation.definition.section.switch-block.start.bracket.curly.php',
    },
    {
      foreground: '#ffffff',
      token:
        'punctuation.definition.section.switch-block.begin.bracket.curly.php',
    },
    {
      foreground: '#ffffff',
      token:
        'punctuation.definition.section.switch-block.end.bracket.curly.php',
    },
    {
      foreground: '#d19a66',
      token: 'support.constant.core.rust',
    },
    {
      foreground: '#d19a66',
      token: 'support.constant.ext.php',
    },
    {
      foreground: '#d19a66',
      token: 'support.constant.std.php',
    },
    {
      foreground: '#d19a66',
      token: 'support.constant.core.php',
    },
    {
      foreground: '#d19a66',
      token: 'support.constant.parser-token.php',
    },
    {
      foreground: '#3ca4f9',
      token: 'entity.name.goto-label.php',
    },
    {
      foreground: '#3ca4f9',
      token: 'support.other.php',
    },
    {
      foreground: '#56b6c2',
      token: 'keyword.operator.logical.php',
    },
    {
      foreground: '#56b6c2',
      token: 'keyword.operator.bitwise.php',
    },
    {
      foreground: '#56b6c2',
      token: 'keyword.operator.arithmetic.php',
    },
    {
      foreground: '#d750ff',
      token: 'keyword.operator.regexp.php',
    },
    {
      foreground: '#56b6c2',
      token: 'keyword.operator.comparison.php',
    },
    {
      foreground: '#d750ff',
      token: 'keyword.operator.heredoc.php',
    },
    {
      foreground: '#d750ff',
      token: 'keyword.operator.nowdoc.php',
    },
    {
      foreground: '#3ca4f9',
      token: 'meta.function.decorator.python',
    },
    {
      foreground: '#56b6c2',
      token: 'support.token.decorator.python',
    },
    {
      foreground: '#56b6c2',
      token: 'meta.function.decorator.identifier.python',
    },
    {
      foreground: '#ffffff',
      token: 'function.parameter',
    },
    {
      foreground: '#ffffff',
      token: 'function.brace',
    },
    {
      foreground: '#ffffff',
      token: 'function.parameter.ruby',
    },
    {
      foreground: '#ffffff',
      token: ' function.parameter.cs',
    },
    {
      foreground: '#56b6c2',
      token: 'constant.language.symbol.ruby',
    },
    {
      foreground: '#56b6c2',
      token: 'rgb-value',
    },
    {
      foreground: '#d19a66',
      token: 'inline-color-decoration rgb-value',
    },
    {
      foreground: '#d19a66',
      token: 'less rgb-value',
    },
    {
      foreground: '#ff4e5b',
      token: 'selector.sass',
    },
    {
      foreground: '#e5c07b',
      token: 'support.type.primitive.ts',
    },
    {
      foreground: '#e5c07b',
      token: 'support.type.builtin.ts',
    },
    {
      foreground: '#e5c07b',
      token: 'support.type.primitive.tsx',
    },
    {
      foreground: '#e5c07b',
      token: 'support.type.builtin.tsx',
    },
    {
      foreground: '#ffffff',
      token: 'block.scope.end',
    },
    {
      foreground: '#ffffff',
      token: 'block.scope.begin',
    },
    {
      foreground: '#e5c07b',
      token: 'storage.type.cs',
    },
    {
      foreground: '#ff4e5b',
      token: 'entity.name.variable.local.cs',
    },
    {
      foreground: '#3ca4f9',
      token: 'token.info-token',
    },
    {
      foreground: '#d19a66',
      token: 'token.warn-token',
    },
    {
      foreground: '#f44747',
      token: 'token.error-token',
    },
    {
      foreground: '#d750ff',
      token: 'token.debug-token',
    },
    {
      foreground: '#d750ff',
      token: 'punctuation.definition.template-expression.begin',
    },
    {
      foreground: '#d750ff',
      token: 'punctuation.definition.template-expression.end',
    },
    {
      foreground: '#d750ff',
      token: 'punctuation.section.embedded',
    },
    {
      foreground: '#ffffff',
      token: 'meta.template.expression',
    },
    {
      foreground: '#d750ff',
      token: 'keyword.operator.module',
    },
    {
      foreground: '#3ca4f9',
      token: 'support.type.type.flowtype',
    },
    {
      foreground: '#e5c07b',
      token: 'support.type.primitive',
    },
    {
      foreground: '#ff4e5b',
      token: 'meta.property.object',
    },
    {
      foreground: '#ff4e5b',
      token: 'variable.parameter.function.js',
    },
    {
      foreground: '#98c379',
      token: 'keyword.other.template.begin',
    },
    {
      foreground: '#98c379',
      token: 'keyword.other.template.end',
    },
    {
      foreground: '#98c379',
      token: 'keyword.other.substitution.begin',
    },
    {
      foreground: '#98c379',
      token: 'keyword.other.substitution.end',
    },
    {
      foreground: '#56b6c2',
      token: 'keyword.operator.assignment',
    },
    {
      foreground: '#e5c07b',
      token: 'keyword.operator.assignment.go',
    },
    {
      foreground: '#d750ff',
      token: 'keyword.operator.arithmetic.go',
    },
    {
      foreground: '#d750ff',
      token: 'keyword.operator.address.go',
    },
    {
      foreground: '#e5c07b',
      token: 'entity.name.package.go',
    },
    {
      foreground: '#56b6c2',
      token: 'support.type.prelude.elm',
    },
    {
      foreground: '#d19a66',
      token: 'support.constant.elm',
    },
    {
      foreground: '#d750ff',
      token: 'punctuation.quasi.element',
    },
    {
      foreground: '#ff4e5b',
      token: 'constant.character.entity',
    },
    {
      foreground: '#56b6c2',
      token: 'entity.other.attribute-name.pseudo-element',
    },
    {
      foreground: '#56b6c2',
      token: 'entity.other.attribute-name.pseudo-class',
    },
    {
      foreground: '#e5c07b',
      token: 'entity.global.clojure',
    },
    {
      foreground: '#ff4e5b',
      token: 'meta.symbol.clojure',
    },
    {
      foreground: '#56b6c2',
      token: 'constant.keyword.clojure',
    },
    {
      foreground: '#ff4e5b',
      token: 'meta.arguments.coffee',
    },
    {
      foreground: '#ff4e5b',
      token: 'variable.parameter.function.coffee',
    },
    {
      foreground: '#98c379',
      token: 'source.ini',
    },
    {
      foreground: '#ff4e5b',
      token: 'meta.scope.prerequisites.makefile',
    },
    {
      foreground: '#e5c07b',
      token: 'source.makefile',
    },
    {
      foreground: '#e5c07b',
      token: 'storage.modifier.import.groovy',
    },
    {
      foreground: '#3ca4f9',
      token: 'meta.method.groovy',
    },
    {
      foreground: '#ff4e5b',
      token: 'meta.definition.variable.name.groovy',
    },
    {
      foreground: '#98c379',
      token: 'meta.definition.class.inherited.classes.groovy',
    },
    {
      foreground: '#e5c07b',
      token: 'support.variable.semantic.hlsl',
    },
    {
      foreground: '#d750ff',
      token: 'support.type.texture.hlsl',
    },
    {
      foreground: '#d750ff',
      token: 'support.type.sampler.hlsl',
    },
    {
      foreground: '#d750ff',
      token: 'support.type.object.hlsl',
    },
    {
      foreground: '#d750ff',
      token: 'support.type.object.rw.hlsl',
    },
    {
      foreground: '#d750ff',
      token: 'support.type.fx.hlsl',
    },
    {
      foreground: '#d750ff',
      token: 'support.type.object.hlsl',
    },
    {
      foreground: '#ff4e5b',
      token: 'text.variable',
    },
    {
      foreground: '#ff4e5b',
      token: 'text.bracketed',
    },
    {
      foreground: '#e5c07b',
      token: 'support.type.swift',
    },
    {
      foreground: '#e5c07b',
      token: 'support.type.vb.asp',
    },
    {
      foreground: '#e5c07b',
      token: 'entity.name.function.xi',
    },
    {
      foreground: '#56b6c2',
      token: 'entity.name.class.xi',
    },
    {
      foreground: '#ff4e5b',
      token: 'constant.character.character-class.regexp.xi',
    },
    {
      foreground: '#d750ff',
      token: 'constant.regexp.xi',
    },
    {
      foreground: '#56b6c2',
      token: 'keyword.control.xi',
    },
    {
      foreground: '#ffffff',
      token: 'invalid.xi',
    },
    {
      foreground: '#98c379',
      token: 'beginning.punctuation.definition.quote.markdown.xi',
    },
    {
      foreground: '#9785c2',
      token: 'beginning.punctuation.definition.list.markdown.xi',
    },
    {
      foreground: '#3ca4f9',
      token: 'constant.character.xi',
    },
    {
      foreground: '#3ca4f9',
      token: 'accent.xi',
    },
    {
      foreground: '#d19a66',
      token: 'wikiword.xi',
    },
    {
      foreground: '#ffffff',
      token: 'constant.other.color.rgb-value.xi',
    },
    {
      foreground: '#9785c2',
      token: 'punctuation.definition.tag.xi',
    },
    {
      foreground: '#e5c07b',
      token: 'entity.name.label.cs',
    },
    {
      foreground: '#e5c07b',
      token: 'entity.name.scope-resolution.function.call',
    },
    {
      foreground: '#e5c07b',
      token: 'entity.name.scope-resolution.function.definition',
    },
    {
      foreground: '#ff4e5b',
      token: 'entity.name.label.cs',
    },
    {
      foreground: '#ff4e5b',
      token: 'markup.heading.setext.1.markdown',
    },
    {
      foreground: '#ff4e5b',
      token: 'markup.heading.setext.2.markdown',
    },
    {
      foreground: '#ffffff',
      token: ' meta.brace.square',
    },
    {
      fontStyle: 'italic',
      foreground: '#9785c2',
      token: 'comment',
    },
    {
      fontStyle: 'italic',
      foreground: '#9785c2',
      token: ' punctuation.definition.comment',
    },
    {
      foreground: '#9785c2',
      token: 'markup.quote.markdown',
    },
    {
      foreground: '#ffffff',
      token: 'punctuation.definition.block.sequence.item.yaml',
    },
    {
      foreground: '#56b6c2',
      token: 'constant.language.symbol.elixir',
    },
    {
      fontStyle: 'italic',
      token: 'entity.other.attribute-name.js',
    },
    {
      fontStyle: 'italic',
      token: 'entity.other.attribute-name.ts',
    },
    {
      fontStyle: 'italic',
      token: 'entity.other.attribute-name.jsx',
    },
    {
      fontStyle: 'italic',
      token: 'entity.other.attribute-name.tsx',
    },
    {
      fontStyle: 'italic',
      token: 'variable.parameter',
    },
    {
      fontStyle: 'italic',
      token: 'variable.language.super',
    },
    {
      fontStyle: 'italic',
      token: 'comment.line.double-slash',
    },
    {
      fontStyle: 'italic',
      token: 'comment.block.documentation',
    },
    {
      fontStyle: 'italic',
      token: 'keyword.control.import.python',
    },
    {
      fontStyle: 'italic',
      token: 'keyword.control.flow.python',
    },
    {
      fontStyle: 'italic',
      token: 'markup.italic.markdown',
    },
  ],
  encodedTokensColors: [],
}

export default EditorTheme
