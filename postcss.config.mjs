import autoprefixer from 'autoprefixer';
import cssnano from 'cssnano';
import tailwindcss from '@tailwindcss/postcss';

// Plugin para eliminar variables vacías
const removeEmptyVars = () => ({
  postcssPlugin: 'remove-empty-vars',
  Declaration(decl) {
    const val = decl.value?.toString().trim();
    if (!val || val === 'undefined' || val === 'null') {
      decl.remove();
    }
  },
});
removeEmptyVars.postcss = true;

// Plugin para eliminar reglas problemáticas para Odoo
const cleanupForOdoo = () => {
  return {
    postcssPlugin: 'cleanup-for-odoo',
    AtRule(atRule) {
      // Eliminar @layer, @property, @supports
      if (['layer', 'property', 'supports'].includes(atRule.name)) {
        atRule.remove();
      }
    },
    Declaration(decl) {
      // Eliminar declaraciones con valores inválidos
      const val = decl.value?.toString().trim();
      if (!val || val === 'undefined' || val === 'null' || val === 'initial') {
        decl.remove();
      }
      // Eliminar variables CSS vacías
      if (decl.prop.startsWith('--') && (!val || val === '')) {
        decl.remove();
      }
    }
  };
};
cleanupForOdoo.postcss = true;

export default {
  plugins: [
    tailwindcss(),
    autoprefixer(),
    cleanupForOdoo(),
    removeEmptyVars(),
    cssnano({
      preset: ['default', { 
        colormin: false,
        normalizeWhitespace: false,
        discardComments: { removeAll: true }
      }],
    }),
  ],
};