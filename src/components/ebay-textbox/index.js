const markoWidgets = require('marko-widgets');
const processHtmlAttributes = require('../../common/html-attributes');
const template = require('./template.marko');

function getInitialState(input) {
    const classes = ['textbox__control'];
    if (input.fluid) {
        classes.push('textbox__control--fluid');
    }
    return {
        classes,
        htmlAttributes: processHtmlAttributes(input),
        rootClass: input.class || '',
        value: input.value,
        tag: input.fluid ? 'div' : 'span',
        textBoxTag: Boolean(input.multiline) ? 'textarea' : 'input',
        disabled: Boolean(input.disabled),
        placeholder: input.placeholder,
        invalid: String(Boolean(input.invalid))
    };
}

function getTemplateData(state) {
    return state;
}

module.exports = markoWidgets.defineComponent({
    template,
    getInitialState,
    getTemplateData
});
