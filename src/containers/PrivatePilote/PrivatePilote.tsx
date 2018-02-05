import Button from 'components/Button';
import ProgressIndicator from 'components/ProgressIndicator';
import { BREAKPOINT } from 'constants/parameters';
import { IRootState } from 'constants/types';
import 'containers/PrivatePilote/PrivatePilote.css';
import {
  chooseItem,
  getItem,
  getPassengers,
  getPlanets,
  getPrice,
  getStarships,
  keyItemChange,
  onResizeWindow,
  postRide,
  restart,
  stepChange,
} from 'containers/PrivatePilote/PrivatePiloteActions';
import PrivatePiloteItem from 'containers/PrivatePilote/PrivatePiloteItem';
import PrivatePiloteReducer from 'containers/PrivatePilote/PrivatePiloteReducer';
import PrivatePiloteSaga from 'containers/PrivatePilote/PrivatePiloteSaga';
import {
  IPassenger,
  IPlanet,
  IPrivatePiloteState,
  IStarship,
  properties,
  steps,
  Steps,
} from 'containers/PrivatePilote/types';
import * as React from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { bindActionCreators, compose, Dispatch } from 'redux';
import injectReducer from 'services/injectReducer';
import injectSaga from 'services/injectSaga';

interface IDispatchProps {
  onChooseItem: () => void;
  onGetItem: (step: Steps, id: number) => void;
  onGetPassengers: () => void;
  onGetPlanets: () => void;
  onGetPrice: () => void;
  onGetStarships: () => void;
  onKeyItemChange: (id: number) => void;
  onPostRide: () => void;
  onResizeWindow: (width: number) => void;
  onRestart: () => void;
  onStepChange: (step: Steps) => void;
}

export type IPrivatePiloteProps = IPrivatePiloteState & IDispatchProps;

const numberOfSteps = Object.keys(Steps).length;

export class PrivatePilote extends React.PureComponent<
  IPrivatePiloteProps,
  {}
