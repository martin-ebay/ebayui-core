const sinon = require('sinon');
const expect = require('chai').expect;
const testUtils = require('../../../common/test-utils/browser');
const renderer = require('../');

let widget;

function renderAndGetRoot(input) {
    widget = renderer.renderSync(input).appendTo(document.body).getWidget();
    return document.querySelector('.switch');
}

describe('given switch is enabled', () => {
    let root;
    let input;
    beforeEach(() => {
        root = renderAndGetRoot({ '*': { value: 'val' } });
        input = root.querySelector('input');
    });
    afterEach(() => widget.destroy());

    describe('when it is clicked', () => {
        let spy;
        beforeEach(() => {
            spy = sinon.spy();
            widget.on('switch-select', spy);
            input.click();
        });

        test('then it emits the event', () => {
            expect(spy.calledOnce).to.equal(true);
            const eventData = spy.getCall(0).args[0];
            expect(eventData.value).to.equal('val');
            expect(eventData.checked).to.equal(true);
            testUtils.testOriginalEvent(spy);
        });
    });
});

describe('given switch is disabled', () => {
    let root;
    beforeEach(() => {
        root = renderAndGetRoot({ disabled: true });
    });
    afterEach(() => widget.destroy());

    describe('when it is clicked', () => {
        let spy;
        beforeEach(() => {
            spy = sinon.spy();
            widget.on('switch-select', spy);
            testUtils.triggerEvent(root, 'click');
        });

        test('then it doesn\'t emit the event', () => {
            expect(spy.called).to.equal(false);
        });
    });
});
