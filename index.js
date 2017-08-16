// tooling
const parser  = require('postcss-values-parser');
const postcss = require('postcss');

const cloneRule = require('./dependent-js/clone-rule');

const inlineValueMatch = /^(inline-start|inline-end)$/;
const blockValueMatch  = /^(block-start|block-end)$/;

// plugin
module.exports = postcss.plugin('postcss-logical-gradients', () => (root) => {
	root.walkDecls('background-image', (decl) => {
		const rtlValue = parseAsDir(decl, 'rtl');
		const ltrValue = parseAsDir(decl, 'ltr');

		if (ltrValue !== decl.value) {
			decl.replaceWith([
				cloneRule(decl, 'ltr').append([
					decl.clone({
						value: ltrValue
					})
				]),
				cloneRule(decl, 'rtl').append([
					decl.clone({
						value: rtlValue
					})
				])
			]);
		}
	});
});

function parseAsDir(decl, dir) {
	const originalValue = decl.value;
	const ast = parser(originalValue).parse();
	const isRTL = 'rtl' === dir;

	ast.walk((node) => {
		if (isLinearGradient(node)) {
			const arg1 = node.nodes[1];
			const arg2 = node.nodes[2];
			const arg3 = node.nodes[3];

			if (isInlineDirection(arg1, arg2, arg3)) {
				if ('inline-start' === arg2.value) {
					arg2.value = isRTL ? 'right' : 'left';
				}

				if ('inline-end' === arg2.value) {
					arg2.value = isRTL ? 'left' : 'right';
				}

				if (isBlockDirection(arg3)) {
					if ('block-start' === arg3.value) {
						arg3.value = 'top';
					}

					if ('block-end' === arg3.value) {
						arg3.value = 'bottom';
					}
				}
			}
		}
	});

	return ast.toString();
}

function isLinearGradient(node) {
	return 'func' === node.type && 'linear-gradient' === node.value && node.nodes.length > 0;
}

function isInlineDirection(arg1, arg2, arg3) {
	const hasTo = arg1 && 'word' === arg1.type && 'to' === arg1.value;
	const hasInline = arg2 && 'word' === arg2.type && inlineValueMatch.test(arg2.value);
	const hasBlockOrComma = arg3 && 'comma' === arg3.type || 'word' === arg3.type && blockValueMatch.test(arg3.value);

	return hasTo && hasInline && hasBlockOrComma;
}

function isBlockDirection(arg) {
	return 'word' === arg.type && blockValueMatch.test(arg.value);
}