> {
  public static renderLoader() {
    return (
      <div className="c-private-pilote__loader">
        <FormattedMessage id="Global.loading" />...
      </div>
    );
  }

  public componentWillMount() {
    const { onGetStarships } = this.props;

    onGetStarships();
    window.addEventListener('resize', this.onResize);
  }

  public componentWillUnmount() {
    window.removeEventListener('resize', this.onResize);
  }

  public renderChoiceStep() {
    const { choices, step } = this.props;
    const items = this.getData();

    return [
      <main className="c-private-pilote__main" key="A">
        {this.renderContent()}
      </main>,
      <footer className="c-private-pilote__footer" key="B">
        <ul className="c-private-pilote__items">
          {items.map(item => (
            <PrivatePiloteItem
              item={item}
              key={item.id}
              onClick={this.handleOptionClick(item.id)}
              selected={choices[step].includes(item.id)}
              step={step}
            />
          ))}
        </ul>
      </footer>,
    ];
  }

  public renderContent() {
    const {
      choices,
      currentId,
      error,
      price,
      starships,
      step,
      windowWidth,
    } = this.props;
    const items = this.getData();
    const item = items.find(({ id }) => id === currentId);
    const [starshipId] = choices[Steps.starships];
    const starship = starships.find(
      starshipItem => starshipItem.id === starshipId
    );
    const capacity = starship == null ? 0 : starship.capacity;
    const canBoardPassengers = capacity > 1;
    const capacityReached = choices[Steps.people].length >= capacity;
    const isPassengerAlreadyAdded = !choices[Steps.people].includes(currentId);
    const hasPriceError = error != null && error.type === 'price';
    const shouldChoiceButtonDisabled =
      (step === Steps.people &&
        canBoardPassengers &&
        capacityReached &&
        isPassengerAlreadyAdded) ||
      (step === Steps.planets && hasPriceError);

    return item == null ? (
      this.renderSelectionMessage()
    ) : (
      <div className="c-private-pilote__content o-grid o-wrap">
        <div className="c-private-pilote__preview o-size--1-of-1 o-size-medium--7-of-12 u-text-align--center">
          <img
            alt=""
            className="c-private-pilote__preview-image"
            src={`src/images/content/${step}/${currentId}.png`}
          />
        </div>
        <div className="o-size--1-of-1 o-size-medium--5-of-12">
          <h2 className="u-text-heading--large">{item.name}</h2>
          <ul className="c-private-pilote__properties">
            {properties[step] == null
              ? null
              : properties[step].map(property => (
                  <li className="c-private-pilote__property" key={property}>
                    <FormattedMessage
                      id={`PrivatePilote.property.${property}`}
                    />
                    : {item[property]}
                  </li>
                ))}
            {step === Steps.planets ? (
              <li className="c-private-pilote__property">
                <FormattedMessage id="PrivatePilote.property.price" />
                :{' '}
                {error != null && error.type === 'price' ? error.message : null}
                {price == null && (error == null || error.type !== 'price')
                  ? 'calculation in progress'
                  : price}
              </li>
            ) : null}
          </ul>
          <div className="c-private-pilote__choose-button-wrapper">
            <Button
              disabled={shouldChoiceButtonDisabled}
              onClick={this.handleChooseClick}
              variant="default"
            >
              <FormattedMessage
                id={`PrivatePilote.${
                  choices[step].includes(currentId)
                    ? 'unselectButtonLabel'
                    : 'chooseButtonLabel'
                }`}
              />
            </Button>
            {windowWidth < BREAKPOINT.medium ? this.renderNavigation() : null}
          </div>
        </div>
      </div>
    );
  }

  public renderDoneStep() {
    return (
      <div className="c-private-pilote__main u-text-align--center">
        <div className="c-private-pilote__successful-message">
          <FormattedMessage id="PrivatePilote.successfulMessage" />
        </div>
        <Button onClick={this.handleRestartClick} variant="default">
          <FormattedMessage id="PrivatePilote.restartButtonLabel" />
        </Button>
      </div>
    );
  }

  public renderNavigation() {
    const { choices, step } = this.props;
    const indexStep = steps.indexOf(step);
    const notFirstStep = indexStep > 0;
    const notLastStep = indexStep + 1 !== steps.length;
    const notBeforeLastAndLastStep = indexStep + 1 < steps.length - 1;

    return [
      notFirstStep && notLastStep ? (
        <Button
          className="c-private-pilote__slide-button c-private-pilote__slide-button--prev"
          key="A"
          onClick={this.handlePreviousStepClick}
        >
          <FormattedMessage id="Global.previous" />
          <img alt="Next step" src="src/images/arrow.svg" />
        </Button>
      ) : null,
      notBeforeLastAndLastStep ? (
        <Button
          className="c-private-pilote__slide-button c-private-pilote__slide-button--next"
          disabled={choices[step] != null && choices[step].length === 0}
          key="B"
          onClick={this.handleNextStepClick}
        >
          <FormattedMessage id="Global.next" />
          <img alt="Next step" src="src/images/arrow.svg" />
        </Button>
      ) : null,
    ];
  }

  public renderSelectionMessage() {
    const { loading } = this.props;

    return loading ? null : (
      <div className="u-text-align--center">
        <FormattedMessage id="PrivatePilote.selectionItemText" />
      </div>
    );
  }

  public renderTripStep() {
    const { choices, windowWidth } = this.props;

    return [
      <div className="c-private-pilote__main o-grid o-wrap" key="A">
        <div className="o-size--1-of-1 o-size-medium--2-of-2 u-text-align--center">
          <img
            alt=""
            className="c-private-pilote__trip-preview-image"
            src={`src/images/content/${Steps.starships}/${
              choices[Steps.starships][0]
            }.png`}
          />
          <ul className="c-private-pilote__trip-passenger-list">
            {choices[Steps.people].map(id => (
              <li className="c-private-pilote__trip-passenger-item" key={id}>
                <img
                  alt=""
                  height="81"
                  src={`src/images/content/${
                    Steps.people
                  }/${id}-thumbnail@x2.png`}
                  width="81"
                />
              </li>
            ))}
          </ul>
        </div>
        <div className="o-size--1-of-1 o-size-medium--2-of-2">
          <img
            alt=""
            src={`src/images/content/${Steps.planets}/${
              choices[Steps.planets][0]
            }.png`}
          />
        </div>
      </div>,
      <div className="c-private-pilote__trip-actions" key="B">
        {windowWidth < BREAKPOINT.medium ? this.renderNavigation() : null}
        <Button onClick={this.handleValidationClick} variant="default">
          <FormattedMessage id="PrivatePilote.validationButtonLabel" />
        </Button>
      </div>,
    ];
  }

  public render() {
    const { choices, loading, starships, step, windowWidth } = this.props;
    const [starshipId] = choices[Steps.starships];
    const starship = starships.find(
      starshipItem => starshipItem.id === starshipId
    );
    const capacity = starship == null ? 0 : starship.capacity;
    const numberOfCurrentStep = steps.indexOf(step) + 1;

    return (
      <div className="c-private-pilote">
        {windowWidth >= BREAKPOINT.medium ? (
          <div className="c-private-pilote__topbar">US - Wookie</div>
        ) : null}
        <div className="c-private-pilote__wrapper">
          <header className="c-private-pilote__header">
            <div className="u-text-heading--medium">
              <FormattedMessage id={`PrivatePilote.stepTitle.${step}`} />
            </div>
            <ProgressIndicator
              progression={numberOfCurrentStep * 100 / numberOfSteps}
            />
            {step === Steps.people ? (
              <div className="u-text-heading--medium">
                {choices[Steps.people].length}/{capacity}
              </div>
            ) : null}
          </header>
          {step === Steps.people ||
          step === Steps.planets ||
          step === Steps.sides ||
          step === Steps.starships
            ? this.renderChoiceStep()
            : null}
          {step === Steps.trip ? this.renderTripStep() : null}
          {step === Steps.done ? this.renderDoneStep() : null}
        </div>
        {windowWidth >= BREAKPOINT.medium ? this.renderNavigation() : null}
        {loading ? PrivatePilote.renderLoader() : null}
      </div>
    );
  }

  private getData = () => {
    const { people, planets, sides, starships, step } = this.props;

    if (step === Steps.people) {
      return people;
    }

    if (step === Steps.planets) {
      return planets;
    }

    if (step === Steps.sides) {
      return sides;
    }

    if (step === Steps.starships) {
      return starships;
    }

    return [];
  };

  private onResize = () => {
    const { onResizeWindow } = this.props;

    onResizeWindow(window.innerWidth);
  };

  private handleChooseClick = () => {
    const { onChooseItem } = this.props;

    onChooseItem();
  };

  private handleNextStepClick = () => {
    const {
      onGetPassengers,
      onGetPlanets,
      onStepChange,
      people,
      planets,
      step,
    } = this.props;
    const currentIndex = steps.indexOf(step);
    const nextIndex = currentIndex + 1;
    const nextStep = steps[nextIndex];

    onStepChange(nextStep);

    if (nextStep === Steps.people && people.length === 0) {
      onGetPassengers();
    } else if (nextStep === Steps.planets && planets.length === 0) {
      onGetPlanets();
    }
  };

  private handleOptionClick = (id: number) => () => {
    const {
      currentId,
      onGetItem,
      onGetPrice,
      onKeyItemChange,
      step,
    } = this.props;

    if (id !== currentId) {
      const items = this.getData();
      const item = items.find(item2 => item2.id === id);

      onKeyItemChange(id);

      if (
        (step === Steps.people && (item as IPassenger).eye_color == null) ||
        (step === Steps.planets && (item as IPlanet).climate == null) ||
        (step === Steps.starships && (item as IStarship).capacity == null)
      ) {
        onGetItem(step, id);
      }

      if (step === Steps.planets) {
        onGetPrice();
      }
    }
  };

  private handlePreviousStepClick = () => {
    const { onStepChange, step } = this.props;
    const currentIndex = steps.indexOf(step);

    onStepChange(steps[currentIndex - 1]);
  };

  private handleRestartClick = () => {
    const { onRestart } = this.props;

    onRestart();
  };

  private handleValidationClick = () => {
    const { onPostRide } = this.props;

    onPostRide();
  };
}

