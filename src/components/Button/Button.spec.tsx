/**
 * Unit test for Badge component.
 */
import { expect } from 'chai';
import { shallow, ShallowWrapper } from 'enzyme';
import * as React from 'react';
import 'services/test-helper';
import * as sinon from 'sinon';
import Button, { IButtonProps } from './Button';

describe('Button', () => {
  let shallowButton: ShallowWrapper<IButtonProps, {}>;

  beforeEach(() => {
    shallowButton = shallow(<Button>Button Label</Button>);
  });

  it('should render correctly with a "button" tag by default', () => {
    expect(shallowButton.type()).to.equal('button');
  });

  it('should call onClick prop when click is simulated', () => {
    const onClick = sinon.spy();

    shallowButton.setProps({ onClick });
    shallowButton.simulate('click');
    expect(onClick.calledOnce).to.be.true;
  });

  it('should have the "disabled" prop when it is set', () => {
    shallowButton.setProps({ disabled: true });
    expect(shallowButton.instance().props.disabled).to.be.true;
  });

  it('should do not call onClick when the "disabled" prop is set', () => {
    const onClick = sinon.spy();

    shallowButton.setProps({
      disabled: true,
      onClick,
    });
    shallowButton.simulate('click');
    expect(onClick.notCalled).to.be.true;
  });

  it('should set a custom className', () => {
    shallowButton.setProps({ className: 'custom-classname' });
    expect(shallowButton.hasClass('custom-classname')).to.be.true;
  });

  it('should have correct classname value', () => {
    expect(shallowButton.hasClass('c-button')).to.be.true;
  });
});
