module.exports = {
  extends: 'stylelint-config-standard',
  plugins: ['stylelint-order'],
  rules: {
    // quotes
    'font-family-name-quotes': 'always-where-recommended',
    'function-url-quotes': 'always',
    'selector-attribute-quotes': 'always',
    'string-quotes': 'single',

    // autoprefixer
    'at-rule-no-vendor-prefix': true,
    'media-feature-name-no-vendor-prefix': true,
    'property-no-vendor-prefix': true,
    'selector-no-vendor-prefix': true,
    'value-no-vendor-prefix': true,

    // specificity
    'max-nesting-depth': 4,
    'selector-max-compound-selectors': 4,
    'selector-max-specificity': '0,4,2',

    // acceptable selector types, units, properties,
    // functions and words in comments
    'color-named': 'never',
    'color-no-hex': null,
    'selector-max-class': 4,
    'selector-max-attribute': 2,
    'selector-max-combinators': 3,
    'selector-max-id': 0,
    'selector-no-qualifying-type': [
      true,
      {
        ignore: ['attribute', 'class'],
      },
    ],
    'selector-max-type': 2,
    'selector-max-universal': 1,

    // notation
    'font-weight-notation': 'numeric',

    // maximum line
    'max-line-length': 80,

    'at-rule-no-unknown': [
      true,
      {
        ignoreAtRules: ['define-mixin', 'mixin'],
      },
    ],

    'function-url-no-scheme-relative': true,
    'keyframe-declaration-no-important': true,

    'order/order': ['custom-properties', 'declarations', 'rules', 'at-rules'],
    'order/properties-order': [
      'content',
      'quotes',

      'display',
      'visibility',

      'position',
      'z-index',
      'top',
      'right',
      'bottom',
      'left',

      'box-sizing',

      'flex',
      'flex-basis',
      'flex-direction',
      'flex-flow',
      'flex-grow',
      'flex-shrink',
      'flex-wrap',
      'align-content',
      'align-items',
      'align-self',
      'justify-content',
      'order',

      'width',
      'min-width',
      'max-width',
      'height',
      'min-height',
      'max-height',

      'margin',
      'margin-top',
      'margin-right',
      'margin-bottom',
      'margin-left',

      'padding',
      'padding-top',
      'padding-right',
      'padding-bottom',
      'padding-left',

      'float',
      'clear',

      'overflow',
      'overflow-x',
      'overflow-y',

      'clip',
      'zoom',

      'columns',
      'column-gap',
      'column-fill',
      'column-rule',
      'column-span',
      'column-count',
      'column-width',

      'table-layout',
      'empty-cells',
      'caption-side',
      'border-spacing',
      'border-collapse',
      'list-style',
      'list-style-position',
      'list-style-type',
      'list-style-image',

      'transform',
      'transform-origin',
      'transform-style',
      'backface-visibility',
      'perspective',
      'perspective-origin',

      'transition',
      'transition-property',
      'transition-duration',
      'transition-timing-function',
      'transition-delay',

      'animation',
      'animation-name',
      'animation-duration',
      'animation-play-state',
      'animation-timing-function',
      'animation-delay',
      'animation-iteration-count',
      'animation-direction',

      'border',
      'border-top',
      'border-right',
      'border-bottom',
      'border-left',
      'border-width',
      'border-top-width',
      'border-right-width',
      'border-bottom-width',
      'border-left-width',

      'border-style',
      'border-top-style',
      'border-right-style',
      'border-bottom-style',
      'border-left-style',

      'border-radius',
      'border-top-left-radius',
      'border-top-right-radius',
      'border-bottom-left-radius',
      'border-bottom-right-radius',

      'border-color',
      'border-top-color',
      'border-right-color',
      'border-bottom-color',
      'border-left-color',

      'outline',
      'outline-color',
      'outline-offset',
      'outline-style',
      'outline-width',

      'stroke-width',
      'stroke-linecap',
      'stroke-dasharray',
      'stroke-dashoffset',
      'stroke',

      'opacity',

      'background',
      'background-color',
      'background-image',
      'background-repeat',
      'background-position',
      'background-size',
      'background-clip',
      'box-shadow',
      'fill',

      'color',

      'font',
      'font-family',
      'font-size',
      'font-size-adjust',
      'font-stretch',
      'font-effect',
      'font-style',
      'font-variant',
      'font-weight',

      'font-emphasize',
      'font-emphasize-position',
      'font-emphasize-style',

      'letter-spacing',
      'line-height',
      'list-style',
      'word-spacing',

      'text-align',
      'text-align-last',
      'text-decoration',
      'text-indent',
      'text-justify',
      'text-overflow',
      'text-overflow-ellipsis',
      'text-overflow-mode',
      'text-rendering',
      'text-outline',
      'text-shadow',
      'text-transform',
      'text-wrap',
      'word-wrap',
      'word-break',

      'text-emphasis',
      'text-emphasis-color',
      'text-emphasis-style',
      'text-emphasis-position',

      'vertical-align',
      'white-space',
      'word-spacing',
      'hyphens',

      'src',

      'tab-size',
      'counter-reset',
      'counter-increment',
      'resize',
      'cursor',
      'pointer-events',
      'speak',
      'user-select',
      'nav-index',
      'nav-up',
      'nav-right',
      'nav-down',
      'nav-left',
    ],
  },
};