const mapStateToProps = (state: IRootState): IPrivatePiloteState => ({
  choices: state.privatePilote.choices,
  currentId: state.privatePilote.currentId,
  error: state.privatePilote.error,
  loading: state.privatePilote.loading,
  people: state.privatePilote.people,
  planets: state.privatePilote.planets,
  price: state.privatePilote.price,
  sides: state.privatePilote.sides,
  starships: state.privatePilote.starships,
  step: state.privatePilote.step,
  windowWidth: state.privatePilote.windowWidth,
});

const mapDispatchToProps = (
  dispatch: Dispatch<IRootState>
): IDispatchProps => ({
  onChooseItem: bindActionCreators(chooseItem, dispatch),
  onGetItem: bindActionCreators(getItem, dispatch),
  onGetPassengers: bindActionCreators(getPassengers, dispatch),
  onGetPlanets: bindActionCreators(getPlanets, dispatch),
  onGetPrice: bindActionCreators(getPrice, dispatch),
  onGetStarships: bindActionCreators(getStarships, dispatch),
  onKeyItemChange: bindActionCreators(keyItemChange, dispatch),
  onPostRide: bindActionCreators(postRide, dispatch),
  onResizeWindow: bindActionCreators(onResizeWindow, dispatch),
  onRestart: bindActionCreators(restart, dispatch),
  onStepChange: bindActionCreators(stepChange, dispatch),
});

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer({
  key: 'privatePilote',
  reducer: PrivatePiloteReducer,
});
const withSaga = injectSaga({
  key: 'privatePilote',
  saga: PrivatePiloteSaga,
});

export default compose(withReducer, withSaga, withConnect)(PrivatePilote);
